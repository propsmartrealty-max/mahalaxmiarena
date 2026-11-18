import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import GlobalScripts from "@/components/GlobalScripts";
import Modals from "@/components/Modals";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { AppProvider } from "@/context/AppContext";
import { Suspense } from "react";
import UTMTracker from "@/components/UTMTracker";
import { getDomainConfig } from "@/lib/domain-config";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0D0818",
  colorScheme: "dark",
};

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["400", "500", "600", "700", "800"],
});

import { headers } from 'next/headers';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);

  return {
    metadataBase: new URL(cfg.canonical),
    title: {
      default: cfg.title,
      template: `%s | ${cfg.arenaName} by ${cfg.brand} | ${cfg.tagline}`
    },
    description: cfg.description,
    keywords: cfg.keywords,
    applicationName: cfg.projectName,
    category: 'Real Estate',
    authors: [{ name: cfg.brand }, { name: cfg.coDevName }],
    creator: cfg.brand,
    publisher: cfg.projectName,
    formatDetection: { email: false, address: false, telephone: false },
    openGraph: {
      title: cfg.title,
      description: cfg.description,
      url: cfg.canonical,
      siteName: `${cfg.projectName} by ${cfg.brand}`,
      images: [{ url: cfg.ogImage, width: 1200, height: 630, alt: `${cfg.projectName} by ${cfg.brand} — ${cfg.address.locality}, ${cfg.address.city}` }],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: cfg.title,
      description: cfg.description,
      images: [cfg.ogImage],
    },
    alternates: {
      canonical: cfg.canonical,
    },
    verification: {
      google: cfg.googleVerification,
    },
    icons: {
      icon: [
        { url: '/api/favicon', type: 'image/svg+xml' },
      ],
      shortcut: '/api/favicon',
      apple: [
        { url: '/api/favicon', type: 'image/svg+xml' },
      ],
    },
  };
}

// jsonLd is now built dynamically inside RootLayout using domain config

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  const siteUrl = cfg.canonical;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: `${cfg.projectName} by ${cfg.brand}`,
      url: siteUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: cfg.schemaOrg.orgName,
      url: siteUrl,
      logo: cfg.schemaOrg.logoUrl,
      description: `${cfg.projectName} by ${cfg.brand} — Premium ${cfg.projectConfig.bhkOptions} real estate in ${cfg.address.locality}, ${cfg.address.city}.`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ApartmentComplex',
      name: cfg.arenaName,
      alternateName: [
        'Kohinoor The Arena',
        'Kohinoor The Arena Pimpri',
        'Kohinoor The Arena Pune',
        'Kohinoor Arena Pimpri',
        'Mahalaxmi The Arena',
        'Mahalaxmi The Arena Pimpri',
        'Mahalaxmi Arena Pune',
        'Mahalaxmi Kohinoor The Arena',
        'Kohinoor Mahalaxmi The Arena',
        'Kohinoor Mahalaxmi Arena Pimpri',
        'Mahalaxmi Kohinoor Pimpri',
        'Mahalaxmi Kohinoor Sports Township',
        'Agarwal Sukhwani The Arena Pimpri',
        'Kohinoor Life in Motion Pimpri',
        'The Arena Sports Township Pimpri',
        'The Arena PCMC',
      ],
      image: cfg.ogImage,
      description: cfg.description,
      numberOfRooms: cfg.projectConfig.bhkOptions,
      address: {
        '@type': 'PostalAddress',
        streetAddress: cfg.address.street,
        addressLocality: cfg.address.locality,
        addressRegion: cfg.address.region,
        postalCode: cfg.address.postalCode,
        addressCountry: cfg.address.country,
      },
      geo: { '@type': 'GeoCoordinates', latitude: '18.6278', longitude: '73.7997' },
      containsPlace: [
        { '@type': 'City', name: 'Pimpri Chinchwad', sameAs: 'https://en.wikipedia.org/wiki/Pimpri-Chinchwad' },
        { '@type': 'City', name: 'Pune', sameAs: 'https://en.wikipedia.org/wiki/Pune' },
        { '@type': 'Place', name: 'PCMC Metro Station', sameAs: 'https://en.wikipedia.org/wiki/PCMC_Bhavan_metro_station' },
        { '@type': 'Place', name: 'Pimpri Metro Station' },
        { '@type': 'Place', name: 'Finolex Chowk Pimpri' },
        { '@type': 'Place', name: 'Kohinoor World Towers Pimpri (KWT)' },
        { '@type': 'Place', name: 'Pimpri Railway Station' },
        { '@type': 'Place', name: 'Chinchwad Railway Station' },
        { '@type': 'Place', name: 'Aditya Birla Memorial Hospital' },
        { '@type': 'City', name: 'Wakad' },
        { '@type': 'City', name: 'Hinjewadi' },
        { '@type': 'City', name: 'Ravet' }
      ],
      url: siteUrl,
      telephone: cfg.contactPhone,
      priceRange: `${cfg.projectConfig.startingPrice} - ${cfg.projectConfig.topPrice}`,
      openingHours: 'Mo-Su 10:00-19:00',
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Sports Ecosystem', value: `${cfg.projectConfig.sportsSqFt} Sq. Ft.` },
        { '@type': 'LocationFeatureSpecification', name: 'Sports Management', value: cfg.projectConfig.managedBy },
        { '@type': 'LocationFeatureSpecification', name: 'High-Rise Towers', value: `${cfg.projectConfig.towers} Towers (34 Storeys)` },
        { '@type': 'LocationFeatureSpecification', name: 'MahaRERA Registration', value: cfg.mahaRera },
        { '@type': 'LocationFeatureSpecification', name: 'FIFA Football Turf', value: 'Yes' },
        { '@type': 'LocationFeatureSpecification', name: 'Tennis & Padel Courts', value: 'Yes' },
        { '@type': 'LocationFeatureSpecification', name: 'Pickleball & Basketball Courts', value: 'Yes' },
        { '@type': 'LocationFeatureSpecification', name: 'Olympic-Length Infinity Pool', value: 'Yes' },
        { '@type': 'LocationFeatureSpecification', name: '1,787 Sq. Ft. Cardio Gym', value: 'Yes' },
        { '@type': 'LocationFeatureSpecification', name: 'Japanese Forest Bathing Garden', value: 'Yes' },
        { '@type': 'LocationFeatureSpecification', name: 'Indoor Badminton & Squash Courts', value: 'Yes' },
        { '@type': 'LocationFeatureSpecification', name: 'Metro Proximity', value: '2.4 km from PCMC Metro Station' },
        { '@type': 'LocationFeatureSpecification', name: 'Finolex Chowk Proximity', value: 'Under 5 minutes' },
        { '@type': 'LocationFeatureSpecification', name: 'Commercial Hub Proximity', value: '2 km from Kohinoor World Towers' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${cfg.arenaName} Residential Configurations & Pricing`,
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Accommodation',
              name: `2 BHK Smart Luxury Residences at ${cfg.arenaName}`,
              numberOfBedrooms: 2,
              floorSize: {
                '@type': 'QuantitativeValue',
                value: 865,
                unitCode: 'FTK'
              },
              description: 'Luxury 2 BHK flats with zero-wastage layouts, private balconies, and full access to 80,000 sq.ft. sports ecosystem.'
            },
            price: 12000000,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            validFrom: '2026-01-01'
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Accommodation',
              name: `3 BHK Premium Residences at ${cfg.arenaName}`,
              numberOfBedrooms: 3,
              floorSize: {
                '@type': 'QuantitativeValue',
                value: 1250,
                unitCode: 'FTK'
              },
              description: 'Spacious 3 BHK luxury residences with panoramic views, dual master suites, and dedicated covered parking.'
            },
            price: 17500000,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            validFrom: '2026-01-01'
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Accommodation',
              name: `4 BHK Sky Penthouses at ${cfg.arenaName}`,
              numberOfBedrooms: 4,
              floorSize: {
                '@type': 'QuantitativeValue',
                value: 1980,
                unitCode: 'FTK'
              },
              description: 'Grand 4 BHK sky residences with expansive private decks, staff quarters, and top-tier smart home automation.'
            },
            price: 29500000,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            validFrom: '2026-01-01'
          }
        ]
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      name: `${cfg.brand} & ${cfg.coDevName}`,
      url: siteUrl,
      image: cfg.ogImage,
      description: `${cfg.brand} & ${cfg.coDevName} — Joint venture developers of ${cfg.arenaName}, premium ${cfg.projectConfig.bhkOptions} sports township in ${cfg.address.locality}, ${cfg.address.city}.`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: cfg.address.street,
        addressLocality: cfg.address.locality,
        addressRegion: cfg.address.region,
        postalCode: cfg.address.postalCode,
        addressCountry: cfg.address.country,
      },
      geo: { '@type': 'GeoCoordinates', latitude: '18.6278', longitude: '73.7997' },
      telephone: cfg.contactPhone,
      priceRange: `${cfg.projectConfig.startingPrice} - ${cfg.projectConfig.topPrice}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `Where is Kohinoor The Arena located?`,
          acceptedAnswer: { '@type': 'Answer', text: `Kohinoor The Arena is located at ${cfg.address.street}, ${cfg.address.locality}, ${cfg.address.city}, Maharashtra. It is strategically situated just 2.4 km from PCMC Metro Station, 2 km from Kohinoor World Towers (KWT), near Finolex Chowk, and within 15 minutes of Hinjewadi IT Park.` },
        },
        {
          '@type': 'Question',
          name: `Where is Mahalaxmi The Arena Pimpri?`,
          acceptedAnswer: { '@type': 'Answer', text: `Mahalaxmi The Arena is situated in Pimpri Chinchwad, Pune, on a prime 20-acre land parcel along Old Mumbai Pune Highway, offering direct connectivity to Pimpri Metro, Pimpri Railway Station, and Chinchwad MIDC.` },
        },
        {
          '@type': 'Question',
          name: `What is Kohinoor The Arena and Mahalaxmi The Arena?`,
          acceptedAnswer: { '@type': 'Answer', text: `Kohinoor The Arena and Mahalaxmi The Arena represent PCMC's first authentic active sports township. It features 11 high-rise luxury towers across 34 storeys with an 80,000 Sq.Ft. sports ecosystem managed by ILESEUM Sports Management.` },
        },
        {
          '@type': 'Question',
          name: `Who are the developers of Kohinoor The Arena and Mahalaxmi The Arena?`,
          acceptedAnswer: { '@type': 'Answer', text: `The project is a prestigious landmark joint venture between Kohinoor Group (40+ years legacy), Mahalaxmi Group (25+ years legacy | 4.2M Sq.Ft. delivered), and Agarwal Sukhwani Associates.` },
        },
        {
          '@type': 'Question',
          name: `Is Kohinoor The Arena a sports township?`,
          acceptedAnswer: { '@type': 'Answer', text: `Yes. Kohinoor The Arena is Pune and PCMC's premier sports township featuring an expansive 80,000 Sq.Ft. athletic ecosystem with a professional cricket ground, FIFA football turf, tennis court, padel court, pickleball court, basketball court, Olympic-length infinity swimming pool, and 1,787 sq.ft. cardio gymnasium operated by ILESEUM.` },
        },
        {
          '@type': 'Question',
          name: `What is the price of Kohinoor The Arena & Mahalaxmi The Arena?`,
          acceptedAnswer: { '@type': 'Answer', text: `Prices start at ₹1.20 Crore for 2 BHK Smart Residences, ₹1.75 Crore onwards for 3 BHK Luxury Residences, and ₹2.95 Crore onwards for 4 BHK Sky Penthouses. Early bird payment plans and bank approvals from SBI, HDFC, ICICI, and Axis Bank are available.` },
        },
        {
          '@type': 'Question',
          name: `What configurations are available at The Arena?`,
          acceptedAnswer: { '@type': 'Answer', text: `The Arena offers luxury 2 BHK, 3 BHK, and 4 BHK high-rise residences with zero-wastage layouts, panoramic private balconies, expansive master suites, and cross-ventilation designed for natural lighting.` },
        },
        {
          '@type': 'Question',
          name: `Does The Arena have a sports club and what is ILESEUM Sports Management?`,
          acceptedAnswer: { '@type': 'Answer', text: `Yes, Club Ileseum is operated by ILESEUM Sports Management (managing 126+ sports clubs pan-India). They provide professional NIS-certified coaches, youth training academies, fitness assessments, and organized residential sports leagues.` },
        },
        {
          '@type': 'Question',
          name: `How many towers and floors are in The Arena?`,
          acceptedAnswer: { '@type': 'Answer', text: `The Arena features 11 grand residential towers soaring up to 34 storeys high, providing unhindered panoramic views across Pune's skyline.` },
        },
        {
          '@type': 'Question',
          name: `How far is The Arena from PCMC Metro Station and Finolex Chowk?`,
          acceptedAnswer: { '@type': 'Answer', text: `The Arena is just 2.4 km from PCMC Metro Station (5-minute drive), under 5 minutes from Finolex Chowk, 2 km from Kohinoor World Towers, and 2.8 km from Pimpri Railway Station.` },
        },
        {
          '@type': 'Question',
          name: `Is Kohinoor The Arena MahaRERA registered?`,
          acceptedAnswer: { '@type': 'Answer', text: `Yes, Kohinoor The Arena and Mahalaxmi The Arena are fully registered under MahaRERA with registration number PR1261012602774. All sanctioned plans, title certificates, and 70% escrow account compliances are verified on the official MahaRERA portal.` },
        },
        {
          '@type': 'Question',
          name: `What is the possession date of The Arena?`,
          acceptedAnswer: { '@type': 'Answer', text: `Possession is scheduled starting from 2027 onwards in phased handovers as per MahaRERA milestone schedules.` },
        },
        {
          '@type': 'Question',
          name: `Is Kohinoor The Arena good for investment in Pune / PCMC?`,
          acceptedAnswer: { '@type': 'Answer', text: `Yes. Located near the Hinjewadi IT corridor, PCMC Metro, and Kohinoor World Towers, The Arena projects a gross rental yield of 4.5%–5.2% (higher than the PCMC average of 3.4%) and capital appreciation potential of 14%–18% during the construction cycle.` },
        },
        {
          '@type': 'Question',
          name: `How to book a flat and arrange a site visit at Kohinoor The Arena?`,
          acceptedAnswer: { '@type': 'Answer', text: `To schedule an official VIP site visit, download the official brochure, or reserve a preferred inventory unit via Expression of Interest (EOI), submit your enquiry on the website or contact the sales advisory team directly at ${cfg.contactPhone}.` },
        },
        {
          '@type': 'Question',
          name: `पिंपरी मध्ये 2 व 3 BHK फ्लॅट बुकिंग कशी करावी? (Pimpri madhe flat booking)`,
          acceptedAnswer: { '@type': 'Answer', text: `पिंपरी मधील The Arena (Kohinoor & Mahalaxmi Group) मध्ये २ आणि ३ बीएचके फ्लॅट बुकिंगसाठी अधिकृत वेबसाईटवरून VIP साईट व्हिजिट फॉर्म सबमिट करू शकता. ईओआय (EOI) द्वारे प्राधान्य युनिट निवडता येते.` },
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `How to Book a Flat at ${cfg.arenaName}`,
      description: `Step-by-step guide to booking a ${cfg.projectConfig.bhkOptions} luxury residence at ${cfg.arenaName} by ${cfg.brand} in ${cfg.address.locality}, Pune.`,
      totalTime: 'P7D',
      estimatedCost: { '@type': 'MonetaryAmount', currency: 'INR', value: cfg.projectConfig.startingPrice },
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Verify MahaRERA', text: `Verify ${cfg.arenaName}'s MahaRERA registration at maharera.mahaonline.gov.in using registration number ${cfg.mahaRera}.` },
        { '@type': 'HowToStep', position: 2, name: 'Schedule a Site Visit', text: `Call ${cfg.contactPhone} or submit your interest via the form on this page to book a VIP site visit.` },
        { '@type': 'HowToStep', position: 3, name: 'Choose Your Configuration', text: `Select from ${cfg.projectConfig.bhkOptions} luxury residences across ${cfg.projectConfig.towers} towers. Pricing starts at ${cfg.projectConfig.startingPrice}.` },
        { '@type': 'HowToStep', position: 4, name: 'Submit Expression of Interest', text: 'Pay the Expression of Interest (EOI) amount to block your preferred unit. EOI is fully refundable.' },
        { '@type': 'HowToStep', position: 5, name: 'Arrange Home Loan', text: 'The Arena is approved by all major banks including HDFC, SBI, ICICI, and Axis Bank. Our relationship managers assist with loan processing.' },
        { '@type': 'HowToStep', position: 6, name: 'Sign Agreement for Sale', text: 'Sign the MahaRERA-compliant Agreement for Sale. 70% of your payments are protected in an escrow account.' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: cfg.arenaName, item: `${siteUrl}${cfg.primarySlug}` },
        { '@type': 'ListItem', position: 3, name: `${cfg.projectConfig.bhkOptions} Flats in ${cfg.address.locality}`, item: `${siteUrl}/pcmc-premium-real-estate` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'RealEstateAgent'],
      '@id': `${siteUrl}/#business`,
      name: `${cfg.arenaName} by ${cfg.brand}`,
      description: cfg.description,
      url: siteUrl,
      telephone: cfg.contactPhone,
      email: `info@${cfg.canonical.replace('https://www.', '')}`,
      priceRange: `${cfg.projectConfig.startingPrice} - ${cfg.projectConfig.topPrice}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: cfg.address.street,
        addressLocality: cfg.address.locality,
        addressRegion: cfg.address.region,
        postalCode: cfg.address.postalCode,
        addressCountry: cfg.address.country,
      },
      geo: { '@type': 'GeoCoordinates', latitude: '18.6278', longitude: '73.7997' },
      hasMap: 'https://maps.google.com/?q=18.6278,73.7997',
      image: cfg.ogImage,
      logo: cfg.schemaOrg.logoUrl,
      sameAs: cfg.sameAs,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: cfg.aggregateRating.ratingValue,
        reviewCount: cfg.aggregateRating.reviewCount,
        bestRating: cfg.aggregateRating.bestRating,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
          opens: '10:00',
          closes: '19:00',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: `VIP Site Visit — ${cfg.arenaName}`,
      description: `Book a VIP site visit to ${cfg.arenaName} by ${cfg.brand} in ${cfg.address.locality}, ${cfg.address.city}.`,
      startDate: new Date().toISOString().split('T')[0],
      endDate: cfg.projectConfig.possessionYear + '-12-31',
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: cfg.arenaName,
        address: {
          '@type': 'PostalAddress',
          streetAddress: cfg.address.street,
          addressLocality: cfg.address.locality,
          addressRegion: cfg.address.region,
          postalCode: cfg.address.postalCode,
          addressCountry: cfg.address.country,
        },
        geo: { '@type': 'GeoCoordinates', latitude: '18.6278', longitude: '73.7997' },
      },
      organizer: {
        '@type': 'Organization',
        name: cfg.brand,
        url: siteUrl,
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: siteUrl,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${siteUrl}/#webpage`,
      url: siteUrl,
      name: cfg.title,
      description: cfg.description,
      dateModified: new Date().toISOString(),
      inLanguage: 'en-IN',
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: {
        '@type': 'ApartmentComplex',
        name: cfg.arenaName,
        '@id': `${siteUrl}/#apartment`,
      },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.hero-title', '.hero-subtitle', '.section-title'],
      },
    },
  ];

  return (
    <html lang="en" className={`${outfit.variable} ${plusJakartaSans.variable}`}>
      <head>
        <meta name="google-site-verification" content={cfg.googleVerification} />
        {/* ── Resource Hints for Google Core Web Vitals (INP / LCP) ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" />
        <link rel="icon" href="/api/favicon" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/api/favicon" />
        <link rel="search" type="application/opensearchdescription+xml" title={`${cfg.projectName} Search`} href="/opensearch.xml" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content={cfg.arenaName} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* ── Google Compliance: hreflang + Canonical Cross-Domain Signals ── */}
        {/* Tells Google these two domains are related, not duplicates */}
        <link rel="alternate" hrefLang="en-IN" href="https://kohinoorthearena.in" />
        <link rel="alternate" hrefLang="en-IN" href="https://mahalaxmithearena.in" />
        
        {/* ── Global NRI Targeting (USA, UK, UAE) ── */}
        <link rel="alternate" hrefLang="en-US" href={siteUrl} />
        <link rel="alternate" hrefLang="en-GB" href={siteUrl} />
        <link rel="alternate" hrefLang="en-AE" href={siteUrl} />
        
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
        <link rel="canonical" href={siteUrl} />

        {/* Core Web Vitals (LCP) Hardening — preload domain-specific hero */}
        <link rel="preload" href={`${siteUrl}/assets/images/hero.jpg`} as="image" fetchPriority="high" />
        
        {/* Organization Schema sameAs links */}
        {cfg.sameAs && cfg.sameAs.map((link, index) => (
          <link key={index} rel="alternate" href={link} />
        ))}

        {/* Performance Hardening: Preconnect to Analytics Domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        
        {/* Google Analytics 4 */}
        <Script 
          src={`https://www.googletagmanager.com/gtag/js?id=${cfg.ga4Id}`} 
          strategy="afterInteractive" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${cfg.ga4Id}');
          `}
        </Script>

        {/* Google Tag Manager */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
            `}
          </Script>
        )}

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${cfg.metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Google reCAPTCHA v3 */}
        {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
          <Script 
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            strategy="afterInteractive"
          />
        )}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe 
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0" 
              width="0" 
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        
        <Suspense fallback={null}>
          <UTMTracker />
        </Suspense>
        <AppProvider>
          <GlobalScripts />
          <Modals />
          <FloatingWhatsApp />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
