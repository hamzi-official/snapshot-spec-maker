<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Shop data (prices, hours, contact) and open-status/WhatsApp logic live in src/lib/shop.ts, tested in src/test/shop.test.ts — single source of truth for the page.
- Style records map to shop service IDs for price-free WhatsApp messages; prices render only in main price-list rows and booking-modal treatment choices.
- Hours copy across hero, FAQ and walk-in modal derives from shop data; closed badges use the next opening time in Brussels to avoid Sunday drift.
- Decorative motion is isolated in luxury-motion with CSS animations and reduced-motion fallbacks to keep content accessible without animation.
