import MainLayout from "@/components/MainLayout";
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { getDomainConfig } from '@/lib/domain-config';

type Props = { params: Promise<{ intent: string }> };

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const intentStr = p.intent.replace(/-/g, ' ');
  let host = 'kohinoorthearena.in';
  try {
    const headersList = await headers();
    host = headersList.get('host') || 'kohinoorthearena.in';
  } catch {}
  const cfg = getDomainConfig(host);
  const ogTitle = encodeURIComponent(`The Arena Pimpri — ${intentStr}`);
  const ogSub   = encodeURIComponent('Premium Sports Township | PCMC, Pune');
  const ogUrl   = `${cfg.canonical}/api/og?title=${ogTitle}&sub=${ogSub}&brand=${encodeURIComponent(cfg.brand)}`;
  return {
    title: `The Arena Pimpri ${intentStr} | Premium Residences`,
    description: `Explore The Arena Pimpri ${intentStr}. Premium 2, 3 & 4 BHK luxury flats in PCMC.`,
    alternates: { canonical: `${cfg.canonical}/life-in-motion-pimpri/${p.intent}` },
    openGraph: {
      title: `The Arena Pimpri — ${intentStr}`,
      description: `Explore The Arena Pimpri ${intentStr}. Premium 2, 3 & 4 BHK luxury flats in PCMC.`,
      images: [{ url: ogUrl, width: 1200, height: 630, alt: `The Arena Pimpri ${intentStr}` }],
      type: 'website',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: `The Arena Pimpri — ${intentStr}`,
      images: [ogUrl],
    },
  };
}
export default async function Page({ params }: Props) {
  const p = await params;
  const intentStr = p.intent.replace(/-/g, ' ');
  let host = 'kohinoorthearena.in';
  try {
    const headersList = await headers();
    host = headersList.get('host') || 'kohinoorthearena.in';
  } catch {}
  const cfg = getDomainConfig(host);
  const pageUrl = `${cfg.canonical}/life-in-motion-pimpri/${p.intent}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": cfg.canonical },
      { "@type": "ListItem", "position": 2, "name": "The Arena", "item": `${cfg.canonical}/life-in-motion-pimpri` },
      { "@type": "ListItem", "position": 3, "name": intentStr.replace(/\b\w/g, c => c.toUpperCase()), "item": pageUrl }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MainLayout h1={`The Arena Pimpri ${intentStr}`} keyword={`the arena pimpri ${intentStr}`} />
    </>
  );
}
