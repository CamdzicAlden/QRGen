import { z } from "zod";

const qrFormatSchema = z.enum(["svg", "png"]);

const colorSchema = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/, "Color must be a valid hex color");

const sizeSchema = z
  .number()
  .int()
  .refine(
    (size) => [150, 300, 500, 800].includes(size),
    "Size must be 150, 300, 500, or 800",
  );

const commonFields = {
  color: colorSchema.default("#2563eb"),
  background: colorSchema.default("#ffffff"),
  size: sizeSchema.default(300),
  format: qrFormatSchema.default("svg"),
};

const urlSchema = z
  .string()
  .trim()
  .url("Enter a valid URL")
  .refine((value) => {
    try {
      const protocol = new URL(value).protocol;
      return protocol === "http:" || protocol === "https:";
    } catch {
      return false;
    }
  }, "URL must use HTTP or HTTPS");

const textSchema = z
  .string()
  .trim()
  .min(1, "Text is required")
  .max(2000, "Text must not exceed 2000 characters");

const ssidSchema = z
  .string()
  .trim()
  .min(1, "Wi-Fi network name is required")
  .max(32, "Wi-Fi network name must not exceed 32 characters");

const passwordSchema = z
  .string()
  .min(1, "Wi-Fi password is required")
  .max(63, "Wi-Fi password must not exceed 63 characters");

const emailSchema = z.string().trim().email("Enter a valid email address");

const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+?[0-9().\-\s]{3,25}$/, "Enter a valid phone number");

const messageSchema = z
  .string()
  .trim()
  .max(1000, "Message must not exceed 1000 characters");

export const qrRequestSchema = z.discriminatedUnion("type", [
  z.object({
    ...commonFields,
    type: z.literal("url"),
    url: urlSchema,
  }),

  z.object({
    ...commonFields,
    type: z.literal("text"),
    text: textSchema,
  }),

  z.object({
    ...commonFields,
    type: z.literal("wifi"),
    ssid: ssidSchema,
    password: passwordSchema,
  }),

  z.object({
    ...commonFields,
    type: z.literal("email"),
    email: emailSchema,
  }),

  z.object({
    ...commonFields,
    type: z.literal("phone"),
    phone: phoneSchema,
  }),

  z.object({
    ...commonFields,
    type: z.literal("sms"),
    phone: phoneSchema,
    message: messageSchema.default(""),
  }),
]);

export type QRRequest = z.output<typeof qrRequestSchema>;
export type QRRequestInput = z.input<typeof qrRequestSchema>;
