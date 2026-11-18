// ─────────────────────────────────────────────────────────────────
// ENTERPRISE-GRADE GOOGLE & GLOBAL SEARCH INDEXING ENGINE
// Direct RS256 JWT Google Indexing API + IndexNow + Multi-Sitemap Pings
// ─────────────────────────────────────────────────────────────────

import crypto from 'crypto';
import fs from 'fs';
import { generatePSEOMatrix } from '../src/lib/pseo-data.ts';
import { ALL_DOMAINS } from '../src/lib/domain-config.ts';

const INDEXNOW_KEY = '6c140dda23d44ec68ddd52bd2f1d01e6';
const STATE_FILE = './.indexing-state.json';

// ── 1. Google Service Account JWT Authenticator ──────────────────
async function getGoogleToken(clientEmail, privateKey) {
  if (!clientEmail || !privateKey) return null;
  const cleanKey = privateKey.replace(/\\n/g, '\n');
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  })).toString('base64url');

  const signingInput = `${header}.${payload}`;
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(signingInput);
  const signature = sign.sign(cleanKey, 'base64url');
  const jwt = `${signingInput}.${signature}`;

  try {
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }),
    });
    const data = await res.json();
    return data.access_token || null;
  } catch (err) {
    console.warn('  ⚠️ Direct Google JWT auth error:', err.message);
    return null;
  }
}

// ── 2. Direct Google Indexing API Submission ─────────────────────
async function submitToGoogleDirect(url, token, type = 'URL_UPDATED') {
  try {
    const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, type }),
    });
    if (res.ok) return { url, status: 'submitted' };
    const errText = await res.text();
    return { url, status: 'failed', error: errText };
  } catch (err) {
    return { url, status: 'failed', error: err.message };
  }
}

// ── 3. IndexNow Batch Submission (Bing, Yandex, Seznam, Naver) ───
async function submitIndexNowBatch(host, urls) {
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });
    return { host, status: res.status, ok: res.ok };
  } catch (err) {
    return { host, status: 500, ok: false, error: err.message };
  }
}

// ── 4. Enterprise Multi-Tier URL Architecture ────────────────────
function buildEnterpriseUrlTiers() {
  const matrix = generatePSEOMatrix();
  
  // Tier 1: Canonical Pillar Pages
  const tier1Slugs = [
    '',
    'kohinoor-the-arena-pimpri',
    'mahalaxmi-the-arena-pimpri',
    'pcmc-premium-real-estate',
    'explore',
    'market-trends',
    'blog',
  ];

  // Tier 2: Master Real Estate Hubs & High-Value Transit Nodes
  const tier2Slugs = matrix.filter(p =>
    p.category === 'Master Real Estate Hub' ||
    p.slug.includes('pcmc-metro') ||
    p.slug.includes('finolex-chowk') ||
    p.slug.includes('old-mumbai-pune-highway') ||
    p.slug.includes('kohinoor-world-towers') ||
    p.slug.includes('price-list') ||
    p.slug.includes('sports-township') ||
    p.slug.includes('fifa-football-turf') ||
    p.slug.includes('padel-court') ||
    p.slug.includes('infinity-pool') ||
    p.slug.includes('2-bhk') ||
    p.slug.includes('3-bhk') ||
    p.slug.includes('4-bhk')
  ).map(p => p.slug);

  // Tier 3: Multilingual Regional Hubs (Marathi & Hinglish)
  const tier3Slugs = matrix.filter(p =>
    p.category === 'Multilingual Marathi Hub' ||
    p.category === 'Multilingual Hinglish Voice Hub' ||
    p.slug.includes('pimpri-madhe') ||
    p.slug.includes('ghar-pimpri')
  ).map(p => p.slug);

  // Tier 4: Extended Programmatic Hubs
  const tier4Slugs = matrix.map(p => p.slug).filter(s => 
    !tier2Slugs.includes(s) && !tier3Slugs.includes(s)
  );

  return { tier1Slugs, tier2Slugs, tier3Slugs, tier4Slugs };
}

// ── 5. Main Execution Flow ───────────────────────────────────────
async function runIndexingEngine() {
  const args = process.argv.slice(2);
  const mode = args[0] || 'auto';
  const dryRun = process.env.DRY_RUN === 'true' || args.includes('--dry-run');

  console.log('\n========================================================');
  console.log('🚀 ENTERPRISE-GRADE GOOGLE & GLOBAL SEARCH INDEXING ENGINE');
  console.log(`   Mode: ${mode} | Dry Run: ${dryRun}`);
  console.log('========================================================\n');

  const { tier1Slugs, tier2Slugs, tier3Slugs, tier4Slugs } = buildEnterpriseUrlTiers();

  const primaryTargetUrls = [];
  for (const domain of ALL_DOMAINS) {
    tier1Slugs.forEach(s => primaryTargetUrls.push(`${domain}${s ? `/${s}` : ''}`));
    tier2Slugs.forEach(s => primaryTargetUrls.push(`${domain}/${s}`));
    tier3Slugs.forEach(s => primaryTargetUrls.push(`${domain}/${s}`));
  }

  const allProgrammaticUrls = [];
  for (const host of ['www.kohinoorthearena.in', 'www.mahalaxmithearena.in']) {
    tier1Slugs.forEach(s => allProgrammaticUrls.push(`https://${host}${s ? `/${s}` : ''}`));
    tier2Slugs.forEach(s => allProgrammaticUrls.push(`https://${host}/${s}`));
    tier3Slugs.forEach(s => allProgrammaticUrls.push(`https://${host}/${s}`));
    tier4Slugs.slice(0, 1500).forEach(s => allProgrammaticUrls.push(`https://${host}/${s}`));
  }

  // Deduplicate and cap Google target batch at 180 (Google daily limit safe cap)
  const googleBatch = Array.from(new Set(primaryTargetUrls)).slice(0, 180);

  console.log(`📦 Enterprise URL Matrix:`);
  console.log(`   • Tier 1 Core Pillars:       ${tier1Slugs.length * ALL_DOMAINS.length} URLs`);
  console.log(`   • Tier 2 High-Intent Hubs:   ${tier2Slugs.length * ALL_DOMAINS.length} URLs`);
  console.log(`   • Tier 3 Regional Voice:     ${tier3Slugs.length * ALL_DOMAINS.length} URLs`);
  console.log(`   • IndexNow Broadcast Pool:   ${allProgrammaticUrls.length} URLs`);
  console.log(`   • Google Target Batch:       ${googleBatch.length} URLs (within 200 quota limit)\n`);

  if (dryRun) {
    console.log('⚠️ DRY RUN MODE — Sample URLs to be indexed:');
    googleBatch.slice(0, 10).forEach(u => console.log(`   🔗 ${u}`));
    console.log(`   ... plus ${googleBatch.length - 10} more URLs.\n`);
    return;
  }

  // ── Step A: Direct Google Indexing API ──────────────────────────
  let clientEmail = process.env.GOOGLE_INDEXING_CLIENT_EMAIL || process.env.GOOGLE_CLIENT_EMAIL;
  let privateKey = process.env.GOOGLE_INDEXING_PRIVATE_KEY || process.env.GOOGLE_PRIVATE_KEY;

  if ((!clientEmail || !privateKey) && fs.existsSync('./service-account.json')) {
    try {
      const sa = JSON.parse(fs.readFileSync('./service-account.json', 'utf8'));
      clientEmail = sa.client_email;
      privateKey = sa.private_key;
    } catch {}
  }

  let googleResults = [];
  const googleToken = await getGoogleToken(clientEmail, privateKey);

  if (googleToken) {
    console.log('🔑 Authenticated with Google Cloud Service Account (RS256 JWT).');
    console.log(`📡 Dispatching ${googleBatch.length} high-priority URLs to Google Indexing API...`);
    
    let quotaExceeded = false;
    for (let i = 0; i < googleBatch.length; i++) {
      if (quotaExceeded) break;
      const url = googleBatch[i];
      const res = await submitToGoogleDirect(url, googleToken);
      googleResults.push(res);

      if (res.status === 'submitted') {
        process.stdout.write(`   [${i + 1}/${googleBatch.length}] ✅ ${url}\n`);
      } else if (res.error && res.error.includes('Quota exceeded')) {
        quotaExceeded = true;
        console.log(`\n   ℹ️ Google daily quota (200 requests/day) consumed for today.`);
        console.log(`   ⏰ Quota automatically resets at 00:00 UTC (05:30 AM IST).`);
        console.log(`   ✅ Sitemaps and IndexNow protocols actively protecting crawl coverage.`);
        break;
      } else {
        process.stdout.write(`   [${i + 1}/${googleBatch.length}] ⚠️ ${res.error?.slice(0, 80) || 'error'} — ${url}\n`);
      }
      await new Promise(r => setTimeout(r, 120)); // Safe throttling
    }
    console.log('');
  } else {
    console.log('ℹ️ Google Service Account key pending in environment.');
  }

  // ── Step B: Ultra-Scale IndexNow Protocol ───────────────────────
  console.log('\n⚡ Dispatching IndexNow Broadcast (Bing, Yandex, Seznam, Naver)...');
  for (const host of ['www.kohinoorthearena.in', 'www.mahalaxmithearena.in']) {
    const hostUrls = allProgrammaticUrls.filter(u => u.includes(host)).slice(0, 2000);
    if (hostUrls.length > 0) {
      const inRes = await submitIndexNowBatch(host, hostUrls);
      console.log(`   ${inRes.ok ? '✅' : '⚠️'} IndexNow [${host}]: HTTP ${inRes.status} (${hostUrls.length} URLs submitted)`);
    }
  }

  // ── Step C: Ping Sitemaps ───────────────────────────────────────
  console.log('\n🗺️ Pinging Google & Bing with updated Sitemaps...');
  for (const d of ALL_DOMAINS) {
    const sitemapUrl = `${d}/sitemap.xml`;
    try {
      await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
      await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
      console.log(`   ✅ Pinged search engines with: ${sitemapUrl}`);
    } catch (e) {
      console.log(`   ⚠️ Sitemap ping note: ${e.message}`);
    }
  }

  // Save state
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify({
      lastRun: new Date().toISOString(),
      googleSubmitted: googleResults.filter(r => r.status === 'submitted').length,
      googleBatchSize: googleBatch.length,
      indexNowCount: allProgrammaticUrls.length,
    }, null, 2));
  } catch {}

  console.log('\n🌟 ENTERPRISE INDEXING ENGINE EXECUTION COMPLETED.\n');
}

runIndexingEngine().catch(err => {
  console.error('Fatal indexing error:', err);
  process.exit(1);
});
