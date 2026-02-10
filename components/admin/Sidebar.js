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
    Shield,
    Search,
    Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

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
            { name: 'Subscriptions', href: '/ta7akom/subscriptions', icon: Tv },
            { name: 'Users', href: '/ta7akom/users', icon: Users },
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
        <aside className="w-64 bg-[#02040a] border-r border-white/5 flex flex-col h-screen fixed left-0 top-0 z-50 transition-transform duration-300 md:translate-x-0">
            {/* Brand */}
            <div className="h-16 flex items-center px-6 border-b border-white/5 gap-3">
                <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center shadow-lg shadow-white/5">
                    <div className="w-3 h-3 bg-black rounded-sm" />
                </div>
                <div>
                    <span className="font-bold text-white tracking-tight block leading-none">IPShopTV</span>
                    <span className="text-[10px] text-gray-500 font-medium tracking-wider uppercase">Admin Panel</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-6 scrollbar-thin scrollbar-thumb-white/5 hover:scrollbar-thumb-white/10">
                {menuGroups.map((group) => (
                    <div key={group.label}>
                        <h3 className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest mb-2 px-3">
                            {group.label}
                        </h3>
                        <div className="space-y-0.5">
                            {group.items.map((item) => {
                                const isActive = pathname === item.href;
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2 rounded-md transition-all text-sm font-medium group relative overflow-hidden",
                                            isActive
                                                ? "text-white bg-white/5"
                                                : "text-gray-400 hover:text-white hover:bg-white/[0.02]"
                                        )}
                                    >
                                        {isActive && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-emerald-500 rounded-r-full" />
                                        )}
                                        <Icon size={16} className={cn("transition-colors", isActive ? "text-emerald-500" : "text-gray-500 group-hover:text-gray-300")} />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/5 bg-[#02040a]">
                <Link
                    href="/"
                    target="_blank"
                    className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-500 hover:text-white transition-colors mb-2"
                >
                    <ExternalLink size={14} />
                    View Live Site
                </Link>

                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white font-bold text-xs ring-2 ring-[#02040a] group-hover:ring-emerald-500/20 transition-all">
                        {user?.email?.[0]?.toUpperCase() || 'A'}
                    </div>
                    <div className="flex-1 overflow-hidden min-w-0">
                        <p className="text-xs font-medium text-white truncate">{user?.email}</p>
                        <p className="text-[10px] text-gray-500 truncate">Super Admin</p>
                    </div>
                    <button
                        onClick={logout}
                        className="text-gray-500 hover:text-red-400 transition-colors p-1.5 hover:bg-white/5 rounded-md"
                        title="Logout"
                    >
                        <LogOut size={14} />
                    </button>
                </div>
            </div>
        </aside>
    );
}
