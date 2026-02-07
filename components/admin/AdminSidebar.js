"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuGroups = [
    {
      title: 'Overview',
      items: [
        { href: '/ta7akom', label: 'Dashboard', icon: '📊' }
      ]
    },
    {
      title: 'Management',
      items: [
        { href: '/ta7akom/users', label: 'Users', icon: '👥' },
        { href: '/ta7akom/subscriptions', label: 'Subscriptions', icon: '📺' }
      ]
    },
    {
      title: 'Finance',
      items: [
        { href: '/ta7akom/orders', label: 'Orders', icon: '💰' }
      ]
    },
    {
      title: 'System',
      items: [
        { href: '/ta7akom/settings', label: 'Settings', icon: '⚙️' }
      ]
    }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Control Panel</h2>
      </div>

      <nav className="sidebar-nav">
        {menuGroups.map((group, index) => (
          <div key={index} className="nav-group">
            <h3 className="group-title">{group.title}</h3>
            {group.items.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-item ${pathname === link.href ? 'active' : ''}`}
              >
                <span className="icon">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <Link href="/" className="nav-item back-link">
          <span className="icon">↩️</span> Back to Site
        </Link>
      </div>

      <style jsx>{`
        .sidebar {
          width: 260px;
          background: rgba(15, 17, 21, 0.6);
          backdrop-filter: blur(16px);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 50;
        }
        .sidebar-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--border);
          margin-bottom: 1rem;
        }
        .sidebar-header h2 {
          font-size: 1.25rem;
          background: linear-gradient(135deg, #fff 0%, var(--primary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
          font-weight: 800;
          letter-spacing: -0.5px;
          text-transform: uppercase;
        }
        .sidebar-nav {
          padding: 0 1rem;
          flex: 1;
          overflow-y: auto;
        }
        
        .nav-group {
          margin-bottom: 1.5rem;
        }
        
        .group-title {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0.75rem;
          padding-left: 0.75rem;
          letter-spacing: 1px;
          font-weight: 600;
          opacity: 0.7;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          color: var(--text-muted);
          text-decoration: none;
          border-radius: 8px;
          margin-bottom: 0.25rem;
          transition: all 0.2s ease;
          font-size: 0.95rem;
          font-weight: 500;
        }
        .nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--foreground);
        }
        .nav-item.active {
          background: rgba(0, 220, 130, 0.1);
          color: var(--primary);
        }
        .icon {
          font-size: 1.1rem;
          width: 20px;
          text-align: center;
        }

        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid var(--border);
        }
        .back-link {
            color: var(--text-muted);
            opacity: 0.8;
        }
        .back-link:hover {
            opacity: 1;
        }
      `}</style>
    </aside>
  );
}
