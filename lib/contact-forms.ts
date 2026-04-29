import "server-only";

const API_BASE =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ??
  process.env.WORDPRESS_API_URL ??
  "";

const SITE_BASE = API_BASE ? API_BASE.replace(/\/wp-json\/.*$/, "") : "";

export interface ContactFormSubmissionResult {
  status: string;
  message: string;
  invalidFields?: unknown[];
}

export async function submitContactForm(
  formId: string,
  fields: Record<string, string>,
): Promise<ContactFormSubmissionResult> {
  if (!SITE_BASE) {
    throw new Error("WordPress site URL is not configured");
  }

  if (!formId) {
    throw new Error("Contact Form 7 form ID is not configured");
  }

  const endpoint = `${SITE_BASE.replace(
    /\/$/,
    "",
  )}/wp-json/contact-form-7/v1/contact-forms/${encodeURIComponent(
    formId,
  )}/feedback`;

  const formData = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    formData.append(key, value);
  }

  // Minimal hidden fields Contact Form 7 expects for REST submissions.
  formData.append("_wpcf7", formId);
  formData.append("_wpcf7_unit_tag", `api-${formId}`);
  formData.append("_wpcf7_container_post", "0");

  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  const raw = await response.text();

  let data: {
    status?: string;
    message?: string;
    invalidFields?: unknown[];
    invalid_fields?: unknown[];
  } = {};

  try {
    data = raw ? (JSON.parse(raw) as typeof data) : {};
  } catch {
    // Non-JSON response; leave data as empty object
  }

  if (!response.ok) {
    const messageFromBody =
      typeof data.message === "string" && data.message.trim()
        ? data.message.trim()
        : "";
    const message = messageFromBody || response.statusText || "Unknown error";
    throw new Error(
      `Contact Form 7 API error ${response.status}: ${message}`,
    );
  }

  const status = data.status ?? "unknown";
  const message = data.message ?? "";
  const invalidFields =
    data.invalidFields ?? data.invalid_fields ?? undefined;

  if (status !== "mail_sent") {
    throw new Error(
      message || "Contact Form 7 submission did not complete successfully",
    );
  }

  return {
    status,
    message,
    invalidFields,
  };
}
