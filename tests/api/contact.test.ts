import { describe, expect, it, vi, beforeEach } from "vitest";

const sendMock = vi.fn();

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: sendMock },
  })),
}));

import { POST, validateContactPayload } from "@/app/api/contact/route";

describe("validateContactPayload", () => {
  it("rejects a missing name", () => {
    expect(
      validateContactPayload({ email: "a@b.com", subject: "hi", message: "hi" })
    ).toMatch(/name/i);
  });

  it("rejects an invalid email", () => {
    expect(
      validateContactPayload({ name: "A", email: "not-an-email", subject: "hi", message: "hi" })
    ).toMatch(/email/i);
  });

  it("accepts a valid payload", () => {
    expect(
      validateContactPayload({ name: "A", email: "a@b.com", subject: "hi", message: "hi" })
    ).toBeNull();
  });
});

describe("POST /api/contact", () => {
  beforeEach(() => {
    sendMock.mockReset();
    process.env.CONTACT_TO_EMAIL = "elvisokereke.eo@gmail.com";
    process.env.RESEND_API_KEY = "test-key";
  });

  it("returns 400 for an invalid payload", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({ name: "", email: "", subject: "", message: "" }),
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("sends an email and returns success for a valid payload", async () => {
    sendMock.mockResolvedValue({ data: { id: "123" }, error: null });
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({ name: "A", email: "a@b.com", subject: "Hi", message: "Hello" }),
    });
    const response = await POST(request);
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body).toEqual({ success: true });
    expect(sendMock).toHaveBeenCalledTimes(1);
  });
});
