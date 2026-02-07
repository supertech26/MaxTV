"use client";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Pricing from '@/components/sections/Pricing';
import Testimonials from '@/components/sections/Testimonials';
import ChannelCategories from '@/components/sections/ChannelCategories';
import FAQ from '@/components/sections/FAQ';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />

      {/* Pricing Section */}
      <section className="container section-pad" id="pricing">
        <h2 className="section-title">Subscription Plans</h2>
        <Pricing />
      </section>

      {/* Highlights Section */}
      <section className="container section-pad">
        <h2 className="section-title">Why Choose Us</h2>
        <p className="section-subtitle">Everything you need for entertainment</p>
        <div className="features-grid">
          <div className="feature-card">
            <h3>15,000+ Channels</h3>
            <p>Live TV from around the world, including sports, news, and entertainment.</p>
          </div>
          <div className="feature-card">
            <h3>Instant Delivery</h3>
            <p>Get your credentials immediately after payment confirmation.</p>
          </div>
          <div className="feature-card">
            <h3>Global Coverage</h3>
            <p>Works on all devices and from any location with internet access.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Categories Section (Replaced CTA) */}
      <ChannelCategories />

      {/* FAQ Section */}
      <FAQ />

      <Footer />

      <style jsx>{`
        .section-pad {
          padding: 8rem 1rem;
        }
        .section-title {
          text-align: center;
          margin-bottom: 2rem;
          font-size: 3rem;
        }
        .section-subtitle {
          text-align: center;
          color: var(--text-muted);
          font-size: 1.25rem;
          margin-bottom: 5rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2.5rem;
        }
        .feature-card {
           background: var(--card-bg);
           padding: 3rem 2rem;
           border-radius: 24px;
           border: 1px solid var(--border);
           transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
           text-align: center;
           position: relative;
           overflow: hidden;
           backdrop-filter: blur(12px);
        }
        .feature-card:hover {
           transform: translateY(-8px);
           border-color: var(--primary);
           box-shadow: 0 20px 40px -20px rgba(0, 229, 136, 0.15);
        }
        .feature-card h3 {
           color: var(--foreground);
           margin-bottom: 1rem;
           font-size: 1.5rem;
        }
        .feature-card p {
           color: var(--text-muted);
           line-height: 1.7;
        }
        
        .cta-section {
           background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=2069&auto=format&fit=crop');
           background-size: cover;
           background-position: center;
           padding: 6rem 1rem;
           text-align: center;
           margin-top: 4rem;
        }
        .cta-section h2 {
           margin-bottom: 1rem;
        }
        .cta-section p {
           color: var(--text-muted);
           margin-bottom: 2rem;
           font-size: 1.25rem;
        }
      `}</style>
    </main>
  );
}
