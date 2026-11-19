import crypto from 'crypto';

// ─────────────────────────────────────────────────────────
// Google Indexing API — Zero-dependency JWT Auth Helper
//
// Required Vercel Env Vars:
//   GOOGLE_INDEXING_CLIENT_EMAIL  — Service Account email
//   GOOGLE_INDEXING_PRIVATE_KEY   — Service Account private key
//                                   (paste full PEM, \n becomes actual newlines)
//
// Setup Instructions:
//   1. Go to console.cloud.google.com
//   2. Enable "Web Search Indexing API"
//   3. Create a Service Account → Download JSON key
//   4. In Google Search Console → Settings → Users → Add the service account email as Owner
//   5. Paste client_email and private_key from the JSON into Vercel env vars
// ─────────────────────────────────────────────────────────

function extractDer(rawKey: string): ArrayBuffer {
  let clean = rawKey.trim();
  if ((clean.startsWith('"') && clean.endsWith('"')) || (clean.startsWith("'") && clean.endsWith("'"))) {
    clean = clean.slice(1, -1);
  }
  const unescaped = clean.replaceAll('\\r', '\r').replaceAll('\\n', '\n');
  const lines = unescaped
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !l.startsWith('-----'));
  const b64 = lines.join('');
  const binaryString = typeof atob === 'function' ? atob(b64) : Buffer.from(b64, 'base64').toString('binary');
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

async function getGoogleAccessToken(): Promise<string> {
  const clientEmail = process.env.GOOGLE_INDEXING_CLIENT_EMAIL || 'mahaxmi@vivid-reality-419916.iam.gserviceaccount.com';
  try {
    const rawKey = process.env.GOOGLE_INDEXING_PRIVATE_KEY || '';
    if (!rawKey) {
      throw new Error('GOOGLE_INDEXING_PRIVATE_KEY is empty');
    }
    const binaryDer = extractDer(rawKey);

    // Use Web Crypto API (supported natively across Cloudflare Workers, Node.js & Vercel)
    const subtle = globalThis.crypto?.subtle || crypto.subtle;
    const key = await subtle.importKey(
      'pkcs8',
      binaryDer,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false,
      ['sign']
    );

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
    const sig = await subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(signingInput));
    const signature = Buffer.from(sig).toString('base64url');
    const jwt = `${signingInput}.${signature}`;

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }),
    });

    const tokenData = await tokenRes.json() as { access_token?: string; error?: string };
    if (!tokenData.access_token) {
      throw new Error(`Google token exchange failed: ${JSON.stringify(tokenData)}`);
    }
    return tokenData.access_token;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`[Google Auth Error] ${msg}`);
  }
}

export type IndexingResult = {
  url: string;
  status: 'submitted' | 'failed';
  error?: string;
};

// Submit a single URL to Google Indexing API with optional pre-fetched token
export async function submitUrlToGoogle(
  url: string,
  type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED',
  existingToken?: string
): Promise<IndexingResult> {
  try {
    const accessToken = existingToken || (await getGoogleAccessToken());

    const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, type }),
    });

    if (!res.ok) {
      const err = await res.text();
      return { url, status: 'failed', error: err };
    }

    return { url, status: 'submitted' };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { url, status: 'failed', error: msg };
  }
}

// Submit a batch of URLs (Google limits: 200 req/day on free tier)
export async function submitBatchUrls(urls: string[]): Promise<IndexingResult[]> {
  const results: IndexingResult[] = [];

  let token: string;
  try {
    token = await getGoogleAccessToken();
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return urls.map((url) => ({ url, status: 'failed', error: msg }));
  }

  // Iterate and submit up to maximum allowed, stopping gracefully on 429 or quota limit
  for (const url of urls) {
    const result = await submitUrlToGoogle(url, 'URL_UPDATED', token);
    results.push(result);

    // Stop early if daily quota is reached (HTTP 429 / RESOURCE_EXHAUSTED)
    if (result.status === 'failed' && (result.error?.includes('429') || result.error?.includes('RESOURCE_EXHAUSTED'))) {
      console.warn(`[GOOGLE INDEXING] Daily quota limit reached. Pausing batch at ${results.length} URLs.`);
      break;
    }

    // Stop early if subrequest limit warning occurs
    if (result.status === 'failed' && result.error?.includes('subrequests')) {
      console.warn(`[GOOGLE INDEXING] Worker subrequest boundary reached. Pausing batch at ${results.length} URLs.`);
      break;
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return results;
}
