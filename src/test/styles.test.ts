import { describe, expect, it } from "vitest";
import { HAIRCUT_STYLES, filterStyles, styleService, styleBookingUrl } from "@/lib/styles";

describe("style showcase", () => {
  it("filters all six styles into their requested categories", () => {
    expect(filterStyles("Alle Stijlen")).toHaveLength(6);
    expect(filterStyles("Skin Fades & Taper").map(s => s.id)).toEqual(["skin", "taper"]);
    expect(filterStyles("Baard & Contouren").map(s => s.id)).toEqual(["combo"]);
    expect(filterStyles("Klassiek & Modern").map(s => s.id)).toEqual(["crop", "classic"]);
    expect(filterStyles("Kinderen").map(s => s.id)).toEqual(["kids"]);
  });
  it("maps every style to an existing treatment", () => {
    expect(HAIRCUT_STYLES.map((s) => styleService(s)?.id)).toEqual(["haar", "combo", "haar", "haar", "haar", "kids"]);
  });
  it("books each exact style via WhatsApp without any price", () => {
    for (const style of HAIRCUT_STYLES) {
      const url = new URL(styleBookingUrl(style));
      expect(url.hostname).toBe("wa.me");
      expect(url.pathname).toBe("/32465467934");
      const text = url.searchParams.get("text") ?? "";
      expect(text).toContain(`Gewenste stijl: ${style.name}`);
      expect(text).not.toContain("€");
    }
  });
});
