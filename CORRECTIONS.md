# Corrections

The site says claims are measured before they are made. This file is the
cost of that sentence: a dated ledger of public claims that turned out to
be wrong, stale, or unbacked by a recorded decision - what was claimed,
who caught it, and what changed. Entries are material claims only, newest
first, each with the commit that fixed it. Provenance is disclosed:
"self-caught" means our own review process found it; an outside read is an
external reviewer we asked to attack the copy; a reader catch is exactly
that, and gets credited if the reader wants.

The bar for an entry: the claim was on a public page (or committed and
heading there), and a careful reader would have been misled. Typos and
wording polish do not qualify.

---

## 2026-08-10 - /about/ - the one unqualified big number

**Claimed:** "This July alone, git counted roughly 190,000 added lines of
code across my repos" - stated bare, while the page's other big number
(54,900 markdown files) deflated itself in the same breath.

**Caught by:** an outside read we commissioned, which named the asymmetry
precisely: added lines count lockfiles, scaffolding and churn, and the one
number left unqualified was the one doing rhetorical work.

**Fix:** the number stays - it is real - but now owns what added lines
measure (activity, not output) and drops "of code". The qualification
sharpened the argument instead of softening it: documents are commissioned
per pass, not per surviving line, so doc rot compounds with activity.
Commit `8a4d10c`.

## 2026-08-10 - /vs/agentsview - a commitment no ruling backed

**Claimed:** "sitrep deliberately reads only what agents wrote for the
project record" - a permanent-sounding refusal of session transcripts as a
*source*, when the product's decision log only refuses session analytics
as a *surface*. The page had, in effect, made a strategy ruling on its
own.

**Caught by:** self-caught, in a strategy review triggered by new
competitor research - before the page was promoted to the live site (it
had shipped to the dev preview).

**Fix:** the page now refuses the analytics surface and names the door the
strategy keeps open (transcript timestamps as staleness evidence, never
content, never a dashboard), and the missing ruling was recorded in the
product's decision log first. Commit `f3c1fe0`.

## 2026-08-10 - /security/ - analytics copy trailing reality, second catch

**Claimed:** the analytics description no longer matched what was actually
running: Cloudflare Web Analytics had gone live via edge injection, and
the page had not caught up to the one script that now loads.

**Caught by:** self-caught, reading the page against the live deployment
the day analytics went live.

**Fix:** present-tense copy that owns the single edge-injected script and
what it does and does not collect. Commit `b5fab62`.

## 2026-08-09 - /how-it-works/, /faq/ - shipped settings described as a plan

**Claimed:** the staleness copy described per-scope thresholds as "the
plan" - hours after the per-scope threshold cascade had actually shipped
in the product. Stale in the flattering direction: the product was ahead
of the claim.

**Caught by:** self-caught, same day, auditing the copy against the
product's decision log.

**Fix:** the copy states thresholds as shipped, user-editable settings,
which they are. This catch created the standing rule that product copy is
audited against the decision log the same day the product changes.
Commit `5a6ba8c`.

## 2026-08-09 - /security/ - an analytics claim that was simply false

**Claimed:** an early deploy of the security page said the site "uses
Google Analytics" while the analytics decision was still an open item -
nothing was installed at all.

**Caught by:** self-caught, same day, in review of the deployed page.

**Fix:** the false claim removed; the analytics decision was then actually
made (cookieless Cloudflare Web Analytics, no cookies, no consent banner)
and the page rewritten to describe it accurately. The earliest entry in
this ledger, and the one that started it. Commit `4802baa`.
