import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Crown, Scissors, Sparkles, CalendarDays, MapPin, Phone, Mail, Clock, MessageCircle, X, Instagram, Navigation, Menu, Facebook,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BarberPole, AmbientBackground, BarberToolsLayer, RadarLayer, useLuxuryReveals } from "@/components/luxury-motion";
import { PhotoGallery } from "@/components/photo-gallery";
import { CookieConsent, LegalModal } from "@/components/legal";
import outside2 from "@/assets/outside2.jpeg.asset.json";
import { StyleShowcase } from "@/components/style-showcase";
import logo from "@/assets/logo.jpeg.asset.json";
import shop1 from "@/assets/shop1.jpeg.asset.json";
import shop2 from "@/assets/shop2.jpeg.asset.json";
import shop3 from "@/assets/shop3.jpeg.asset.json";
import shop4 from "@/assets/shop4.jpeg.asset.json";
import shop5 from "@/assets/shop5.jpeg.asset.json";
import {
  ADDRESS, EMAIL, HOURS, FACEBOOK, INSTAGRAM, MAPS_URL, PHONE, PHONE_RAW, SERVICES, TIKTOK, buildWhatsAppUrl, isOpen,
} from "@/lib/shop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "King Barbershop Dessel | Zonder afspraak welkom" },
      { name: "description", content: "Luxe barbershop in Dessel. Fades, baarden en klassieke snitten. Zonder afspraak welkom of reserveer via WhatsApp. 7 dagen open." },
      { property: "og:title", content: "King Barbershop Dessel" },
      { property: "og:description", content: "Kom koninklijk goed voor de dag. Vrije inloop & afspraak via WhatsApp, 7 dagen per week." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  ["Home", "#home"], ["Over Ons", "#over"], ["Behandelingen", "#prijzen"], ["Galerij", "#galerij"], ["Veelgestelde Vragen", "#faq"], ["Contact", "#contact"],
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
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs font-medium">
      <span className={`relative flex h-2 w-2`}>
        {open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${open ? "bg-success" : "bg-muted-foreground"}`} />
      </span>
      {open === null ? "Status laden…" : open ? "Nu Geopend • Zonder Afspraak Welkom" : "Open vanaf 09:00u"}
    </span>
  );
}

const goldBtn = "luxury-shimmer inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground shadow-gold transition hover:brightness-110 hover:-translate-y-0.5";
const outlineBtn = "inline-flex items-center justify-center gap-2 rounded-full border border-primary/60 px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10";

function Index() {
  useLuxuryReveals();
  const open = useOpen();
  const [modal, setModal] = useState<null | "choose" | "walkin" | "book">(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [mobileNav, setMobileNav] = useState(false);
  const [legal, setLegal] = useState<string | null>(null);
  const [cookieSignal, setCookieSignal] = useState(0);

  const openBooking = (serviceId?: string) => {
    if (serviceId) { setSelected([serviceId]); setModal("book"); } else setModal("choose");
  };

  return (
    <div className="site-shell relative isolate min-h-screen overflow-x-hidden pb-20 md:pb-0">
      <AmbientBackground />
      {/* NAV */}
      <header className="glass fixed inset-x-0 top-0 z-40 border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <a href="#home" className="flex items-center gap-3">
            <img src={logo.url} alt="King Barbershop logo" className="h-11 w-11 rounded-full border border-primary/50 object-cover" />
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
            <button onClick={() => openBooking()} className={`${goldBtn} hidden px-4 py-2 sm:inline-flex`}>Kom Langs / Afspraak</button>
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
        <img src={shop2.url} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        <div className="glow-blue absolute -right-40 top-20 h-[600px] w-[600px]" />
        <BarberToolsLayer />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="inline-block rounded-full border border-primary/50 bg-primary/10 px-4 py-2 text-[11px] font-semibold tracking-widest text-primary sm:text-xs">
              👑 ZONDER AFSPRAAK WELKOM & OP AFSPRAAK • 7 DAGEN OPEN
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Kom <span className="text-gold">Koninklijk</span> Goed Voor De Dag Bij King Barbershop Dessel
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Dé plek voor een frisse coupe, strakke fade of perfect bijgewerkte baard. Verwacht een relaxte sfeer, aandacht voor detail en een look waarmee je koninklijk goed voor de dag komt. Kom langs, neem plaats in de stoel en laat je verzorgen zoals het hoort.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button onClick={() => setModal("book")} className={goldBtn}><MessageCircle className="h-4 w-4" />Afspraak via WhatsApp</button>
              <a href="#contact" className={outlineBtn}><MapPin className="h-4 w-4" />Kom Zonder Afspraak Langs</a>
            </div>
            <div className="mt-6"><Socials /></div>
          </div>
          <div className="hero-showcase relative mx-auto h-[420px] w-full max-w-md sm:h-[480px]">
            <div className="lux-frame absolute left-0 top-6 h-56 w-40 rotate-[-6deg] sm:h-64 sm:w-44"><img src={shop4.url} alt="Edison lamp boven Bandido wax" className="h-full w-full object-cover" /></div>
            <div className="lux-frame absolute bottom-0 right-0 h-56 w-40 rotate-[6deg] sm:h-64 sm:w-44"><img src={shop5.url} alt="Verlichte barberpaal" className="h-full w-full object-cover" /></div>
            <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 sm:h-72 sm:w-72">
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl" />
              <div className="royal-emblem relative h-full w-full">
                <div className="royal-halo" aria-hidden="true" />
                <img src={logo.url} alt="King Barbershop embleem" className="relative h-60 w-60 rounded-full border-2 border-primary/60 object-cover shadow-gold sm:h-72 sm:w-72" />
              </div>
            </div>
            <div className="hero-pole"><BarberPole /></div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 border-t border-border glass">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-4 text-xs text-muted-foreground sm:text-sm lg:grid-cols-4">
            <span>✂️ Zonder Afspraak & Op Afspraak</span><span>🕘 7 Dagen Per Week Geopend</span>
            <span>💈 Premium Bandido Styling</span><span>📍 Turnhoutsebaan 21, Dessel</span>
          </div>
        </div>
      </section>

      {/* OVER ONS */}
      <section id="over" data-reveal className="relative mx-auto max-w-7xl px-4 py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="lux-frame row-span-2 h-[460px]"><img src={shop3.url} alt="Hexagon LED plafond" loading="lazy" className="h-full w-full object-cover" /></div>
            <div className="lux-frame h-[222px]"><img src={shop1.url} alt="Bandido wax piramide" loading="lazy" className="h-full w-full object-cover" /></div>
            <div className="lux-frame h-[222px]"><img src={shop4.url} alt="Edison lamp" loading="lazy" className="h-full w-full object-cover" /></div>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-primary">OVER ONS</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Waarom <span className="text-gold">King Barbershop</span></h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {[
                [CalendarDays, "Vrije Inloop & Op Afspraak", "Geen tijd om vooraf te reserveren? Geen probleem! Bij ons ben je elke dag welkom zonder afspraak, of reserveer eenvoudig je plek via WhatsApp."],
                [Scissors, "Meesterlijke Fades & Baarden", "Van een messcherpe skin fade tot een klassieke herensnit en strakke baardcontouren."],
                [Sparkles, "Topkwaliteit Producten", "Wij werken met premium verzorgings- en stylingproducten zoals Bandido voor een langdurig resultaat."],
                [Clock, "7 Dagen Per Week Open", "Ook op zondag geopend van 09:00 tot 15:00 uur zodat je altijd fris het weekend of de nieuwe week ingaat."],
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

      {/* BEHANDELINGEN */}
      <section id="prijzen" data-reveal className="relative py-28">
        <div className="glow-blue absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2" />
        <div className="relative mx-auto max-w-4xl px-4">
          <div className="text-center">
            <Crown className="mx-auto h-8 w-8 text-primary" />
            <div className="mt-3 flex items-center justify-center gap-5 sm:gap-8"><BarberPole small /><h2 className="text-3xl font-bold sm:text-5xl"><span className="text-gold">Onze Behandelingen</span></h2></div>
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
                <div className="flex items-center gap-4">
                  <button onClick={() => openBooking(s.id)} className={`${outlineBtn} px-4 py-2 text-xs`}>Kies behandeling</button>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">✨ Loop gerust binnen zonder afspraak of klik op een behandeling om direct via WhatsApp te reserveren.</p>
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
            ["Moet ik een afspraak maken of kan ik zonder afspraak langskomen?", "Beide is mogelijk! Je bent bij King Barbershop altijd van harte welkom zonder afspraak (vrije inloop). Wil je liever zeker zijn van een specifiek tijdstip? Stuur ons dan snel een berichtje via WhatsApp of bel naar +32 465 46 79 34."],
            ["Wat zijn jullie openingstijden?", "Wij zijn 7 dagen per week geopend! Van maandag t/m zaterdag van 09:00 tot 19:00 uur, en op zondag van 09:00 tot 15:00 uur."],
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
        <RadarLayer />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-28">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">Locatie & <span className="text-gold">Openingstijden</span></h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 rounded-2xl border border-border bg-card p-8">
            <div><p className="flex items-center gap-2 font-semibold text-primary"><MapPin className="h-4 w-4" />Adres</p><p className="mt-1 text-sm">Turnhoutsebaan 21, 2480 Dessel, België</p>
              <a href={MAPS_URL} target="_blank" rel="noreferrer" className={`${outlineBtn} mt-3 px-4 py-2 text-xs`}><Navigation className="h-3 w-3" />Plan Route via Google Maps</a></div>
            <div><p className="flex items-center gap-2 font-semibold text-primary"><Phone className="h-4 w-4" />Telefoon & WhatsApp</p>
              <a href={`tel:+${PHONE_RAW}`} className="mt-1 block text-sm hover:text-primary">{PHONE}</a>
              <a href={`https://wa.me/${PHONE_RAW}`} target="_blank" rel="noreferrer" className="text-sm text-whatsapp hover:underline">Stuur een WhatsApp</a></div>
            <div><p className="flex items-center gap-2 font-semibold text-primary"><Mail className="h-4 w-4" />E-mail</p><a href={`mailto:${EMAIL}`} className="mt-1 block break-all text-sm hover:text-primary">{EMAIL}</a></div>
            <div className="flex gap-4">
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
          <img src={outside2.url} alt="Voorgevel King Barbershop, Turnhoutsebaan 21" loading="lazy" className="hd-img h-full w-full object-cover object-[50%_70%]" />
          <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl border border-primary/60 bg-background/85 px-4 py-3 text-center text-sm font-semibold text-gold-light backdrop-blur sm:inset-x-auto sm:left-5 sm:bottom-5">🅿️ Gratis & Ruime Parkeergelegenheid Direct Voor De Deur (Turnhoutsebaan 21)</figcaption>
        </figure>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-card/50">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3">
          <div className="flex items-center gap-3"><img src={logo.url} alt="" className="h-16 w-16 rounded-full border border-primary/50" /><span className="font-display font-bold tracking-widest text-gold">KING BARBERSHOP</span></div>
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

      {/* FLOATING WHATSAPP */}
      <button onClick={() => setModal("book")} aria-label="WhatsApp" className="animate-pulse-ring fixed bottom-24 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-primary-foreground md:bottom-6">
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* MOBILE BAR */}
      <div className="glass fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border md:hidden">
        <a href={`tel:+${PHONE_RAW}`} className="py-4 text-center text-sm">📞 Bel Nu</a>
        <a href={`https://wa.me/${PHONE_RAW}`} target="_blank" rel="noreferrer" className="border-x border-border py-4 text-center text-sm">💬 WhatsApp</a>
        <a href={MAPS_URL} target="_blank" rel="noreferrer" className="py-4 text-center text-sm">📍 Route</a>
      </div>

      <CookieConsent openSignal={cookieSignal} />
      {legal && <LegalModal id={legal} onClose={() => setLegal(null)} />}
      {modal && <BookingModal mode={modal} setMode={setModal} open={open} selected={selected} setSelected={setSelected} />}
    </div>
  );
}

function BookingModal({ mode, setMode, open, selected, setSelected }: {
  mode: "choose" | "walkin" | "book"; setMode: (m: null | "choose" | "walkin" | "book") => void; open: boolean | null;
  selected: string[]; setSelected: (s: string[]) => void;
}) {
  const [name, setName] = useState("");
  const [when, setWhen] = useState("");
  const toggle = (id: string) => setSelected(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
  const input = "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 p-0 backdrop-blur-sm sm:items-center sm:p-4" onClick={() => setMode(null)}>
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-primary/50 bg-card p-6 shadow-gold sm:rounded-3xl sm:p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gold">Afspraak & Inloop</h3>
          <button onClick={() => setMode(null)} aria-label="Sluiten" className="text-muted-foreground hover:text-primary"><X /></button>
        </div>
        {mode === "choose" && (
          <div className="mt-6 grid gap-4">
            <button onClick={() => setMode("walkin")} className="rounded-2xl border border-border p-5 text-left transition hover:border-primary">
              <MapPin className="h-6 w-6 text-primary" /><p className="mt-2 font-semibold">Direct Langskomen (Zonder Afspraak)</p><p className="text-sm text-muted-foreground">Bekijk of we nu open zijn en plan je route.</p>
            </button>
            <button onClick={() => setMode("book")} className="rounded-2xl border border-border p-5 text-left transition hover:border-primary">
              <MessageCircle className="h-6 w-6 text-whatsapp" /><p className="mt-2 font-semibold">Tijdstip Reserveren via WhatsApp</p><p className="text-sm text-muted-foreground">Kies je behandeling en gewenst moment.</p>
            </button>
          </div>
        )}
        {mode === "walkin" && (
          <div className="mt-6 space-y-5">
            <StatusBadge open={open} />
            <p className="text-sm">📍 {ADDRESS}</p>
            <ul className="space-y-1 text-sm text-muted-foreground"><li>Ma – Za: 09:00 – 19:00</li><li>Zondag: 09:00 – 15:00</li></ul>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" className={`${goldBtn} w-full`}><Navigation className="h-4 w-4" />Route via Google Maps</a>
            <button onClick={() => setMode("choose")} className="w-full text-sm text-muted-foreground hover:text-primary">← Terug</button>
          </div>
        )}
        {mode === "book" && (
          <div className="mt-6 space-y-4">
            <p className="text-sm font-semibold">Kies je behandeling(en)</p>
            <div className="grid gap-2">
              {SERVICES.map((s) => (
                <button key={s.id} onClick={() => toggle(s.id)} className={`flex justify-between rounded-xl border px-4 py-3 text-sm transition ${selected.includes(s.id) ? "border-primary bg-primary/10" : "border-border"}`}>
                  <span>{s.name}</span>{selected.includes(s.id) && <span className="font-semibold text-primary">✓</span>}
                </button>
              ))}
            </div>
            <input className={input} placeholder="Je naam" value={name} onChange={(e) => setName(e.target.value)} />
            <input className={input} placeholder="Gewenste dag & tijd (bv. zaterdag 11u)" value={when} onChange={(e) => setWhen(e.target.value)} />
            <a href={buildWhatsAppUrl(selected, name, when)} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110">
              <MessageCircle className="h-4 w-4" />Verstuur via WhatsApp
            </a>
            <button onClick={() => setMode("choose")} className="w-full text-sm text-muted-foreground hover:text-primary">← Terug</button>
          </div>
        )}
      </div>
    </div>
  );
}
