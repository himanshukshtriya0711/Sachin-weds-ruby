/**
 * All wedding content lives here. Update this file to change text, dates,
 * venue details or the story — the components read everything from it.
 */

export type WeddingEventId = "lagan" | "sehrabandhi" | "barat";

export type WeddingEvent = {
  id: WeddingEventId;
  title: string;
  /** ISO date (YYYY-MM-DD) in India Standard Time. */
  date: string;
  /** Start time, 24-hour "HH:MM" in IST. Shown as e.g. "12:00 PM" and used for calendar invites. */
  start: string;
  description: string;
};

/** How long calendar invites block out for each event (no end times were given). */
export const calendarDurationHours = 3;

export const couple = {
  bride: "Sachin",
  groom: "Ruby",
  monogram: { first: "S", second: "R" },
};

/** Groom's family details */
export const groomFamily = {
  name: "Sachin Kumar",
  mother: "Mrs. Usha Rani",
  father: "Mr. Ombir Singh",
  grandmother: "Late Mrs. Shanti Devi",
  grandfather: "Late Mr. Lala Ram",
  residence: "G 642-A, Sangam Vihar, Near Savitri Public School, New Delhi – 110080",
  contact: ["8368486067", "9758251746"],
};

/** Bride's family details */
export const brideFamily = {
  name: "Ruby Singh",
  mother: "Mrs. Savitri Devi",
  father: "Mr. Soran Singh",
  residence: "A-20, Fauji Colony, Dayalbagh, Agra – 282005",
};

/** RSVP / compliments family name */
export const hostFamily = "Niboriya Family";

export const events: WeddingEvent[] = [
  {
    id: "lagan",
    title: "Lagan",
    date: "2026-12-07",
    start: "18:00", // 6 PM, evening
    description: "Rings, blessings and the first promise as two families become one.",
  },
  {
    id: "sehrabandhi",
    title: "Sehra Bandhi & Ghurchari",
    date: "2026-12-11",
    start: "08:00", // 8 AM, morning
    description: "Sacred rituals mark the groom's preparation as the wedding day begins.",
  },
  {
    id: "barat",
    title: "Departure of Barat",
    date: "2026-12-11",
    start: "10:00", // 10 AM, morning
    description: "Music, dhol and dancing as the groom departs for the wedding venue.",
  },
];

/** "20:00" → "8:00 PM" */
export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

/** The countdown runs to the start of the Barat (IST). */
const barat = events.find((e) => e.id === "barat")!;
export const countdownTarget = `${barat.date}T${barat.start}:00+05:30`;

/**
 * Lagan venue — Sattu Sanghwan Banquet Hall
 */
export const laganVenue = {
  name: "Sattu Sanghwan Banquet Hall",
  address: "L-1, 484/8, Sangam Vihar, New Delhi – 110062",
  mapQuery: "Sattu Sanghwan Banquet Hall, L-1, 484/8, Sangam Vihar, New Delhi 110062",
  mapUrl: "" as string,
};

/**
 * Wedding / Barat venue — Samadhiya Farm House
 */
export const venue = {
  name: "Samadhiya Farm House",
  address: "Mathura Road, Sikandra, Agra – 282007",
  note: "We look forward to welcoming you. Tap below for directions straight to the venue.",
  mapQuery: "Samadhiya Farm House, Mathura Road, Sikandra, Agra, Uttar Pradesh 282007",
  /** Optional: paste the venue's Google Maps share link here for a pin-exact location. */
  mapUrl: "" as string,
};

export function venueMapHref() {
  return (
    venue.mapUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.mapQuery)}`
  );
}

export function venueDirectionsHref() {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venue.mapQuery)}`;
}

export function venueEmbedSrc() {
  return `https://maps.google.com/maps?q=${encodeURIComponent(venue.mapQuery)}&z=15&output=embed`;
}

/**
 * RSVPs are sent to this WhatsApp number after the form is confirmed.
 * Country code + number, digits only (India = 91).
 */
export const whatsappNumber = "918527984754";

/**
 * Optional background music. Drop an mp3 into /public (e.g. /public/music.mp3)
 * and set `src: "/music.mp3"`. It starts when the guest opens the invitation
 * and can be paused from the floating button. Leave empty to hide the player.
 */
export const music = {
  // Original instrumental composed for this site (Raag Yaman: santoor, bansuri, tanpura, tabla).
  // To use a different song, put its mp3 in /public/music and change this path.
  src: "/music/humsafar-yaman.mp3" as string,
  title: "background music",
};

/** Our Story — placeholder copy, written to be replaced. */
export const story = {
  intro:
    "From a chance meeting to a forever promise, our journey has been filled with laughter, friendship and a love that only grew stronger with time.",
  chapters: [
    {
      title: "How It Began",
      body: "A first hello that felt strangely familiar. Share the story of where and how you first met here.",
    },
    {
      title: "Falling in Love",
      body: "Long conversations, shared adventures and the quiet certainty that this was it. Add your favourite memories here.",
    },
    {
      title: "The Promise",
      body: "One question, one answer, and a lifetime ahead. Describe the proposal and the moment your families came together.",
    },
  ],
};

export const closingMessage = "Two hearts, one beautiful journey. Forever begins here.";

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "story", label: "Our Story" },
  { id: "events", label: "Events" },
  { id: "venue", label: "Venue" },
  { id: "gallery", label: "Gallery" },
  { id: "rsvp", label: "RSVP" },
] as const;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/* ---------- date helpers (timezone-safe: dates are treated as calendar days) ---------- */

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function parts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d };
}

/** "07 December 2026" */
export function formatLong(iso: string) {
  const { y, m, d } = parts(iso);
  return `${String(d).padStart(2, "0")} ${MONTHS[m - 1]} ${y}`;
}

/** "07 Dec 2026" */
export function formatShort(iso: string) {
  const { y, m, d } = parts(iso);
  return `${String(d).padStart(2, "0")} ${MONTHS[m - 1].slice(0, 3)} ${y}`;
}
