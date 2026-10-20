import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl, isOpen, nextOpeningTime, SERVICES, HOURS } from "@/lib/shop";

describe("openingstijden", () => {
  it("open on Monday 10:00 Brussels", () => expect(isOpen(new Date("2026-10-19T08:00:00Z"))).toBe(true));
  it("closed on Monday 19:30 Brussels", () => expect(isOpen(new Date("2026-10-19T17:30:00Z"))).toBe(false));
  it("open on Sunday 15:30 Brussels", () => expect(isOpen(new Date("2026-10-18T13:30:00Z"))).toBe(true));
  it("open on Sunday 14:00 Brussels", () => expect(isOpen(new Date("2026-10-18T12:00:00Z"))).toBe(true));
  it("Sunday opens at exactly 10:00, not 09:00", () => {
    expect(isOpen(new Date("2026-10-18T07:59:00Z"))).toBe(false);
    expect(isOpen(new Date("2026-10-18T08:00:00Z"))).toBe(true);
    expect(HOURS[6]).toEqual(["Zondag", "10:00 – 16:00"]);
  });
  it("Sunday closes at exactly 16:00", () => {
    expect(isOpen(new Date("2026-10-18T13:59:00Z"))).toBe(true);
    expect(isOpen(new Date("2026-10-18T14:00:00Z"))).toBe(false);
  });
  it("uses Brussels winter time for Sunday hours too", () => {
    expect(isOpen(new Date("2026-11-01T08:59:00Z"))).toBe(false);
    expect(isOpen(new Date("2026-11-01T09:00:00Z"))).toBe(true);
    expect(isOpen(new Date("2026-11-01T15:00:00Z"))).toBe(false);
  });
  it("closed badges announce the next day's actual opening time", () => {
    expect(nextOpeningTime(new Date("2026-10-17T17:00:00Z"))).toBe("10:00");
    expect(nextOpeningTime(new Date("2026-10-18T07:00:00Z"))).toBe("10:00");
    expect(nextOpeningTime(new Date("2026-10-18T14:00:00Z"))).toBe("09:00");
  });
});

describe("service prices", () => {
  it("contains exactly the six requested euro amounts", () => {
    expect(SERVICES.map(({ id, price }) => [id, price])).toEqual([
      ["haar", 20], ["combo", 30], ["baard", 15], ["kids", 18], ["wassen", 4], ["wax", 7],
    ]);
  });
});

describe("whatsapp", () => {
  it("lists chosen treatments to the shop number without prices", () => {
    const url = buildWhatsAppUrl(["combo", "wassen"], "Jan", "Zaterdag 10u");
    expect(url.startsWith("https://wa.me/32465467934?text=")).toBe(true);
    const text = decodeURIComponent(url.split("text=")[1] ?? "");
    expect(text).toContain("Behandeling: Haar / Baard Combo, Wassen");
    expect(text).not.toContain("€");
  });
});
