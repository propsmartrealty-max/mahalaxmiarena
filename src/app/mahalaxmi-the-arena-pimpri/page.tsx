import MainLayout from "@/components/MainLayout";
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { getDomainConfig } from '@/lib/domain-config';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  let host = 'mahalaxmithearena.in';
  try {
    const headersList = await headers();
    host = headersList.get('host') || 'mahalaxmithearena.in';
  } catch {}
  const cfg = getDomainConfig(host);
  return {
    title: `Mahalaxmi The Arena Pimpri | Premium Sports Township`,
    description: `Mahalaxmi The Arena in Pimpri. A premium 2, 3 & 4 BHK lifestyle project by Mahalaxmi Group in PCMC, Pune.`,
    alternates: { canonical: `${cfg.canonical}/mahalaxmi-the-arena-pimpri` },
  };
}

export default function Page() {
  return <MainLayout h1="Mahalaxmi The Arena Pimpri" keyword="mahalaxmi the arena pimpri" />;
}
