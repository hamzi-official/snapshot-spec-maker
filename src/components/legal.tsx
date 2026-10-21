import { useEffect, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { makeConsent, readConsent, saveConsent } from "@/lib/consent";
import { ADDRESS, EMAIL, PHONE } from "@/lib/shop";

const gold = "luxury-shimmer inline-flex items-center justify-center rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-gold";
const outline = "inline-flex items-center justify-center rounded-full border border-primary/60 px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/10";
const ghost = "inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold text-muted-foreground underline-offset-4 hover:text-primary hover:underline";

export function CookieConsent({ openSignal }: { openSignal: number }) {
  const [visible, setVisible] = useState(false);
  const [prefs, setPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => { if (!readConsent()) setVisible(true); }, []);
  useEffect(() => {
    if (!openSignal) return;
    const c = readConsent();
    setAnalytics(c?.analytics ?? false); setMarketing(c?.marketing ?? false);
    setPrefs(true); setVisible(true);
  }, [openSignal]);

  if (!visible) return null;
  const done = (a: boolean, m: boolean) => { saveConsent(makeConsent(a, m)); setVisible(false); setPrefs(false); };

  return (
    <div role="dialog" aria-label="Cookievoorkeuren" className="fixed inset-x-0 bottom-16 z-[60] p-3 md:bottom-0 md:p-5">
      <div className="mx-auto max-w-3xl rounded-2xl border border-primary/50 bg-card/95 p-5 shadow-gold backdrop-blur-xl sm:p-6">
        <h3 className="font-display text-lg font-bold text-gold">🍪 Cookievoorkeuren & Privacy</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Wij gebruiken cookies om onze website goed te laten werken, het gebruik te analyseren en jouw ervaring bij King Barbershop Dessel te verbeteren. Kies hieronder jouw voorkeuren.</p>
        {prefs && (
          <div className="mt-4 space-y-3">
            {([
              ["Noodzakelijke cookies (Altijd actief)", true, undefined, true],
              ["Analytische & Prestatie cookies", analytics, setAnalytics, false],
              ["Marketing & Social Media cookies (Google Maps, Instagram, TikTok, Facebook)", marketing, setMarketing, false],
            ] as const).map(([label, val, set, locked]) => (
              <label key={label} className="flex items-center justify-between gap-4 rounded-xl border border-border px-4 py-3 text-sm">
                <span>{label}</span>
                <Switch checked={val} disabled={locked} onCheckedChange={(v) => set?.(v)} aria-label={label} />
              </label>
            ))}
          </div>
        )}
        <div className="mt-5 flex flex-wrap gap-2">
          <button className={gold} onClick={() => done(true, true)}>Alle cookies accepteren</button>
          <button className={outline} onClick={() => done(false, false)}>Alleen noodzakelijke</button>
          <button className={ghost} onClick={() => (prefs ? done(analytics, marketing) : setPrefs(true))}>{prefs ? "Voorkeuren opslaan" : "Voorkeuren instellen"}</button>
        </div>
      </div>
    </div>
  );
}

const S = ({ t, children }: { t: string; children: ReactNode }) => (
  <section className="mt-5"><h4 className="font-semibold text-primary">{t}</h4><div className="mt-1 space-y-2">{children}</div></section>
);
const contact = <p>King Barbershop, {ADDRESS}, België — E-mail: {EMAIL} — Tel: {PHONE}</p>;

export const LEGAL: Record<string, { title: string; body: ReactNode }> = {
  privacy: {
    title: "Privacybeleid (AVG / GDPR)",
    body: <>
      <S t="1. Verwerkingsverantwoordelijke">{contact}<p>King Barbershop is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in dit privacybeleid, in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG / GDPR) en de Belgische wet van 30 juli 2018.</p></S>
      <S t="2. Welke gegevens verwerken wij?"><p>Wanneer je via telefoon of e-mail contact opneemt, verwerken wij je naam, telefoonnummer, eventueel e-mailadres, informatie die je met ons deelt. Via onze website kunnen, met jouw toestemming, technische en analytische gegevens worden verzameld.</p></S>
      <S t="3. Doeleinden en rechtsgronden"><p>Wij verwerken gegevens voor het uitvoeren van behandelingen (uitvoering van een overeenkomst), het beantwoorden van vragen (gerechtvaardigd belang), het naleven van wettelijke verplichtingen zoals boekhouding (wettelijke verplichting) en analyse- of marketingdoeleinden uitsluitend op basis van jouw toestemming.</p></S>
      <S t="4. Bewaartermijn"><p>Contactgegevens bewaren wij niet langer dan noodzakelijk en uiterlijk 24 maanden na je laatste bezoek, tenzij een langere wettelijke bewaartermijn geldt (bv. 7 jaar voor boekhoudkundige stukken).</p></S>
      <S t="5. Delen met derden"><p>Wij verkopen je gegevens nooit. Gegevens worden enkel gedeeld met verwerkers die nodig zijn voor onze dienstverlening (zoals Google Maps, hostingproviders). Bij doorgifte buiten de EER gebeurt dit op basis van passende waarborgen zoals de standaardcontractbepalingen van de Europese Commissie.</p></S>
      <S t="6. Jouw rechten"><p>Je hebt het recht op inzage, verbetering, verwijdering, beperking van de verwerking, overdraagbaarheid en bezwaar, en het recht om je toestemming op elk moment in te trekken. Stuur je verzoek naar {EMAIL}; wij antwoorden binnen één maand.</p></S>
      <S t="7. Klachten"><p>Ben je niet tevreden over hoe wij met je gegevens omgaan, dan kan je een klacht indienen bij de Gegevensbeschermingsautoriteit (GBA), Drukpersstraat 35, 1000 Brussel, www.gegevensbeschermingsautoriteit.be.</p></S>
      <S t="8. Beveiliging en wijzigingen"><p>Wij nemen passende technische en organisatorische maatregelen om je gegevens te beschermen. Dit beleid kan worden aangepast; de meest recente versie staat steeds op deze website.</p></S>
    </>,
  },
  cookies: {
    title: "Cookiebeleid",
    body: <>
      <S t="1. Wat zijn cookies?"><p>Cookies zijn kleine tekstbestanden die op je toestel worden opgeslagen wanneer je een website bezoekt. Wij gebruiken daarnaast lokale opslag (localStorage) om je cookievoorkeuren te onthouden.</p></S>
      <S t="2. Noodzakelijke cookies"><p>Deze zijn nodig voor de goede werking van de website, zoals het onthouden van je cookiekeuze. Hiervoor is geen toestemming vereist en ze kunnen niet worden uitgeschakeld.</p></S>
      <S t="3. Analytische & prestatie cookies"><p>Met jouw toestemming meten wij geanonimiseerd hoe bezoekers onze website gebruiken, zodat wij de website kunnen verbeteren.</p></S>
      <S t="4. Marketing & social media cookies"><p>Ingesloten inhoud en links van Google Maps, Instagram, TikTok en Facebook kunnen cookies plaatsen van deze derde partijen. Hun eigen privacy- en cookiebeleid is van toepassing.</p></S>
      <S t="5. Toestemming beheren"><p>Je kan je voorkeuren op elk moment wijzigen via “Cookie-instellingen wijzigen” onderaan de website, of cookies verwijderen via de instellingen van je browser. Je keuze wordt maximaal 12 maanden bewaard.</p></S>
      <S t="6. Contact">{contact}</S>
    </>,
  },
  terms: {
    title: "Algemene Voorwaarden",
    body: <>
      <S t="1. Identiteit">{contact}</S>
      <S t="2. Toepassing"><p>Deze voorwaarden zijn van toepassing op alle diensten van King Barbershop. Door gebruik te maken van onze diensten, aanvaard je deze voorwaarden.</p></S>
      <S t="3. Vrije inloop"><p>Geen afspraak nodig – Altijd welkom (Vrije inloop). Wij werken niet op afspraak. Klanten worden geholpen afhankelijk van de beschikbaarheid tijdens onze openingstijden.</p></S>
      <S t="4. Beschikbaarheid"><p>Bij drukte kan er een wachttijd zijn.</p></S>
      <S t="5. Tarieven en betaling"><p>De geldende tarieven worden in de zaak meegedeeld. Betaling gebeurt na de behandeling, contant of digitaal.</p></S>
      <S t="6. Kinderen"><p>Minderjarigen jonger dan 12 jaar worden bij voorkeur begeleid door een ouder of voogd.</p></S>
      <S t="7. Klachten en aansprakelijkheid"><p>Ben je niet tevreden, meld dit dan bij voorkeur ter plaatse of binnen 48 uur, zodat wij een passende oplossing kunnen zoeken. King Barbershop is niet aansprakelijk voor schade door het niet melden van allergieën, huidaandoeningen of andere relevante informatie.</p></S>
      <S t="8. Toepasselijk recht"><p>Op deze voorwaarden is het Belgisch recht van toepassing. Geschillen behoren tot de bevoegdheid van de rechtbanken van het gerechtelijk arrondissement Antwerpen, afdeling Turnhout.</p></S>
    </>,
  },
};

export function LegalModal({ id, onClose }: { id: string; onClose: () => void }) {
  const doc = LEGAL[id];
  if (!doc) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-background/85 p-3 backdrop-blur-sm" onClick={onClose}>
      <div role="dialog" aria-label={doc.title} className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-primary/50 bg-card p-6 text-sm leading-relaxed text-muted-foreground shadow-gold sm:p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold text-gold">{doc.title}</h3>
          <button onClick={onClose} aria-label="Sluiten" className="hover:text-primary"><X /></button>
        </div>
        <p className="mt-2 text-xs">Laatst bijgewerkt: oktober 2026</p>
        {doc.body}
      </div>
    </div>
  );
}
