"use client";
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [router]);



  return (
    <div>
      <h1 className="page-title">Dashboard Overview</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Active Subscriptions</h3>
          <p className="value">1</p>
          <span className="status active">Active</span>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="value">3</p>
        </div>
        <div className="stat-card">
          <h3>Reward Points</h3>
          <p className="value">150</p>
        </div>
      </div>

      <h2 className="section-title">My Services</h2>
      <div className="services-list">
        <div className="service-card">
          <div className="service-header">
            <div>
              <h4>12 Months IPTV</h4>
              <p className="mac">MAC: 00:1A:2B:3C:4D:5E</p>
            </div>
            <span className="badge active">Active</span>
          </div>
          <div className="service-details">
            <p>Expires: <span className="highlight">12 Dec 2026</span></p>
            <p>Username: <strong>User123</strong></p>
            <p>Password: <strong>••••••</strong></p>
          </div>
          <div className="service-actions">
            <Button size="sm">Extend</Button>
            <Button variant="outline" size="sm">Download M3U</Button>
          </div>
        </div>

        {/* Example App License */}
        <div className="service-card">
          <div className="service-header">
            <div>
              <h4>IBO Player License</h4>
              <p className="mac">MAC: AA:BB:CC:11:22:33</p>
            </div>
            <span className="badge active">Active</span>
          </div>
          <div className="service-details">
            <p>Type: <strong>Lifetime License</strong></p>
            <p>Platform: <strong>Samsung TV</strong></p>
            <p>Activated: <strong>05 Feb 2024</strong></p>
          </div>
          <div className="service-actions">
            <Button variant="outline" size="sm">View Instructions</Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .page-title { margin-bottom: 2rem; }
        .section-title { margin: 3rem 0 1.5rem; font-size: 1.5rem; }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }
        .stat-card {
          background: var(--secondary);
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid var(--border);
        }
        .stat-card h3 { font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.5rem; }
        .value { font-size: 2rem; font-weight: 700; }
        
        .actions-bar { margin: 2rem 0; display: flex; justify-content: flex-end; }
        
        .service-card {
          background: var(--secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1rem;
        }
        .service-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border);
        }
        .mac { font-family: monospace; color: var(--text-muted); font-size: 0.875rem; margin-top: 0.25rem; }
        
        .service-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .highlight { color: var(--primary); }
        
        .service-actions {
          display: flex;
          gap: 1rem;
        }
        
        .badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .badge.active { background: rgba(0, 220, 130, 0.1); color: var(--primary); }
        .status.active { color: var(--primary); font-size: 0.875rem; font-weight: 500; }
        
        @media (max-width: 600px) {
          .service-header { flex-direction: column; gap: 1rem; }
        }
      `}</style>
    </div>
  );
}
