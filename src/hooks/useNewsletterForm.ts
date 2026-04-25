"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  emptyNewsletterFormData,
  type NewsletterErrorCode,
  normalizeNewsletterFormData,
  validateNewsletterFormData,
} from "@/lib/newsletter";
import type { NewsletterFormData } from "@/types";

type NewsletterFormStatus = "idle" | "success" | "error";

export function useNewsletterForm(
  initialValue: NewsletterFormData = emptyNewsletterFormData
) {
  const pathname = usePathname();
  const [formData, setFormData] = useState<NewsletterFormData>(initialValue);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<NewsletterFormStatus>("idle");
  const [errorCode, setErrorCode] = useState<NewsletterErrorCode | null>(null);

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

    const normalizedFormData = normalizeNewsletterFormData(formData);
    const fieldErrors = validateNewsletterFormData(normalizedFormData);

    if (Object.keys(fieldErrors).length > 0) {
      setStatus("error");
      setErrorCode("validation_failed");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedFormData.email,
          sourcePath: pathname,
          sourceUrl: typeof window !== "undefined" ? window.location.href : pathname,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          error?: NewsletterErrorCode;
        } | null;

        setStatus("error");
        setErrorCode(payload?.error ?? "send_failed");
        return;
      }

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
