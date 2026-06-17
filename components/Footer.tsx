"use client";

import { t } from "@/lib/i18n";

export default function Footer() {
  const fo = t.footer;

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-bottom">
          <span>{fo.copyright}</span>
          <span>{fo.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
