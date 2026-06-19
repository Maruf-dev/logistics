"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { t } from "@/lib/i18n";

export type Role = "owner" | "company";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /\d[\d\s().+-]{6,}/; // at least 7 digits' worth of phone

// Web3Forms delivers submissions to the recruiting inbox. The access key is
// public-safe by design; it lives in NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY.
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

type Values = {
  name: string;
  phone: string;
  email: string;
  experience: string;
  equipment: string; // owner operator
  endorsements: string; // company driver
  available: string; // company driver
  botcheck: string; // honeypot — must stay empty
};

const EMPTY: Values = {
  name: "", phone: "", email: "", experience: "",
  equipment: "", endorsements: "", available: "",
  botcheck: "",
};

type Status = "idle" | "sending" | "success" | "error";

type Errors = { name?: boolean; phone?: boolean; email?: boolean };

/**
 * Pop-up driver application. Rendered into a portal at <body> and shown when
 * `role` is set. Tailors its extra fields to the chosen role. Accessible:
 * focus moves in on open, Tab is trapped, Escape / backdrop close, body scroll
 * is locked, and focus returns to the opener on close.
 */
export default function ApplyModal({ role, onClose }: { role: Role | null; onClose: () => void }) {
  const a = t.apply;
  const f = a.form;
  const open = role !== null;

  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const reqRef = useRef(0); // submission generation — invalidates stale responses

  // Fresh form each time a card opens the modal.
  useEffect(() => {
    if (open) {
      setValues(EMPTY);
      setErrors({});
      setStatus("idle");
    }
  }, [role, open]);

  // On close, bump the generation so a late response can't flip a since-closed
  // or reopened form to success/error.
  useEffect(() => {
    if (!open) reqRef.current += 1;
  }, [open]);

  // Move focus into the confirmation panel when a submission succeeds, so
  // keyboard focus isn't orphaned when the form unmounts.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  // Scroll lock + focus management + Tab trap + Escape — only while open.
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    // Visible focusables only — excludes the hidden honeypot (offsetParent === null).
    const focusable = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => el.offsetParent !== null);

    (focusable()[0] ?? closeRef.current)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const title = role === "owner" ? a.roles.owner.title : a.roles.company.title;

  const update =
    (field: keyof Values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
      if (field === "name" || field === "phone" || field === "email") {
        setErrors((prev) => (prev[field] ? { ...prev, [field]: false } : prev));
      }
    };

  // Earliest selectable "Available from" date = today (local), so past days are disabled.
  const now = new Date();
  const minDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return; // guard against re-entrant submits
    const next: Errors = {
      name: !values.name.trim(),
      phone: !PHONE_RE.test(values.phone.trim()),
      email: !EMAIL_RE.test(values.email.trim()),
    };
    setErrors(next);
    if (next.name || next.phone || next.email) {
      // Send focus to the first invalid field so keyboard / screen-reader users
      // are taken straight to the problem.
      document.getElementById(next.name ? "ap-name" : next.phone ? "ap-phone" : "ap-email")?.focus();
      return;
    }

    // No key configured → fail loud rather than show a fake success.
    if (!ACCESS_KEY) {
      console.error(
        "[Apply] NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is missing from this build. " +
          "Env vars are inlined at compile time — fully restart `npm run dev` after editing .env.local, " +
          "or set the variable in your host's environment.",
      );
      setStatus("error");
      return;
    }

    const appType = role === "owner" ? "Owner Operator" : "Company Driver";

    // Readable keys become the labels in the e-mail Web3Forms sends.
    const payload: Record<string, string> = {
      access_key: ACCESS_KEY,
      subject: `New ${appType} application — Harb Trucking`,
      from_name: "Harb Trucking website",
      replyto: values.email.trim(),
      botcheck: values.botcheck,
      "Application type": appType,
      "Full name": values.name.trim(),
      Phone: values.phone.trim(),
      Email: values.email.trim(),
      "Years of experience": values.experience.trim() || "Not specified",
    };
    if (role === "owner") {
      payload["Truck / trailer type"] = values.equipment.trim() || "Not specified";
    } else {
      payload["Endorsements"] = values.endorsements.trim() || "Not specified";
      payload["Available from"] = values.available || "Not specified";
    }

    const myReq = reqRef.current;
    setStatus("sending");
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (reqRef.current !== myReq) return; // modal closed/reopened mid-flight
      const data = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null;
      if (res.ok && data?.success) {
        setStatus("success");
      } else {
        console.error("[Apply] Web3Forms rejected the submission", { status: res.status, body: data });
        setStatus("error");
      }
    } catch (err) {
      if (reqRef.current !== myReq) return;
      console.error("[Apply] Submission request failed (network / CORS / blocked)", err);
      setStatus("error");
    }
  };

  return createPortal(
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="apply-modal-title" ref={dialogRef}>
        <div className="modal-head">
          <h3 id="apply-modal-title">{title}</h3>
          <button ref={closeRef} type="button" className="modal-close" aria-label="Close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {status !== "success" ? (
          <form className="modal-form" onSubmit={handleSubmit} noValidate>
            <p className="sub">{f.sub}</p>

            {/* Honeypot — hidden from people; bots that fill it are rejected by Web3Forms. */}
            <input
              type="text" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true"
              value={values.botcheck} onChange={update("botcheck")}
            />

            <div className={`field${errors.name ? " err" : ""}`}>
              <label htmlFor="ap-name">{f.name}</label>
              <input
                id="ap-name" name="name" type="text" placeholder={f.namePh} autoComplete="name"
                value={values.name} onChange={update("name")}
                aria-invalid={errors.name ?? false} aria-describedby={errors.name ? "ap-name-err" : undefined}
              />
              {errors.name && <span className="msg" id="ap-name-err" role="alert">{f.nameErr}</span>}
            </div>

            <div className="field two">
              <div className={`field${errors.phone ? " err" : ""}`}>
                <label htmlFor="ap-phone">{f.phone}</label>
                <input
                  id="ap-phone" name="phone" type="tel" placeholder={f.phonePh} autoComplete="tel" inputMode="tel"
                  value={values.phone} onChange={update("phone")}
                  aria-invalid={errors.phone ?? false} aria-describedby={errors.phone ? "ap-phone-err" : undefined}
                />
                {errors.phone && <span className="msg" id="ap-phone-err" role="alert">{f.phoneErr}</span>}
              </div>
              <div className={`field${errors.email ? " err" : ""}`}>
                <label htmlFor="ap-email">{f.email}</label>
                <input
                  id="ap-email" name="email" type="email" placeholder={f.emailPh} autoComplete="email" inputMode="email"
                  value={values.email} onChange={update("email")}
                  aria-invalid={errors.email ?? false} aria-describedby={errors.email ? "ap-email-err" : undefined}
                />
                {errors.email && <span className="msg" id="ap-email-err" role="alert">{f.emailErr}</span>}
              </div>
            </div>

            <div className="field">
              <label htmlFor="ap-exp">{f.experience}</label>
              <input
                id="ap-exp" name="experience" type="number" min="0" inputMode="numeric" placeholder={f.experiencePh}
                value={values.experience} onChange={update("experience")}
              />
            </div>

            {role === "owner" ? (
              <div className="field">
                <label htmlFor="ap-equip">{f.equipment}</label>
                <input
                  id="ap-equip" name="equipment" type="text" placeholder={f.equipmentPh}
                  value={values.equipment} onChange={update("equipment")}
                />
              </div>
            ) : (
              <div className="field two">
                <div className="field">
                  <label htmlFor="ap-end">{f.endorsements}</label>
                  <input
                    id="ap-end" name="endorsements" type="text" placeholder={f.endorsementsPh}
                    value={values.endorsements} onChange={update("endorsements")}
                  />
                </div>
                <div className="field">
                  <label htmlFor="ap-avail">{f.available}</label>
                  <input id="ap-avail" name="available" type="date" min={minDate} value={values.available} onChange={update("available")} />
                </div>
              </div>
            )}

            {status === "error" && (
              <p className="modal-error" role="alert">{f.error}</p>
            )}

            <button type="submit" className="btn btn-accent" disabled={status === "sending"}>
              {status === "sending" ? f.sending : f.submit}
              {status !== "sending" && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
            <p className="q-note">{f.note}</p>
          </form>
        ) : (
          <div className="q-success show" role="status" aria-live="polite" ref={successRef} tabIndex={-1}>
            <div className="ck">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3>{f.success.heading}</h3>
            <p>{f.success.body}</p>
            <button type="button" className="btn btn-accent" style={{ marginTop: 22 }} onClick={onClose}>
              {f.success.again}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
