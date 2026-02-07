"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  const navItems = [
    { name: 'Overview', href: '/dashboard' },
    { name: 'My Subscriptions', href: '/dashboard/subscriptions' },
    { name: 'Order History', href: '/dashboard/orders' },
    { name: 'Settings', href: '/dashboard/settings' },
  ];

  return (
    <div className="dashboard-wrapper">
      <Header />
      <div className="dashboard-container container">
        <aside className="sidebar">
          <div className="user-profile">
            <div className="avatar">JD</div>
            <div className="info">
              <p className="name">John Doe</p>
              <p className="email">john@example.com</p>
            </div>
          </div>

          <nav className="side-nav">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={`nav-item ${pathname === item.href ? 'active' : ''}`}>
                {item.name}
              </Link>
            ))}
            <button className="nav-item logout" onClick={handleLogout}>Logout</button>
          </nav>
        </aside>

        <main className="dashboard-content">
          {children}
        </main>
      </div>

      <style jsx>{`
        .dashboard-wrapper {
          min-height: 100vh;
        }
        .dashboard-container {
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 2rem;
          padding-top: 2rem;
          padding-bottom: 2rem;
        }
        .sidebar {
          background: var(--secondary);
          border-radius: 12px;
          padding: 1.5rem;
          height: fit-content;
          border: 1px solid var(--border);
        }
        .user-profile {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border);
        }
        .avatar {
          width: 40px;
          height: 40px;
          background: var(--primary);
          color: #000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }
        .info { overflow: hidden; }
        .name { font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .email { font-size: 0.75rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        
        .side-nav { display: flex; flex-direction: column; gap: 0.5rem; }
        .nav-item {
          padding: 10px 12px;
          border-radius: 8px;
          color: var(--text-muted);
          font-weight: 500;
          transition: all 0.2s;
          border: none;
          background: none;
          text-align: left;
          font-family: inherit;
          font-size: 1rem;
          cursor: pointer;
        }
        .nav-item:hover, .nav-item.active {
          background: rgba(255, 255, 255, 0.05);
          color: var(--foreground);
        }
        .nav-item.active {
          background: var(--primary);
          color: #000;
        }
        .logout { color: #ff4444; }
        .logout:hover { background: rgba(255, 68, 68, 0.1); color: #ff4444; }
        
        @media (max-width: 768px) {
          .dashboard-container { grid-template-columns: 1fr; }
          .sidebar { margin-bottom: 2rem; }
        }
      `}</style>
    </div>
  );
}
