"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchAllData, updateSubscription } from '../actions';
import AdminGuard from '@/components/auth/AdminGuard';
import DashboardHeader from '@/components/admin/DashboardHeader';
import EditSubscriptionModal from '@/components/admin/EditSubscriptionModal';
import ExtendSubscriptionModal from '@/components/admin/ExtendSubscriptionModal';
import { Calendar, Edit, Search, Check, Copy, MoreHorizontal, Filter } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export default function SubscriptionsPage() {
    const { user } = useAuth();
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [activeModal, setActiveModal] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const res = await fetchAllData(user?.email);
        if (!res.error) setSubs(res.data.subscriptions);
        setLoading(false);
    };

    const handleModalSave = async (subId, data) => {
        const res = await updateSubscription(subId, data, user?.email);
        if (res.success) {
            toast.success("Subscription updated successfully");
            loadData();
        } else {
            toast.error("Failed to update: " + res.error);
        }
    };

    const copyToClipboard = (text) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    };

    const filteredSubs = subs.filter(sub => {
        const matchesFilter = filter === 'all' || sub.status === filter;
        const matchesSearch = sub.user.email.toLowerCase().includes(search.toLowerCase()) ||
            sub.macAddress?.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-[#02040a]">
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
    );

    return (
        <AdminGuard>
            <div className="min-h-screen pb-20">
                <DashboardHeader title="Subscriptions" description="Manage access, plans, and renewals." />

                <div className="p-6 max-w-[1600px] mx-auto">

                    {/* Controls Toolbar */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        {/* Search */}
                        <div className="relative w-full md:w-80 group">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors" size={14} />
                            <input
                                type="text"
                                placeholder="Search by email or MAC..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-[#0b1221] border border-white/5 rounded-md pl-8 pr-4 py-2 text-xs text-white focus:outline-none focus:border-white/20 transition-all shadow-sm"
                            />
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex items-center p-1 bg-[#0b1221] border border-white/5 rounded-md">
                            {['all', 'active', 'pending', 'expired'].map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-3 py-1 rounded text-[10px] font-medium uppercase tracking-wide transition-all ${filter === f
                                            ? 'bg-white/10 text-white shadow-sm'
                                            : 'text-gray-500 hover:text-gray-300'
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* High Density Table */}
                    <div className="border border-white/5 rounded-lg overflow-hidden bg-[#0b1221] shadow-xl shadow-black/20">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/5 bg-[#02040a] text-gray-500 text-[10px] uppercase tracking-wider font-semibold">
                                        <th className="px-6 py-3 w-[30%]">User</th>
                                        <th className="px-6 py-3">Plan</th>
                                        <th className="px-6 py-3">MAC Address</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3">Expiry</th>
                                        <th className="px-6 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredSubs.map(sub => (
                                        <tr key={sub.id} className="group hover:bg-white/[0.02] transition-colors">
                                            {/* User */}
                                            <td className="px-6 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-b from-gray-700 to-gray-800 flex items-center justify-center text-[10px] font-bold text-white border border-white/5 shadow-inner">
                                                        {sub.user.email[0].toUpperCase()}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-white text-xs font-medium">{sub.user.email}</span>
                                                        <span className="text-[10px] text-gray-600">{sub.user.fullName || 'No Name'}</span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Plan */}
                                            <td className="px-6 py-3">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded border border-white/5 bg-white/[0.02] text-[10px] text-gray-400 font-medium">
                                                    {sub.plan?.name}
                                                </span>
                                            </td>

                                            {/* MAC */}
                                            <td className="px-6 py-3">
                                                <div
                                                    onClick={() => copyToClipboard(sub.macAddress)}
                                                    className="group/mac flex items-center gap-2 cursor-pointer"
                                                >
                                                    <code className="text-[10px] font-mono text-gray-300 group-hover/mac:text-white transition-colors">
                                                        {sub.macAddress || '-'}
                                                    </code>
                                                    {sub.macAddress && <Copy size={10} className="text-gray-600 opacity-0 group-hover/mac:opacity-100 transition-opacity" />}
                                                </div>
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-3">
                                                <StatusBadge status={sub.status} />
                                            </td>

                                            {/* Expiry */}
                                            <td className="px-6 py-3">
                                                {sub.endDate ? (
                                                    <div className="flex flex-col">
                                                        <span className="text-xs text-gray-300 font-mono">{new Date(sub.endDate).toLocaleDateString()}</span>
                                                        <span className={`text-[10px] ${new Date(sub.endDate) < new Date() ? 'text-red-500' : 'text-gray-600'
                                                            }`}>
                                                            {Math.ceil((new Date(sub.endDate) - new Date()) / (1000 * 60 * 60 * 24))} days left
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-600 text-[10px]">--</span>
                                                )}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-3 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => setActiveModal({ type: 'extend', sub })}
                                                        className="h-7 px-3 bg-[#3b82f6] hover:bg-blue-500 text-white text-[10px] font-semibold rounded shadow-lg shadow-blue-500/20 transition-all flex items-center gap-1.5"
                                                    >
                                                        <Calendar size={12} />
                                                        Extend
                                                    </button>
                                                    <button
                                                        onClick={() => setActiveModal({ type: 'edit', sub })}
                                                        className="h-7 px-3 border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white text-[10px] font-medium rounded transition-colors flex items-center gap-1.5"
                                                    >
                                                        <Edit size={12} />
                                                        Edit
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {filteredSubs.length === 0 && (
                                <div className="p-12 text-center flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                        <Filter size={20} className="text-gray-600" />
                                    </div>
                                    <p className="text-gray-500 text-xs">No subscriptions match your filters.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {activeModal?.type === 'edit' && (
                        <EditSubscriptionModal
                            sub={activeModal.sub}
                            onClose={() => setActiveModal(null)}
                            onSave={handleModalSave}
                        />
                    )}
                    {activeModal?.type === 'extend' && (
                        <ExtendSubscriptionModal
                            sub={activeModal.sub}
                            onClose={() => setActiveModal(null)}
                            onSave={handleModalSave}
                        />
                    )}
                </AnimatePresence>
            </div>
        </AdminGuard>
    );
}

function StatusBadge({ status }) {
    const styles = {
        active: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        pending: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
        expired: 'text-red-400 bg-red-500/10 border-red-500/20',
        cancelled: 'text-gray-400 bg-gray-500/10 border-gray-500/20',
    };

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${styles[status] || styles.cancelled}`}>
            <span className="w-1 h-1 rounded-full bg-current mr-1.5 opacity-60" />
            {status}
        </span>
    );
}
