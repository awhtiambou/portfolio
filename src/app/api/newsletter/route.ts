import { NextResponse } from "next/server";
import {
  normalizeNewsletterFormData,
  validateNewsletterFormData,
} from "@/lib/newsletter";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

interface NewsletterRequestBody {
  email?: unknown;
  sourcePath?: unknown;
  sourceUrl?: unknown;
}

function normalizeString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

export async function POST(request: Request) {
  let body: NewsletterRequestBody;

  try {
    body = (await request.json()) as NewsletterRequestBody;
  } catch {
    return NextResponse.json(
      { error: "validation_failed" },
      { status: 400 }
    );
  }

  const normalizedFormData = normalizeNewsletterFormData(body);
  const fieldErrors = validateNewsletterFormData(normalizedFormData);

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { error: "validation_failed" },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "not_configured" },
      { status: 503 }
    );
  }

  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({
      email: normalizedFormData.email.toLowerCase(),
      source_path: normalizeString(body.sourcePath),
      source_url: normalizeString(body.sourceUrl),
      subscribed_at: new Date().toISOString(),
    });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "already_subscribed" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "send_failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
