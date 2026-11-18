import { NextResponse } from 'next/server';
import { getLeadStats } from '@/lib/lead-queue';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const host = request.headers.get('host') || 'unknown';
  const isMahalaxmi = host.includes('mahalaxmi');
  const leadStats = getLeadStats();

  const health = {
    status: 'healthy',
    system: 'The Arena Enterprise Edge Platform',
    timestamp: new Date().toISOString(),
    edge: {
      host,
      detectedDomain: isMahalaxmi ? 'mahalaxmithearena.in' : 'kohinoorthearena.in',
      brand: isMahalaxmi ? 'Mahalaxmi The Arena' : 'Kohinoor The Arena',
      runtime: 'Cloudflare Worker (OpenNext 15.1)',
    },
    compliance: {
      mahareraNumber: 'PR1261012602774',
      status: 'VERIFIED_ACTIVE',
      projectType: 'Sports Township & Luxury Residences',
      location: 'Finolex Chowk, Pimpri, Pune 411018',
    },
    channels: {
      leadTargetEmail: 'propsmartrealty@gmail.com',
      formSubmitEndpoint: 'https://formsubmit.co/ajax/propsmartrealty@gmail.com',
      whatsAppSalesDesk: '+91 7744009295',
      whatsAppUrl: 'https://wa.me/917744009295',
    },
    resilience: {
      leadQueue: leadStats,
      zeroDowntimeRouting: true,
      offlineClientQueueSupported: true,
    },
  };

  return NextResponse.json(health, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'X-Robots-Tag': 'noindex, nofollow',
      'Content-Type': 'application/json',
    },
  });
}

export async function HEAD() {
  return new Response(null, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}
