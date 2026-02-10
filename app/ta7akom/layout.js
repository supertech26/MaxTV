"use client";

import Sidebar from '@/components/admin/Sidebar';
import { Toaster } from 'sonner';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#02040a] text-white font-sans selection:bg-emerald-500/30 selection:text-emerald-100">
      <Sidebar />

      {/* Main Content - Offset by sidebar width */}
      <div className="md:pl-64 transition-all duration-300">
        <main className="min-h-screen">
          {children}
        </main>
      </div>

      <Toaster theme="dark" position="bottom-right" toastOptions={{
        style: { background: '#0b1221', border: '1px solid rgba(255,255,255,0.05)', color: 'white' },
        className: 'text-xs font-medium'
      }} />
    </div>
  );
}
