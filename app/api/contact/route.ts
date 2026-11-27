import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/data";
import { contactPayloadSchema } from "@/lib/validation/contact";
import { buildContactWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS,
  );
  recent.push(now);
  attempts.set(ip, recent);

  if (attempts.size > 500) {
    for (const [key, timestamps] of attempts) {
      if (!timestamps.some((timestamp) => now - timestamp < WINDOW_MS)) {
        attempts.delete(key);
      }
    }
  }

  return recent.length > MAX_ATTEMPTS;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        status: "error",
        message:
          "Too many enquiries from this connection. Please wait a few minutes or message the studio on WhatsApp.",
      },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { status: "error", message: "Invalid request." },
      { status: 400 },
    );
  }

  const parsed = contactPayloadSchema.safeParse(json);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }

    return NextResponse.json(
      {
        status: "error",
        message: "Please check the highlighted fields.",
        fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot: a real person never fills this field.
  if (data.company?.trim()) {
    return NextResponse.json(
      { status: "error", message: "Your enquiry could not be submitted." },
      { status: 400 },
    );
  }

  // Time gate: forms submitted in under 2.5 seconds are almost always bots.
  const elapsed = data.startedAt ? Date.now() - data.startedAt : 0;
  if (!data.startedAt || elapsed < 2500 || elapsed > 24 * 60 * 60 * 1000) {
    return NextResponse.json(
      {
        status: "error",
        message:
          "We could not verify this enquiry. Please refresh the page and try again.",
      },
      { status: 400 },
    );
  }

  const settings = await getSiteSettings();
  const whatsappUrl = buildWhatsAppUrl(
    settings.whatsappPhone,
    buildContactWhatsAppMessage({
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
    }),
  );

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();

  if (!webhookUrl) {
    // This is an intentional, transparent fallback. No email is sent, so the
    // UI must not claim a delivery. The visitor can send the same enquiry
    // through WhatsApp.
    return NextResponse.json({
      status: "handoff",
      message:
        "Enquiry delivery is not connected in this environment. Your message is ready to send through WhatsApp instead.",
      whatsappUrl,
      contactEmail: settings.contactEmail || null,
    });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.CONTACT_WEBHOOK_SECRET
          ? {
              authorization: `Bearer ${process.env.CONTACT_WEBHOOK_SECRET}`,
            }
          : {}),
      },
      body: JSON.stringify({
        ...data,
        source: "arike-website",
        submittedAt: new Date().toISOString(),
      }),
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Webhook responded with ${response.status}`);
    }

    return NextResponse.json({
      status: "sent",
      message:
        "Thank you — your enquiry has been sent. The studio will reply by email or phone.",
    });
  } catch (error) {
    console.error("Contact webhook delivery failed:", error);
    return NextResponse.json(
      {
        status: "error",
        message:
          "We could not deliver your enquiry. Please send it through WhatsApp instead.",
        whatsappUrl,
        contactEmail: settings.contactEmail || null,
      },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
