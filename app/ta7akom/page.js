"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchAllData } from './actions';
import AdminGuard from '@/components/auth/AdminGuard';
import DashboardHeader from '@/components/admin/DashboardHeader';
import StatCard from '@/components/admin/StatCard';
import { Users, Tv, CreditCard, Activity, ArrowRight } from 'lucide-react';

function OverviewContent() {
    const { user } = useAuth();
    const [data, setData] = useState({
        stats: { totalUsers: 0, activeSubs: 0, pendingSubs: 0, totalRevenue: 0 },
        recentActivity: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const res = await fetchAllData(user?.email);
            if (!res.error) {
                const activity = res.data.subscriptions
                    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                    .slice(0, 8)
                    .map(sub => ({
                        id: sub.id,
                        type: sub.status === 'active' ? 'activation' : 'request',
                        user: sub.user.email,
                        time: new Date(sub.updatedAt),
                        details: sub.plan?.name,
                        status: sub.status
                    }));

                setData({
                    stats: res.data.stats,
                    recentActivity: activity
                });
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen pb-20">
            <DashboardHeader title="Overview" />

            <div className="p-6 max-w-7xl mx-auto space-y-8">

                {/* Hero / Welcome */}
                <div>
                    <h2 className="text-xl font-semibold text-white tracking-tight">Welcome back, Admin</h2>
                    <p className="text-sm text-gray-500 mt-1">Here's what's happening with your platform today.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="Total Users"
                        value={data.stats.totalUsers}
                        trend="up"
                        trendValue="+12%"
                        icon={Users}
                        color="blue"
                    />
                    <StatCard
                        title="Active Subs"
                        value={data.stats.activeSubs}
                        trend="up"
                        trendValue="+5%"
                        icon={Tv}
                        color="emerald"
                    />
                    <StatCard
                        title="Revenue"
                        value={`$${(data.stats.activeSubs * 9.99).toFixed(0)}`}
                        trend="up"
                        trendValue="+8%"
                        icon={CreditCard}
                        color="purple"
                    />
                    <StatCard
                        title="Pending"
                        value={data.stats.pendingSubs}
                        trend={data.stats.pendingSubs > 0 ? "down" : "neutral"}
                        trendValue={data.stats.pendingSubs}
                        icon={Activity}
                        color="amber"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Activity Feed */}
                    <div className="lg:col-span-2 bg-[#0b1221] border border-white/5 rounded-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-[#0b1221]">
                            <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
                            <button className="text-[10px] font-medium text-gray-500 hover:text-white transition-colors uppercase tracking-wider flex items-center gap-1">
                                View All <ArrowRight size={10} />
                            </button>
                        </div>
                        <div className="divide-y divide-white/5">
                            {data.recentActivity.map((item) => (
                                <div key={item.id} className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-2 h-2 rounded-full ring-2 ring-[#0b1221] ${item.type === 'activation' ? 'bg-emerald-500' : 'bg-amber-500'
                                            }`} />
                                        <div>
                                            <p className="text-xs text-gray-300">
                                                <span className="text-white font-medium">{item.user}</span>
                                                {item.type === 'activation' ? ' subscription activated' : ' requested a plan'}
                                            </p>
                                            <p className="text-[10px] text-gray-600 mt-0.5 font-mono">
                                                {item.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {item.time.toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${item.status === 'active'
                                            ? 'text-emerald-400 bg-emerald-500/5 border-emerald-500/10'
                                            : 'text-amber-400 bg-amber-500/5 border-amber-500/10'
                                        }`}>
                                        {item.status}
                                    </span>
                                </div>
                            ))}
                            {data.recentActivity.length === 0 && (
                                <div className="p-8 text-center text-gray-500 text-xs">No recent activity to display.</div>
                            )}
                        </div>
                    </div>

                    {/* Quick Access / System Status Placeholder */}
                    <div className="space-y-4">
                        <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-lg p-6">
                            <h3 className="text-sm font-semibold text-white mb-2">System Status</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-400">Database</span>
                                    <span className="text-emerald-400 flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Operational</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-400">API Gateway</span>
                                    <span className="text-emerald-400 flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Operational</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-400">XTREAM Server</span>
                                    <span className="text-emerald-400 flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Connected</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <AdminGuard>
            <OverviewContent />
        </AdminGuard>
    );
}
