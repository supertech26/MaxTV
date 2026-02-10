"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchAllSubscriptions, updateSubscription } from './actions';
import AdminGuard from '@/components/auth/AdminGuard';

function DashboardContent() {
    const { user } = useAuth();
    const [subscriptions, setSubscriptions] = useState([]);
    const [filteredSubs, setFilteredSubs] = useState([]);
    const [search, setSearch] = useState('');
    const [loadingData, setLoadingData] = useState(true);
    const [updating, setUpdating] = useState(null);

    useEffect(() => {
        loadSubscriptions();
    }, []);

    const loadSubscriptions = async () => {
        try {
            const res = await fetchAllSubscriptions(user?.email);
            if (res.error) {
                console.error(res.error);
            } else {
                setSubscriptions(res.data);
                setFilteredSubs(res.data);
            }
        } catch (error) {
            console.error("Failed to load subs", error);
        } finally {
            setLoadingData(false);
        }
    };

    // Search Filter
    useEffect(() => {
        if (!search) {
            setFilteredSubs(subscriptions);
        } else {
            const lowerSearch = search.toLowerCase();
            const filtered = subscriptions.filter(sub =>
                sub.user.email?.toLowerCase().includes(lowerSearch) ||
                sub.user.fullName?.toLowerCase().includes(lowerSearch)
            );
            setFilteredSubs(filtered);
        }
    }, [search, subscriptions]);

    const handleSave = async (subId, m3uUrl, endDate) => {
        setUpdating(subId);
        const res = await updateSubscription(subId, m3uUrl, endDate, user?.email);
        if (res.success) {
            alert('Updated successfully!');
            loadSubscriptions(); // Refresh data
        } else {
            alert('Failed: ' + res.error);
        }
        setUpdating(null);
    };

    if (loadingData) return <div className="text-white text-center mt-20">Loading Data...</div>;

    return (
        <div className="min-h-screen bg-[#050b18] text-white p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
                        Admin Dashboard
                    </h1>
                    <div className="text-gray-400">
                        Admin: <span className="text-white">{user?.email}</span>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search by email..."
                        className="w-full max-w-md p-3 rounded-lg bg-[#0f172a] border border-gray-700 text-white focus:border-emerald-500 focus:outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Table */}
                <div className="overflow-x-auto bg-[#0f172a] rounded-xl border border-gray-800 shadow-xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-700 bg-[#1e293b]">
                                <th className="p-4 font-semibold text-gray-300">User</th>
                                <th className="p-4 font-semibold text-gray-300">Plan</th>
                                <th className="p-4 font-semibold text-gray-300">Status</th>
                                <th className="p-4 font-semibold text-gray-300">M3U Link</th>
                                <th className="p-4 font-semibold text-gray-300">Expiration</th>
                                <th className="p-4 font-semibold text-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSubs.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-gray-500">No subscriptions found.</td>
                                </tr>
                            ) : (
                                filteredSubs.map(sub => (
                                    <SubscriptionRow key={sub.id} sub={sub} onSave={handleSave} updating={updating === sub.id} />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// Separate component for row state (inputs)
function SubscriptionRow({ sub, onSave, updating }) {
    const [m3u, setM3u] = useState(sub.m3uUrl || '');
    const [expiry, setExpiry] = useState(sub.endDate ? new Date(sub.endDate).toISOString().split('T')[0] : '');

    return (
        <tr className="border-b border-gray-800 hover:bg-[#131d33] transition-colors">
            <td className="p-4">
                <div className="font-medium">{sub.user.email}</div>
                <div className="text-xs text-gray-500">{sub.user.fullName || 'No Name'}</div>
            </td>
            <td className="p-4 text-emerald-400">{sub.plan?.name || 'Unknown Plan'}</td>
            <td className="p-4">
                <span className={`px-2 py-1 rounded text-xs font-bold ${sub.status === 'active' ? 'bg-emerald-900 text-emerald-400' :
                    sub.status === 'expired' ? 'bg-red-900 text-red-400' : 'bg-yellow-900 text-yellow-400'
                    }`}>
                    {sub.status.toUpperCase()}
                </span>
            </td>
            <td className="p-4">
                <input
                    type="text"
                    value={m3u}
                    onChange={(e) => setM3u(e.target.value)}
                    placeholder="http://..."
                    className="w-full p-2 bg-[#050b18] border border-gray-700 rounded text-sm focus:border-emerald-500 focus:outline-none"
                />
            </td>
            <td className="p-4">
                <input
                    type="date"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="p-2 bg-[#050b18] border border-gray-700 rounded text-sm focus:border-emerald-500 focus:outline-none text-gray-300"
                />
            </td>
            <td className="p-4">
                <button
                    onClick={() => onSave(sub.id, m3u, expiry)}
                    disabled={updating}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {updating ? 'Saving...' : 'Save'}
                </button>
            </td>
        </tr>
    );
}

export default function AdminDashboard() {
    return (
        <AdminGuard>
            <DashboardContent />
        </AdminGuard>
    );
}
