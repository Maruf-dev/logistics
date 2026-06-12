"use client";

import { useState, type FormEvent } from "react";
import { useI18n } from "./LanguageProvider";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = { from?: boolean; to?: boolean; email?: boolean };

export default function QuoteForm() {
  const { t } = useI18n();
  const q = t.quote;
  const f = q.form;

  const [values, setValues] = useState({
    from: "",
    to: "",
    equip: "dry",
    weight: "",
    date: "",
    email: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [successLane, setSuccessLane] = useState("—");

  const update =
    (field: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
      // Clear field error as the user types (matches export behaviour).
      setErrors((prev) => (prev[field as keyof Errors] ? { ...prev, [field]: false } : prev));
    };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: Errors = {
      from: !values.from.trim(),
      to: !values.to.trim(),
      email: !EMAIL_RE.test(values.email.trim()),
    };
    setErrors(next);
    if (next.from || next.to || next.email) return;

    setSuccessLane(`${values.from.trim()} → ${values.to.trim()}`);
    setSubmitted(true);
  };

  const reset = () => {
    setValues({ from: "", to: "", equip: "dry", weight: "", date: "", email: "" });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <section className="section quote eyebrow-dark" id="quote">
      <div className="wrap">
        <div className="q-grid">
          <div className="q-info reveal" id="contact">
            <span className="kicker">{q.kicker}</span>
            <h2 style={{ marginTop: 18 }}>{q.title}</h2>
            <p>{q.lead}</p>
            <div className="q-contact">
              <div className="row">
                <div className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M12 21s-7-5.2-7-11a7 7 0 0114 0c0 5.8-7 11-7 11z" strokeLinejoin="round" />
                    <circle cx="12" cy="10" r="2.6" />
                  </svg>
                </div>
                <div>
                  <span>{q.contact.locationLabel}</span>
                  <b>{q.contact.location}</b>
                </div>
              </div>
              <div className="row">
                <div className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M3 6h18v12H3z" strokeLinejoin="round" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                </div>
                <div>
                  <span>{q.contact.emailLabel}</span>
                  <b>{q.contact.email}</b>
                </div>
              </div>
              <div className="row">
                <div className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path d="M3 9h18M8 4v16" />
                  </svg>
                </div>
                <div>
                  <span>{q.contact.authorityLabel}</span>
                  <b>{q.contact.authority}</b>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal">
            {!submitted ? (
              <form className="q-form" onSubmit={handleSubmit} noValidate>
                <h3>{f.heading}</h3>
                <p className="sub">{f.sub}</p>

                <div className="field two">
                  <div className={`field${errors.from ? " err" : ""}`}>
                    <label htmlFor="from">{f.from}</label>
                    <input
                      id="from"
                      name="from"
                      type="text"
                      placeholder={f.fromPh}
                      autoComplete="off"
                      value={values.from}
                      onChange={update("from")}
                      aria-invalid={errors.from ?? false}
                    />
                    <span className="msg">{f.fromErr}</span>
                  </div>
                  <div className={`field${errors.to ? " err" : ""}`}>
                    <label htmlFor="to">{f.to}</label>
                    <input
                      id="to"
                      name="to"
                      type="text"
                      placeholder={f.toPh}
                      autoComplete="off"
                      value={values.to}
                      onChange={update("to")}
                      aria-invalid={errors.to ?? false}
                    />
                    <span className="msg">{f.toErr}</span>
                  </div>
                </div>

                <div className="field two" style={{ marginTop: 16 }}>
                  <div className="field">
                    <label htmlFor="equip">{f.equip}</label>
                    <select id="equip" name="equip" value={values.equip} onChange={update("equip")}>
                      <option value="dry">{f.equipOptions.dry}</option>
                      <option value="reefer">{f.equipOptions.reefer}</option>
                      <option value="flat">{f.equipOptions.flat}</option>
                      <option value="ltl">{f.equipOptions.ltl}</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="weight">{f.weight}</label>
                    <input
                      id="weight"
                      name="weight"
                      type="number"
                      min="0"
                      placeholder={f.weightPh}
                      value={values.weight}
                      onChange={update("weight")}
                    />
                  </div>
                </div>

                <div className="field two" style={{ marginTop: 16 }}>
                  <div className="field">
                    <label htmlFor="date">{f.date}</label>
                    <input id="date" name="date" type="date" value={values.date} onChange={update("date")} />
                  </div>
                  <div className={`field${errors.email ? " err" : ""}`}>
                    <label htmlFor="email">{f.email}</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={f.emailPh}
                      autoComplete="off"
                      value={values.email}
                      onChange={update("email")}
                      aria-invalid={errors.email ?? false}
                    />
                    <span className="msg">{f.emailErr}</span>
                  </div>
                </div>

                <button type="submit" className="btn btn-accent">
                  {f.submit}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <p className="q-note">{f.note}</p>
              </form>
            ) : (
              <div className="q-form q-success show">
                <div className="ck">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3>{q.success.heading}</h3>
                <p>
                  {q.success.bodyBefore}
                  <span className="lane-tag">{successLane}</span>
                  {q.success.bodyAfter}
                </p>
                <button type="button" className="btn btn-ghost" style={{ marginTop: 22 }} onClick={reset}>
                  {q.success.again}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
