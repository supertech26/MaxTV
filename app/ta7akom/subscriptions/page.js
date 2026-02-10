"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchAllData, updateSubscription } from '../actions';
import AdminGuard from '@/components/auth/AdminGuard';

function SubscriptionsContent() {
    const { user } = useAuth();
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const res = await fetchAllData(user?.email);
            if (!res.error) {
                setSubs(res.data.subscriptions);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (subId, m3u, date) => {
        setUpdating(subId);
        const res = await updateSubscription(subId, m3u, date, user?.email);
        if (res.success) {
            alert("Updated!");
            loadData();
        } else {
            alert("Error: " + res.error);
        }
        setUpdating(null);
    };

    if (loading) return <div className="text-white text-center p-20">Loading Subscriptions...</div>;

    return (
        <div className="min-h-screen bg-[#050b18] text-white p-8 font-sans">
            <h1 className="text-3xl font-bold mb-8 text-emerald-400">Subscription Management</h1>

            <div className="overflow-x-auto bg-[#0f172a] rounded-xl border border-gray-800 shadow-xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#1e293b] text-gray-400 text-sm uppercase">
                            <th className="p-4">User</th>
                            <th className="p-4">Plan</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">M3U Link</th>
                            <th className="p-4">Expiry</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subs.map(sub => (
                            <SubscriptionRow key={sub.id} sub={sub} onSave={handleSave} updating={updating === sub.id} />
                        ))}
                    </tbody>
                </table>
                {subs.length === 0 && <div className="p-8 text-center text-gray-500">No subscriptions found.</div>}
            </div>
        </div>
    );
}

function SubscriptionRow({ sub, onSave, updating }) {
    const [m3u, setM3u] = useState(sub.m3uUrl || '');
    const [expiry, setExpiry] = useState(sub.endDate ? new Date(sub.endDate).toISOString().split('T')[0] : '');

    return (
        <tr className="border-b border-gray-800 hover:bg-[#131d33]">
            <td className="p-4">
                <div className="font-medium text-white">{sub.user.email}</div>
            </td>
            <td className="p-4 text-emerald-400">{sub.plan?.name}</td>
            <td className="p-4">
                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${sub.status === 'active' ? 'bg-emerald-900 text-emerald-400' : 'bg-yellow-900 text-yellow-400'
                    }`}>
                    {sub.status}
                </span>
            </td>
            <td className="p-4">
                <input
                    type="text"
                    value={m3u}
                    onChange={e => setM3u(e.target.value)}
                    className="w-48 bg-[#050b18] border border-gray-700 rounded px-2 py-1 text-sm focus:border-emerald-500"
                    placeholder="http://..."
                />
            </td>
            <td className="p-4">
                <input
                    type="date"
                    value={expiry}
                    onChange={e => setExpiry(e.target.value)}
                    className="bg-[#050b18] border border-gray-700 rounded px-2 py-1 text-sm focus:border-emerald-500 text-white"
                />
            </td>
            <td className="p-4">
                <button
                    onClick={() => onSave(sub.id, m3u, expiry)}
                    disabled={updating}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded text-xs"
                >
                    {updating ? '...' : 'Save'}
                </button>
            </td>
        </tr>
    );
}

export default function Page() {
    return (
        <AdminGuard>
            <SubscriptionsContent />
        </AdminGuard>
    );
}
