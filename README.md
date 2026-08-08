# sitrep-www

Marketing site for [sitrep](https://sitrep.md) - an AI project status
dashboard: a state layer on top of the markdown your AI agents already
generate.

Astro (static) + Tailwind v4, built with Bun, served as Cloudflare Workers
static assets.

## Develop

```sh
bun install
bun run dev
```

## Deploy

CI deploys on push:

- `dev` branch -> `sitrep-www-dev` -> https://dev.sitrep.md (robots.txt
  overridden to `Disallow: /` at build time)
- `main` branch -> `sitrep-www` -> https://sitrep.md

`main` moves by fast-forwarding to `dev` (`git merge --ff-only dev`).
Secrets: `CLOUDFLARE_API_TOKEN` (the `sitrep-www-ci` account token, Workers
Scripts Write + Account Settings Read, no IP restriction) and
`CLOUDFLARE_ACCOUNT_ID`. Custom domains are attached once via the
account-level `workers/domains` API, deliberately not declared in
`wrangler.jsonc` - see AGENTS.md for the reasoning.

Agent guidance lives in `AGENTS.md` (`CLAUDE.md` symlinks to it).
