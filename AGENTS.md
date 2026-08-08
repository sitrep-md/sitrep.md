# AGENTS.md

Guidance for agent sessions in `sitrep-www`, the marketing site for sitrep
(https://sitrep.md). `CLAUDE.md` is a symlink to this file.

## What this is

The public landing site for **sitrep - an AI project status dashboard**.
Astro (static output) + Tailwind v4, built with Bun, served as Cloudflare
Workers static assets. This repo is the site only; the product lives
elsewhere (currently a private repo, moving to a sibling
dir here).

Pages: `/` (landing), `/how-it-works/`, `/principles/`, `/faq/` (carries
FAQPage JSON-LD), plus `public/llms.txt`, an AI-crawler-welcoming
`public/robots.txt`, and an IndexNow key file. Every page emits a JSON-LD
@graph through `BaseLayout` (`WebSite` always; pass extra nodes via the
`schema` prop). The pricing points are an OPEN ruling in the
product strategy - they appear nowhere on the site and must not until the
ruling closes.

## Product identity - the copy contract

The source of truth for positioning is the product repo's strategy layer:
`docs/strategy.md`, `docs/roadmap.md` (the calendar-bound GEO track),
`docs/design-rules.md` and `docs/ground-rules.md` in the sitrep product repo.
Read them before writing any page copy. The parts that bind this site:

- Category phrase: **"AI project status dashboard"**. Use it verbatim and
  consistently - category discipline is a ground rule, not a style choice.
- Tagline: **"Never open a cold project again."**
- Positioning: a **state layer** on top of the markdown AI agents already
  generate - not a viewer, not an editor, not agent orchestration.
- Core promises that marketing must never contradict: zero adoption cost
  (no frontmatter, no new format), local-first, privacy (no telemetry by
  default), one writing surface in the product.
- The anti-roadmap is binding: never promise editor features, agent
  orchestration, mobile control, or an account-required core.

## Design

Same contract as the product app:

- **One palette, two themes, flipped under `[data-theme]`.** Tokens live in
  `src/styles/global.css`; components name roles (`bg-surface`,
  `text-ink-muted`), never colours. **Zero `dark:` variants for colours** -
  the `dark` custom variant exists for structural swaps (e.g. the theme
  toggle label), not for per-component colour overrides.
- Contrast floors: 4.5:1 for text, 3:1 for meaning-bearing UI, in both
  themes. A palette change is not done until both themes were checked.
- Theme is resolved before first paint by the inline script in
  `src/layouts/BaseLayout.astro` (stored choice wins, OS preference
  otherwise). Don't move that logic into a framework component; it must run
  before paint or the page flashes.

## Reference implementation

The local reference project is the SEO/GEO/AI-optimized Astro site this
scaffold deliberately did not copy machinery from yet. When a page needs the
real thing, port the pattern from there instead of inventing one:

- `src/layouts/BaseLayout.astro` - one JSON-LD `@graph` per page
  (Organization always, plus route-provided schema).
- `src/lib/social-image.ts` - centralized OG/Twitter image resolution.
- `src/lib/schema-html.ts` - HTML reduced to the tag subset Google accepts
  in structured data.
- `scripts/linkcheck.mjs` - post-build internal link + hreflang validation.
- `scripts/gen-og-card.mjs` / `gen-icons.mjs` - hand-run, committed OG cards
  and favicons.
- `redirects.mjs` + the emitRedirects hook - centralized 301 table written
  to `dist/_redirects`.
- The deploy workflow's Astro image-cache key, when this site gains real
  images.

## Commands

- `astro dev --background` - dev server in background mode; manage with
  `astro dev stop / status / logs`.
- `bun run build` - static build to `dist/`. The pre-commit check; there is
  no test runner here yet.
- `bunx wrangler deploy --env ""` / `bunx wrangler deploy --env dev` -
  manual deploy (CI normally does this). Needs `CLOUDFLARE_API_TOKEN` and
  `CLOUDFLARE_ACCOUNT_ID` in the environment.
- `bun run indexnow` - submit the live sitemap's URLs to IndexNow
  (Bing/Copilot/ChatGPT ride Bing's index). Run after every content ship to
  live; the GEO playbook's cadence is at least one pushed content ship per
  week.

## Deploy topology (don't rediscover this)

- Two workers, two branches: push to `dev` deploys `sitrep-www-dev` at
  **https://dev.sitrep.md**; push to `main` deploys `sitrep-www` at
  **https://sitrep.md**. Workflows in `.github/workflows/`.
- `dev` is the working branch; `main` is promotion to live.
- The account has **no workers.dev subdomain**; both targets are custom
  domains on the sitrep.md zone.
- **Custom domains are attached out-of-band**, once, via the account-level
  `workers/domains` API - not declared in `wrangler.jsonc`. The CI token has
  no zone-level Workers Routes permission, so a `routes` entry would fail
  every deploy. Don't add one.
- The dev workflow overwrites `dist/robots.txt` with `Disallow: /` before
  deploying so dev.sitrep.md stays out of search indexes. Live robots.txt
  comes from `public/robots.txt`.

## Git

Commit directly on the current branch (normally `dev`). No feature branches
or PRs unless asked. Repo: `sitrep-md/sitrep-www` on GitHub; the default SSH
key authenticates as the right account. Run `bun run build`
before committing.

## Astro documentation

Full documentation: https://docs.astro.build. Consult before related work:

- [Routing](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Styling / Tailwind](https://docs.astro.build/en/guides/styling/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Internationalization](https://docs.astro.build/en/guides/internationalization/)
