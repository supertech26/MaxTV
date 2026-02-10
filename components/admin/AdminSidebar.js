"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  LogOut,
  ExternalLink,
  Tv,
  BarChart3,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const menuGroups = [
  {
    label: 'Overview',
    items: [
      { name: 'Dashboard', href: '/ta7akom', icon: LayoutDashboard },
      { name: 'Analytics', href: '/ta7akom/analytics', icon: BarChart3 },
    ]
  },
  {
    label: 'Management',
    items: [
      { name: 'Users', href: '/ta7akom/users', icon: Users },
      { name: 'Subscriptions', href: '/ta7akom/subscriptions', icon: Tv },
    ]
  },
  {
    label: 'Finance',
    items: [
      { name: 'Orders', href: '/ta7akom/orders', icon: CreditCard },
    ]
  },
  {
    label: 'System',
    items: [
      { name: 'Settings', href: '/ta7akom/settings', icon: Settings },
      { name: 'Admins', href: '/ta7akom/admins', icon: Shield },
    ]
  }
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <aside className="w-64 bg-[#050b18] border-r border-white/5 flex flex-col h-screen fixed left-0 top-0 z-50">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3">
          <div className="w-4 h-4 bg-black rounded-sm" />
        </div>
        <span className="font-bold text-white tracking-tight">IPShopTV</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
        {menuGroups.map((group) => (
          <div key={group.label}>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
              {group.label}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-all text-sm font-medium group",
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Icon size={18} className={cn(isActive ? "text-white" : "text-gray-500 group-hover:text-white")} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/5 bg-[#050b18]">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors mb-2"
        >
          <ExternalLink size={16} />
          Back to Website
        </Link>

        <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-[#050b18] group-hover:ring-white/20 transition-all">
            {user?.email?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{user?.email?.split('@')[0]}</p>
            <p className="text-[10px] text-gray-500 truncate">Super Admin</p>
          </div>
          <button onClick={logout} className="text-gray-500 hover:text-red-400 transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
