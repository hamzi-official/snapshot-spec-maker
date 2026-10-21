import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WalkInBadge } from "@/components/walk-in";
import { STYLE_FILTERS, filterStyles, type StyleCategory } from "@/lib/styles";
import skin from "@/assets/style-a-1.jpg";
import combo from "@/assets/style-a-2.jpg";
import crop from "@/assets/style-a-3.jpg";
import classic from "@/assets/style-b-1.jpg";
import taper from "@/assets/style-b-2.jpg";
import kids from "@/assets/style-b-3.jpg";

const portraits = { skin, combo, crop, classic, taper, kids };

export function StyleShowcase() {
  const [category, setCategory] = useState<StyleCategory>("Alle Stijlen");
  return <section id="stijlen" data-reveal className="relative mx-auto max-w-7xl px-4 py-24">
    <div className="text-center">
      <h2 className="text-3xl font-bold sm:text-5xl">Onze <span className="text-gold">Coupes & Stijlen</span></h2>
      <p className="mt-4 text-xs tracking-widest text-muted-foreground">STIJLINSPIRATIE</p>
    </div>
    <div className="mt-9 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter stijlen">
      {STYLE_FILTERS.map((filter) => <Button key={filter} variant="ghost" aria-pressed={category === filter} onClick={() => setCategory(filter)} className={`style-filter h-auto min-h-10 whitespace-normal rounded-full border px-4 py-2 text-xs sm:text-sm ${category === filter ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>{filter}</Button>)}
    </div>
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
      {filterStyles(category).map((style) => <article key={style.id} className="style-card group overflow-hidden rounded-lg border border-border bg-card">
        <div className="relative block overflow-hidden aspect-[4/5]">
          <img src={portraits[style.id]} alt={style.name} loading="lazy" width={640} height={1024} className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
        </div>
        <div className="p-5">
          <p className="text-xs text-primary">{style.category}</p>
          <h3 className="mt-2 min-h-14 text-lg font-semibold leading-7">{style.name}</h3>
          <p className="mt-2 min-h-10 text-sm leading-5 text-muted-foreground">{style.desc}</p>
          <WalkInBadge className="mt-5 w-full" />
        </div>
      </article>)}
    </div>
  </section>;
}