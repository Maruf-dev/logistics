/* ============================================================
   Copy dictionary — English (single language).
   All user-facing copy lives here; components import `t`.
   ============================================================ */

export const t = {
  nav: {
    services: "Services",
    coverage: "Coverage",
    process: "How it works",
    fleet: "Fleet",
    contact: "Contact",
    quote: "Request a quote",
  },
  a11y: {
    mainNav: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    drawer: "Navigation menu",
    heroRoute: "U.S. lane network from the Houston dispatch hub",
    coverageMap: "Map of lanes from the Texas hub",
    trailer: "53-foot dry van diagram",
    skip: "Skip to content",
  },
  hero: {
    kicker: "B2B Freight · Katy, Texas",
    titleBefore: "Freight that arrives ",
    titleEm: "on time",
    titleAfter: " — load after load.",
    lead: "Harb Trucking is a licensed dry-van carrier for shippers and distributors. Direct rates, live dispatch, and tracking from pickup to delivery across all 48 states.",
    ctaQuote: "Request a quote",
    ctaServices: "View services",
    authority: "Interstate authority:",
    active: "Active",
  },
  stats: [
    { prefix: "", suffix: "", label: "states in our service area" },
    { prefix: "", suffix: "ft", label: "dry van — fleet standard" },
    { prefix: "", suffix: "/7", label: "dispatch & support" },
    { prefix: "≤", suffix: " h", label: "quote response time" },
  ],
  services: {
    kicker: "Services",
    title: "Full-cycle freight transportation",
    lead: "From full dry-van loads to urgent expedited runs — we cover transport, visibility, and paperwork in one contract.",
    items: [
      {
        tag: "Core service",
        title: "FTL — full truckload",
        desc: "A 53′ dry van dedicated to your shipment. One shipper, direct run, no transloading or consolidation.",
      },
      {
        tag: "Partial loads",
        title: "LTL — less-than-truckload",
        desc: "Pay only for the space you use. Batch consolidation for distributors on a flexible schedule.",
      },
      {
        tag: "Urgent",
        title: "Expedited runs",
        desc: "Hot-shot and time-critical delivery on tight windows. A dedicated truck with priority dispatch.",
      },
      {
        tag: "Storage",
        title: "Cross-docking & warehousing",
        desc: "Transloading and short-term storage at our Texas hub for fast re-dispatch of shipments.",
      },
      {
        tag: "Visibility",
        title: "24/7 tracking",
        desc: "GPS position and status on every run. Alerts for arrival, loading, and delivery.",
      },
      {
        tag: "Documents",
        title: "Electronic BOL & POD",
        desc: "BOL, POD, and closing documents digitally — right after unloading, no waiting on mail.",
      },
    ],
  },
  coverage: {
    kicker: "Coverage",
    title: "Based in Texas. Lanes across the country.",
    lead: "Our hub in Katy (Houston) and active interstate authority let us run freight along the major corridors of the South, Southeast, and Midwest. Estimated transit times on key lanes:",
    lanes: [
      { from: "Houston", to: "Dallas", time: "~4–5 h · 240 mi" },
      { from: "Houston", to: "Atlanta", time: "~12–14 h · 800 mi" },
      { from: "Houston", to: "Chicago", time: "~17–19 h · 1,085 mi" },
      { from: "Houston", to: "Los Angeles", time: "~23–26 h · 1,550 mi" },
    ],
    map: {
      chicago: "Chicago",
      denver: "Denver",
      atlanta: "Atlanta",
      la: "L.A.",
      miami: "Miami",
      hub: "Katy, TX",
    },
  },
  process: {
    kicker: "How we work",
    title: "Four steps from request to delivery",
    steps: [
      { n: "01", title: "Request", desc: "Send us the lane, freight type, and weight — via the form or your dispatcher." },
      { n: "02", title: "Quote in ≤2 h", desc: "We return a transparent price and an available pickup window during business hours." },
      { n: "03", title: "Pickup & loading", desc: "The truck arrives on time. We oversee loading and securing the freight." },
      { n: "04", title: "Delivery & POD", desc: "In-transit tracking, on-window unloading, and electronic closing documents." },
    ],
  },
  equipment: {
    kicker: "Fleet",
    title: "Modern 53-foot dry van",
    lead: "A standardized fleet built for distributors' palletized freight: predictable capacity, ELD logging, and GPS on every truck.",
    specs: [
      { label: "Trailer length", value: "53 ft (16.1 m)" },
      { label: "Payload", value: "≈ 45,000 lb / 20,000 kg" },
      { label: "Capacity", value: "26 EUR pallets" },
      { label: "Trip logging", value: "ELD · GPS 24/7" },
      { label: "Type", value: "Dry Van · dry freight" },
    ],
  },
  why: {
    kicker: "Why Harb Trucking",
    title: "A carrier you can rely on",
    items: [
      {
        title: "Direct carrier",
        desc: "You work with the authority holder, not a chain of brokers. Accountability and rates come first-hand.",
      },
      {
        title: "Active authority & insurance",
        desc: "USDOT #3822610, MC #1383751 — active interstate authority and cargo insurance coverage.",
      },
      {
        title: "Live dispatch line",
        desc: "A real person on the line, not tickets. Run status updates and fast pickup decisions.",
      },
      {
        title: "Transparent rates",
        desc: "All-in pricing with no hidden surcharges. What we quote is what you're invoiced.",
      },
    ],
  },
  quote: {
    kicker: "Request a quote",
    title: "Get a rate for your freight",
    lead: "Fill in the lane and freight details — a dispatcher will get back with a price and pickup window within 2 hours during business hours.",
    contact: {
      locationLabel: "Location",
      location: "Katy, Texas, USA",
      emailLabel: "Dispatch e-mail",
      email: "dispatch@harbtrucking.com",
      authorityLabel: "Authority",
      authority: "USDOT #3822610 · MC #1383751",
    },
    form: {
      heading: "Quote request",
      sub: "This is a rate request, not a booking. Fields marked with an asterisk are required.",
      from: "From *",
      fromPh: "City or ZIP",
      fromErr: "Enter an origin",
      to: "To *",
      toPh: "City or ZIP",
      toErr: "Enter a destination",
      equip: "Equipment",
      equipPlaceholder: "Select equipment",
      equipOptions: {
        dry: "53′ dry van",
        ltl: "LTL (partial)",
      },
      weight: "Weight, lb",
      weightPh: "e.g. 38000",
      date: "Pickup date",
      email: "Reply e-mail *",
      emailPh: "you@company.com",
      emailErr: "Enter a valid e-mail",
      submit: "Send rate request",
      note: "By submitting, you agree that a dispatcher may contact you using the details provided.",
    },
    success: {
      heading: "Request received",
      bodyBefore: "Lane ",
      bodyAfter: " is in the works. A dispatcher will return a rate within 2 hours during business hours.",
      again: "Send another request",
    },
  },
  footer: {
    blurb: "Licensed dry-van carrier for B2B shippers and distributors. Katy, Texas.",
    servicesTitle: "Services",
    services: ["FTL — full truckload", "LTL — partial loads", "Expedited runs", "Cross-docking"],
    companyTitle: "Company",
    company: [
      { href: "#coverage", label: "Coverage" },
      { href: "#process", label: "How we work" },
      { href: "#equipment", label: "Fleet" },
      { href: "#quote", label: "Request a quote" },
    ],
    contactTitle: "Contact",
    contact: ["Katy, Texas, USA", "dispatch@harbtrucking.com", "Dispatch: 24/7", "USDOT #3822610 · MC #1383751"],
    copyright: "© 2026 Harb Trucking. All rights reserved.",
    tagline: "Made for B2B freight · Dry Van · 48 States",
  },
};

export type Dict = typeof t;
