"use client";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Pricing from '@/components/sections/Pricing';

export default function Subscriptions() {
    return (
        <main>
            <Header />
            <section className="page-header">
                <div className="container">
                    <h1>Select Your Plan</h1>
                    <p>Choose the perfect package for your entertainment needs.</p>
                </div>
            </section>

            <section className="container section-pad">
                <Pricing />
            </section>
            <Footer />

            <style jsx>{`
        .page-header {
          padding: 6rem 0 3rem;
          text-align: center;
          background: linear-gradient(to bottom, rgba(0,0,0,0.5), var(--background));
        }
        .page-header h1 {
          margin-bottom: 1rem;
        }
        .section-pad {
          padding-bottom: 6rem;
        }
      `}</style>
        </main>
    );
}
