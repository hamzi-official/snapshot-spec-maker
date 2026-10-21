import { MapPin, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WalkInBadge({ className = "" }: { className?: string }) {
  return <span className={`inline-flex max-w-full items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-semibold leading-relaxed text-primary ${className}`}>
    <Scissors className="h-4 w-4 shrink-0" aria-hidden="true" />
    <span>Geen afspraak nodig – Altijd welkom (Vrije inloop)</span>
  </span>;
}

export function WalkInAction({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  return <Button asChild className={`luxury-shimmer h-auto whitespace-normal rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground shadow-gold transition hover:brightness-110 ${className}`}>
    <a href="#contact"><MapPin aria-hidden="true" />{compact ? "Kom langs" : "Locatie & openingstijden"}</a>
  </Button>;
}