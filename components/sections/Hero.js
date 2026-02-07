"use client";
import Button from '../ui/Button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content container">
        <span className="badge">#1 Ranked IPTV Service</span>
        <h1>
          Unlimited Entertainment <br />
          <span className="text-gradient">No Buffering</span>
        </h1>
        <p className="subtitle">
          Watch over 15,000+ Live Channels, Movies, and Series in 4K & FHD Quality.
          Instant Activation. Compatible with all devices.
        </p>

        <div className="cta-group">
          <Link href="/subscriptions">
            <Button size="lg" className="hero-btn">Subscribe Now</Button>
          </Link>
          <Link href="/apps">
            <Button variant="outline" size="lg">Get Player App</Button>
          </Link>
        </div>

        <div className="features-pill">
          <span>✓ Instant Delivery</span>
          <span>✓ 24/7 Support</span>
          <span>✓ 99.9% Uptime</span>
        </div>
      </div>

      <div className="hero-bg">
        {/* Abstract background effect */}
      </div>

      <style jsx>{`
        .hero {
        position: relative;
      padding: 10rem 0 8rem;
      text-align: center;
      overflow: hidden;
        }
      .hero-content {
        position: relative;
      z-index: 2;
        }
      .badge {
        display: inline-block;
      padding: 8px 20px;
      background: rgba(0, 229, 136, 0.1);
      color: var(--primary);
      border-radius: 30px;
      border: 1px solid rgba(0, 229, 136, 0.3);
      font-size: 0.875rem;
      font-weight: 700;
      margin-bottom: 2rem;
      backdrop-filter: blur(4px);
      box-shadow: 0 0 20px rgba(0, 229, 136, 0.1);
        }
      h1 {
        margin - bottom: 1.5rem;
      line-height: 1.1;
      font-weight: 800;
        }
      .text-gradient {
        background: var(--accent-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 0 30px rgba(0, 229, 136, 0.2));
        }
      .subtitle {
        font - size: 1.25rem;
      color: var(--text-muted);
      max-width: 700px;
      margin: 0 auto 3rem;
      font-weight: 500;
        }
      .cta-group {
        display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-bottom: 4rem;
        }
      .features-pill {
        display: flex;
      justify-content: center;
      gap: 3rem;
      color: var(--text-muted);
      font-size: 0.95rem;
      font-weight: 500;
        }
      .hero-bg {
        position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100vw;
      height: 100%;
      z-index: 1;
      background: radial-gradient(circle at 50% 20%, rgba(0, 229, 136, 0.08), transparent 60%);
      pointer-events: none;
        }
      @media (max-width: 768px) {
          .hero {padding: 8rem 0 5rem; }
      .cta-group {flex - direction: column; gap: 1rem; }
      .features-pill {flex - direction: column; gap: 0.5rem; }
        }
      `}</style>
    </section >
  );
}
