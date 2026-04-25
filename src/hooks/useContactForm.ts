"use client";

import emailjs from "@emailjs/browser";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  emptyContactFormData,
  type ContactErrorCode,
  normalizeContactFormData,
  validateContactFormData,
} from "@/lib/contact";
import type { ContactFormData } from "@/types";

type ContactFormStatus = "idle" | "success" | "error";

export function useContactForm(initialValue: ContactFormData = emptyContactFormData) {
  const [formData, setFormData] = useState<ContactFormData>(initialValue);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const [errorCode, setErrorCode] = useState<ContactErrorCode | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setFormData((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));

    if (status !== "idle") {
      setStatus("idle");
    }

    if (errorCode) {
      setErrorCode(null);
    }
  };

  const resetForm = () => {
    setFormData(initialValue);
    setStatus("idle");
    setErrorCode(null);
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorCode(null);

    const normalizedFormData = normalizeContactFormData(formData);
    const fieldErrors = validateContactFormData(normalizedFormData);

    if (Object.keys(fieldErrors).length > 0) {
      setStatus("error");
      setErrorCode("validation_failed");
      setIsSubmitting(false);
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      setErrorCode("not_configured");
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          sender_name: normalizedFormData.name,
          sender_email: normalizedFormData.email,
          message_subject: normalizedFormData.subject,
          message_body: normalizedFormData.message,
          submitted_at: new Date().toISOString(),
        },
        {
          publicKey,
        }
      );

      setFormData(initialValue);
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorCode("send_failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    errorCode,
    formData,
    handleChange,
    isSubmitting,
    resetForm,
    status,
    submitForm,
  };
}
