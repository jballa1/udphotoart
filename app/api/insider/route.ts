import { NextResponse, type NextRequest } from "next/server";
import { submitContactForm } from "@/lib/contact-forms";

const INSIDER_FORM_ID = process.env.WORDPRESS_CF7_INSIDER_FORM_ID;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email }: { email?: string } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 },
      );
    }

    if (!INSIDER_FORM_ID) {
      console.error("WORDPRESS_CF7_INSIDER_FORM_ID is not set");
      return NextResponse.json(
        { error: "Insider form is not configured." },
        { status: 500 },
      );
    }

    await submitContactForm(INSIDER_FORM_ID, {
      "your-email": email,
      source: "insider-popup",
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error submitting insider form:", error);
    return NextResponse.json(
      { error: "Failed to save your email. Please try again later." },
      { status: 500 },
    );
  }
}

