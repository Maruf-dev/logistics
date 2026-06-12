"use client";

import Link from "next/link";
import Brand from "./Brand";
import { useI18n } from "./LanguageProvider";

export default function Footer() {
  const { t } = useI18n();
  const fo = t.footer;

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Brand />
            <p>{fo.blurb}</p>
          </div>
          <div className="foot-col">
            <h4>{fo.servicesTitle}</h4>
            {fo.services.map((label) => (
              <Link key={label} href="#services">
                {label}
              </Link>
            ))}
          </div>
          <div className="foot-col">
            <h4>{fo.companyTitle}</h4>
            {fo.company.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
          <div className="foot-col">
            <h4>{fo.contactTitle}</h4>
            {fo.contact.map((line) => (
              <p key={line}>{line.includes("@") ? <a href={`mailto:${line}`}>{line}</a> : line}</p>
            ))}
          </div>
        </div>
        <div className="foot-bottom">
          <span>{fo.copyright}</span>
          <span>{fo.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
