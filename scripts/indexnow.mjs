// Submit the live sitemap's URLs to IndexNow (Bing, and everyone riding its
// index - which includes several AI assistants' search layers).
// Usage: bun run indexnow
// The key is public by design: IndexNow verifies ownership by fetching
// https://sitrep.md/<key>.txt.

const HOST = 'sitrep.md';
const KEY = '8dc0f6a11dfa4c8a52ae9649e99e55b5';

const sitemapIndex = await (await fetch(`https://${HOST}/sitemap-index.xml`)).text();
const sitemaps = [...sitemapIndex.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const urls = [];
for (const sm of sitemaps) {
  const xml = await (await fetch(sm)).text();
  urls.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
}
// Non-page resources worth announcing too.
urls.push(`https://${HOST}/llms.txt`);

if (urls.length === 0) throw new Error('no URLs found in sitemap');

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls,
  }),
});

console.log(`submitted ${urls.length} URLs, IndexNow answered ${res.status}`);
for (const u of urls) console.log(`  ${u}`);
if (res.status >= 300) {
  console.error(await res.text());
  process.exit(1);
}
