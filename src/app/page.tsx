import MainLayout from "@/components/MainLayout";
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { getDomainConfig } from '@/lib/domain-config';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  let host = 'kohinoorthearena.in';
  try {
    const headersList = await headers();
    host = headersList.get('host') || 'kohinoorthearena.in';
  } catch {}
  const cfg = getDomainConfig(host);
  return {
    title: cfg.title,
    description: cfg.description,
    alternates: { canonical: cfg.canonical },
    openGraph: {
      title: cfg.title,
      description: cfg.description,
      url: cfg.canonical,
      siteName: `${cfg.arenaName} by ${cfg.brand}`,
      images: [{ url: cfg.ogImage, width: 1200, height: 630, alt: `${cfg.arenaName} by ${cfg.brand} — ${cfg.address.locality}, ${cfg.address.city}` }],
      type: 'website',
      locale: 'en_IN',
    },
  };
}

export default async function Home() {
  let host = 'kohinoorthearena.in';
  let intent: string | null = null;
  try {
    const headersList = await headers();
    host = headersList.get('host') || 'kohinoorthearena.in';
    intent = headersList.get('x-arena-intent');
  } catch {}
  const cfg = getDomainConfig(host);
  
  let h1 = `${cfg.arenaName} Pimpri Pune | ${cfg.brand} & ${cfg.coDevName} Sports Township`;
  let keyword = `${cfg.arenaName.toUpperCase()} • SPORTS TOWNSHIP PIMPRI`;
  
  if (intent) {
    const formattedIntent = intent.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    h1 = `${formattedIntent} at ${cfg.arenaName} Pimpri`;
    keyword = `CUSTOMIZED RESULTS FOR: ${formattedIntent.toUpperCase()}`;
  }

  return (
    <MainLayout h1={h1} keyword={keyword} />
  );
}
