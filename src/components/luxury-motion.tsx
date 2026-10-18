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