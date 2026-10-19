import { useEffect } from "react";

export function BarberPole({ small = false }: { small?: boolean }) {
  return <div aria-hidden="true" className={`barber-pole ${small ? "barber-pole-small" : ""}`}>
    <div className="pole-finial" /><div className="pole-cap" />
    <div className="pole-glass"><div className="pole-stripes" /><div className="pole-reflection" /></div>
    <div className="pole-cap pole-base" /><div className="pole-foot" />
  </div>;
}

export function AmbientBackground() {
  return <div className="ambient-background" aria-hidden="true">
    <div className="ambient-wash" />
    <svg className="ambient-grid" width="100%" height="100%">
      <defs><pattern id="royal-hexagons" width="104" height="180" patternUnits="userSpaceOnUse"><path d="M52 0 104 30 104 90 52 120 0 90 0 30Z M52 120 52 180 M0 90 0 150 52 180 104 150 104 90" fill="none" stroke="currentColor" strokeWidth="0.8" /></pattern></defs>
      <rect width="100%" height="100%" fill="url(#royal-hexagons)" />
    </svg>
    <div className="gold-dust">{Array.from({ length: 24 }, (_, i) => <i key={i} />)}</div>
  </div>;
}

const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
function Scissors() {
  return <svg viewBox="0 0 64 64" className="tool-svg"><g className="blade-a"><path {...P} d="M32 32 60 12" /><circle {...P} cx="14" cy="46" r="7" /><path {...P} d="M19 41 32 32" /></g><g className="blade-b"><path {...P} d="M32 32 60 52" /><circle {...P} cx="14" cy="18" r="7" /><path {...P} d="M19 23 32 32" /></g></svg>;
}
const Comb = () => <svg viewBox="0 0 64 64" className="tool-svg"><path {...P} d="M6 22h52v8H6z" />{Array.from({ length: 12 }, (_, i) => <path key={i} {...P} d={`M${9 + i * 4.3} 30v${i % 2 ? 18 : 24}`} />)}</svg>;
const Clipper = () => <svg viewBox="0 0 64 64" className="tool-svg"><path {...P} d="M22 14h20l4 40a6 6 0 0 1-6 6H24a6 6 0 0 1-6-6z" /><path {...P} d="M20 8h24v6H20zM24 6v2M28 6v2M32 6v2M36 6v2M40 6v2M28 40h8" /></svg>;
const Razor = () => <svg viewBox="0 0 64 64" className="tool-svg"><path {...P} d="M8 36 40 22l6 6-30 16z" /><path {...P} d="M42 26 58 48a3 3 0 0 1-4 4L40 30" /></svg>;
const Jar = () => <svg viewBox="0 0 64 64" className="tool-svg"><path {...P} d="M12 20h40v6H12zM14 26h36v24a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4z" /><path {...P} d="M22 38h20" /></svg>;
const MiniPole = () => <svg viewBox="0 0 64 64" className="tool-svg"><path {...P} d="M24 8h16v6H24zM24 50h16v6H24zM26 14h12v36H26z" /><path {...P} d="M26 22l12-6M26 32l12-8M26 42l12-8M26 50l12-6" /></svg>;

const TOOLS = [Scissors, Comb, Clipper, Razor, Jar, MiniPole, Scissors, Comb, Clipper, Razor, Jar, MiniPole, Scissors, Clipper];
/** Floating gold barber-tool silhouettes behind a section. */
export function BarberToolsLayer() {
  return <div className="tools-layer" aria-hidden="true">{TOOLS.map((T, i) => <span key={i} className="tool-float"><T /></span>)}</div>;
}

/** GPS radar pulse + floating gold pin behind the location section. */
export function RadarLayer() {
  return <div className="radar-layer" aria-hidden="true"><span /><span /><span /><svg viewBox="0 0 48 64" className="radar-pin"><defs><linearGradient id="pinGold" x1="0" x2="1"><stop offset="0" stopColor="var(--primary)" /><stop offset=".5" stopColor="var(--gold-light)" /><stop offset="1" stopColor="var(--primary)" /></linearGradient></defs><path d="M24 2C12 2 3 11 3 23c0 16 21 39 21 39s21-23 21-39C45 11 36 2 24 2Z" fill="url(#pinGold)" /><circle cx="24" cy="23" r="8" fill="var(--background)" /></svg></div>;
}

export function useLuxuryReveals() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -35px 0px" });
    document.querySelectorAll("[data-reveal]").forEach((element) => {
      if (element.getBoundingClientRect().top > window.innerHeight) element.classList.add("reveal-ready");
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
}