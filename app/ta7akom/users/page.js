"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchAllData, updateUserRole } from '../actions';
import AdminGuard from '@/components/auth/AdminGuard';
import DashboardHeader from '@/components/admin/DashboardHeader';
import { Search, Shield, ShieldAlert, User, MoreHorizontal, Filter, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function UsersPage() {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [processing, setProcessing] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const res = await fetchAllData(user?.email);
        if (!res.error) setUsers(res.data.profiles);
        setLoading(false);
    };

    const handleRoleChange = async (userId, currentRole) => {
        const newRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
        // In a real app, use a modal. For now, confirm.
        if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;

        setProcessing(userId);
        const res = await updateUserRole(userId, newRole, user?.email);

        if (res.success) {
            toast.success(`User role updated to ${newRole}`);
            loadData();
        } else {
            toast.error("Failed to update role: " + res.error);
        }
        setProcessing(null);
    };

    const filteredUsers = users.filter(u =>
        u.email?.toLowerCase().includes(search.toLowerCase()) ||
        u.fullName?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-[#02040a]">
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
    );

    return (
        <AdminGuard>
            <div className="min-h-screen pb-20">
                <DashboardHeader title="Users" description="Manage user accounts and permissions." />

                <div className="p-6 max-w-[1600px] mx-auto">
                    {/* Toolbar */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="relative w-full md:w-80 group">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors" size={14} />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-[#0b1221] border border-white/5 rounded-md pl-8 pr-4 py-2 text-xs text-white focus:outline-none focus:border-white/20 transition-all shadow-sm"
                            />
                        </div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">
                            {filteredUsers.length} Users Found
                        </div>
                    </div>

                    {/* Table */}
                    <div className="border border-white/5 rounded-lg overflow-hidden bg-[#0b1221] shadow-xl shadow-black/20">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-[#02040a] text-gray-500 text-[10px] uppercase tracking-wider font-semibold">
                                    <th className="px-6 py-3 w-[40%]">User Profile</th>
                                    <th className="px-6 py-3">Role</th>
                                    <th className="px-6 py-3">Joined Date</th>
                                    <th className="px-6 py-3 text-right">Access Control</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredUsers.map(u => (
                                    <tr key={u.id} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-white border border-white/5">
                                                    {u.email[0].toUpperCase()}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-white text-xs font-medium">{u.email}</span>
                                                    <span className="text-[10px] text-gray-500">{u.fullName || 'No Name'}</span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-3">
                                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[10px] font-medium uppercase tracking-wide ${u.role === 'ADMIN'
                                                    ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                                    : 'bg-white/5 text-gray-400 border-white/5'
                                                }`}>
                                                {u.role === 'ADMIN' ? <Shield size={10} /> : <User size={10} />}
                                                {u.role}
                                            </span>
                                        </td>

                                        <td className="px-6 py-3">
                                            <span className="text-gray-400 text-xs font-mono">
                                                {new Date(u.createdAt || Date.now()).toLocaleDateString()}
                                            </span>
                                        </td>

                                        <td className="px-6 py-3 text-right">
                                            <button
                                                onClick={() => handleRoleChange(u.id, u.role)}
                                                disabled={processing === u.id}
                                                className="text-gray-500 hover:text-white transition-colors p-1.5 rounded hover:bg-white/5 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-wide border border-transparent hover:border-white/10"
                                            >
                                                {processing === u.id ? <Loader2 size={12} className="animate-spin" /> : <ShieldAlert size={12} />}
                                                {u.role === 'ADMIN' ? 'Demote to User' : 'Promote to Admin'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="p-12 text-center text-gray-500 text-xs">No users found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminGuard>
    );
}
