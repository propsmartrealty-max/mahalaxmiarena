"use client";
import React, { useState } from 'react';

interface BrowserWindow extends Window {
  grecaptcha?: { execute: (key: string, opts: { action: string }) => Promise<string> };
  gtag?: (...args: unknown[]) => void;
}

export default function Booking() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    
    const formData = new FormData(form);
    const name = formData.get('fullName') as string;
    const phone = formData.get('mobile') as string;
    const email = formData.get('email') as string;
    const configuration = formData.get('configuration') as string;

    let utmData = {};
    try {
      const savedUtm = localStorage.getItem('mta_utm_params');
      if (savedUtm) utmData = JSON.parse(savedUtm);
    } catch {}

    // ── Advanced Lead Context Tracking (PSEO Keyword Extraction) ──
    const pageH1 = document.querySelector('h1')?.innerText || 'Default VIP Form';
    
    // ── Google reCAPTCHA v3 Token Generation ──
    let recaptchaToken = 'bypass';
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    const win = window as BrowserWindow;
    if (siteKey && win.grecaptcha) {
      try {
        recaptchaToken = await win.grecaptcha.execute(siteKey, { action: 'submit_lead' });
      } catch (e) {
        console.error("reCAPTCHA execution failed", e);
      }
    }
    
    try {
      // ── Client-Side FormSubmit Direct Push ──
      fetch('https://formsubmit.co/ajax/propsmartrealty@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          Name: name,
          Phone: phone,
          Email: email || 'Not provided',
          Configuration: configuration || '2, 3 & 4 BHK',
          Domain: window.location.hostname,
          Source: `VIP Booking Form: ${pageH1}`,
          _subject: `🏠 VIP Booking Lead: ${name} (${phone}) — ${configuration || 'The Arena'}`,
          _template: 'table',
          _captcha: 'false',
        }),
      }).catch(() => {});

      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          configuration,
          domain: window.location.hostname,
          source: `Page Context: ${pageH1}`,
          utm: utmData,
          recaptchaToken, // Send token to backend
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        // ── Google Ads Conversion Tracking ──
        if (win.gtag) {
          win.gtag('event', 'conversion', { 'send_to': process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL || 'AW-CONVERSION/label' });
        }
        
        window.dispatchEvent(new CustomEvent('arena-toast', { detail: '✅ Success! Opening WhatsApp enquiry with sales desk...' }));
        sessionStorage.setItem('mta_lead_captured', 'true');
        form.reset();

        // ── Instant WhatsApp Direct Link to 7744009295 ──
        const isMahalaxmi = typeof window !== 'undefined' && window.location.hostname.includes('mahalaxmi');
        const brandName = isMahalaxmi ? 'Mahalaxmi The Arena' : 'Kohinoor The Arena';
        const waMsg = `Hi, I have submitted an official enquiry for ${brandName} Pimpri:\n• Name: ${name}\n• Phone: ${phone}\n• Configuration: ${configuration || '2, 3 & 4 BHK'}\n• Domain: ${window.location.hostname}`;
        const waUrl = `https://wa.me/917744009295?text=${encodeURIComponent(waMsg)}`;
        setTimeout(() => {
          window.open(waUrl, '_blank');
        }, 600);
      } else {
        window.dispatchEvent(new CustomEvent('arena-toast', { detail: `⚠️ ${data.error || 'Submission failed.'}` }));
      }
    } catch {
      window.dispatchEvent(new CustomEvent('arena-toast', { detail: '❌ Network error. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="booking-section section-padding" id="booking">
      <div className="container">
        <div className="booking-grid">
          <div className="booking-text">
            <span className="badge-neon">• OFFICIAL LAUNCH ENQUIRY •</span>
            <h2>STEP INTO <span className="highlight-neon">THE ARENA</span></h2>
            <p>
              Mahalaxmi Group (25+ Years Legacy | 4.2M Sq.Ft. Delivered) in Joint Venture with Kohinoor Group and Agarwal Sukhwani Associates invites you to experience Pimpri’s landmark sports township.
            </p>
            <ul className="booking-features">
              <li><i className="ri-checkbox-circle-fill"></i> <span>Priority site visit & master plan physical walkthrough</span></li>
              <li><i className="ri-checkbox-circle-fill"></i> <span>Exclusive pre-launch inventory & customized payment schedule</span></li>
              <li><i className="ri-checkbox-circle-fill"></i> <span>Complimentary Ileseum Sports Club membership guidance</span></li>
              <li><i className="ri-checkbox-circle-fill"></i> <span>Dedicated Senior Sales Director consultation</span></li>
            </ul>
          </div>

          <div className="booking-form-box">
            <h3>Register for Priority Access</h3>
            <p>Fill out your details to receive the official floor plans, price sheet, and brochure PDF.</p>
            
            <form id="vipBookingForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="vip-name">Your Full Name *</label>
                <input type="text" id="vip-name" name="fullName" required placeholder="e.g. Rahul Sharma" />
              </div>
              <div className="form-group">
                <label htmlFor="vip-mobile">Mobile Number (with WhatsApp) *</label>
                <input type="tel" id="vip-mobile" name="mobile" required placeholder="e.g. +91 98765 43210" />
              </div>
              <div className="form-group">
                <label htmlFor="vip-email">Email Address</label>
                <input type="email" id="vip-email" name="email" placeholder="e.g. rahul@gmail.com" />
              </div>
              <div className="form-group">
                <label htmlFor="vip-config">Interested Configuration</label>
                <select id="vip-config" name="configuration">
                  <option>2 BHK Luxury Sports Residence (₹ 1.20 Cr*)</option>
                  <option>3 BHK Premium Residence (₹ 1.75 Cr*)</option>
                  <option>3 BHK Grand Corner Suite (₹ 2.05 Cr*)</option>
                  <option>4 BHK Sky Residence & Penthouse (₹ 2.95 Cr*)</option>
                  <option>Commercial Plaza Frontage Unit</option>
                </select>
              </div>
              <button type="submit" className="btn btn-neon" disabled={isSubmitting} style={{ width: "100%", marginTop: "12px", fontSize: "1.05rem", opacity: isSubmitting ? 0.7 : 1 }}>
                {isSubmitting ? 'Submitting...' : <><i className="ri-send-plane-fill"></i> Request Official Details & Brochure</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
