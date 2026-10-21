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
- Shop data (prices, hours, contact) and open-status logic live in src/lib/shop.ts, tested in src/test/shop.test.ts — single source of truth for the page.
- Style records map to shop service IDs; prices render only in main price-list rows.
- Hours copy across hero and FAQ derives from shop data; closed badges use the next opening time in Brussels to avoid Sunday drift.
- Decorative motion is isolated in luxury-motion with CSS animations and reduced-motion fallbacks to keep content accessible without animation.
- Gallery lightboxes render into document.body so animated section transforms cannot trap fullscreen controls behind the navigation.

- Walk-in badges and location/hours actions are shared in src/components/walk-in.tsx; all visit actions use the contact anchor and CSS smooth scrolling with reduced-motion support.
