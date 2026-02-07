import Link from 'next/link';
import { useState } from 'react';
import Button from '../ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, switchLanguage, t } = useLanguage();

  return (
    <header className="header">
      <div className="container header-container">
        <Link href="/" className="logo">
          MAX<span className="tv-badge">TV</span>
        </Link>
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link href="/" className="nav-link">{t('home')}</Link>
          <Link href="/#pricing" className="nav-link">{t('plans')}</Link>
          <Link href="/apps" className="nav-link">{t('apps')}</Link>
          <Link href="/how-it-works" className="nav-link">{t('howItWorks')}</Link>
          <Link href="/contact" className="nav-link">{t('contact')}</Link>
        </nav>
        <div className="header-actions">
          <div className="lang-switcher">
            <button className="lang-btn">
              <Image
                src={`/flags/${language.toLowerCase()}.svg`}
                alt={language}
                width={20}
                height={15}
                className="flag-icon"
              />
              {language} ▾
            </button>
            <div className="lang-dropdown">
              <button onClick={() => switchLanguage('EN')}>
                <Image src="/flags/en.svg" alt="EN" width={20} height={15} /> EN
              </button>
              <button onClick={() => switchLanguage('FR')}>
                <Image src="/flags/fr.svg" alt="FR" width={20} height={15} /> FR
              </button>
              <button onClick={() => switchLanguage('AR')}>
                <Image src="/flags/ar.svg" alt="AR" width={20} height={15} /> AR
              </button>
            </div>
          </div>
          <Link href="/login">
            <Button variant="outline">{t('login')}</Button>
          </Link>
          <Link href="/subscriptions">
            <Button variant="primary">{t('getStarted')}</Button>
          </Link>
        </div>

        <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
      </div>

      <style jsx>{`
        .header {
          border-bottom: 1px solid var(--border);
          padding: 1rem 0;
          background: rgba(2, 12, 37, 0.85);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo {
          font-size: 1.8rem;
          font-weight: 900;
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0px;
          letter-spacing: -0.5px;
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
        .nav {
          display: flex;
          gap: 2rem;
        }
        .nav-link {
          font-weight: 500;
          color: var(--text-muted);
          transition: color 0.2s;
          font-size: 0.95rem;
        }
        .nav-link:hover {
          color: var(--foreground);
        }
        .header-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        
        .lang-switcher {
          position: relative;
          margin-right: 0.5rem;
        }
        .lang-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          font-weight: 500;
          cursor: pointer;
          padding: 4px;
        }
        .lang-btn:hover {
          color: var(--foreground);
        }
        .lang-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background: var(--secondary);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 0.5rem;
          display: none;
          flex-direction: column;
          gap: 0.5rem;
          min-width: 60px;
        }
        .lang-switcher:hover .lang-dropdown {
          display: flex;
        }
        .lang-dropdown button {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 0.875rem;
          text-align: center;
          padding: 8px;
          border-radius: 4px;
          cursor: pointer;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .lang-btn {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .lang-dropdown button:hover {
          background: rgba(255,255,255,0.1);
          color: var(--foreground);
        }

        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--foreground);
          font-size: 1.5rem;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .nav {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            flex-direction: column;
            background: var(--background);
            padding: 1rem;
            border-bottom: 1px solid var(--border);
            gap: 1rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .nav-open {
            display: flex;
          }
          .header-actions {
            display: none;
          }
          .mobile-toggle {
            display: block;
          }
        }
      `}</style>
    </header >
  );
}
