"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchAllData, updateSubscription, updateUserRole } from './actions';
import AdminGuard from '@/components/auth/AdminGuard';
import { useRouter } from 'next/navigation';

function Ta7akomContent() {
    const { user } = useAuth();
    const [data, setData] = useState({ subscriptions: [], stats: { totalUsers: 0, activeSubs: 0, pendingSubs: 0 } });
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [updating, setUpdating] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const res = await fetchAllData(user?.email);
            if (!res.error) {
                setData(res.data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveSub = async (subId, m3u, date) => {
        setUpdating(subId);
        const res = await updateSubscription(subId, m3u, date, user?.email);
        if (res.success) {
            loadData();
            alert("Subscription updated!");
        } else {
            alert("Error: " + res.error);
        }
        setUpdating(null);
    };

    const handleRoleChange = async (userId, newRole) => {
        if (!confirm(`Change role to ${newRole}?`)) return;
        setUpdating(userId); // reusing loading state id
        const res = await updateUserRole(userId, newRole, user?.email);
        if (res.success) {
            loadData();
        } else {
            alert("Error: " + res.error);
        }
        setUpdating(null);
    }

    // Filter
    const filteredSubs = data.subscriptions.filter(sub =>
        sub.user.email?.toLowerCase().includes(search.toLowerCase()) ||
        sub.user.fullName?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <div className="text-white text-center p-20">Loading Dashboard...</div>;

    return (
        <div className="min-h-screen bg-[#050b18] text-white p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
                            Ta7akom Dashboard
                        </h1>
                        <p className="text-gray-400 text-sm">Control Panel</p>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-400">Admin</div>
                        <div className="font-semibold">{user?.email}</div>
                    </div>
                </header>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard title="Total Users" value={data.stats.totalUsers} color="blue" />
                    <StatCard title="Active Subscriptions" value={data.stats.activeSubs} color="emerald" />
                    <StatCard title="Pending / Issues" value={data.stats.pendingSubs} color="yellow" />
                </div>

                {/* Search */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full max-w-md p-3 rounded-xl bg-[#0f172a] border border-gray-700 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                </div>

                {/* Table */}
                <div className="overflow-x-auto bg-[#0f172a] rounded-xl border border-gray-800 shadow-xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#1e293b] text-gray-400 text-sm uppercase tracking-wider">
                                <th className="p-4">User</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Plan / Status</th>
                                <th className="p-4">M3U Link</th>
                                <th className="p-4">Expiry</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSubs.map(sub => (
                                <Row
                                    key={sub.id}
                                    sub={sub}
                                    onSave={handleSaveSub}
                                    onRoleChange={handleRoleChange}
                                    updating={updating === sub.id || updating === sub.user.id}
                                />
                            ))}
                        </tbody>
                    </table>
                    {filteredSubs.length === 0 && (
                        <div className="p-8 text-center text-gray-500">No subscriptions found.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

function Row({ sub, onSave, onRoleChange, updating }) {
    const [m3u, setM3u] = useState(sub.m3uUrl || '');
    const [expiry, setExpiry] = useState(sub.endDate ? new Date(sub.endDate).toISOString().split('T')[0] : '');

    return (
        <tr className="border-b border-gray-800 hover:bg-[#131d33] transition-colors">
            <td className="p-4">
                <div className="font-medium text-white">{sub.user.email}</div>
                <div className="text-xs text-gray-500">{sub.user.fullName}</div>
            </td>
            <td className="p-4">
                <select
                    value={sub.user.role}
                    onChange={(e) => onRoleChange(sub.user.id, e.target.value)}
                    className="bg-[#050b18] border border-gray-700 rounded px-2 py-1 text-xs text-gray-300 outline-none focus:border-emerald-500"
                >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
            </td>
            <td className="p-4">
                <div className="text-emerald-400 text-sm font-medium">{sub.plan?.name}</div>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${sub.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                    {sub.status}
                </span>
            </td>
            <td className="p-4">
                <input
                    type="text"
                    value={m3u}
                    onChange={e => setM3u(e.target.value)}
                    className="w-32 md:w-48 bg-[#050b18] border border-gray-700 rounded px-2 py-1 text-sm outline-none focus:border-emerald-500"
                    placeholder="http://..."
                />
            </td>
            <td className="p-4">
                <input
                    type="date"
                    value={expiry}
                    onChange={e => setExpiry(e.target.value)}
                    className="bg-[#050b18] border border-gray-700 rounded px-2 py-1 text-sm outline-none focus:border-emerald-500 text-gray-300"
                />
            </td>
            <td className="p-4">
                <button
                    onClick={() => onSave(sub.id, m3u, expiry)}
                    disabled={updating}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors disabled:opacity-50"
                >
                    {updating ? '...' : 'Save'}
                </button>
            </td>
        </tr>
    );
}

function StatCard({ title, value, color }) {
    const colors = {
        blue: "text-blue-400 bg-blue-400/10",
        emerald: "text-emerald-400 bg-emerald-400/10",
        yellow: "text-yellow-400 bg-yellow-400/10"
    };
    return (
        <div className={`p-6 rounded-2xl bg-[#0f172a] border border-gray-800 ${colors[color] ? '' : ''}`}>
            <h3 className="text-gray-400 text-xs uppercase font-semibold tracking-wider mb-2">{title}</h3>
            <div className={`text-4xl font-bold ${colors[color].split(' ')[0]}`}>{value}</div>
        </div>
    );
}

export default function Page() {
    return (
        <AdminGuard>
            <Ta7akomContent />
        </AdminGuard>
    );
}
