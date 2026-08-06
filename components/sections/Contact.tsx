"use client";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/solid";

type ContactFormInputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const { register, handleSubmit, reset } = useForm<ContactFormInputs>();
  const [status, setStatus] = useState<SubmitState>("idle");

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="max-w-2xl mx-auto px-6 py-24 text-center">
      <h3 className="section-eyebrow mb-4">Contact</h3>
      <h4 className="text-3xl font-semibold mb-8">
        Open to ML/AI roles — <span className="text-accent">let&apos;s talk</span>
      </h4>
      <div className="flex flex-col items-center gap-3 mb-10 text-foreground/70">
        <div className="flex items-center gap-2">
          <EnvelopeIcon className="h-5 w-5 text-accent" />
          <span>elvisokereke.eo@gmail.com</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPinIcon className="h-5 w-5 text-accent" />
          <span>Toronto, Canada</span>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-left">
        <div className="grid gap-3 sm:grid-cols-2">
          <input {...register("name", { required: true })} placeholder="Name" className="contact-input" />
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
            className="contact-input"
          />
        </div>
        <input {...register("subject", { required: true })} placeholder="Subject" className="contact-input" />
        <textarea
          {...register("message", { required: true })}
          placeholder="Message"
          rows={5}
          className="contact-input"
        />
        <button type="submit" disabled={status === "submitting"} className="btn-primary w-full text-center">
          {status === "submitting" ? "Sending…" : "Send Message"}
        </button>
        {status === "success" && <p className="text-sm text-accent">Thanks — I&apos;ll get back to you soon.</p>}
        {status === "error" && (
          <p className="text-sm text-red-400">Something went wrong — email me directly instead.</p>
        )}
      </form>
    </section>
  );
}
