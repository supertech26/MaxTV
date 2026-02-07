"use client";
import Button from '@/components/ui/Button';

export default function Subscriptions() {
    return (
        <div>
            <h1 className="page-title">My Subscriptions</h1>

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
            </div>

            <style jsx>{`
        .page-title { margin-bottom: 2rem; }
        
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
      `}</style>
        </div>
    );
}
