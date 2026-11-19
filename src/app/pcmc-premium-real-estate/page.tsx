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
    title: `PCMC Premium Real Estate | Luxury Homes in Pimpri Chinchwad`,
    description: `Discover premium real estate and luxury homes in PCMC (Pimpri Chinchwad). Buy 2, 3 & 4 BHK flats at The Arena by Kohinoor Group and Mahalaxmi Group.`,
    alternates: { canonical: `${cfg.canonical}/pcmc-premium-real-estate` },
  };
}

export default function Page() {
  return <MainLayout h1="PCMC Premium Real Estate" keyword="premium real estate pcmc pimpri chinchwad" />;
}
