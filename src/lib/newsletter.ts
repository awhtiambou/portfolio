import type { NewsletterFormData } from "@/types";

export type NewsletterFieldErrors = Partial<Record<keyof NewsletterFormData, string>>;

export type NewsletterErrorCode =
  | "validation_failed"
  | "already_subscribed"
  | "not_configured"
  | "send_failed";

export const emptyNewsletterFormData: NewsletterFormData = {
  email: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeNewsletterFormData(value: unknown): NewsletterFormData {
  if (!value || typeof value !== "object") {
    return emptyNewsletterFormData;
  }

  const formData = value as Record<string, unknown>;

  return {
    email: typeof formData.email === "string" ? formData.email.trim() : "",
  };
}

export function validateNewsletterFormData(formData: NewsletterFormData): NewsletterFieldErrors {
  const fieldErrors: NewsletterFieldErrors = {};

  if (!EMAIL_REGEX.test(formData.email)) {
    fieldErrors.email = "Please provide a valid email address.";
  }

  return fieldErrors;
}
