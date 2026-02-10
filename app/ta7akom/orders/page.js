"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchAllData } from '../actions';
import AdminGuard from '@/components/auth/AdminGuard';

function OrdersContent() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const res = await fetchAllData(user?.email);
            if (!res.error) {
                setOrders(res.data.orders);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-white text-center p-20">Loading Orders...</div>;

    return (
        <div className="min-h-screen bg-[#050b18] text-white p-8 font-sans">
            <h1 className="text-3xl font-bold mb-8 text-emerald-400">Order History</h1>

            <div className="overflow-x-auto bg-[#0f172a] rounded-xl border border-gray-800 shadow-xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#1e293b] text-gray-400 text-sm uppercase">
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Total</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} className="border-b border-gray-800 hover:bg-[#131d33]">
                                <td className="p-4 font-mono text-xs text-gray-400">{order.id}</td>
                                <td className="p-4">{order.user?.email || 'Unknown'}</td>
                                <td className="p-4 font-bold text-emerald-400">€{order.total}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${order.status === 'COMPLETED' ? 'bg-emerald-900 text-emerald-400' : 'bg-yellow-900 text-yellow-400'
                                        }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-gray-500">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && <div className="p-8 text-center text-gray-500">No orders found.</div>}
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <AdminGuard>
            <OrdersContent />
        </AdminGuard>
    );
}
