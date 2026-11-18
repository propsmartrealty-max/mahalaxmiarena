"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

type FooterProps = {
  mahaRera?: string;
  primarySlug?: string;
  coDevSlug?: string;
  projectName?: string;
};

export default function Footer({
  mahaRera = 'PR1261012602774',
  primarySlug = '/kohinoor-the-arena-pimpri',
  coDevSlug = '/mahalaxmi-the-arena-pimpri',
  projectName = 'The Arena',
}: FooterProps) {
  return (
    <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link href="/" className="brand-cluster footer-brand-cluster" aria-label="The Arena Home">
            <div className="jv-partners">
              <Image src="/assets/images/mahalaxmi-logo.svg" alt="Mahalaxmi Group Developer Pimpri" width={150} height={40} className="partner-img"/>
              <div className="jv-divider"></div>
              <Image src="/assets/images/kohinoor-logo.svg" alt="Kohinoor Group Real Estate Developer PCMC" width={150} height={40} className="partner-img"/>
            </div>
            <div className="logo-wrapper">
              <div className="logo-icon"><i className="ri-run-line"></i></div>
              <div className="logo-text">
                <div className="logo-title">THE <span>ARENA</span></div>
                <div className="logo-subtitle">PIMPRI&apos;S SPORTS TOWNSHIP</div>
              </div>
            </div>
          </Link>
          <p className="footer-bio">
            A Joint Venture development by Mahalaxmi Group, Kohinoor Group (A Glorious Real Estate Enterprise), and Agarwal Sukhwani Associates. Operated by ILESEUM Sports Management across an 80,000 Sq. Ft. active ecosystem.
          </p>
        </div>

        <div className="footer-col">
          <h5>The 5 Pillars</h5>
          <div className="footer-links">
            <button className="footer-anchor-btn" onClick={() => scrollTo('operating-system')}>1. Space (80,000 Sq.Ft.)</button>
            <button className="footer-anchor-btn" onClick={() => scrollTo('operating-system')}>2. Management (Ileseum)</button>
            <button className="footer-anchor-btn" onClick={() => scrollTo('operating-system')}>3. Programs (Coaching)</button>
            <button className="footer-anchor-btn" onClick={() => scrollTo('operating-system')}>4. Partnerships (Global)</button>
            <button className="footer-anchor-btn" onClick={() => scrollTo('operating-system')}>5. Progression (Tracking)</button>
          </div>
        </div>

        <div className="footer-col">
          <h5>Residences</h5>
          <ul className="footer-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href={primarySlug}>Kohinoor The Arena</Link></li>
            <li><Link href={coDevSlug}>Mahalaxmi The Arena</Link></li>
            <li><button className="footer-anchor-btn" onClick={() => scrollTo('residences')}>Residences</button></li>
            <li><button className="footer-anchor-btn" onClick={() => scrollTo('specifications')}>Salient Specifications</button></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Pimpri Connectivity</h5>
          <div className="footer-links">
            <button className="footer-anchor-btn" onClick={() => scrollTo('connectivity')}>Kohinoor World Towers (2 km)</button>
            <button className="footer-anchor-btn" onClick={() => scrollTo('connectivity')}>PCMC Metro Station (2.4 km)</button>
            <button className="footer-anchor-btn" onClick={() => scrollTo('connectivity')}>Podar Int. School (3.8 km)</button>
            <button className="footer-anchor-btn" onClick={() => scrollTo('connectivity')}>Aditya Birla Hospital (4.1 km)</button>
            <button className="footer-anchor-btn" onClick={() => scrollTo('connectivity')}>Hinjewadi IT Park (9.9 km)</button>
          </div>
        </div>
      </div>

      <div className="footer-seo-block" style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
        <h6 style={{ color: "rgba(255,255,255,0.7)", marginBottom: "1rem", letterSpacing: "1px", textTransform: "uppercase", fontSize: "0.8rem" }}>The Arena • Landmark Sports Township Across Pimpri-Chinchwad &amp; Pune</h6>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", lineHeight: "1.6" }}>
          {/* Brands & Joint Venture Entities */}
          <Link href={primarySlug} className="seo-link">Kohinoor The Arena</Link> &bull;
          <Link href={coDevSlug} className="seo-link">Mahalaxmi The Arena</Link> &bull;
          <span className="seo-link">Mahalaxmi Kohinoor The Arena</span> &bull;
          <span className="seo-link">Kohinoor Mahalaxmi Arena Pimpri</span> &bull;
          <span className="seo-link">Kohinoor The Arena Pimpri</span> &bull;
          <span className="seo-link">Mahalaxmi The Arena Pimpri</span> &bull;
          <span className="seo-link">Kohinoor Arena Pune</span> &bull;
          <span className="seo-link">Mahalaxmi Arena Pune</span> &bull;
          <span className="seo-link">Agarwal Sukhwani The Arena Pimpri</span> &bull;
          {/* Configurations */}
          <span className="seo-link">2 BHK flats in Kohinoor The Arena</span> &bull;
          <span className="seo-link">3 BHK flats in Kohinoor The Arena</span> &bull;
          <span className="seo-link">4 BHK luxury apartments Pimpri</span> &bull;
          <span className="seo-link">2 BHK flats in Mahalaxmi The Arena</span> &bull;
          <span className="seo-link">3 BHK flats in Mahalaxmi The Arena</span> &bull;
          <span className="seo-link">4 BHK sky residences PCMC</span> &bull;
          <span className="seo-link">2 BHK flats near Finolex Chowk</span> &bull;
          <span className="seo-link">3 BHK flats near Finolex Chowk</span> &bull;
          {/* Sports Township & World-Class Amenities */}
          <span className="seo-link">Sports township in Pune</span> &bull;
          <span className="seo-link">Sports township in Pimpri</span> &bull;
          <span className="seo-link">Apartments with FIFA football turf</span> &bull;
          <span className="seo-link">Flats with tennis court Pune</span> &bull;
          <span className="seo-link">Apartments with padel court</span> &bull;
          <span className="seo-link">Pickleball court Pune</span> &bull;
          <span className="seo-link">Olympic infinity swimming pool</span> &bull;
          <span className="seo-link">1,787 sq.ft. gym Pimpri</span> &bull;
          <span className="seo-link">Japanese forest bathing garden</span> &bull;
          <span className="seo-link">Apartments with badminton &amp; squash courts</span> &bull;
          <span className="seo-link">Club Ileseum Sports Management</span> &bull;
          {/* Transit & Key PCMC Nodes */}
          <span className="seo-link">Flats near PCMC Metro Station</span> &bull;
          <span className="seo-link">Flats near Pimpri Metro Station</span> &bull;
          <span className="seo-link">Flats near Kohinoor World Towers (KWT)</span> &bull;
          <span className="seo-link">Flats near Old Mumbai Pune Highway</span> &bull;
          <span className="seo-link">Residential projects near Pimpri Railway Station</span> &bull;
          <span className="seo-link">Flats near Chinchwad Railway Station</span> &bull;
          <span className="seo-link">Apartments near Hinjewadi IT Park</span> &bull;
          <span className="seo-link">Flats near Aditya Birla Hospital</span> &bull;
          <span className="seo-link">Apartments near Bhosari MIDC</span> &bull;
          <span className="seo-link">Flats near Chakan MIDC</span> &bull;
          {/* Regional & Multilingual Queries */}
          <span className="seo-link">पिंपरी मध्ये 2 BHK फ्लॅट</span> &bull;
          <span className="seo-link">पिंपरी मध्ये 3 BHK फ्लॅट</span> &bull;
          <span className="seo-link">पिंपरी मध्ये 4 BHK फ्लॅट</span> &bull;
          <span className="seo-link">कोहिनूर द अरेना पिंपरी</span> &bull;
          <span className="seo-link">महालक्ष्मी द अरेना पिंपरी</span> &bull;
          <span className="seo-link">पिंपरी स्पोर्ट्स टाउनशिप</span> &bull;
          <span className="seo-link">Pimpri madhe flat booking</span> &bull;
          <span className="seo-link">PCMC metro javal flat</span>
        </div>
      </div>

      {/*  RERA & Legal Compliance */}
      <div className="footer-legal" style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Image src="/assets/images/maharera-logo.svg" alt="MahaRERA Logo" width={40} height={40} />
            <span style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--neon-lime)' }}>MahaRERA No: {mahaRera}</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
            The project has been registered via MahaRERA registration number and is available on the website <a href="https://maharera.mahaonline.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>maharera.mahaonline.gov.in</a> under registered projects.
          </p>
        </div>
      </div>

      {/*  Disclaimer from Brochure  */}
      <div className="footer-disclaimer">
        <strong>Disclaimer:</strong> This website and brochure content is a draft prepared solely for internal circulation and reference, and does not constitute a sales offer, commitment, or contract of any kind. All information, images, plans, and specifications shown are indicative and subject to change without notice. Any decisions or actions taken based on the contents of this website are at the sole discretion and risk of the reader, and {projectName}, Mahalaxmi Group, Kohinoor Group, and Agarwal Sukhwani Associates accept no liability for any errors, omissions, or reliance placed on this material. For accurate and binding details, please refer to the official sale agreement and RERA approved project documents.
      </div>

      <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>&copy; 2026 {projectName}. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/privacy-policy" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy Policy</Link>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <Link href="/terms" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.9rem' }}>Terms of Service</Link>
        </div>
        <div>Designed for <span style={{ color: "var(--neon-lime)" }}>The Arena</span> • Pimpri, Pune</div>
      </div>
    </div>
  </footer>
  );
}
