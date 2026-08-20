// Dist-wide check: no inline link may touch a letter/digit on either side.
// Flags `word<a ...>` and `</a>word` - punctuation and whitespace are fine.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const roots = ['dist'];
const files = [];
while (roots.length) {
  const dir = roots.pop();
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) roots.push(p);
    else if (name.endsWith('.html')) files.push(p);
  }
}

let bad = 0;
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  for (const m of html.matchAll(/[A-Za-z0-9]<a[ >]|<\/a>[A-Za-z0-9]/g)) {
    const start = Math.max(0, m.index - 60);
    console.log(`${f}: ...${html.slice(start, m.index + 70).replace(/\s+/g, ' ')}...`);
    bad++;
  }
}
console.log(bad ? `FAIL: ${bad} glued link boundaries` : 'ok: no glued link boundaries');
process.exit(bad ? 1 : 0);
