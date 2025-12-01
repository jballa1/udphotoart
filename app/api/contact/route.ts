import { NextResponse, type NextRequest } from "next/server";
import { submitContactForm } from "@/lib/contact-forms";

const CONTACT_FORM_ID = process.env.WORDPRESS_CF7_CONTACT_FORM_ID;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const {
      name,
      email,
      subject,
      message,
    }: {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    if (!CONTACT_FORM_ID) {
      console.error("WORDPRESS_CF7_CONTACT_FORM_ID is not set");
      return NextResponse.json(
        { error: "Contact form is not configured." },
        { status: 500 },
      );
    }

    await submitContactForm(CONTACT_FORM_ID, {
      "your-name": name,
      "your-email": email,
      "your-subject": subject ?? "",
      "your-message": message,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { error: "Failed to send your message. Please try again later." },
      { status: 500 },
    );
  }
}

