import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Optional webhook target for Sanity publish events.
 * Configure SANITY_REVALIDATE_SECRET and send it as `x-revalidate-secret`.
 */
export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET?.trim();

  if (!secret) {
    return NextResponse.json(
      { status: "error", message: "Revalidation is not configured." },
      { status: 503 },
    );
  }

  if (request.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json(
      { status: "error", message: "Unauthorized." },
      { status: 401 },
    );
  }

  // A webhook is an external caller, so expire stale data instead of serving
  // it while revalidation runs.
  revalidateTag("sanity", { expire: 0 });

  return NextResponse.json({ status: "ok", revalidated: true });
}
