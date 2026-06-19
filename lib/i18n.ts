/* ============================================================
   Copy dictionary — English (single language).
   All user-facing copy lives here; components import `t`.
   ============================================================ */

export const t = {
  nav: {
    services: "Services",
    coverage: "Coverage",
    partners: "Partners",
    fleet: "Fleet",
    contact: "Contact",
    quote: "Apply now",
  },
  a11y: {
    mainNav: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    drawer: "Navigation menu",
    heroRoute: "U.S. lane network from the Chicago dispatch hub",
    coverageMap: "Map of lanes from the Chicago hub",
    trailer: "53-foot dry van diagram",
    skip: "Skip to content",
  },
  hero: {
    kicker: "B2B Freight · Chicago, Illinois",
    titleBefore: "Freight that arrives ",
    titleEm: "on time",
    titleAfter: " — load after load.",
    lead: "Harb Trucking is a licensed dry-van carrier for shippers and distributors. Direct rates, live dispatch, and tracking from pickup to delivery across all 48 states.",
    ctaQuote: "Apply now",
    ctaServices: "View services",
    authority: "Interstate authority:",
    active: "Active",
  },
  stats: [
    { prefix: "", suffix: "", label: "states in our service area" },
    { prefix: "", suffix: "ft", label: "dry van — fleet standard" },
    { prefix: "", suffix: "/7", label: "dispatch & support" },
    { prefix: "", suffix: "%", label: "on-time delivery" },
  ],
  services: {
    kicker: "Services",
    title: "Full-service truck dispatch",
    lead: "We book the loads, negotiate the rates, and run your back office and compliance, so your only job is to drive.",
    items: [
      {
        tag: "Load booking",
        title: "We book your loads",
        desc: "We line up the best-paying loads that fit your lanes, equipment, and home-time, so you never sit empty.",
        icon: "target",
      },
      {
        tag: "Best rates",
        title: "Rates that pay — $3–$3+",
        desc: "We negotiate hard with brokers on your behalf and keep you on freight that averages $3–$3+ per mile, so you stop hauling cheap loads and earn real money on every run.",
        icon: "dollar",
      },
      {
        tag: "Get paid",
        title: "Paperwork and fast pay",
        desc: "We handle your rate cons, invoicing, and factoring, so your money hits sooner without you chasing it.",
        icon: "document",
      },
      {
        tag: "Broker setup",
        title: "Vetted, credit-checked brokers",
        desc: "We set you up with brokers and run their credit, so your truck only runs for the ones who pay.",
        icon: "handshake",
      },
      {
        tag: "24/7 support",
        title: "A real person, anytime",
        desc: "Call us day or night and reach a live dispatcher who solves the problem while you stay rolling.",
        icon: "headset",
      },
      {
        tag: "Compliance",
        title: "Back office covered",
        desc: "We keep your IFTA, permits, and FMCSA and DOT paperwork current, so nothing parks your truck.",
        icon: "shield",
      },
    ],
    amazon: {
      tag: "Amazon Relay",
      grade: "A–A+",
      title: "We keep you on Amazon Relay",
      desc: "We dispatch you on Amazon Relay and hold an A to A+ performance tier — steady, premium loads, mile after mile.",
    },
  },
  coverage: {
    kicker: "Coverage",
    title: "Based in Chicago. Lanes across the country.",
    lead: "Our Chicago, Illinois hub and active interstate authority keep freight moving along the major corridors of the Midwest, Northeast, and Southeast. Estimated transit times on key lanes:",
    lanes: [
      { from: "Ohio", to: "Florida", time: "~15–17 h · 915 mi" },
      { from: "Los Angeles", to: "Georgia", time: "~33–36 h · 2,175 mi" },
      { from: "Chicago", to: "Atlanta", time: "~11–13 h · 715 mi" },
      { from: "Georgia", to: "Pennsylvania", time: "~12–14 h · 760 mi" },
    ],
    map: {
      chicago: "Detroit",
      denver: "Denver",
      atlanta: "Atlanta",
      la: "L.A.",
      miami: "Miami",
      newyork: "New York",
      dallas: "Dallas",
      seattle: "Seattle",
      hub: "Chicago, IL",
    },
  },
  partners: {
    kicker: "Our partners",
    title: "Who we move freight with",
    lead: "We run loads for established brokers and shippers across the country — the partners that keep our trucks rolling and our rates fair.",
    items: [
      { name: "SPOT", logo: "/partners/spot.jpg" },
      { name: "U.S. Xpress", logo: "/partners/usx.png" },
      { name: "J.B. Hunt", logo: "/partners/jb-hunt.png" },
      { name: "Echo Global Logistics", logo: "/partners/echo.jpg" },
      { name: "TQL", logo: "/partners/tql.jpg" },
      { name: "AC", logo: "/partners/ac.jpg" },
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
        desc: "USDOT #4327636, MC #1689299 — active interstate authority and cargo insurance coverage.",
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
  apply: {
    kicker: "Drive with us",
    title: "Apply now",
    lead: "Choose your path and start today.",
    cta: "Apply now",
    roles: {
      owner: {
        title: "Apply as Owner Operator",
        desc: "Run your business with steady freight, fast pay, and 24/7 support.",
      },
      company: {
        title: "Apply as Company Driver",
        desc: "Competitive pay, new equipment, consistent routes, and a flexible schedule.",
      },
    },
    contact: {
      locationLabel: "Location",
      location: "Chicago, Illinois, USA",
      emailLabel: "Recruiting e-mail",
      email: "topcdltrucking@gmail.com",
      authorityLabel: "Authority",
      authority: "USDOT #4327636 · MC #1689299",
    },
    form: {
      sub: "Tell us a bit about you — a recruiter will reach out ASAP.",
      name: "Full name *",
      namePh: "First and last name",
      nameErr: "Enter your name",
      phone: "Phone *",
      phonePh: "(555) 123-4567",
      phoneErr: "Enter a valid phone",
      email: "Email *",
      emailPh: "you@email.com",
      emailErr: "Enter a valid e-mail",
      experience: "Years of experience",
      experiencePh: "e.g. 3",
      equipment: "Truck / trailer type",
      equipmentPh: "e.g. 2021 Freightliner · 53′ dry van",
      endorsements: "Endorsements",
      endorsementsPh: "e.g. Hazmat, Tanker",
      available: "Available from",
      submit: "Submit application",
      sending: "Sending…",
      error:
        "We couldn't send your application. Please try again, or email us directly at topcdltrucking@gmail.com.",
      note: "By submitting, you agree a recruiter may contact you using the details provided.",
      success: {
        heading: "Application received",
        body: "Thanks — a recruiter will reach out ASAP.",
        again: "Close",
      },
    },
  },
  footer: {
    copyright: "© 2026 Harb Trucking. All rights reserved.",
    tagline: "Made for B2B freight · Dry Van · 48 States",
  },
};

export type Dict = typeof t;
