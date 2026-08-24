"use client";

import { useState, FormEvent } from "react";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertCircle, Github, Linkedin } from "lucide-react";
import { profile } from "@/lib/data";
import Reveal from "./Reveal";
import { createRipple } from "@/lib/ripple";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="py-24 md:py-28">
      <div className="max-w-content mx-auto px-6 md:px-8 grid md:grid-cols-[0.9fr_1.1fr] gap-12 md:gap-16">
        <Reveal>
          <p className="eyebrow mb-4">05 · contact</p>
          <h2 className="section-heading text-3xl md:text-[2.2rem] leading-tight mb-6">
            Have a role, a project, or a hard backend problem?
          </h2>
          <p className="text-muted leading-relaxed mb-10 max-w-md">
            Send a message below and it lands directly in my inbox — no forms, no middlemen. I usually reply
            within a day.
          </p>

          <div className="flex flex-col gap-4 font-mono text-sm">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-muted hover:text-signal transition-colors">
              <Mail size={16} /> {profile.email}
            </a>
            <a href={`tel:${profile.phone}`} className="flex items-center gap-3 text-muted hover:text-signal transition-colors">
              <Phone size={16} /> {profile.phone}
            </a>
            <span className="flex items-center gap-3 text-muted">
              <MapPin size={16} /> {profile.location}
            </span>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-muted hover:text-signal transition-colors">
              <Linkedin size={16} /> LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-muted hover:text-signal transition-colors">
              <Github size={16} /> GitHub
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form onSubmit={handleSubmit} className="card p-6 md:p-8 flex flex-col gap-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="field">
                <label htmlFor="name">your name</label>
                <input id="name" name="name" type="text" required placeholder="Jane Doe" disabled={status === "loading"} />
              </div>
              <div className="field">
                <label htmlFor="email">your email</label>
                <input id="email" name="email" type="email" required placeholder="jane@company.com" disabled={status === "loading"} />
              </div>
            </div>

            <div className="field">
              <label htmlFor="message">message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell me a bit about the role or project..."
                disabled={status === "loading"}
              />
            </div>

            <button type="submit" disabled={status === "loading"} onClick={createRipple} className="btn-primary justify-center disabled:opacity-60">
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send size={16} /> Send message
                </>
              )}
            </button>

            {status === "success" && (
              <p className="flex items-center gap-2 text-sm text-signal">
                <CheckCircle2 size={16} /> Message sent — thanks, I'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-pulse">
                <AlertCircle size={16} /> {errorMsg || "Couldn't send that. Please try again."}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
