"use client";
import React, { useState } from 'react';

const faqs = [
  {
    question: "Where is Kohinoor The Arena located?",
    answer: "Kohinoor The Arena is located at The Arena, Sports Township, Pimpri Chinchwad, Pune. It is strategically situated just 2.4 km from PCMC Metro Station, 2 km from Kohinoor World Towers (KWT), near Finolex Chowk, and within 15 minutes of Hinjewadi IT Park."
  },
  {
    question: "Where is Mahalaxmi The Arena Pimpri?",
    answer: "Mahalaxmi The Arena is situated in Pimpri Chinchwad, Pune, on a prime 20-acre master-planned parcel along Old Mumbai Pune Highway, offering direct transit connectivity to Pimpri Metro, Pimpri Railway Station, and Chinchwad MIDC."
  },
  {
    question: "What is Kohinoor The Arena and Mahalaxmi The Arena?",
    answer: "Kohinoor The Arena and Mahalaxmi The Arena represent PCMC's premier sports township development. Spanning 11 luxury high-rise towers rising up to 34 storeys, it features an 80,000 Sq.Ft. active athletic ecosystem managed by ILESEUM Sports Management."
  },
  {
    question: "Who is developing Kohinoor The Arena?",
    answer: "The project is a prestigious joint venture between Kohinoor Group (a trusted real estate brand with 40+ years legacy), Mahalaxmi Group (25+ years legacy | 4.2M Sq.Ft. delivered), and Agarwal Sukhwani Associates."
  },
  {
    question: "Is Kohinoor The Arena a sports township?",
    answer: "Yes. The Arena is PCMC's first dedicated sports township featuring an 80,000 Sq.Ft. athletic ecosystem operated professionally by ILESEUM Sports. It includes a cricket ground with practice nets, FIFA football turf, tennis court, padel court, pickleball court, basketball court, Olympic-length infinity swimming pool, 1,787 sq.ft. cardio gymnasium, jogging track, and certified youth academies."
  },
  {
    question: "What is the price of 2 BHK, 3 BHK & 4 BHK at Kohinoor The Arena?",
    answer: "Prices start from ₹1.20 Cr for 2 BHK Smart Residences, ₹1.75 Cr Onwards for 3 BHK Premium Residences, ₹2.05 Cr Onwards for 3 BHK Grand Corner Suites, and ₹2.95 Cr Onwards for 4 BHK Sky Penthouses. Early bird payment plans and bank approvals from SBI, HDFC, ICICI, and Axis Bank are available."
  },
  {
    question: "How close is The Arena to PCMC Metro Station and Kohinoor World Towers (KWT)?",
    answer: "The Arena enjoys prime PCMC connectivity: just 2.4 km from PCMC Metro Station (5-minute drive), under 5 minutes from Finolex Chowk, 2 km from Kohinoor World Towers (KWT Phase 2 commercial hub), 2.8 km from Pimpri Railway Station, and under 15 minutes to Hinjewadi IT Park via NH-48."
  },
  {
    question: "What is ILESEUM Sports Management and Club Ileseum?",
    answer: "ILESEUM Sports Management operates 126+ sports clubs pan-India. At Club Ileseum, they provide certified professional coaches, structured sports academies for children, biometric fitness programs, and resident competitive tournaments across football, tennis, cricket, and swimming."
  },
  {
    question: "How many towers and floors does Kohinoor The Arena have?",
    answer: "The Arena features 11 majestic residential towers rising 34 storeys high, offering unhindered 360-degree views of Pune's horizon and the green township landscape."
  },
  {
    question: "Is Kohinoor The Arena MahaRERA registered?",
    answer: "Yes, Kohinoor The Arena and Mahalaxmi The Arena are 100% MahaRERA registered under registration number PR1261012602774 with dedicated 70% project escrow protection and sanctioned layout plans."
  },
  {
    question: "What is the possession date of The Arena?",
    answer: "Possession is scheduled starting from 2027 onwards in phased delivery cycles as approved by MahaRERA."
  },
  {
    question: "Is Kohinoor The Arena good for investment in Pune / PCMC?",
    answer: "Yes. Located adjacent to the Hinjewadi IT corridor, PCMC Metro, and Kohinoor World Towers, The Arena projects a gross rental yield of 4.5% to 5.2% (higher than the PCMC average of 3.4%) and projected capital appreciation of 14% to 18% over the construction timeline."
  },
  {
    question: "How to book a flat or arrange a site visit at Kohinoor The Arena?",
    answer: "To schedule a physical VIP site walkthrough, inspect the 34-storey architectural models, or submit an Expression of Interest (EOI) for priority inventory allotment, submit your enquiry on the website or contact our senior sales team at +91-7711993434."
  },
  {
    question: "पिंपरी मध्ये २ व ३ बीएचके फ्लॅट बुकिंग कशी करावी? (Pimpri madhe flat booking)",
    answer: "पिंपरी मधील The Arena (Kohinoor & Mahalaxmi Group) मध्ये २ आणि ३ बीएचके फ्लॅट बुकिंगसाठी आपण अधिकृत वेबसाईटवरून VIP साईट व्हिजिट फॉर्म सबमिट करू शकता. ईओआय (EOI) द्वारे प्राधान्य युनिट निवडता येते."
  },
  {
    question: "Can NRIs invest in Mahalaxmi Kohinoor Pune real estate?",
    answer: "Yes, NRIs and OCIs can purchase luxury apartments under FEMA guidelines. We offer digital site walkthroughs, international banking support (NRE/NRO), and end-to-end rental yield management delivering 4.5% to 5.2% gross returns."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section section-padding" id="faq" style={{ background: "var(--neon-dark)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: "3rem" }}>
          <span className="badge-purple">• FREQUENTLY ASKED QUESTIONS •</span>
          <h2 className="section-title">PROJECT <span className="highlight-neon">INSIGHTS</span></h2>
          <p className="section-subtitle">Everything you need to know about purchasing a luxury apartment at Mahalaxmi Kohinoor The Arena, Pimpri.</p>
        </div>

        <div className="faq-container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="faq-item" 
              style={{ 
                marginBottom: "1rem", 
                border: "1px solid rgba(255,255,255,0.1)", 
                borderRadius: "8px", 
                overflow: "hidden",
                background: "rgba(255, 255, 255, 0.02)"
              }}
            >
              <button 
                className="faq-question" 
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
                style={{
                  width: "100%",
                  padding: "1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "transparent",
                  color: "#fff",
                  border: "none",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: "inherit"
                }}
              >
                {faq.question}
                <i className={`ri-arrow-down-s-line`} style={{ transform: openIndex === index ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }}></i>
              </button>
              {openIndex === index && (
                <div className="faq-answer" style={{ padding: "0 1.5rem 1.5rem", color: "rgba(255,255,255,0.7)", lineHeight: "1.6", fontSize: "0.95rem" }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
