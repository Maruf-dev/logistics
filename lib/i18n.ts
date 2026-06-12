/* ============================================================
   i18n dictionary — English primary, Russian secondary.
   All user-facing copy lives here; components read via useI18n().
   ============================================================ */

export const LANGS = ["en", "ru"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";
export const STORAGE_KEY = "arrogate-lang";

const en = {
  htmlLang: "en",
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
    heroRoute: "Route from Katy, Texas to destination",
    coverageMap: "Map of lanes from the Texas hub",
    trailer: "53-foot dry van diagram",
    switchLang: "Switch language to Russian",
  },
  hero: {
    kicker: "B2B Freight · Katy, Texas",
    titleBefore: "Freight that arrives ",
    titleEm: "on time",
    titleAfter: " — load after load.",
    lead: "Arrogate Transportation is a licensed dry-van carrier for shippers and distributors. Direct rates, live dispatch, and tracking from pickup to delivery across all 48 states.",
    ctaQuote: "Request a quote",
    ctaServices: "View services",
    authority: "Authority:",
    active: "Active",
    load: {
      id: "LOAD #AR-2026-0418",
      status: "In transit",
      from: "Houston",
      to: "Atlanta",
      etaLabel: "ETA",
      eta: "14:20",
      equipLabel: "Equip.",
      equip: "Dry Van 53′",
      weightLabel: "Weight",
      weight: "38,400 lb",
    },
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
    kicker: "Why Arrogate",
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
      email: "dispatch@arrogatetransportation.com",
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
      equipOptions: {
        dry: "53′ dry van",
        reefer: "Reefer",
        flat: "Flatbed",
        ltl: "LTL (partial)",
      },
      weight: "Weight, lb",
      weightPh: "e.g. 38000",
      date: "Pickup date",
      email: "Reply e-mail *",
      emailPh: "you@company.com",
      emailErr: "Enter a valid e-mail",
      submit: "Get a quote",
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
    contact: ["Katy, Texas, USA", "dispatch@arrogatetransportation.com", "Dispatch: 24/7", "USDOT #3822610 · MC #1383751"],
    copyright: "© 2026 Arrogate Transportation INC. All rights reserved.",
    tagline: "Made for B2B freight · Dry Van · 48 States",
  },
};

/** Russian translation — shape mirrors `en`. */
const ru: typeof en = {
  htmlLang: "ru",
  nav: {
    services: "Услуги",
    coverage: "Покрытие",
    process: "Как работаем",
    fleet: "Парк",
    contact: "Контакты",
    quote: "Запросить ставку",
  },
  a11y: {
    mainNav: "Основная навигация",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    drawer: "Меню навигации",
    heroRoute: "Маршрут от Кэти, Техас к пункту назначения",
    coverageMap: "Схема маршрутов из узла в Техасе",
    trailer: "Схема сухого фургона 53 фута",
    switchLang: "Переключить язык на английский",
  },
  hero: {
    kicker: "B2B-грузоперевозки · Кэти, Техас",
    titleBefore: "Фрахт, который приходит ",
    titleEm: "точно в срок",
    titleAfter: " — рейс за рейсом.",
    lead: "Arrogate Transportation — лицензированный автоперевозчик сухих фургонов для грузоотправителей и дистрибьюторов. Прямые ставки, живая диспетчеризация и отслеживание от загрузки до выгрузки по всем 48 штатам.",
    ctaQuote: "Запросить ставку",
    ctaServices: "Смотреть услуги",
    authority: "Authority:",
    active: "Active",
    load: {
      id: "LOAD #AR-2026-0418",
      status: "В пути",
      from: "Хьюстон",
      to: "Атланта",
      etaLabel: "ETA",
      eta: "14:20",
      equipLabel: "Оборуд.",
      equip: "Dry Van 53′",
      weightLabel: "Вес",
      weight: "38 400 lb",
    },
  },
  stats: [
    { prefix: "", suffix: "", label: "штатов в зоне обслуживания" },
    { prefix: "", suffix: "ft", label: "сухой фургон в стандарте парка" },
    { prefix: "", suffix: "/7", label: "диспетчеризация и поддержка" },
    { prefix: "≤", suffix: " ч", label: "ответ на запрос ставки" },
  ],
  services: {
    kicker: "Услуги",
    title: "Грузоперевозки полного цикла",
    lead: "От полной загрузки сухим фургоном до срочной экспедиции — мы закрываем перевозку, видимость и документы в одном договоре.",
    items: [
      {
        tag: "Основное направление",
        title: "FTL — полная загрузка",
        desc: "Сухой фургон 53′ под ваш груз целиком. Один отправитель, прямой рейс, без перегрузов и консолидации.",
      },
      {
        tag: "Сборные грузы",
        title: "LTL — частичная загрузка",
        desc: "Платите только за занятое место. Консолидация партий для дистрибьюторов с гибким графиком.",
      },
      {
        tag: "Срочно",
        title: "Экспедированные рейсы",
        desc: "Hot-shot и срочная доставка по жёстким окнам. Выделенная машина, приоритетная подача.",
      },
      {
        tag: "Хранение",
        title: "Кросс-докинг и склад",
        desc: "Перевалка и краткосрочное хранение на узле в Техасе для быстрой переотправки партий.",
      },
      {
        tag: "Видимость",
        title: "Отслеживание 24/7",
        desc: "GPS-позиция и статусы по каждому рейсу. Уведомления о подаче, погрузке и доставке.",
      },
      {
        tag: "Документы",
        title: "Электронные накладные и POD",
        desc: "BOL, POD и закрывающие документы в цифре — сразу после выгрузки, без ожидания почты.",
      },
    ],
  },
  coverage: {
    kicker: "Покрытие",
    title: "База в Техасе. Маршруты по всей стране.",
    lead: "Хаб в Кэти (Хьюстон) и активная междуштатная лицензия позволяют брать грузы по основным коридорам Юга, Юго-Востока и Среднего Запада. Ориентировочное транзитное время по ключевым направлениям:",
    lanes: [
      { from: "Хьюстон", to: "Даллас", time: "~4–5 ч · 385 км" },
      { from: "Хьюстон", to: "Атланта", time: "~12–14 ч · 1 290 км" },
      { from: "Хьюстон", to: "Чикаго", time: "~17–19 ч · 1 745 км" },
      { from: "Хьюстон", to: "Лос-Анджелес", time: "~23–26 ч · 2 490 км" },
    ],
    map: {
      chicago: "Чикаго",
      denver: "Денвер",
      atlanta: "Атланта",
      la: "Л.-А.",
      miami: "Майами",
      hub: "Кэти, TX",
    },
  },
  process: {
    kicker: "Как мы работаем",
    title: "Четыре шага от запроса до выгрузки",
    steps: [
      { n: "01", title: "Запрос", desc: "Пришлите маршрут, тип груза и вес — формой на сайте или диспетчеру." },
      { n: "02", title: "Ставка за ≤2 ч", desc: "Возвращаем прозрачную цену и доступное окно подачи в рабочее время." },
      { n: "03", title: "Подача и загрузка", desc: "Машина на адресе вовремя. Контроль погрузки и крепления груза." },
      { n: "04", title: "Доставка и POD", desc: "Отслеживание в пути, выгрузка по окну и электронные закрывающие." },
    ],
  },
  equipment: {
    kicker: "Парк",
    title: "Современный сухой фургон 53 фута",
    lead: "Стандартизированный парк под палетный груз дистрибьюторов: предсказуемый объём, ELD-учёт и GPS на каждой машине.",
    specs: [
      { label: "Длина прицепа", value: "53 ft (16.1 m)" },
      { label: "Полезная нагрузка", value: "≈ 45 000 lb / 20 000 kg" },
      { label: "Вместимость", value: "26 EUR-палет" },
      { label: "Учёт рейса", value: "ELD · GPS 24/7" },
      { label: "Тип", value: "Dry Van · сухой груз" },
    ],
  },
  why: {
    kicker: "Почему Arrogate",
    title: "Перевозчик, на которого можно положиться",
    items: [
      {
        title: "Прямой перевозчик",
        desc: "Вы работаете с владельцем authority, а не с цепочкой посредников. Ответственность и ставка — из первых рук.",
      },
      {
        title: "Активная лицензия и страховка",
        desc: "USDOT #3822610, MC #1383751 — действующая междуштатная лицензия и страховое покрытие груза.",
      },
      {
        title: "Живая связь с диспетчером",
        desc: "Реальный человек на линии, а не тикеты. Статусы по рейсу и быстрые решения по подаче.",
      },
      {
        title: "Прозрачные ставки",
        desc: "Цена «всё включено» без скрытых надбавок. Что согласовали в запросе — то и в счёте.",
      },
    ],
  },
  quote: {
    kicker: "Запрос ставки",
    title: "Получите ставку на ваш груз",
    lead: "Заполните маршрут и параметры груза — диспетчер вернётся с ценой и окном подачи в течение 2 часов в рабочее время.",
    contact: {
      locationLabel: "Локация",
      location: "Кэти, Техас, США",
      emailLabel: "E-mail диспетчера",
      email: "dispatch@arrogatetransportation.com",
      authorityLabel: "Лицензия",
      authority: "USDOT #3822610 · MC #1383751",
    },
    form: {
      heading: "Калькулятор запроса",
      sub: "Это запрос на расчёт, не бронирование. Поля со звёздочкой обязательны.",
      from: "Откуда *",
      fromPh: "Город или ZIP",
      fromErr: "Укажите пункт отправления",
      to: "Куда *",
      toPh: "Город или ZIP",
      toErr: "Укажите пункт назначения",
      equip: "Оборудование",
      equipOptions: {
        dry: "Сухой фургон 53′",
        reefer: "Рефрижератор",
        flat: "Площадка / Flatbed",
        ltl: "Сборный груз (LTL)",
      },
      weight: "Вес, lb",
      weightPh: "напр. 38000",
      date: "Дата загрузки",
      email: "E-mail для ответа *",
      emailPh: "you@company.com",
      emailErr: "Укажите корректный e-mail",
      submit: "Получить ставку",
      note: "Отправляя запрос, вы соглашаетесь, что диспетчер свяжется с вами по указанным контактам.",
    },
    success: {
      heading: "Запрос принят",
      bodyBefore: "Маршрут ",
      bodyAfter: " в работе. Диспетчер вернётся со ставкой в течение 2 часов в рабочее время.",
      again: "Отправить ещё один запрос",
    },
  },
  footer: {
    blurb: "Лицензированный автоперевозчик сухих фургонов для B2B-грузоотправителей и дистрибьюторов. Кэти, Техас.",
    servicesTitle: "Услуги",
    services: ["FTL — полная загрузка", "LTL — сборные грузы", "Экспедированные рейсы", "Кросс-докинг"],
    companyTitle: "Компания",
    company: [
      { href: "#coverage", label: "Покрытие" },
      { href: "#process", label: "Как мы работаем" },
      { href: "#equipment", label: "Парк" },
      { href: "#quote", label: "Запросить ставку" },
    ],
    contactTitle: "Контакты",
    contact: ["Кэти, Техас, США", "dispatch@arrogatetransportation.com", "Диспетчер: 24/7", "USDOT #3822610 · MC #1383751"],
    copyright: "© 2026 Arrogate Transportation INC. Все права защищены.",
    tagline: "Made for B2B freight · Dry Van · 48 States",
  },
};

export type Dict = typeof en;

export const dictionaries: Record<Lang, Dict> = { en, ru };

export const LANG_LABEL: Record<Lang, string> = { en: "EN", ru: "RU" };
