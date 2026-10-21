import { SERVICES } from "@/lib/shop";

export const STYLE_FILTERS = ["Alle Stijlen", "Skin Fades & Taper", "Baard & Contouren", "Klassiek & Modern", "Kinderen"] as const;
export type StyleCategory = (typeof STYLE_FILTERS)[number];
export const HAIRCUT_STYLES = [
  { id: "skin", name: "Messcherpe Skin Fade", category: "Skin Fades & Taper", desc: "Strakke overloop met perfecte contouren.", serviceId: "haar" },
  { id: "combo", name: "Koninklijke Baard & Fade Combo", category: "Baard & Contouren", desc: "Volledig gemodelleerde baard met strakke lijnen.", serviceId: "combo" },
  { id: "crop", name: "Moderne Crop & Textuur", category: "Klassiek & Modern", desc: "Frisse coupe gestyled met Bandido wax.", serviceId: "haar" },
  { id: "classic", name: "Klassieke Pompadour / Scissor Cut", category: "Klassiek & Modern", desc: "Tijdloze herensnit met oog voor detail.", serviceId: "haar" },
  { id: "taper", name: "Strakke Taper Fade", category: "Skin Fades & Taper", desc: "Natuurlijke overloop bij de slapen en nek.", serviceId: "haar" },
  { id: "kids", name: "Stoere Kids Fade", category: "Kinderen", desc: "Nette en trendy snit voor onze jonge koningen.", serviceId: "kids" },
] as const;
export type HaircutStyle = (typeof HAIRCUT_STYLES)[number];
export function filterStyles(category: StyleCategory) {
  return HAIRCUT_STYLES.filter((style) => category === "Alle Stijlen" || style.category === category);
}
export function styleService(style: HaircutStyle) {
  return SERVICES.find((service) => service.id === style.serviceId);
}
