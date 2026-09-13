# AGENTS.md

Guidance for agent sessions in this repo - the public home of sitrep
(https://sitrep.md): the site source, the corrections ledger, and, from the
macOS launch, the app's releases and issue tracker. `CLAUDE.md` is a
symlink to this file.

## What this is

The public landing site for **sitrep - an AI project status dashboard**.
Astro (static output) + Tailwind v4, built with Bun, served as Cloudflare
Workers static assets. This repo is the site and the public record; the
app's source lives in a private repo.

Pages: `/` (landing), `/how-it-works/`, `/principles/`, `/security/`,
`/about/`, `/faq/` (carries FAQPage JSON-LD), the `/vs/` comparison pages,
plus `public/llms.txt`, an AI-crawler-welcoming `public/robots.txt`, and an
IndexNow key file. Every page emits a JSON-LD @graph through `BaseLayout`
(`WebSite` always; pass extra nodes via the `schema` prop). Pricing (ruled
2026-08-20 in the product decision log): **€49 / $49 one-time, a year of
app updates included, the license is perpetual - the app keeps working
forever; the 14-day trial is the full product.** Those are the only numbers
that may appear on the site. Anything beyond them (update-renewal pricing,
sync pricing) is deliberately unannounced - keep it off every page until
the decision log closes its ruling.

## Product identity - the copy contract

The source of truth for positioning is the product repo's strategy layer;
sessions with access read it before writing page copy. The parts that bind
this site:

- Category phrase: **"AI project status dashboard"**. Use it verbatim and
  consistently - category discipline is a ground rule, not a style choice.
  Where it lives (ratified 2026-08-21): retrieval surfaces - page titles,
  meta descriptions, JSON-LD, FAQ, footer, llms.txt - plus at least one
  visible on-page use per page. The homepage hero deliberately does NOT
  lead with it: the hero leads with the pain ("Never open a cold project
  again") and the differentiated line ("your agents already wrote down
  what happened"), because the category reads generic as a pitch while
  staying essential as a classification.
- Tagline: **"Never open a cold project again."**
- Positioning: a **state layer** on top of the markdown AI agents already
  generate - not a viewer, not an editor, not agent orchestration.
- Core promises that marketing must never contradict: zero adoption cost
  (no frontmatter, no new format), local-first, privacy (no telemetry by
  default), one writing surface in the product.
- The anti-roadmap is binding: never promise editor features, agent
  orchestration, mobile control, or an account-required core.
- Claims are concrete and checkable, never superlative. A material public
  claim that turns out wrong, stale, or unbacked gets a dated entry in
  `CORRECTIONS.md` with the fix - regardless of how it looks.

## Writing style - unslop is mandatory

Every session loads the **`unslop`** skill (global,
`~/.claude/skills/unslop/SKILL.md`, 31 numbered patterns) and applies it to all
prose it emits: page copy, meta descriptions, FAQ answers, `llms.txt`,
`CORRECTIONS.md` entries, commit messages, this file, and chat replies. A
global `UserPromptSubmit` hook restates the short version each turn from
`~/.claude/unslop-reminder.txt`, so a long session cannot drift out of it.

This site is where the tells would be public, so three rules bind hardest. No
em dashes, ever - a comma or a full stop, and parentheses are not a substitute.
No promotional adjective where a checkable claim fits, which is the same rule
the copy contract above already states as "concrete and checkable, never
superlative". No sentence that names a feeling ("stays close at hand") where it
could name the mechanism or the number.

The category phrase, the tagline and the pricing sentence in the copy contract
are fixed strings. Unslop never rewrites them. One exemption from the skill's
banned-metaphor list: "surface" in "one writing surface" (and the product's
"writing surface" language generally) is product-contract vocabulary, ruled
2026-08-21 - keep it, do not rewrite it away.

The skill originates from `pstack/skills/unslop/SKILL.md` in
https://github.com/cursor/plugins and lives globally with an `upstream:`
provenance line; repo-specific additions go here or in
`.claude/addenda/<name>.md`, never into the global file.

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
  live; the cadence is at least one pushed content ship per week.

## Deploy topology (don't rediscover this)

- Two workers, two branches: push to `dev` deploys the dev worker at
  **https://dev.sitrep.md**; push to `main` deploys the live worker at
  **https://sitrep.md**. Workflows in `.github/workflows/`.
- `dev` is the working branch; `main` is promotion to live, moved by
  `git merge --ff-only dev`.
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
or PRs unless asked. Run `bun run build` before committing.

## Astro documentation

Full documentation: https://docs.astro.build. Consult before related work:

- [Routing](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Styling / Tailwind](https://docs.astro.build/en/guides/styling/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Internationalization](https://docs.astro.build/en/guides/internationalization/)
