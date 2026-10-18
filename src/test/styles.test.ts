import { describe, expect, it } from "vitest";
import { HAIRCUT_STYLES, filterStyles, stylePrice, styleBookingUrl } from "@/lib/styles";

describe("style showcase", () => {
  it("filters all six styles into their requested categories", () => {
    expect(filterStyles("Alle Stijlen")).toHaveLength(6);
    expect(filterStyles("Skin Fades & Taper").map(s => s.id)).toEqual(["skin", "taper"]);
    expect(filterStyles("Baard & Contouren").map(s => s.id)).toEqual(["combo"]);
    expect(filterStyles("Klassiek & Modern").map(s => s.id)).toEqual(["crop", "classic"]);
    expect(filterStyles("Kinderen").map(s => s.id)).toEqual(["kids"]);
  });
  it("preserves existing haircut, combo and children prices", () => {
    expect(HAIRCUT_STYLES.map(stylePrice)).toEqual([20, 30, 20, 20, 20, 18]);
  });
  it("books each exact style using its associated treatment and price", () => {
    for (const style of HAIRCUT_STYLES) {
      const url = new URL(styleBookingUrl(style));
      expect(url.hostname).toBe("wa.me");
      expect(url.pathname).toBe("/32465467934");
      expect(url.searchParams.get("text")).toContain(`Gewenste stijl: ${style.name}`);
      expect(url.searchParams.get("text")).toContain(`Totaal: €${stylePrice(style)}`);
    }
  });
});