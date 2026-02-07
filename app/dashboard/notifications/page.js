"use client";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Notifications() {
    const notifications = [
        {
            id: 1,
            title: "Subscription Activated",
            message: "Your 12 Months IPTV subscription has been successfully activated. Enjoy!",
            date: "2 mins ago",
            type: "success"
        },
        {
            id: 2,
            title: "Payment Confirmation",
            message: "We have received your payment of €59.00. Invoice #INV-2024-001 is available.",
            date: "5 mins ago",
            type: "info"
        },
        {
            id: 3,
            title: "Welcome to ipmaxtv.shop!",
            message: "Thanks for creating an account. Explore our premium channels today.",
            date: "1 hour ago",
            type: "info"
        }
    ];

    return (
        <main>
            <Header />
            <section className="container section-pad">
                <h1 className="page-title">Notification Center</h1>
                <p className="subtitle">View your automated emails and system alerts.</p>

                <div className="notifications-list">
                    {notifications.map(notif => (
                        <div key={notif.id} className={`notification-card ${notif.type}`}>
                            <div className="notif-header">
                                <h3>{notif.title}</h3>
                                <span className="date">{notif.date}</span>
                            </div>
                            <p>{notif.message}</p>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />

            <style jsx>{`
        .section-pad { padding: 4rem 1rem; min-height: 60vh; }
        .page-title { margin-bottom: 0.5rem; }
        .subtitle { color: var(--text-muted); margin-bottom: 2rem; }
        
        .notifications-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 800px;
        }
        
        .notification-card {
          background: var(--secondary);
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid var(--border);
          border-left: 4px solid var(--primary);
        }
        
        .notif-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        .notif-header h3 { font-size: 1.1rem; margin: 0; }
        .date { font-size: 0.85rem; color: var(--text-muted); }
      `}</style>
        </main>
    );
}
