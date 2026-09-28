// The site is static assets; this script runs first only for /releases/*
// (wrangler.jsonc run_worker_first) and counts the installed app's update
// checks into D1 before handing the request to the assets unchanged.
// What is counted and why: sitrep docs/decisions.md, "How sitrep.md counts
// installs". The response never depends on the count, and a D1 failure is
// swallowed so an update check cannot fail because of it.

const CHANNELS = { "/releases/stable.json": "stable", "/releases/beta.json": "beta" };
const ID = /^[0-9a-f]{32}$/;
const TOKEN = /^[0-9A-Za-z._-]{1,32}$/;

export default {
  async fetch(request, env, ctx) {
    const res = await env.ASSETS.fetch(request);
    const url = new URL(request.url);
    const channel = CHANNELS[url.pathname];
    const ua = request.headers.get("user-agent") ?? "";
    // Only the app's updater counts: crawlers, browsers and curl fetch the
    // same file and are not installs.
    if (env.DB && channel && request.method === "GET" && ua.startsWith("tauri-plugin-updater/")) {
      ctx.waitUntil(record(env.DB, url.host, channel, request, ua).catch(() => {}));
    }
    return res;
  },
};

async function sha(text) {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(d)].slice(0, 16).map((b) => b.toString(16).padStart(2, "0")).join("");
}

const token = (v) => (v && TOKEN.test(v) ? v : "unknown");

async function record(db, host, channel, request, ua) {
  const now = new Date().toISOString();
  const day = now.slice(0, 10);
  const id = request.headers.get("sitrep-install") ?? "";
  let kind, period, hash;
  if (ID.test(id)) {
    kind = "id";
    period = now.slice(0, 7);
    hash = await sha(id);
  } else {
    kind = "ip";
    period = day;
    let row = await db.prepare("SELECT salt FROM salts WHERE day = ?").bind(day).first();
    if (!row) {
      const salt = crypto.randomUUID();
      await db.batch([
        db.prepare("DELETE FROM salts WHERE day < ?").bind(day),
        db.prepare("INSERT OR IGNORE INTO salts (day, salt) VALUES (?, ?)").bind(day, salt),
      ]);
      row = await db.prepare("SELECT salt FROM salts WHERE day = ?").bind(day).first();
    }
    hash = await sha(`${row.salt}|${request.headers.get("cf-connecting-ip") ?? ""}|${ua}`);
  }
  await db
    .prepare(
      `INSERT INTO installs (host, period, kind, hash, channel, version, arch, first_seen, last_seen)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT (host, period, kind, hash) DO UPDATE SET
         channel = excluded.channel, version = excluded.version, arch = excluded.arch,
         last_seen = excluded.last_seen, checks = checks + 1`,
    )
    .bind(host, period, kind, hash, channel, token(request.headers.get("sitrep-version")),
      token(request.headers.get("sitrep-arch")), now, now)
    .run();
}
