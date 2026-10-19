import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl, isOpen } from "@/lib/shop";

describe("openingstijden", () => {
  it("open on Monday 10:00 Brussels", () => expect(isOpen(new Date("2026-10-19T08:00:00Z"))).toBe(true));
  it("closed on Monday 19:30 Brussels", () => expect(isOpen(new Date("2026-10-19T17:30:00Z"))).toBe(false));
  it("closed on Sunday 15:30 Brussels", () => expect(isOpen(new Date("2026-10-18T13:30:00Z"))).toBe(false));
  it("open on Sunday 14:00 Brussels", () => expect(isOpen(new Date("2026-10-18T12:00:00Z"))).toBe(true));
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
