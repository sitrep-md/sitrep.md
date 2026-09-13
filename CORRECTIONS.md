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

## 2026-09-13 - /security/, /faq/, /pricing/, /about/, llms.txt, three /vs/ pages - sync "not built yet"

**Claimed:** the security page said sync "is not built yet", with a design
"published now, before any backend exists", a protocol that "will be public
from day one" and a client that "will speak the same protocol to any
S3-compatible endpoint". The FAQ called it "a future optional sync layer",
the pricing FAQ "planned", three comparison tables "Planned", and the about
page told readers to "read the sync protocol when it ships". 0.9.0 shipped
Mobile sync on 2026-09-04 as a proof of concept: a read-only,
end-to-end-encrypted mirror on a phone, pushed to a Cloudflare Worker with
no accounts in it. The site kept describing it as unbuilt for nine
days and two releases. A reader who opened Settings > Mobile sync in the
app found a section the site said did not exist, and the security page's
promise that the protocol would be public before anything shipped was not
kept: the document and the worker's source are still unpublished.

**Caught by:** self-caught, in the 2026-09-10 documentation sweep of the
product repo, which found every strategy document stopped on 2026-08-20 and
this site with it.

**Fix:** every page names the proof of concept and its limit, that the
relay's source and the pusher are not published yet, so a reader cannot
switch it on. The security page marks each design
bullet shipped or not built against the 0.9.0 implementation: the key,
QR pairing and the keyed-hash metadata scheme shipped; the passphrase,
recovery key, existing-device approval and share links did not. The
server-sees list drops the email address, since there is no account, and
adds the version counter and last-pull time the worker does hold. Commit
`16fd6d7`.

## 2026-08-22 - /faq/ - "any other markdown, agent-written or human-written"

**Claimed:** the agents question answered that sitrep reads "any other
markdown, agent-written or human-written" - a promise of extraction from
arbitrary prose, when extraction works only on the conventions sitrep
parses (status lines, phase headings, decision lists and tables, due
dates). A reader with a freeform vault would install expecting extracted
state and get activity and staleness only.

**Caught by:** self-caught, in a premise-grilling session that read the
copy against the product's own bet: agent-written markdown converges on
these conventions, arbitrary human prose does not.

**Fix:** the answer names the conventions, says human-written docs work
when they use them, and states what a doc without them shows. Commit
`61529f4`.

## 2026-08-21 - /vs/* - eight pages said "in development" after launch

**Claimed:** every comparison page ended "sitrep is in development,
launching first on macOS" - while /download/ was already shipping the
signed 0.5.0 build and /faq/ answered "When can I use it?" with "Now".
The Obsidian page also implied a waitlist ("not when a waitlist clears")
that never existed.

**Caught by:** self-caught, in a full-site copy audit the day after the
macOS build went public.

**Fix:** all eight pages and the Obsidian availability row now state the
product is available on macOS with the full 14-day trial; the waitlist
line names what is true - the read-only mobile mirror is planned, not
shipped. Commit `5c8344e`.

## 2026-08-21 - /faq/, llms.txt - shipped features trailing the claims again

**Claimed:** the FAQ answered "Can my agents query sitrep?" with "That
is the plan", although the read-only MCP server shipped 2026-08-09 and
is in the packaged sidecar. llms.txt counted "three read-time checks"
for staleness when the product ships four, omitting plan adrift.

**Caught by:** self-caught, same audit.

**Fix:** the FAQ states the MCP server as shipped and read-only;
llms.txt names all four checks. Stale in the flattering direction, like
the 2026-08-09 entry that created the audit-on-ship rule - launch pace
outran the rule, so the audit was re-run whole-site. Commit `5c8344e`.

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
