export const PHONE = "+32 465 46 79 34";
export const PHONE_RAW = "32465467934";
export const EMAIL = "kingbarbershop.nl@gmail.com";
export const ADDRESS = "Turnhoutsebaan 21, 2480 Dessel";
export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Turnhoutsebaan+21,+2480+Dessel";
export const INSTAGRAM = "https://www.instagram.com/king.barbershop.dessel";
export const TIKTOK = "https://www.tiktok.com/@king.barbershop.dessel";
export const FACEBOOK = "https://www.facebook.com/king.barbershop.dessel";

/** Prices are intentionally not published on the site. */
export type Service = { id: string; name: string; desc: string; badge?: string };
export const SERVICES: Service[] = [
  { id: "haar", name: "Haar", desc: "Frisse coupe, strakke fade of klassieke snit inclusief professionele styling" },
  { id: "combo", name: "Haar / Baard Combo", desc: "Complete koninklijke behandeling: knippen, strakke fade, baard trimmen & contouren", badge: "👑 Meest Gekozen - Royal Deal" },
  { id: "baard", name: "Baard", desc: "Baard modelleren, strakke lijnen en verzorging" },
  { id: "kids", name: "Kinderen (tot 11 jaar)", desc: "Stoere en nette knipbeurt voor onze jonge koningen t/m 11 jaar" },
  { id: "wassen", name: "Wassen", desc: "Verfrissende haarwas met verzorgende shampoo" },
  { id: "wax", name: "Gezichtwax", desc: "Pijnloos en glad verwijderen van ongewenste gezichtshaartjes op wangen en oren" },
];

export const HOURS = [
  ["Maandag", "09:00 – 19:00"], ["Dinsdag", "09:00 – 19:00"], ["Woensdag", "09:00 – 19:00"],
  ["Donderdag", "09:00 – 19:00"], ["Vrijdag", "09:00 – 19:00"], ["Zaterdag", "09:00 – 19:00"], ["Zondag", "09:00 – 15:00"],
] as const;

/** Is the shop open at this moment (Belgium time)? Mon–Sat 09–19, Sun 09–15. */
export function isOpen(date: Date = new Date()): boolean {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Brussels", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(date);
  const wd = parts.find((p) => p.type === "weekday")!.value;
  const mins = Number(parts.find((p) => p.type === "hour")!.value) * 60 + Number(parts.find((p) => p.type === "minute")!.value);
  const close = wd === "Sun" ? 15 * 60 : 19 * 60;
  return mins >= 9 * 60 && mins < close;
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
