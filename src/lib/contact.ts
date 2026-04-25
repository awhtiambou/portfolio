import type { ContactFormData } from "@/types";

export type ContactFieldErrors = Partial<Record<keyof ContactFormData, string>>;

export type ContactErrorCode =
  | "validation_failed"
  | "not_configured"
  | "send_failed";

export const emptyContactFormData: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeContactFormData(value: unknown): ContactFormData {
  if (!value || typeof value !== "object") {
    return emptyContactFormData;
  }

  const formData = value as Record<string, unknown>;

  return {
    name: typeof formData.name === "string" ? formData.name.trim() : "",
    email: typeof formData.email === "string" ? formData.email.trim() : "",
    subject: typeof formData.subject === "string" ? formData.subject.trim() : "",
    message: typeof formData.message === "string" ? formData.message.trim() : "",
  };
}

export function validateContactFormData(formData: ContactFormData): ContactFieldErrors {
  const fieldErrors: ContactFieldErrors = {};

  if (formData.name.length < 2 || formData.name.length > 80) {
    fieldErrors.name = "Name must be between 2 and 80 characters.";
  }

  if (!EMAIL_REGEX.test(formData.email)) {
    fieldErrors.email = "Please provide a valid email address.";
  }

  if (formData.subject.length < 3 || formData.subject.length > 120) {
    fieldErrors.subject = "Subject must be between 3 and 120 characters.";
  }

  if (formData.message.length < 10 || formData.message.length > 5000) {
    fieldErrors.message = "Message must be between 10 and 5000 characters.";
  }

  return fieldErrors;
}
