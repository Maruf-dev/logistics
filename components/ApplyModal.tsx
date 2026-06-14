"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { t } from "@/lib/i18n";

export type Role = "owner" | "company";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /\d[\d\s().+-]{6,}/; // at least 7 digits' worth of phone

type Values = {
  name: string;
  phone: string;
  email: string;
  cdl: string;
  experience: string;
  equipment: string; // owner operator
  authority: string; // owner operator
  endorsements: string; // company driver
  available: string; // company driver
};

const EMPTY: Values = {
  name: "", phone: "", email: "", cdl: "", experience: "",
  equipment: "", authority: "", endorsements: "", available: "",
};

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
  const [submitted, setSubmitted] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Fresh form each time a card opens the modal.
  useEffect(() => {
    if (open) {
      setValues(EMPTY);
      setErrors({});
      setSubmitted(false);
    }
  }, [role, open]);

  // Scroll lock + focus management + Tab trap + Escape — only while open.
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const first = dialogRef.current?.querySelector<HTMLElement>("input, select, textarea, button");
    (first ?? closeRef.current)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!items || items.length === 0) return;
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: Errors = {
      name: !values.name.trim(),
      phone: !PHONE_RE.test(values.phone.trim()),
      email: !EMAIL_RE.test(values.email.trim()),
    };
    setErrors(next);
    if (next.name || next.phone || next.email) return;
    setSubmitted(true);
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

        {!submitted ? (
          <form className="modal-form" onSubmit={handleSubmit} noValidate>
            <p className="sub">{f.sub}</p>

            <div className={`field${errors.name ? " err" : ""}`}>
              <label htmlFor="ap-name">{f.name}</label>
              <input
                id="ap-name" name="name" type="text" placeholder={f.namePh} autoComplete="name"
                value={values.name} onChange={update("name")}
                aria-invalid={errors.name ?? false} aria-describedby={errors.name ? "ap-name-err" : undefined}
              />
              <span className="msg" id="ap-name-err" role="alert">{f.nameErr}</span>
            </div>

            <div className="field two">
              <div className={`field${errors.phone ? " err" : ""}`}>
                <label htmlFor="ap-phone">{f.phone}</label>
                <input
                  id="ap-phone" name="phone" type="tel" placeholder={f.phonePh} autoComplete="tel" inputMode="tel"
                  value={values.phone} onChange={update("phone")}
                  aria-invalid={errors.phone ?? false} aria-describedby={errors.phone ? "ap-phone-err" : undefined}
                />
                <span className="msg" id="ap-phone-err" role="alert">{f.phoneErr}</span>
              </div>
              <div className={`field${errors.email ? " err" : ""}`}>
                <label htmlFor="ap-email">{f.email}</label>
                <input
                  id="ap-email" name="email" type="email" placeholder={f.emailPh} autoComplete="email" inputMode="email"
                  value={values.email} onChange={update("email")}
                  aria-invalid={errors.email ?? false} aria-describedby={errors.email ? "ap-email-err" : undefined}
                />
                <span className="msg" id="ap-email-err" role="alert">{f.emailErr}</span>
              </div>
            </div>

            <div className="field two">
              <div className="field">
                <label htmlFor="ap-cdl">{f.cdl}</label>
                <select id="ap-cdl" name="cdl" value={values.cdl} onChange={update("cdl")}>
                  <option value="">{f.cdlPlaceholder}</option>
                  <option value="a">{f.cdlOptions.a}</option>
                  <option value="b">{f.cdlOptions.b}</option>
                  <option value="c">{f.cdlOptions.c}</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="ap-exp">{f.experience}</label>
                <input
                  id="ap-exp" name="experience" type="number" min="0" inputMode="numeric" placeholder={f.experiencePh}
                  value={values.experience} onChange={update("experience")}
                />
              </div>
            </div>

            {role === "owner" ? (
              <div className="field two">
                <div className="field">
                  <label htmlFor="ap-equip">{f.equipment}</label>
                  <input
                    id="ap-equip" name="equipment" type="text" placeholder={f.equipmentPh}
                    value={values.equipment} onChange={update("equipment")}
                  />
                </div>
                <div className="field">
                  <label htmlFor="ap-auth">{f.authority}</label>
                  <input
                    id="ap-auth" name="authority" type="text" placeholder={f.authorityPh}
                    value={values.authority} onChange={update("authority")}
                  />
                </div>
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
                  <input id="ap-avail" name="available" type="date" value={values.available} onChange={update("available")} />
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-accent">
              {f.submit}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <p className="q-note">{f.note}</p>
          </form>
        ) : (
          <div className="q-success show" role="status" aria-live="polite">
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
