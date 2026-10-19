export type Consent = { necessary: true; analytics: boolean; marketing: boolean; savedAt: string };
export const CONSENT_KEY = "kb-cookie-consent-v1";

export function makeConsent(analytics: boolean, marketing: boolean, now = new Date()): Consent {
  return { necessary: true, analytics, marketing, savedAt: now.toISOString() };
}
export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const c = JSON.parse(raw);
    return typeof c?.analytics === "boolean" && typeof c?.marketing === "boolean" ? { ...c, necessary: true } : null;
  } catch { return null; }
}
export function saveConsent(c: Consent) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(c));
  window.dispatchEvent(new CustomEvent("kb-consent", { detail: c }));
}
