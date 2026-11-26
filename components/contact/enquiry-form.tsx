"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { WhatsAppIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Select, Textarea } from "@/components/ui/field";
import {
  CONTACT_SUBJECTS,
  contactSchema,
  type ContactFormValues,
} from "@/lib/validation/contact";

type ApiResponse = {
  status: "sent" | "handoff" | "error";
  message: string;
  fieldErrors?: Record<string, string>;
  whatsappUrl?: string | null;
  contactEmail?: string | null;
};

type FormState =
  | { kind: "idle" }
  | { kind: "sent"; message: string }
  | {
      kind: "handoff";
      message: string;
      whatsappUrl: string | null;
      contactEmail: string | null;
    };

export function EnquiryForm() {
  const [state, setState] = useState<FormState>({ kind: "idle" });
  const [serverError, setServerError] = useState<string | null>(null);
  const [errorLinks, setErrorLinks] = useState<{
    whatsappUrl: string | null;
    contactEmail: string | null;
  } | null>(null);
  const startedAtRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "Order enquiry",
      message: "",
    },
  });

  useEffect(() => {
    if (startedAtRef.current) {
      startedAtRef.current.value = String(Date.now());
    }
  }, []);

  async function onSubmit(values: ContactFormValues) {
    setServerError(null);
    setErrorLinks(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...values,
          company: companyRef.current?.value ?? "",
          startedAt: Number(startedAtRef.current?.value ?? 0),
        }),
      });

      const data = (await response.json()) as ApiResponse;

      if (!response.ok || data.status === "error") {
        setServerError(
          data.message ||
            "We could not send your enquiry. Please try again or use WhatsApp.",
        );

        if (data.whatsappUrl || data.contactEmail) {
          setErrorLinks({
            whatsappUrl: data.whatsappUrl ?? null,
            contactEmail: data.contactEmail ?? null,
          });
        }

        if (data.fieldErrors) {
          for (const [field, message] of Object.entries(data.fieldErrors)) {
            if (field in values) {
              setError(field as keyof ContactFormValues, {
                type: "server",
                message,
              });
            }
          }
        }
        return;
      }

      if (data.status === "sent") {
        setState({ kind: "sent", message: data.message });
        reset();
        return;
      }

      setState({
        kind: "handoff",
        message: data.message,
        whatsappUrl: data.whatsappUrl ?? null,
        contactEmail: data.contactEmail ?? null,
      });
    } catch {
      setServerError(
        "A network error stopped the enquiry. Please try again, or send it through WhatsApp.",
      );
    }
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    void handleSubmit(onSubmit)(event);
  }

  if (state.kind === "sent") {
    return (
      <div
        className="border border-line bg-paper p-7 md:p-9"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="size-7 text-success" strokeWidth={1.5} />
        <h2 className="mt-5 font-display text-3xl leading-tight">
          Thank you — your enquiry is in.
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
          {state.message}
        </p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => setState({ kind: "idle" })}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  if (state.kind === "handoff") {
    return (
      <div
        className="border border-line bg-paper p-7 md:p-9"
        role="status"
        aria-live="polite"
      >
        <WhatsAppIcon className="size-7 text-forest" />
        <h2 className="mt-5 font-display text-3xl leading-tight">
          One last step.
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
          Enquiry delivery is not connected in this environment, so your
          message has not been emailed. Send the same enquiry directly through
          WhatsApp to reach the studio.
        </p>

        <div className="mt-6 flex flex-col gap-2.5 xs:flex-row">
          {state.whatsappUrl ? (
            <a
              href={state.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 border border-forest bg-forest px-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-[#162d24]"
            >
              <WhatsAppIcon className="size-4" />
              Send on WhatsApp
            </a>
          ) : null}
          {state.contactEmail ? (
            <a
              href={`mailto:${state.contactEmail}`}
              className="inline-flex h-12 items-center justify-center gap-2 border border-ink px-5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-paper"
            >
              <Mail className="size-4" strokeWidth={1.5} />
              Email the studio
            </a>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => setState({ kind: "idle" })}
          className="mt-5 border-b border-ink/30 pb-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink"
        >
          Edit the message
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleFormSubmit}
      className="border border-line bg-paper p-6 md:p-8"
      aria-busy={isSubmitting}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-clay">Private enquiry</p>
          <h2 className="mt-2 font-display text-[2rem] leading-tight">
            Send the studio a note
          </h2>
        </div>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">
        Tell us what you are dressing for, your size or colour preferences and
        any deadline. We will reply with availability and next steps.
      </p>

      {serverError ? (
        <div
          role="alert"
          className="mt-5 border border-danger/30 bg-danger/5 p-3.5 text-[12.5px] leading-relaxed text-danger"
        >
          <div className="flex gap-3">
            <AlertCircle
              className="mt-0.5 size-4 shrink-0"
              strokeWidth={1.5}
            />
            <p>{serverError}</p>
          </div>
          {errorLinks ? (
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 pl-7">
              {errorLinks.whatsappUrl ? (
                <a
                  href={errorLinks.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-current pb-0.5 font-semibold"
                >
                  Send on WhatsApp
                </a>
              ) : null}
              {errorLinks.contactEmail ? (
                <a
                  href={`mailto:${errorLinks.contactEmail}`}
                  className="border-b border-current pb-0.5 font-semibold"
                >
                  Email the studio
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullName">
            Full name <span className="text-clay">*</span>
          </Label>
          <Input
            id="fullName"
            autoComplete="name"
            className="mt-2"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            {...register("fullName")}
          />
          <div id="fullName-error">
            <FieldError>{errors.fullName?.message}</FieldError>
          </div>
        </div>

        <div>
          <Label htmlFor="email">
            Email <span className="text-clay">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            className="mt-2"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          <div id="email-error">
            <FieldError>{errors.email?.message}</FieldError>
          </div>
        </div>

        <div>
          <Label htmlFor="phone">
            Phone / WhatsApp <span className="text-clay">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+234 800 000 0000"
            className="mt-2"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
          <div id="phone-error">
            <FieldError>{errors.phone?.message}</FieldError>
          </div>
        </div>

        <div>
          <Label htmlFor="subject">
            Subject <span className="text-clay">*</span>
          </Label>
          <Select
            id="subject"
            className="mt-2"
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            {...register("subject")}
          >
            {CONTACT_SUBJECTS.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </Select>
          <div id="subject-error">
            <FieldError>{errors.subject?.message}</FieldError>
          </div>
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="message">
            Message <span className="text-clay">*</span>
          </Label>
          <Textarea
            id="message"
            rows={6}
            placeholder="The occasion, the date, your size and anything else we should know."
            className="mt-2"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            {...register("message")}
          />
          <div id="message-error">
            <FieldError>{errors.message?.message}</FieldError>
          </div>
        </div>
      </div>

      {/* Honeypot — kept off-screen and out of the tab order. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          ref={companyRef}
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <input ref={startedAtRef} type="hidden" name="startedAt" defaultValue="" />

      <Button
        type="submit"
        size="lg"
        className="mt-6 w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" strokeWidth={1.5} />
            Sending enquiry
          </>
        ) : (
          "Send enquiry"
        )}
      </Button>

      <p className="mt-3 text-[10.5px] leading-relaxed text-ink-soft/80">
        Your details are used only to respond to this enquiry. We do not add you
        to a mailing list. If you prefer, message the studio directly on
        WhatsApp.
      </p>
    </form>
  );
}
