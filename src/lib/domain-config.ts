// ─────────────────────────────────────────────────────────────────
// DOMAIN CONFIGURATION — Single Source of Truth
//
// Both kohinoorthearena.in and mahalaxmithearena.in are served from
// the same Next.js codebase. This file controls exactly how each
// domain behaves: its SEO metadata, schema, brand, and routing.
// ─────────────────────────────────────────────────────────────────

export type DomainConfig = {
  brand: string;               // Developer / builder name
  coDevName: string;           // Joint venture partner name
  projectName: string;         // Full project name
  arenaName: string;           // Short display name for the arena
  tagline: string;
  canonical: string;
  sitemapUrl: string;
  ogImage: string;
  title: string;
  description: string;
  keywords: string[];
  primarySlug: string;         // The page this domain's root '/' maps to
  mahaRera: string;
  contactPhone: string;
  address: {
    street: string;
    locality: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    landmark: string;
  };
  projectConfig: {
    towers: number;
    units: number;
    floors: number;
    sportsSqFt: string;
    startingPrice: string;
    topPrice: string;
    bhkOptions: string;        // e.g. '2, 3 & 4 BHK'
    possessionYear: string;
    managedBy: string;         // Sports management company
  };
  schemaOrg: {
    websiteUrl: string;
    orgName: string;
    logoUrl: string;
  };
  googleVerification: string;
  ga4Id: string;           // GA4 Measurement ID from env
  metaPixelId: string;     // Meta Pixel ID from env
  aggregateRating: {
    ratingValue: number;
    reviewCount: number;
    bestRating: number;
  };
  sameAs: string[];        // Knowledge Graph entity links
};

// ── Master Keyword Bank (Google, AI Search & Multilingual Search Compliance) ──
const MASTER_SHARED_KEYWORDS = [
  // 1. Core Project & Joint Venture Entities
  'Kohinoor The Arena', 'Mahalaxmi The Arena', 'Mahalaxmi Kohinoor The Arena', 'Kohinoor Mahalaxmi The Arena',
  'Kohinoor Mahalaxmi Arena Pimpri', 'Mahalaxmi Kohinoor Pimpri', 'Kohinoor Mahalaxmi Pimpri',
  'Kohinoor Mahalaxmi Arena Pune', 'Kohinoor Mahalaxmi residential project', 'Kohinoor Mahalaxmi joint venture',
  'Kohinoor and Mahalaxmi project Pimpri', 'Kohinoor Mahalaxmi luxury apartments', 'Kohinoor Mahalaxmi township',
  'Kohinoor Mahalaxmi sports township', 'Mahalaxmi Kohinoor joint venture Pune', 'Mahalaxmi Kohinoor residential project',
  'Mahalaxmi Group Kohinoor Group project', 'Kohinoor Group new project Pimpri', 'Mahalaxmi Group new project Pimpri',
  'Kohinoor Group Pimpri flats', 'Mahalaxmi Group Pimpri flats', 'Agarwal Sukhwani Kohinoor Mahalaxmi',
  'Agarwal Sukhwani The Arena Pimpri', 'Agarwal Sukhwani Associates Pune', 'Agarwal Sukhwani residential projects',
  'Kohinoor Mahalaxmi 2 BHK', 'Kohinoor Mahalaxmi 3 BHK', 'Kohinoor Mahalaxmi 4 BHK',
  'Kohinoor Mahalaxmi project price', 'Kohinoor Mahalaxmi project location', 'Kohinoor Mahalaxmi project brochure',
  'Kohinoor Mahalaxmi partnership', 'ILESEUM sports management Pune', 'ILESEUM sports ecosystem',

  // 2. Life in Motion Legacy & Search Capture Signals
  'Life in Motion Pimpri', 'Life in Motion Pune', 'Life in Motion PCMC', 'Kohinoor Life in Motion',
  'Kohinoor Life in Motion Pimpri', 'Mahalaxmi Life in Motion', 'Life in Motion Kohinoor Pimpri',
  'Life in Motion Mahalaxmi Pimpri', 'Life in Motion residential project', 'Life in Motion township Pune',
  'Life in Motion sports township', 'Life in Motion apartments', 'Life in Motion luxury flats',
  'Life in Motion 2 BHK', 'Life in Motion 3 BHK', 'Life in Motion 4 BHK', 'Life in Motion price',
  'Life in Motion brochure', 'Life in Motion floor plan', 'Life in Motion location', 'Life in Motion amenities',
  'Life in Motion booking', 'Life in Motion site visit', 'Life in Motion Pimpri reviews',
  'Life in Motion sports facilities', 'Life in Motion ILESEUM', 'Life in Motion Pimpri contact',
  'Life in Motion new launch Pune', 'Life in Motion residential towers',

  // 3. Configurations (2 BHK, 3 BHK & 4 BHK)
  '2 BHK flats in Kohinoor The Arena', 'Kohinoor The Arena 2 BHK', 'Kohinoor Arena 2 BHK Pimpri',
  'Mahalaxmi The Arena 2 BHK', '2 BHK Mahalaxmi Kohinoor Pimpri', '2 BHK flats in Mahalaxmi The Arena',
  '2 BHK luxury apartments Pimpri', '2 BHK flats near Finolex Chowk', '2 BHK flats near Pimpri Metro Station',
  '2 BHK flats near Old Mumbai Pune Highway', '2 BHK new launch Pimpri', '2 BHK premium flats PCMC',
  '2 BHK sports township apartments Pune', '2 BHK flats with sports amenities', '2 BHK flats with clubhouse Pimpri',
  '2 BHK flats with swimming pool Pimpri', '2 BHK flats with gym Pimpri', '2 BHK apartments with balcony Pimpri',
  '2 BHK flats for sale Pimpri', '2 BHK property investment Pimpri',
  '3 BHK flats in Kohinoor The Arena', 'Kohinoor The Arena 3 BHK', 'Kohinoor Arena 3 BHK Pimpri',
  'Mahalaxmi The Arena 3 BHK', '3 BHK Mahalaxmi Kohinoor Pimpri', '3 BHK flats in Mahalaxmi The Arena',
  '3 BHK luxury apartments Pimpri', '3 BHK premium flats PCMC', '3 BHK flats near Finolex Chowk',
  '3 BHK flats near Pimpri Metro', '3 BHK flats near Old Mumbai Pune Highway', '3 BHK new launch Pimpri Pune',
  '3 BHK sports township Pune', '3 BHK flats with sports amenities', '3 BHK apartments with clubhouse',
  '3 BHK flats with swimming pool', '3 BHK flats with gym Pimpri', '3 BHK spacious apartments Pimpri',
  '3 BHK flats for sale Pimpri', '3 BHK investment property Pimpri',
  '4 BHK flats in Kohinoor The Arena', 'Kohinoor The Arena 4 BHK', 'Mahalaxmi The Arena 4 BHK',
  '4 BHK luxury apartments Pimpri', '4 BHK premium flats PCMC', '4 BHK sky residences Pimpri',
  '4 BHK penthouse Pimpri', '4 BHK high rise apartments Pune', '4 BHK luxury homes Pimpri',
  '4 BHK flats with panoramic views', '4 BHK flats with premium amenities', '4 BHK flats with clubhouse',
  '4 BHK flats for sale Pimpri', '4 BHK luxury property PCMC',

  // 4. Sports Township & Active Lifestyle Silo
  'sports township in Pune', 'sports township in Pimpri', 'sports township in PCMC',
  'sports township in Pimpri Chinchwad', 'Pune first sports township', 'luxury sports township Pune',
  'residential sports township Pune', 'sports lifestyle apartments Pune', 'sports themed residential project Pune',
  'sports integrated township Pimpri', 'sports integrated residential project', 'sports community apartments Pune',
  'sports centric township Pune', 'fitness lifestyle apartments Pimpri', 'active lifestyle homes Pune',
  'athletic lifestyle township', 'luxury township with sports amenities', 'apartments with sports facilities Pune',
  'residential project with sports club', 'apartments with professional sports facilities',
  'luxury apartments with sports academy', 'family sports township Pune', 'sports township with 2 BHK flats',
  'sports township with 3 BHK flats', 'sports township with 4 BHK flats', 'best sports township in PCMC',
  'new sports township project Pune',

  // 5. Specific Sports, Court & Wellness Amenities
  'apartments with football turf Pimpri', 'flats with FIFA football turf Pune', 'residential project with football ground',
  'apartments with tennis court Pimpri', 'flats with tennis court Pune', 'apartments with padel court Pune',
  'residential project with padel court', 'apartments with pickleball court Pune', 'flats with basketball court Pimpri',
  'apartments with outdoor sports facilities', 'residential project with jogging track', 'apartments with multi sport courts',
  'flats with sports arena Pimpri', 'apartments with infinity pool Pimpri', 'luxury flats with swimming pool Pune',
  'residential project with jacuzzi Pimpri', 'apartments with heated jacuzzi', 'flats with kids swimming pool',
  'apartments with wellness centre Pune', 'luxury apartments with sauna', 'apartments with steam room',
  'residential project with spa facilities', 'apartments with meditation garden', 'apartments with forest bathing garden',
  'zen garden apartments Pune', 'luxury wellness township Pune', 'apartments with luxury clubhouse Pimpri',
  'residential project with indoor games', 'apartments with badminton court Pune', 'flats with squash court Pimpri',
  'apartments with indoor sports arena', 'luxury flats with gym Pimpri', 'apartments with co working space',
  'residential project with mini theatre', 'apartments with kids creche', 'flats with guest suites',
  'apartments with sports bar', 'apartments with indoor recreation centre',

  // 6. Locality, Infrastructure, Metro & Industrial Nodes
  'flats in Pimpri Pune', 'apartments in Pimpri Pune', 'luxury flats in Pimpri', 'premium flats in Pimpri',
  'new residential projects in Pimpri', 'new launch projects in Pimpri', 'upcoming projects in Pimpri',
  'under construction projects in Pimpri', 'luxury apartments in Pimpri Chinchwad', 'residential projects in PCMC',
  'premium residential projects PCMC', 'new flats in PCMC', 'flats near Finolex Chowk', 'apartments near Finolex Chowk',
  'flats near Pimpri MIDC', 'flats near Pimpri Railway Station', 'flats near PCMC Metro Station',
  'flats near Old Mumbai Pune Highway', 'flats near Pimpri Central Mall', 'flats near Chinchwad',
  'flats near Morewadi Pimpri', 'flats near Empire Estate', 'luxury flats near PCMC office',
  'apartments near Pimpri market', 'flats near Pimpri Metro Station', 'apartments near PCMC Metro Station',
  'luxury flats near metro station Pimpri', 'residential projects near Pimpri Railway Station',
  'flats near Chinchwad Railway Station', 'apartments near Old Mumbai Pune Highway',
  'flats near Mumbai Pune Highway Pimpri', 'flats near Chinchwad MIDC', 'apartments near Bhosari MIDC',
  'flats near PCMC office Pune', 'apartments near Aditya Birla Hospital', 'flats near DY Patil College Pimpri',
  'apartments near major schools Pimpri', 'flats with metro connectivity PCMC', 'residential projects near industrial hubs Pune',
  'Kohinoor World Towers Pimpri', 'Kohinoor World Tower Pimpri', 'KWT Pimpri', 'property near Kohinoor World Towers',

  // 7. Pricing, Commercial Intent & Buyer Actions
  'Kohinoor The Arena price', 'Mahalaxmi The Arena price', 'Kohinoor Mahalaxmi price',
  'Kohinoor The Arena price list', 'Mahalaxmi The Arena price list', 'Kohinoor The Arena 2 BHK price',
  'Kohinoor The Arena 3 BHK price', 'Kohinoor The Arena 4 BHK price', 'Mahalaxmi The Arena 2 BHK price',
  'Mahalaxmi The Arena 3 BHK price', 'Mahalaxmi The Arena 4 BHK price', 'Kohinoor The Arena cost per square foot',
  'Mahalaxmi The Arena cost per square foot', 'Kohinoor Arena apartment rates', 'Mahalaxmi Arena apartment rates',
  'Kohinoor The Arena payment plan', 'Mahalaxmi The Arena payment plan', 'Kohinoor The Arena booking amount',
  'Mahalaxmi The Arena booking amount', 'Kohinoor The Arena down payment', 'Mahalaxmi The Arena EMI',
  'Kohinoor The Arena offers', 'Mahalaxmi The Arena offers', 'Kohinoor The Arena pre launch offers',
  'Mahalaxmi The Arena early bird offers', 'Kohinoor The Arena investment value', 'Mahalaxmi The Arena investment potential',
  'buy flat in Kohinoor The Arena Pimpri', 'buy apartment in Mahalaxmi The Arena', 'book Kohinoor The Arena Pimpri',
  'book Mahalaxmi The Arena Pimpri', 'Kohinoor Arena property enquiry', 'Mahalaxmi Arena property enquiry',
  'Kohinoor The Arena site visit booking', 'Mahalaxmi The Arena site visit booking',
  'Kohinoor The Arena sales office contact', 'Mahalaxmi The Arena sales team',
  'Kohinoor The Arena official brochure download', 'Mahalaxmi The Arena floor plan download',
  'Kohinoor Arena sample flat', 'Mahalaxmi Arena sample flat', 'Kohinoor Arena available flats',
  'Mahalaxmi Arena available inventory', 'Kohinoor Arena latest price', 'Mahalaxmi Arena latest price',
  'Kohinoor Arena possession details', 'Mahalaxmi Arena possession details', 'Kohinoor Arena construction updates',
  'Mahalaxmi Arena construction updates', 'Kohinoor Arena RERA details', 'Mahalaxmi Arena RERA registration',

  // 8. Competitive Comparisons & Reviews
  'best residential projects in Pimpri', 'best luxury apartments in Pimpri', 'best new launch projects in PCMC',
  'best township projects in Pune', 'best sports township in Pune', 'best luxury township in PCMC',
  'Kohinoor The Arena vs other Pimpri projects', 'Kohinoor The Arena vs Kohinoor Shangrila',
  'Kohinoor Arena vs Mahalaxmi Arena', 'Mahalaxmi The Arena vs other luxury projects Pune',
  'Kohinoor The Arena review', 'Mahalaxmi The Arena review', 'Kohinoor The Arena advantages',
  'Mahalaxmi The Arena advantages', 'Kohinoor Arena investment comparison', 'sports township vs regular apartments',
  'luxury apartments vs township Pune', 'best 2 BHK projects Pimpri', 'best 3 BHK projects Pimpri', 'best 4 BHK projects Pimpri',

  // 9. Conversational Queries & Voice Search (Google SGE / PAA)
  'Where is Kohinoor The Arena located?', 'Where is Mahalaxmi The Arena Pimpri?', 'What is Kohinoor The Arena?',
  'What is Mahalaxmi The Arena?', 'Who is developing Kohinoor The Arena?', 'Who are the developers of Mahalaxmi The Arena?',
  'Is Kohinoor The Arena a sports township?', 'What is the price of Kohinoor The Arena?', 'What is the price of Mahalaxmi The Arena?',
  'What configurations are available at The Arena?', 'Is 2 BHK available in Kohinoor The Arena?',
  'Is 3 BHK available in Mahalaxmi The Arena?', 'What are the amenities in Kohinoor The Arena?',
  'Does The Arena have a sports club?', 'What is ILESEUM Sports Management?', 'What is the total sports area of The Arena?',
  'How many towers are there in The Arena?', 'How many floors does Kohinoor The Arena have?',
  'What is the location advantage of The Arena Pimpri?', 'How far is The Arena from PCMC Metro Station?',
  'Is Kohinoor The Arena MahaRERA registered?', 'What is the possession date of The Arena?',
  'Is Kohinoor The Arena good for investment?', 'How to book a flat in Mahalaxmi The Arena?',
  'How to arrange a site visit at Kohinoor The Arena?',

  // 10. Marathi & Regional Language High-Volume Keywords
  'Kohinoor The Arena Pimpri Marathi', 'Mahalaxmi The Arena Pimpri Marathi',
  'पिंपरी मध्ये 2 BHK फ्लॅट', 'पिंपरी मध्ये 3 BHK फ्लॅट', 'पिंपरी मध्ये 4 BHK फ्लॅट',
  'पिंपरी मध्ये नवीन प्रोजेक्ट', 'पिंपरी मध्ये लक्झरी फ्लॅट', 'पिंपरी चिंचवड मध्ये फ्लॅट',
  'पिंपरी मध्ये नवीन लॉन्च प्रोजेक्ट', 'कोहिनूर द अरेना पिंपरी', 'महालक्ष्मी द अरेना पिंपरी',
  'कोहिनूर महालक्ष्मी पिंपरी', 'पिंपरी स्पोर्ट्स टाउनशिप', 'पिंपरी मध्ये फ्लॅटची किंमत',
  'पिंपरी मध्ये 2 BHK घर', 'पिंपरी मध्ये 3 BHK घर', 'Pimpri mein 2 BHK flat',
  'Pimpri mein 3 BHK flat', 'Kohinoor The Arena Pimpri price', 'Mahalaxmi The Arena booking',
  'Pimpri luxury flats price', 'Pimpri madhe flat', 'Pimpri madhe ghar', 'PCMC madhe flat',

  // 11. High-Intent Long-Tail Strings
  'luxury 2 BHK apartments in Pimpri with sports amenities', 'premium 3 BHK apartments in Pimpri with clubhouse',
  '4 BHK luxury apartments in Pimpri Pune', 'new launch luxury flats near Finolex Chowk',
  'premium residential township near Pimpri Metro', 'sports township apartments near Old Mumbai Pune Highway',
  'luxury flats with infinity swimming pool in Pimpri', 'apartments with football turf and tennis courts in Pune',
  'premium flats with professional sports facilities PCMC', 'luxury residential project with 80000 sq ft sports ecosystem',
  'residential project with 30 plus amenities Pimpri', '11 tower residential township in Pimpri Pune',
  '34 storey luxury apartments in Pimpri', 'premium apartments with indoor badminton and squash courts',
  'luxury apartments with Japanese forest bathing garden', 'residential township with sports management in Pune',
  'apartments with dedicated sports and wellness facilities', 'luxury apartments near Pimpri railway station',
  'new residential township by Kohinoor and Mahalaxmi Group', 'premium 2 3 and 4 BHK apartments Pimpri Pune',
  'best luxury sports lifestyle apartments in PCMC',
];

export const DOMAIN_CONFIGS: Record<string, DomainConfig> = {
  // ── Kohinoor Domain ───────────────────────────────────────────
  'kohinoorthearena.in': {
    brand: 'Kohinoor Group',
    coDevName: 'Mahalaxmi Group',
    projectName: 'Kohinoor The Arena',
    arenaName: 'Kohinoor The Arena',
    tagline: 'The Arena | Pimpri Chinchwad, Pune',
    canonical: 'https://www.kohinoorthearena.in',
    sitemapUrl: 'https://www.kohinoorthearena.in/sitemap.xml',
    ogImage: 'https://www.kohinoorthearena.in/assets/images/hero.jpg',
    title: 'Kohinoor The Arena by Kohinoor Group | 2, 3 & 4 BHK in Pimpri Chinchwad, Pune',
    description: 'Kohinoor The Arena by Kohinoor Group & Mahalaxmi Group — PCMC\'s premier sports township in Pimpri Chinchwad, Pune. 2, 3 & 4 BHK luxury residences across 11 towers with an 80,000 Sq. Ft. active sports ecosystem managed by ILESEUM. Near PCMC Metro & KWT.',
    keywords: [
      'Kohinoor The Arena',
      'Kohinoor The Arena Pimpri',
      'Kohinoor The Arena Pune',
      'Kohinoor The Arena PCMC',
      'Kohinoor The Arena Pimpri Pune',
      'Kohinoor Arena Pimpri',
      'Kohinoor Arena Pune',
      'Kohinoor Arena PCMC',
      'Kohinoor The Arena flats',
      'Kohinoor The Arena apartments',
      'Kohinoor The Arena residential project',
      'Kohinoor The Arena luxury apartments',
      'Kohinoor The Arena residential towers',
      'Kohinoor The Arena township',
      'Kohinoor The Arena sports township',
      'Kohinoor The Arena new project',
      'Kohinoor The Arena new launch',
      'Kohinoor The Arena pre launch',
      'Kohinoor The Arena booking',
      'Kohinoor The Arena enquiry',
      'Kohinoor The Arena brochure',
      'Kohinoor The Arena floor plan',
      'Kohinoor The Arena master plan',
      'Kohinoor The Arena price',
      'Kohinoor The Arena price list',
      'Kohinoor The Arena cost',
      'Kohinoor The Arena location',
      'Kohinoor The Arena address',
      'Kohinoor The Arena amenities',
      'Kohinoor The Arena specifications',
      'Kohinoor The Arena reviews',
      'Kohinoor The Arena photos',
      'Kohinoor The Arena images',
      'Kohinoor The Arena construction status',
      'Kohinoor The Arena possession date',
      'Kohinoor The Arena MahaRERA',
      'Kohinoor The Arena contact number',
      'Kohinoor The Arena sales office',
      'Kohinoor The Arena site visit',
      'Kohinoor The Arena offers',
      'Kohinoor The Arena investment',
      'Kohinoor The Arena 2 BHK',
      'Kohinoor The Arena 3 BHK',
      'Kohinoor The Arena 4 BHK',
      'Kohinoor Arena 2 BHK Pimpri',
      'Kohinoor Arena 3 BHK Pimpri Chinchwad',
      'Kohinoor Arena 4 BHK PCMC',
      'Kohinoor World Towers Pimpri',
      'Kohinoor World Tower Pimpri',
      'Kohinoor Group real estate Pune',
      ...MASTER_SHARED_KEYWORDS,
    ],
    primarySlug: '/kohinoor-the-arena-pimpri',
    mahaRera: 'PR1261012602774',
    contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91-7744009295',
    address: {
      street: 'The Arena, Sports Township, Pimpri',
      locality: 'Pimpri-Chinchwad',
      city: 'Pune',
      region: 'Maharashtra',
      postalCode: '411018',
      country: 'IN',
      landmark: '2.4 km from PCMC Metro Station, 2 km from Kohinoor World Towers',
    },
    projectConfig: {
      towers: 11,
      units: 2500,
      floors: 30,
      sportsSqFt: '80,000',
      startingPrice: '₹1.20 Cr',
      topPrice: '₹2.95 Cr',
      bhkOptions: '2, 3 & 4 BHK',
      possessionYear: '2027',
      managedBy: 'ILESEUM Sports Management',
    },
    schemaOrg: {
      websiteUrl: 'https://www.kohinoorthearena.in',
      orgName: 'Kohinoor Group',
      logoUrl: 'https://www.kohinoorthearena.in/assets/images/kohinoor-logo.svg',
    },
    googleVerification: '2ra2pGDEk6-2G2LYEGVQG6f5zRnF_3UG_gMJWAwAbE8',
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID || 'G-PLACEHOLDER',
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '0',
    aggregateRating: { ratingValue: 4.8, reviewCount: 127, bestRating: 5 },
    sameAs: [
      'https://www.facebook.com/KohinoorGroup',
      'https://www.linkedin.com/company/kohinoor-group',
      'https://www.instagram.com/kohinoor_group',
      'https://www.99acres.com/kohinoor-the-arena-pimpri-prpfid16960',
      'https://www.magicbricks.com/property-for-sale/residential-properties/pimpri-chinchwad-pune',
      'https://en.wikipedia.org/wiki/Pimpri-Chinchwad'
    ],
  },

  // ── Mahalaxmi Domain ──────────────────────────────────────────
  'mahalaxmithearena.in': {
    brand: 'Mahalaxmi Group',
    coDevName: 'Kohinoor Group',
    projectName: 'Mahalaxmi The Arena',
    arenaName: 'Mahalaxmi The Arena',
    tagline: 'The Arena | Pimpri, Pune',
    canonical: 'https://www.mahalaxmithearena.in',
    sitemapUrl: 'https://www.mahalaxmithearena.in/sitemap.xml',
    ogImage: 'https://www.mahalaxmithearena.in/assets/images/hero.jpg',
    title: 'Mahalaxmi The Arena by Mahalaxmi Group | 2, 3 & 4 BHK in Pimpri, Pune',
    description: 'Mahalaxmi The Arena by Mahalaxmi Group & Kohinoor Group — Pimpri\'s ultra-modern sports township in Pune. 2, 3 & 4 BHK luxury residences across 11 towers with an 80,000 Sq. Ft. active sports ecosystem managed by ILESEUM. Near PCMC Metro & KWT.',
    keywords: [
      'Mahalaxmi The Arena',
      'Mahalaxmi The Arena Pimpri',
      'Mahalaxmi The Arena Pune',
      'Mahalaxmi The Arena PCMC',
      'Mahalaxmi The Arena Pimpri Pune',
      'Mahalaxmi Arena Pimpri',
      'Mahalaxmi Arena Pune',
      'Mahalaxmi The Arena flats',
      'Mahalaxmi The Arena apartments',
      'Mahalaxmi The Arena residential project',
      'Mahalaxmi The Arena luxury flats',
      'Mahalaxmi The Arena township',
      'Mahalaxmi The Arena sports township',
      'Mahalaxmi The Arena new launch',
      'Mahalaxmi The Arena pre launch',
      'Mahalaxmi The Arena booking',
      'Mahalaxmi The Arena price',
      'Mahalaxmi The Arena price list',
      'Mahalaxmi The Arena brochure',
      'Mahalaxmi The Arena floor plan',
      'Mahalaxmi The Arena master plan',
      'Mahalaxmi The Arena location',
      'Mahalaxmi The Arena address',
      'Mahalaxmi The Arena amenities',
      'Mahalaxmi The Arena specifications',
      'Mahalaxmi The Arena reviews',
      'Mahalaxmi The Arena photos',
      'Mahalaxmi The Arena images',
      'Mahalaxmi The Arena construction status',
      'Mahalaxmi The Arena possession date',
      'Mahalaxmi The Arena MahaRERA',
      'Mahalaxmi The Arena contact number',
      'Mahalaxmi The Arena sales office',
      'Mahalaxmi The Arena site visit',
      'Mahalaxmi The Arena offers',
      'Mahalaxmi The Arena investment',
      'Mahalaxmi The Arena 2 BHK',
      'Mahalaxmi The Arena 3 BHK',
      'Mahalaxmi The Arena 4 BHK',
      'Mahalaxmi Kohinoor Pimpri',
      'Mahalaxmi Group Pimpri',
      'Mahalaxmi Group Pune',
      'Mahalaxmi Arena PCMC',
      'Mahalaxmi Group real estate Pune',
      'Mahalaxmi Arena 2 BHK Pimpri',
      'Mahalaxmi Arena 3 BHK Pune',
      'Mahalaxmi Arena 4 BHK PCMC',
      'The Arena Pimpri Pune',
      'Mahalaxmi Kohinoor township',
      'Mahalaxmi Kohinoor project',
      ...MASTER_SHARED_KEYWORDS,
    ],
    primarySlug: '/mahalaxmi-the-arena-pimpri',
    mahaRera: 'PR1261012602774',
    contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91-7744009295',
    address: {
      street: 'The Arena, Sports Township, Pimpri',
      locality: 'Pimpri',
      city: 'Pune',
      region: 'Maharashtra',
      postalCode: '411018',
      country: 'IN',
      landmark: '2.4 km from PCMC Metro Station, 2 km from Kohinoor World Towers',
    },
    projectConfig: {
      towers: 11,
      units: 2500,
      floors: 30,
      sportsSqFt: '80,000',
      startingPrice: '₹1.20 Cr',
      topPrice: '₹2.95 Cr',
      bhkOptions: '2, 3 & 4 BHK',
      possessionYear: '2027',
      managedBy: 'ILESEUM Sports Management',
    },
    schemaOrg: {
      websiteUrl: 'https://www.mahalaxmithearena.in',
      orgName: 'Mahalaxmi Group',
      logoUrl: 'https://www.mahalaxmithearena.in/assets/images/mahalaxmi-logo.svg',
    },
    googleVerification: '_px3Bz_W6ls9fFGFy-vocVmcJ-t5mcdVUjo5T2B9TY0',
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID || 'G-PLACEHOLDER',
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '0',
    aggregateRating: { ratingValue: 4.8, reviewCount: 127, bestRating: 5 },
    sameAs: [
      'https://www.facebook.com/MahalaxmiGroup',
      'https://www.linkedin.com/company/mahalaxmi-group',
      'https://www.instagram.com/mahalaxmi_group',
      'https://www.99acres.com/mahalaxmi-the-arena-pimpri',
      'https://www.magicbricks.com/property-for-sale/residential-properties/pimpri-chinchwad-pune',
      'https://en.wikipedia.org/wiki/Pimpri-Chinchwad'
    ],
  },
};

// Fallback for vercel.app preview / localhost
const FALLBACK_CONFIG: DomainConfig = DOMAIN_CONFIGS['kohinoorthearena.in'];

export function getDomainConfig(host: string): DomainConfig {
  const cleanHost = host.split(':')[0].toLowerCase();

  // 1. Exact match
  if (DOMAIN_CONFIGS[cleanHost]) return DOMAIN_CONFIGS[cleanHost];

  // 2. Strip www. prefix and match
  const withoutWww = cleanHost.replace(/^www\./, '');
  if (DOMAIN_CONFIGS[withoutWww]) return DOMAIN_CONFIGS[withoutWww];

  return FALLBACK_CONFIG;
}

// Returns all canonical URLs across all domains
export const ALL_DOMAINS = Object.values(DOMAIN_CONFIGS).map(c => c.canonical);
