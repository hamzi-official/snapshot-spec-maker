import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import shop1 from "@/assets/shop1.jpeg.asset.json";
import shop2 from "@/assets/shop2.jpeg.asset.json";
import shop3 from "@/assets/shop3.jpeg.asset.json";
import shop4 from "@/assets/shop4.jpeg.asset.json";
import shop5 from "@/assets/shop5.jpeg.asset.json";
import outside1 from "@/assets/outside1.jpeg.asset.json";
import outside2 from "@/assets/outside2.jpeg.asset.json";
import outside3 from "@/assets/outside3.jpeg.asset.json";
import nightView from "@/assets/night-view.jpeg.asset.json";
import flag from "@/assets/flag.jpeg.asset.json";
import tools from "@/assets/tools.jpeg.asset.json";
import waxLamp from "@/assets/wax-lamp.jpeg.asset.json";

export const GALLERY_FILTERS = ["Alle Foto's", "Buitenkant & Pand", "Binnenkant & Sfeer", "Styling, Wax & Tools"] as const;
type Cat = (typeof GALLERY_FILTERS)[number];
const PHOTOS: { src: string; cap: string; cat: Cat; tall?: boolean }[] = [
  { src: outside2, cap: "Ons Pand aan de Turnhoutsebaan", cat: "Buitenkant & Pand", tall: true },
  { src: shop3, cap: "Hexagon LED Plafond", cat: "Binnenkant & Sfeer", tall: true },
  { src: outside1, cap: "Gratis Parkeren Voor De Deur", cat: "Buitenkant & Pand" },
  { src: shop1, cap: "Premium Bandido Producten", cat: "Styling, Wax & Tools" },
  { src: nightView, cap: "Avondsfeer Door Het Raam", cat: "Binnenkant & Sfeer", tall: true },
  { src: flag, cap: "Onze Barbervlag Aan De Straat", cat: "Buitenkant & Pand", tall: true },
  { src: tools, cap: "Kammen, Scharen & Sprays", cat: "Styling, Wax & Tools", tall: true },
  { src: shop5, cap: "Verlichte Barberpaal", cat: "Binnenkant & Sfeer", tall: true },
  { src: outside3, cap: "Ruime Parking Aan De Zaak", cat: "Buitenkant & Pand" },
  { src: waxLamp, cap: "Edison Lamp & Bandido Wax", cat: "Styling, Wax & Tools", tall: true },
  { src: shop2, cap: "Onze Werkplek & Spiegels", cat: "Binnenkant & Sfeer", tall: true },
  { src: shop4, cap: "Aandacht Voor Detail", cat: "Styling, Wax & Tools", tall: true },
];

export function PhotoGallery() {
  const [cat, setCat] = useState<Cat>("Alle Foto's");
  const [idx, setIdx] = useState<number | null>(null);
  const list = PHOTOS.filter((p) => cat === "Alle Foto's" || p.cat === cat);
  const go = (d: number) => setIdx((i) => (i === null ? i : (i + d + list.length) % list.length));

  useEffect(() => {
    if (idx === null) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setIdx(null); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  });

  return (
    <>
      <div className="mt-9 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter foto's">
        {GALLERY_FILTERS.map((f) => (
          <button key={f} aria-pressed={cat === f} onClick={() => setCat(f)} className={`rounded-full border px-4 py-2 text-xs transition sm:text-sm ${cat === f ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-primary"}`}>{f}</button>
        ))}
      </div>
      <div className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4">
        {list.map((p, i) => (
          <figure key={p.src} className="lux-frame style-card group relative mb-4 cursor-zoom-in break-inside-avoid" onClick={() => setIdx(i)}>
            <img src={p.src} alt={p.cap} loading="lazy" className={`hd-img w-full object-cover ${p.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`} />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-4 font-display text-xs text-gold-light sm:text-sm">{p.cap}</figcaption>
            <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/70 text-primary opacity-0 transition group-hover:opacity-100"><Expand className="h-4 w-4" /></span>
          </figure>
        ))}
      </div>
      {idx !== null && list[idx] && createPortal(
        <div role="dialog" aria-label="Foto volledig scherm" className="fixed inset-0 z-[80] flex items-center justify-center bg-background/95 p-4 backdrop-blur-md" onClick={() => setIdx(null)}>
          <img src={list[idx].src} alt={list[idx].cap} className="hd-img max-h-[86vh] max-w-full rounded-xl border border-primary/40 object-contain shadow-gold" onClick={(e) => e.stopPropagation()} />
          <p className="absolute bottom-6 inset-x-0 text-center font-display text-gold-light">{list[idx].cap} · {idx + 1}/{list.length}</p>
          <button aria-label="Sluiten" className="absolute right-4 top-4 rounded-full border border-primary/50 p-2 text-primary" onClick={() => setIdx(null)}><X /></button>
          <button aria-label="Vorige foto" className="absolute left-3 rounded-full border border-primary/50 bg-background/60 p-2 text-primary" onClick={(e) => { e.stopPropagation(); go(-1); }}><ChevronLeft /></button>
          <button aria-label="Volgende foto" className="absolute right-3 rounded-full border border-primary/50 bg-background/60 p-2 text-primary" onClick={(e) => { e.stopPropagation(); go(1); }}><ChevronRight /></button>
        </div>, document.body
      )}
    </>
  );
}
