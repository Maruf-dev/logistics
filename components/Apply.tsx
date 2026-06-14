"use client";

import { useState, type ReactNode } from "react";
import { t } from "@/lib/i18n";
import ApplyModal, { type Role } from "./ApplyModal";

const TruckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 5h13v10H1zM14 8h4l3 3v4h-7" />
    <circle cx="6" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

const DriverIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
  </svg>
);

const CARDS: { role: Role; icon: ReactNode }[] = [
  { role: "owner", icon: <TruckIcon /> },
  { role: "company", icon: <DriverIcon /> },
];

export default function Apply() {
  const a = t.apply;
  const [openRole, setOpenRole] = useState<Role | null>(null);

  return (
    <section className="section apply eyebrow-dark" id="apply">
      <div className="wrap">
        <div className="section-head apply-head reveal">
          <span className="kicker">{a.kicker}</span>
          <h2>{a.title}</h2>
          <p>{a.lead}</p>
        </div>

        <div className="apply-cards">
          {CARDS.map(({ role, icon }) => {
            const r = a.roles[role];
            return (
              <article className="apply-card reveal" key={role}>
                <div className="ac-ic">{icon}</div>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
                <button type="button" className="btn btn-accent ac-btn" onClick={() => setOpenRole(role)}>
                  {a.cta}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </article>
            );
          })}
        </div>

        {/* contact strip — keeps the nav "Contact" anchor (#contact) live */}
        <div className="apply-contact reveal" id="contact">
          <div className="ac-row">
            <span className="ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M12 21s-7-5.2-7-11a7 7 0 0114 0c0 5.8-7 11-7 11z" strokeLinejoin="round" />
                <circle cx="12" cy="10" r="2.6" />
              </svg>
            </span>
            <div>
              <span>{a.contact.locationLabel}</span>
              <b>{a.contact.location}</b>
            </div>
          </div>
          <div className="ac-row">
            <span className="ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M3 6h18v12H3z" strokeLinejoin="round" />
                <path d="M3 7l9 6 9-6" />
              </svg>
            </span>
            <div>
              <span>{a.contact.emailLabel}</span>
              <b>
                <a href={`mailto:${a.contact.email}?subject=Driver%20application`}>{a.contact.email}</a>
              </b>
            </div>
          </div>
          <div className="ac-row">
            <span className="ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M3 9h18M8 4v16" />
              </svg>
            </span>
            <div>
              <span>{a.contact.authorityLabel}</span>
              <b>{a.contact.authority}</b>
            </div>
          </div>
        </div>
      </div>

      <ApplyModal role={openRole} onClose={() => setOpenRole(null)} />
    </section>
  );
}
