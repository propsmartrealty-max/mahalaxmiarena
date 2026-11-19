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
    title: `Kohinoor The Arena Pimpri | Luxury Flats in PCMC`,
    description: `Kohinoor The Arena in Pimpri Chinchwad. Premium 2, 3 & 4 BHK residences by Kohinoor Group in an 80,000 sq.ft. sports township.`,
    alternates: { canonical: `${cfg.canonical}/kohinoor-the-arena-pimpri` },
  };
}

export default function Page() {
  return <MainLayout h1="Kohinoor The Arena Pimpri" keyword="kohinoor the arena pimpri" />;
}
