import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateContactPayload, type ContactPayload } from "@/lib/contact";

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<ContactPayload>;
  const validationError = validateContactPayload(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL!,
    replyTo: payload.email,
    subject: `[Portfolio] ${payload.subject}`,
    text: `From: ${payload.name} <${payload.email}>\n\n${payload.message}`,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
