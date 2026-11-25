import { z } from "zod";

export const CONTACT_SUBJECTS = [
  "Order enquiry",
  "Aso-ebi / group order",
  "Bridal consultation",
  "Sizing & measurements",
  "Delivery & returns",
  "Something else",
] as const;

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100, "Please use 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Enter a valid email address.")
    .max(160, "Please use 160 characters or fewer."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a phone number the studio can reach you on.")
    .max(30, "Please use 30 characters or fewer.")
    .regex(
      /^[+()\d\s-]+$/,
      "Please use digits, spaces, brackets, + or - only.",
    ),
  subject: z.enum(CONTACT_SUBJECTS, {
    message: "Please choose a subject.",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more — at least 10 characters.")
    .max(2000, "Please keep your message under 2,000 characters."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const contactPayloadSchema = contactSchema.extend({
  company: z.string().max(200).optional().default(""),
  startedAt: z.number().optional(),
});
