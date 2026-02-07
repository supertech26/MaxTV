"use client";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <div className="brand">MAX<span className="tv-badge">TV</span></div>
          <p className="footer-desc">
            Premium IPTV service with thousands of channels in 4K/FHD. Stable, fast, and reliable.
          </p>
          <div className="socials">
            {/* Social icons placeholders */}
            <span>fb</span>
            <span>tw</span>
            <span>in</span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/subscriptions">Pricing</a></li>
            <li><a href="/apps">Apps</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/refund">Refund Policy</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>Support available 24/7 via WhatsApp and Email.</p>
          <a href="#" className="whatsapp-btn">Chat on WhatsApp</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ipmaxtv.shop. All rights reserved.</p>
      </div>

      <style jsx>{`
        .footer {
          background: var(--secondary);
          padding: 4rem 0 2rem;
          margin-top: 4rem;
          border-top: 1px solid var(--border);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }
        .brand {
          font-size: 1.8rem;
          font-weight: 900;
          color: #fff;
          margin-bottom: 1rem;
          letter-spacing: -0.5px;
          display: flex;
          align-items: center;
        }
        .tv-badge {
          background: var(--primary);
          color: #000;
          font-size: 1rem;
          padding: 2px 6px;
          border-radius: 6px;
          font-weight: 800;
          margin-left: 2px;
          line-height: 1.2;
          transform: skew(-10deg);
          display: inline-block;
          box-shadow: 0 0 10px rgba(0, 220, 130, 0.4);
        }
        .footer-desc {
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }
        .footer-col h4 {
          margin-bottom: 1.25rem;
          color: var(--foreground);
        }
        .footer-col ul {
          list-style: none;
        }
        .footer-col li {
          margin-bottom: 0.75rem;
        }
        .footer-col a {
          color: var(--text-muted);
          transition: color 0.2s;
        }
        .footer-col a:hover {
          color: var(--primary);
        }
        .whatsapp-btn {
          display: inline-block;
          margin-top: 1rem;
          color: #25D366;
          font-weight: 600;
        }
        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
          color: var(--text-muted);
          font-size: 0.875rem;
        }
      `}</style>
    </footer>
  );
}
