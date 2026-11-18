"use client";

export interface OfflineLeadItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  configuration?: string;
  domain: string;
  source: string;
  utm?: Record<string, unknown>;
  timestamp: string;
  retries: number;
}

const STORAGE_KEY = 'mta_offline_leads';

export function getOfflineLeads(): OfflineLeadItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function queueOfflineLead(
  lead: Omit<OfflineLeadItem, 'id' | 'timestamp' | 'retries'>
): OfflineLeadItem {
  const item: OfflineLeadItem = {
    ...lead,
    id: `off_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toISOString(),
    retries: 0,
  };

  if (typeof window === 'undefined') return item;

  try {
    const current = getOfflineLeads();
    current.push(item);
    // Keep max 50 leads to avoid local storage exhaustion
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current.slice(-50)));
    console.log('[ARENA][OFFLINE_LEAD] Queued fail-safe lead:', item.id);
  } catch (e) {
    console.error('[ARENA][OFFLINE_LEAD] LocalStorage write error:', e);
  }

  return item;
}

export async function flushOfflineLeads(): Promise<number> {
  if (typeof window === 'undefined') return 0;
  if (!navigator.onLine) return 0;

  const queue = getOfflineLeads();
  if (queue.length === 0) return 0;

  console.log(`[ARENA][OFFLINE_LEAD] Synchronizing ${queue.length} offline leads...`);
  const remaining: OfflineLeadItem[] = [];
  let flushedCount = 0;

  for (const item of queue) {
    try {
      // 1. Direct FormSubmit AJAX Dispatch
      fetch('https://formsubmit.co/ajax/propsmartrealty@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          Name: item.name,
          Phone: item.phone,
          Email: item.email || 'Not provided',
          Configuration: item.configuration || '2, 3 & 4 BHK',
          Domain: item.domain,
          Source: `[OFFLINE SYNC] ${item.source}`,
          _subject: `🏠 [OFFLINE SYNC] Lead: ${item.name} (${item.phone}) — ${item.configuration || 'The Arena'}`,
          _template: 'table',
          _captcha: 'false',
        }),
      }).catch(() => {});

      // 2. Server API Route Dispatch
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: item.name,
          phone: item.phone,
          email: item.email,
          configuration: item.configuration,
          domain: item.domain,
          source: `[OFFLINE SYNC] ${item.source}`,
          utm: item.utm,
          recaptchaToken: 'offline_sync',
        }),
      });

      if (res.ok) {
        flushedCount++;
      } else {
        item.retries += 1;
        if (item.retries < 5) remaining.push(item);
      }
    } catch {
      item.retries += 1;
      if (item.retries < 5) remaining.push(item);
    }
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(remaining));
  } catch {}

  if (flushedCount > 0) {
    console.log(`[ARENA][OFFLINE_LEAD] Successfully synchronized ${flushedCount} leads.`);
  }

  return flushedCount;
}

export function initOfflineLeadSync(): void {
  if (typeof window === 'undefined') return;

  // Sync on online event
  window.addEventListener('online', () => {
    console.log('[ARENA][OFFLINE_LEAD] Device back online. Triggering flush...');
    flushOfflineLeads().catch(() => {});
  });

  // Attempt initial flush when document is loaded
  if (navigator.onLine) {
    setTimeout(() => {
      flushOfflineLeads().catch(() => {});
    }, 4000);
  }
}
