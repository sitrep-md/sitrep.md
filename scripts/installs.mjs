// Prints the install counts the /releases worker records (worker/index.js).
// `bun run installs` reads production; `--local` reads wrangler dev's D1.
const where = process.argv.includes("--local") ? "--local" : "--remote";
const host = where === "--local" ? "localhost:8799" : "sitrep.md";

const queries = {
  "Installs per month (0.9.3+, by monthly id)": `
    SELECT period AS month, count(*) AS installs,
      group_concat(DISTINCT version) AS versions,
      sum(arch = 'aarch64') AS arm, sum(arch = 'x86_64') AS intel
    FROM installs WHERE host = '${host}' AND kind = 'id'
    GROUP BY period ORDER BY period DESC LIMIT 12`,
  "Older installs per day (no id, distinct IP + user agent), last 30 days": `
    SELECT period AS day, count(*) AS installs, sum(checks) AS checks
    FROM installs WHERE host = '${host}' AND kind = 'ip'
    GROUP BY period ORDER BY period DESC LIMIT 30`,
};

for (const [title, sql] of Object.entries(queries)) {
  const p = Bun.spawnSync(["bunx", "wrangler", "d1", "execute", "sitrep-installs", where, "--json", "--command", sql], {
    stderr: "pipe",
  });
  if (p.exitCode !== 0) {
    console.error(p.stderr.toString());
    process.exit(1);
  }
  console.log(`\n${title}`);
  console.table(JSON.parse(p.stdout.toString())[0].results);
}
