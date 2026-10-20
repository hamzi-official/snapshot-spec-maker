export const PHONE = "+32 465 46 79 34";
export const PHONE_RAW = "32465467934";
export const EMAIL = "kingbarbershop.nl@gmail.com";
export const ADDRESS = "Turnhoutsebaan 21, 2480 Dessel";
export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Turnhoutsebaan+21,+2480+Dessel";
export const INSTAGRAM = "https://www.instagram.com/king.barbershop.dessel";
export const TIKTOK = "https://www.tiktok.com/@king.barbershop.dessel";
export const FACEBOOK = "https://www.facebook.com/king.barbershop.dessel";

/** Prices are displayed only in the main price list and booking modal. */
export type Service = { id: string; name: string; price: number; desc: string; badge?: string };
export const SERVICES: Service[] = [
  { id: "haar", name: "Haar", price: 20, desc: "Frisse coupe, strakke fade of klassieke snit inclusief professionele styling" },
  { id: "combo", name: "Haar / Baard Combo", price: 30, desc: "Complete koninklijke behandeling: knippen, strakke fade, baard trimmen & contouren", badge: "👑 Meest Gekozen - Royal Deal" },
  { id: "baard", name: "Baard", price: 15, desc: "Baard modelleren, strakke lijnen en verzorging" },
  { id: "kids", name: "Kinderen (tot 11 jaar)", price: 18, desc: "Stoere en nette knipbeurt voor onze jonge koningen t/m 11 jaar" },
  { id: "wassen", name: "Wassen", price: 4, desc: "Verfrissende haarwas met verzorgende shampoo" },
  { id: "wax", name: "Gezichtwax", price: 7, desc: "Pijnloos en glad verwijderen van ongewenste gezichtshaartjes op wangen en oren" },
];

export const HOURS = [
  ["Maandag", "09:00 – 19:00"], ["Dinsdag", "09:00 – 19:00"], ["Woensdag", "09:00 – 19:00"],
  ["Donderdag", "09:00 – 19:00"], ["Vrijdag", "09:00 – 19:00"], ["Zaterdag", "09:00 – 19:00"], ["Zondag", "10:00 – 16:00"],
] as const;
export const WEEKDAY_HOURS_TEXT = HOURS[0][1];
export const SUNDAY_HOURS_TEXT = HOURS[6][1];
export const HOURS_SUMMARY = `Maandag t/m zaterdag: ${WEEKDAY_HOURS_TEXT} • Zondag: ${SUNDAY_HOURS_TEXT}`;

function brusselsTime(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Brussels", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(date);
  const wd = parts.find((p) => p.type === "weekday")?.value;
  const mins = Number(parts.find((p) => p.type === "hour")?.value ?? 0) * 60 + Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return { wd, mins };
}

/** Belgian time: Mon–Sat 09–19, Sunday 10–16. */
export function isOpen(date: Date = new Date()): boolean {
  const { wd, mins } = brusselsTime(date);
  return mins >= (wd === "Sun" ? 10 : 9) * 60 && mins < (wd === "Sun" ? 16 : 19) * 60;
}

export function nextOpeningTime(date: Date = new Date()): string {
  const { wd, mins } = brusselsTime(date);
  const nextIsSunday = (wd === "Sun" && mins < 16 * 60) || (wd === "Sat" && mins >= 19 * 60);
  return nextIsSunday ? "10:00" : "09:00";
}

export function buildWhatsAppUrl(ids: string[], name: string, when: string, extra?: string): string {
  const chosen = SERVICES.filter((s) => ids.includes(s.id));
  const lines = [
    "Hallo King Barbershop! 👑",
    "Ik wil graag een afspraak maken.",
    "",
    `Behandeling: ${chosen.map((s) => s.name).join(", ") || "Nog te bepalen"}`,
    extra ?? "",
    `Naam: ${name || "-"}`,
    `Gewenste dag/tijd: ${when || "-"}`,
  ].filter((l, i) => l !== "" || i === 2);
  return `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(lines.join("\n"))}`;
}
