"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchAllData } from '../actions';
import AdminGuard from '@/components/auth/AdminGuard';
import DashboardHeader from '@/components/admin/DashboardHeader';
import { Search, CreditCard, CheckCircle, Clock, XCircle, Download } from 'lucide-react';

export default function OrdersPage() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const res = await fetchAllData(user?.email);
        if (!res.error) setOrders(res.data.orders);
        setLoading(false);
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-[#02040a]">
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
    );

    return (
        <AdminGuard>
            <div className="min-h-screen pb-20">
                <DashboardHeader title="Orders" description="Financial transactions and payment history." />

                <div className="p-6 max-w-[1600px] mx-auto">
                    {/* Stats Row (Optional, kept simple for now) */}

                    {/* Table */}
                    <div className="border border-white/5 rounded-lg overflow-hidden bg-[#0b1221] shadow-xl shadow-black/20">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-[#02040a] text-gray-500 text-[10px] uppercase tracking-wider font-semibold">
                                    <th className="px-6 py-3">Order Ref</th>
                                    <th className="px-6 py-3">Customer</th>
                                    <th className="px-6 py-3">Plan Details</th>
                                    <th className="px-6 py-3">Amount</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3 text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {orders.map(order => (
                                    <tr key={order.id} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-3">
                                            <span className="font-mono text-[10px] text-gray-500">#{order.id.slice(0, 8)}</span>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className="text-white text-xs font-medium">{order.user.email}</div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <span className="inline-flex items-center px-1.5 py-0.5 rounded border border-white/5 bg-white/[0.02] text-[10px] text-gray-400">
                                                Premium Plan
                                            </span>
                                        </td>
                                        <td className="px-6 py-3">
                                            <span className="text-white font-medium text-xs">${order.total}</span>
                                        </td>
                                        <td className="px-6 py-3">
                                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${order.status === 'completed'
                                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                    : order.status === 'pending'
                                                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                                                }`}>
                                                {order.status === 'completed' ? <CheckCircle size={10} /> : <Clock size={10} />}
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 text-right">
                                            <span className="text-gray-500 text-[10px] font-mono">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {orders.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="p-12 text-center text-gray-500 text-xs">
                                            No orders found.
                                        </td>
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
