# sitrep - AI project status dashboard

**A state layer on top of the markdown your AI agents already generate.
Never open a cold project again.**

Run Claude Code, Cursor or Codex across a few projects and you accumulate
plans, analyses and decision documents you never asked for and cannot keep
in your head. The state of your work is written down - it is just scattered
across hundreds of markdown files in a dozen repos. sitrep reads those files
where they already live and answers, at a glance and across every project:
what moved, what is stalled, what is waiting on a decision, and whether the
docs still tell the truth.

- Reads the plans, decisions and progress your AI agents already write -
  no new format, no frontmatter, no import
- Extracts status, phases, decisions and due dates from the conventions
  already in your docs
- Email-client-style overview - newest activity first, pending items
  surfaced
- Staleness signals - flags the docs that claim work your repo has moved
  past: dead claims, adrift master plans, left-behind docs, stale status
  lines
- Live refresh in place - the page is never taken away from you
- Local-first: your files never leave your machine, no account, no
  telemetry by default

**Status: in development, launching first on macOS.** Releases will appear
in this repository when the app ships. Until then, [sitrep.md](https://sitrep.md)
is the reference for what sitrep is and how it behaves:

- [How it works](https://sitrep.md/how-it-works/) - the conventions it
  reads, in detail
- [Principles](https://sitrep.md/principles/) - the eight product promises
  and the anti-roadmap
- [Security & privacy](https://sitrep.md/security/) - and how to verify the
  claims without trusting us
- [FAQ](https://sitrep.md/faq/) - the real questions, answered
- [Comparisons](https://sitrep.md/#fits) - honest /vs/ pages, each naming
  when the other tool is the better choice

## What sitrep will never be

The anti-roadmap is written down and binding. sitrep will never be a
general markdown editor or one more pretty viewer, an agent orchestrator or
parallel-session runner, a task manager with a format of its own, a second
brain or knowledge base, live agent control from your phone, or a
cloud-only, account-required product.

## This repository

The public home of sitrep:

- **The source of [sitrep.md](https://sitrep.md)** - the site is built from
  this repo, so every copy change is a dated commit anyone can read.
- **[CORRECTIONS.md](CORRECTIONS.md)** - the ledger of public claims that
  were wrong or unbacked, who caught them, and the fix. The site says
  "measured, not asserted"; this file is what that costs.
- **Releases** - the macOS app will ship from here, signed and notarized.
- **Issues** - the public tracker. If a page of ours claims something you
  can show is wrong, an issue here is exactly the right instrument.

The app itself is a commercial desktop product and its source is not
public - [the security page](https://sitrep.md/security/) explains how to
verify its behaviour (cut the network and everything still works) rather
than take our word for it.

## Developing the site

Astro (static) + Tailwind v4, built with Bun, served as Cloudflare Workers
static assets.

```sh
bun install
bun run dev
```

CI deploys on push: the `dev` branch to https://dev.sitrep.md (robots.txt
overridden to `Disallow: /` at build time), `main` to https://sitrep.md.
`main` moves by fast-forwarding to `dev`. Agent guidance lives in
`AGENTS.md` (`CLAUDE.md` symlinks to it).

## License

Split by kind, both spelled out in [LICENSE](LICENSE): the site's code is
MIT; the content - page copy, the corrections ledger, images, the sitrep
name and brand - is all rights reserved.
