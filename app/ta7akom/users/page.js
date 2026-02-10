"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchAllData, updateUserRole } from '../actions';
import AdminGuard from '@/components/auth/AdminGuard';

function UsersContent() {
    const { user } = useAuth();
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const res = await fetchAllData(user?.email);
            if (!res.error) {
                setProfiles(res.data.profiles);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        if (!confirm(`Switch role to ${newRole}?`)) return;
        setUpdating(userId);
        const res = await updateUserRole(userId, newRole, user?.email);
        if (res.success) {
            loadData();
        } else {
            alert("Error: " + res.error);
        }
        setUpdating(null);
    };

    if (loading) return <div className="text-white text-center p-20">Loading Users...</div>;

    return (
        <div className="min-h-screen bg-[#050b18] text-white p-8 font-sans">
            <h1 className="text-3xl font-bold mb-8 text-emerald-400">User Management</h1>

            <div className="overflow-x-auto bg-[#0f172a] rounded-xl border border-gray-800 shadow-xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#1e293b] text-gray-400 text-sm uppercase">
                            <th className="p-4">Email</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Last Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profiles.map(p => (
                            <tr key={p.id} className="border-b border-gray-800 hover:bg-[#131d33]">
                                <td className="p-4 font-medium">{p.email}</td>
                                <td className="p-4 text-gray-400">{p.fullName || '-'}</td>
                                <td className="p-4">
                                    <select
                                        value={p.role || 'USER'}
                                        onChange={(e) => handleRoleChange(p.id, e.target.value)}
                                        disabled={updating === p.id}
                                        className="bg-[#050b18] border border-gray-700 rounded px-2 py-1 text-xs text-gray-300 outline-none focus:border-emerald-500"
                                    >
                                        <option value="USER">USER</option>
                                        <option value="ADMIN">ADMIN</option>
                                    </select>
                                </td>
                                <td className="p-4 text-sm text-gray-500">
                                    {p.updatedAt ? new Date(p.updatedAt).toLocaleDateString() : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <AdminGuard>
            <UsersContent />
        </AdminGuard>
    );
}
