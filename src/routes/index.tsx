import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Crown, Scissors, Sparkles, MapPin, Phone, Mail, Clock, Instagram, Navigation, Menu, Facebook,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BarberPole, AmbientBackground, BarberToolsLayer, RadarLayer, useLuxuryReveals } from "@/components/luxury-motion";
import { Button } from "@/components/ui/button";
import { PhotoGallery } from "@/components/photo-gallery";
import { CookieConsent, LegalModal } from "@/components/legal";
import { WalkInBadge, WalkInAction } from "@/components/walk-in";
import { StyleShowcase } from "@/components/style-showcase";

const logo = "/logo.jpeg";
const outside2 = "/outside2.jpeg";
const shop1 = "/shop1.jpeg";
const shop2 = "/shop2.jpeg";
const shop3 = "/shop3.jpeg";
const shop4 = "/shop4.jpeg";
const shop5 = "/shop5.jpeg";

import {
  ADDRESS, EMAIL, HOURS, FACEBOOK, INSTAGRAM, MAPS_URL, PHONE, PHONE_RAW, SERVICES, TIKTOK, HOURS_SUMMARY, SUNDAY_HOURS_TEXT, isOpen, nextOpeningTime,
} from "@/lib/shop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "King Barbershop Dessel | Zonder afspraak welkom" },
      { name: "description", content: "Luxe barbershop in Dessel. Fades, baarden en klassieke snitten. Geen afspraak nodig – Altijd welkom (Vrije inloop). 7 dagen open." },
      { property: "og:title", content: "King Barbershop Dessel" },
      { property: "og:description", content: "Kom koninklijk goed voor de dag. Geen afspraak nodig – Altijd welkom (Vrije inloop), 7 dagen per week." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  ["Home", "#home"], ["Over Ons", "#over"], ["Prijslijst", "#prijzen"], ["Galerij", "#galerij"], ["Veelgestelde Vragen", "#faq"], ["Contact", "#contact"],
];

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.77.12V9.77a5.7 5.7 0 1 0 4.91 5.64V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.28 4.28 0 0 1-3.24-1.48Z" />
    </svg>
  );
}

function Socials() {
  const c = "flex h-10 w-10 items-center justify-center rounded-full border border-primary/50 text-primary transition hover:bg-primary/10 hover:shadow-gold";
  return <div className="flex gap-3">
    <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram" className={c}><Instagram className="h-4 w-4" /></a>
    <a href={TIKTOK} target="_blank" rel="noreferrer" aria-label="TikTok" className={c}><TikTokIcon className="h-4 w-4" /></a>
    <a href={FACEBOOK} target="_blank" rel="noreferrer" aria-label="Facebook" className={c}><Facebook className="h-4 w-4" /></a>
  </div>;
}

function useOpen() {
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    const t = () => setOpen(isOpen());
    t();
    const id = setInterval(t, 60000);
    return () => clearInterval(id);
  }, []);
  return open;
}

function StatusBadge({ open }: { open: boolean | null }) {
  const [openingTime, setOpeningTime] = useState("09:00");
  useEffect(() => {
    const update = () => setOpeningTime(nextOpeningTime());
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, []);
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs font-medium">
      <span className={`relative flex h-2 w-2`}>
        {open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${open ? "bg-success" : "bg-muted-foreground"}`} />
      </span>
      {open === null ? "Status laden…" : open ? "Nu Geopend • Zonder Afspraak Welkom" : `Open vanaf ${openingTime}u`}
    </span>
  );
}

function Index() {
  useLuxuryReveals();
  const open = useOpen();
  const [mobileNav, setMobileNav] = useState(false);
  const [legal, setLegal] = useState<string | null>(null);
  const [cookieSignal, setCookieSignal] = useState(0);

  return (
    <div className="site-shell relative isolate min-h-screen overflow-x-hidden pb-20 md:pb-0">
      <AmbientBackground />
      {/* NAV */}
      <header className="glass fixed inset-x-0 top-0 z-40 border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <a href="#home" className="flex items-center gap-3">
            <img src={logo} alt="King Barbershop logo" className="h-11 w-11 rounded-full border border-primary/50 object-cover" />
            <span className="font-display text-sm font-bold tracking-widest text-gold sm:text-base">KING BARBERSHOP</span>
          </a>
          <nav className="hidden items-center gap-6 lg:flex">
            {NAV.map(([l, h]) => <a key={h} href={h} className="text-sm text-muted-foreground transition hover:text-primary">{l}</a>)}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden xl:block"><StatusBadge open={open} /></div>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram" className="hidden text-muted-foreground hover:text-primary sm:block"><Instagram className="h-5 w-5" /></a>
            <a href={TIKTOK} target="_blank" rel="noreferrer" aria-label="TikTok" className="hidden text-muted-foreground hover:text-primary sm:block"><TikTokIcon className="h-5 w-5" /></a>
            <a href={FACEBOOK} target="_blank" rel="noreferrer" aria-label="Facebook" className="hidden text-muted-foreground hover:text-primary sm:block"><Facebook className="h-5 w-5" /></a>
            <WalkInAction compact className="hidden px-4 py-2 sm:inline-flex" />
            <button onClick={() => setMobileNav(!mobileNav)} className="text-primary lg:hidden" aria-label="Menu"><Menu /></button>
          </div>
        </div>
        {mobileNav && (
          <nav className="flex flex-col gap-1 border-t border-border px-4 py-3 lg:hidden">
            <StatusBadge open={open} />
            {NAV.map(([l, h]) => <a key={h} href={h} onClick={() => setMobileNav(false)} className="py-2 text-sm text-foreground">{l}</a>)}
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative flex min-h-screen items-center pt-24">
        <img src={shop2} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        <div className="glow-blue absolute -right-40 top-20 h-[600px] w-[600px]" />
        <BarberToolsLayer />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <WalkInBadge />
            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Kom <span className="text-gold">Koninklijk</span> Goed Voor De Dag Bij King Barbershop Dessel
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Dé plek voor een frisse coupe, strakke fade of perfect bijgewerkte baard. Verwacht een relaxte sfeer, aandacht voor detail en een look waarmee je koninklijk goed voor de dag komt. Kom langs, neem plaats in de stoel en laat je verzorgen zoals het hoort.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <WalkInAction />
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{HOURS_SUMMARY}</p>
            <div className="mt-6"><Socials /></div>
          </div>
          <div className="hero-showcase relative mx-auto h-[420px] w-full max-w-md sm:h-[480px]">
            <div className="lux-frame absolute left-0 top-6 h-56 w-40 rotate-[-6deg] sm:h-64 sm:w-44"><img src={shop4} alt="Edison lamp boven Bandido wax" className="h-full w-full object-cover" /></div>
            <div className="lux-frame absolute bottom-0 right-0 h-56 w-40 rotate-[6deg] sm:h-64 sm:w-44"><img src={shop5} alt="Verlichte barberpaal" className="h-full w-full object-cover" /></div>
            <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 sm:h-72 sm:w-72">
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl" />
              <div className="royal-emblem relative h-full w-full">
                <div className="royal-halo" aria-hidden="true" />
                <img src={logo} alt="King Barbershop embleem" className="relative h-60 w-60 rounded-full border-2 border-primary/60 object-cover shadow-gold sm:h-72 sm:w-72" />
              </div>
            </div>
            <div className="hero-pole"><BarberPole /></div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 border-t border-border glass">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-4 text-xs text-muted-foreground sm:text-sm lg:grid-cols-4">
            <span>✂️ Altijd welkom (Vrije inloop)</span><span>🕘 7 Dagen Per Week Geopend</span>
            <span>💈 Premium Bandido Styling</span><span>📍 Turnhoutsebaan 21, Dessel</span>
          </div>
        </div>
      </section>

      {/* OVER ONS */}
      <section id="over" data-reveal className="relative mx-auto max-w-7xl px-4 py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="lux-frame row-span-2 h-[460px]"><img src={shop3} alt="Hexagon LED plafond" loading="lazy" className="h-full w-full object-cover" /></div>
            <div className="lux-frame h-[222px]"><img src={shop1} alt="Bandido wax piramide" loading="lazy" className="h-full w-full object-cover" /></div>
            <div className="lux-frame h-[222px]"><img src={shop4} alt="Edison lamp" loading="lazy" className="h-full w-full object-cover" /></div>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-primary">OVER ONS</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Waarom <span className="text-gold">King Barbershop</span></h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {[
                [MapPin, "Vrije inloop", "Geen afspraak nodig – Altijd welkom (Vrije inloop). Loop gerust binnen tijdens onze openingstijden."],
                [Scissors, "Meesterlijke Fades & Baarden", "Van een messcherpe skin fade tot een klassieke herensnit en strakke baardcontouren."],
                [Sparkles, "Topkwaliteit Producten", "Wij werken met premium verzorgings- en stylingproducten zoals Bandido voor een langdurig resultaat."],
                [Clock, "7 Dagen Per Week Open", `Ook op zondag geopend van ${SUNDAY_HOURS_TEXT} uur zodat je altijd fris het weekend of de nieuwe week ingaat.`],
              ].map(([Icon, t, d]) => {
                const I = Icon as typeof Crown;
                return (
                  <div key={t as string} className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary/60">
                    <I className="h-7 w-7 text-primary" />
                    <h3 className="mt-4 text-base font-semibold">{t as string}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d as string}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* PRIJSLIJST */}
      <section id="prijzen" data-reveal className="relative py-28">
        <BarberToolsLayer />
        <div className="glow-blue absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2" />
        <div className="relative mx-auto max-w-4xl px-4">
          <div className="text-center">
            <Crown className="mx-auto h-8 w-8 text-primary" />
            <div className="mt-3 flex items-center justify-center gap-5 sm:gap-8"><BarberPole small /><h2 className="text-3xl font-bold sm:text-5xl"><span className="text-gold">Prijslijst</span></h2></div>
          </div>
          <div className="mt-12 rounded-3xl border border-primary/40 bg-card/80 p-4 shadow-gold sm:p-10">
            {SERVICES.map((s) => (
              <div key={s.id} className="luxury-shimmer price-row flex flex-col gap-3 border-b border-border py-6 last:border-0 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-bold uppercase tracking-wider">{s.name}</h3>
                    {s.badge && <span className="rounded-full bg-gold px-3 py-1 text-[11px] font-bold text-primary-foreground">{s.badge}</span>}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                </div>
                <div className="flex shrink-0 items-center justify-between gap-4 sm:justify-end">
                  <span className="min-w-14 text-2xl font-semibold tabular-nums text-gold">€{s.price}</span>
                  <span className="text-xs font-medium text-primary">Vrije inloop</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col items-center gap-4 text-center"><WalkInBadge /><WalkInAction /></div>
        </div>
      </section>

      {/* GALERIJ */}
      <StyleShowcase />
      <section id="galerij" data-reveal className="relative">
        <BarberToolsLayer />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-28">
        <h2 className="text-center text-3xl font-bold sm:text-5xl"><span className="text-gold">Galerij</span></h2>
        <PhotoGallery />
        <div className="relative mt-12 overflow-hidden rounded-3xl border border-primary/40 bg-card p-10 text-center">
          <div className="glow-blue absolute -left-20 -top-20 h-80 w-80" />
          <h3 className="relative text-2xl font-bold sm:text-3xl">Volg <span className="text-gold">@king.barbershop.dessel</span></h3>
          <p className="relative mt-3 text-muted-foreground">Dagelijks nieuwe transformaties, fades en video's.</p>
          <div className="relative mt-6 flex flex-wrap justify-center gap-4">
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className={goldBtn}><Instagram className="h-4 w-4" />Instagram</a>
            <a href={TIKTOK} target="_blank" rel="noreferrer" className={goldBtn}><TikTokIcon className="h-4 w-4" />TikTok</a>
            <a href={FACEBOOK} target="_blank" rel="noreferrer" className={goldBtn}><Facebook className="h-4 w-4" />Facebook</a>
          </div>
        </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" data-reveal className="mx-auto max-w-3xl px-4 py-28">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">Veelgestelde <span className="text-gold">Vragen</span></h2>
        <Accordion type="single" collapsible className="mt-10">
          {[
            ["Kan ik gewoon binnenlopen?", "Geen afspraak nodig – Altijd welkom (Vrije inloop). Wij werken niet op afspraak. Kom gerust langs tijdens onze openingstijden."],
            ["Wat zijn jullie openingstijden?", `Wij zijn 7 dagen per week geopend! ${HOURS_SUMMARY}.`],
            ["Waar zijn jullie gevestigd in Dessel?", "Je vindt ons aan de Turnhoutsebaan 21, 2480 Dessel. Er is voldoende parkeergelegenheid in de directe omgeving."],
            ["Hoe kan ik betalen in de barbershop?", "Je kunt bij ons eenvoudig contant of digitaal betalen na afloop van je knipbeurt."],
          ].map(([q, a], i) => (
            <AccordionItem key={i} value={`q${i}`} className="border-border">
              <AccordionTrigger className="text-left font-semibold hover:text-primary">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CONTACT */}
      <section id="contact" data-reveal className="relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-28">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">Locatie & <span className="text-gold">Openingstijden</span></h2>
        <div className="relative isolate mt-12 grid gap-6 lg:grid-cols-3">
          <RadarLayer />
          <div className="space-y-6 rounded-2xl border border-border bg-card p-8">
            <div><p className="flex items-center gap-2 font-semibold text-primary"><MapPin className="h-4 w-4" />Adres</p><p className="mt-1 text-sm">Turnhoutsebaan 21, 2480 Dessel, België</p>
              <a href={MAPS_URL} target="_blank" rel="noreferrer" className={`${outlineBtn} mt-3 px-4 py-2 text-xs`}><Navigation className="h-3 w-3" />Plan Route via Google Maps</a></div>
            <div><p className="flex items-center gap-2 font-semibold text-primary"><Phone className="h-4 w-4" />Telefoon</p>
              <a href={`tel:+${PHONE_RAW}`} className="mt-1 block text-sm hover:text-primary">{PHONE}</a>
            </div>
            <div><p className="flex items-center gap-2 font-semibold text-primary"><Mail className="h-4 w-4" />E-mail</p><a href={`mailto:${EMAIL}`} className="mt-1 block break-all text-sm hover:text-primary">{EMAIL}</a></div>
            <div className="flex flex-wrap gap-x-4 gap-y-3">
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm hover:text-primary"><Instagram className="h-4 w-4" />Instagram</a>
              <a href={TIKTOK} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm hover:text-primary"><TikTokIcon className="h-4 w-4" />TikTok</a>
              <a href={FACEBOOK} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm hover:text-primary"><Facebook className="h-4 w-4" />Facebook</a>
            </div>
          </div>
          <div className="rounded-2xl border border-primary/60 bg-card p-8 shadow-gold">
            <div className="flex items-center justify-between"><h3 className="text-xl font-bold text-gold">Openingstijden</h3></div>
            <div className="mt-3"><StatusBadge open={open} /></div>
            <ul className="mt-6 space-y-3">
              {HOURS.map(([d, h]) => <li key={d} className="flex justify-between border-b border-border pb-2 text-sm"><span>{d}</span><span className="text-muted-foreground">{h}</span></li>)}
            </ul>
          </div>
          <div className="min-h-[360px] overflow-hidden rounded-2xl border border-border">
            <iframe title="Kaart King Barbershop" className="h-full min-h-[360px] w-full" loading="lazy"
              src="https://www.google.com/maps?q=Turnhoutsebaan+21,+2480+Dessel,+Belgium&output=embed" />
          </div>
        </div>
        <figure className="lux-frame relative mt-6 h-72 sm:h-96">
          <img src={outside2} alt="Voorgevel King Barbershop, Turnhoutsebaan 21" loading="lazy" className="hd-img h-full w-full object-cover object-[50%_70%]" />
          <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl border border-primary/60 bg-background/85 px-4 py-3 text-center text-sm font-semibold text-gold-light backdrop-blur sm:inset-x-auto sm:left-5 sm:bottom-5">🅿️ Gratis & Ruime Parkeergelegenheid Direct Voor De Deur (Turnhoutsebaan 21)</figcaption>
        </figure>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-card/50">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3">
          <div className="flex items-center gap-3"><img src={logo} alt="" className="h-16 w-16 rounded-full border border-primary/50" /><span className="font-display font-bold tracking-widest text-gold">KING BARBERSHOP</span></div>
          <nav className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">{NAV.map(([l, h]) => <a key={h} href={h} className="hover:text-primary">{l}</a>)}</nav>
          <div className="space-y-1 text-sm text-muted-foreground"><p>{ADDRESS}</p><p>{PHONE}</p><p className="break-all">{EMAIL}</p><div className="pt-3"><Socials /></div></div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-border px-4 py-5 text-xs text-muted-foreground">
          <button onClick={() => setLegal("privacy")} className="hover:text-primary">Privacybeleid (AVG / GDPR)</button>
          <button onClick={() => setLegal("cookies")} className="hover:text-primary">Cookiebeleid</button>
          <button onClick={() => setLegal("terms")} className="hover:text-primary">Algemene Voorwaarden</button>
          <button onClick={() => setCookieSignal((n) => n + 1)} className="hover:text-primary">Cookie-instellingen wijzigen</button>
        </div>
        <p className="border-t border-border py-6 text-center text-xs text-muted-foreground">© King Barbershop Dessel - Alle rechten voorbehouden</p>
      </footer>

      {/* MOBILE BAR */}
      <div className="glass fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border md:hidden">
        <a href={`tel:+${PHONE_RAW}`} className="py-4 text-center text-sm">📞 Bel Nu</a>
        <Button asChild variant="ghost" className="h-auto whitespace-normal rounded-none border-x border-border py-4 text-center text-xs"><a href="#contact"><Clock aria-hidden="true" />Openingstijden</a></Button>
        <a href={MAPS_URL} target="_blank" rel="noreferrer" className="py-4 text-center text-sm">📍 Route</a>
      </div>

      <CookieConsent openSignal={cookieSignal} />
      {legal && <LegalModal id={legal} onClose={() => setLegal(null)} />}
    </div>
  );
}
