"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Brand from "./Brand";
import LangToggle from "./LangToggle";
import { useI18n } from "./LanguageProvider";

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function SiteHeader() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { href: "#services", label: t.nav.services },
    { href: "#coverage", label: t.nav.coverage },
    { href: "#process", label: t.nav.process },
    { href: "#equipment", label: t.nav.fleet },
    { href: "#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + allow Escape to close while the drawer is open.
  useEffect(() => {
    if (!drawerOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  return (
    <>
      <header className={`site-header${scrolled ? " scrolled" : ""}`} id="header">
        <div className="wrap nav">
          <Brand />
          <nav className="nav-links" aria-label={t.a11y.mainNav}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="nav-right">
            <LangToggle />
            <Link href="#quote" className="btn btn-accent">
              {t.nav.quote}
            </Link>
            <button
              className="menu-btn"
              type="button"
              aria-label={t.a11y.openMenu}
              aria-expanded={drawerOpen}
              aria-controls="drawer"
              onClick={() => setDrawerOpen(true)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`drawer${drawerOpen ? " open" : ""}`}
        id="drawer"
        role="dialog"
        aria-modal="true"
        aria-label={t.a11y.drawer}
        aria-hidden={!drawerOpen}
      >
        <div className="dr-top">
          <Brand wordmarkOnly />
          <button
            className="dr-close"
            type="button"
            aria-label={t.a11y.closeMenu}
            onClick={() => setDrawerOpen(false)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setDrawerOpen(false)}>
            {link.label}
          </Link>
        ))}
        <LangToggle />
        <Link
          href="#quote"
          className="btn btn-accent"
          style={{ fontSize: 16, justifyContent: "center" }}
          onClick={() => setDrawerOpen(false)}
        >
          {t.nav.quote}
          <ArrowIcon />
        </Link>
      </div>
    </>
  );
}
