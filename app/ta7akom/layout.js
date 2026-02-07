"use client";
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        {children}
      </main>

      <style jsx global>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: var(--background);
        }
        .admin-content {
          margin-left: 250px;
          flex: 1;
          padding: 2rem;
          max-width: 1600px;
        }
      `}</style>
    </div>
  );
}
