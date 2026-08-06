const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function validateContactPayload(payload: Partial<ContactPayload>): string | null {
  if (!payload.name?.trim()) return "Name is required.";
  if (!payload.email || !EMAIL_REGEX.test(payload.email)) return "A valid email is required.";
  if (!payload.subject?.trim()) return "Subject is required.";
  if (!payload.message?.trim()) return "Message is required.";
  return null;
}
