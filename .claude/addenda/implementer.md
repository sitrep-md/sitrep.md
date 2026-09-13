# implementer addendum (sitrep-www)

- Colours are roles, never values: use the token classes from `src/styles/global.css` (`bg-surface`, `text-ink-muted`, ...). Never write a `dark:` colour variant; the palette flips under `[data-theme]`.
- Copy follows the contract in CLAUDE.md: the category phrase, tagline and anti-roadmap are not yours to rephrase.
- Default verification when the task gives none: `bun run build`.
- Never deploy. CI deploys on push; a manual `wrangler deploy` is not part of an implementation task.
