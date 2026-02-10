"use client";

export default function OrderList({ orders }) {
    if (!orders || orders.length === 0) return null;

    return (
        <div className="bg-[#0f172a] rounded-2xl border border-gray-800 overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Recent Orders</h3>
                <a href="/dashboard/orders" className="text-sm text-emerald-400 hover:underline">View All</a>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-[#1e293b] text-gray-400 uppercase text-xs">
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} className="border-b border-gray-800 hover:bg-[#131d33] transition-colors">
                                <td className="p-4 font-mono text-gray-300">#{order.id.substring(0, 8)}...</td>
                                <td className="p-4 text-gray-400">{new Date(order.date).toLocaleDateString()}</td>
                                <td className="p-4 text-white font-bold">€{order.amount}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${order.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'
                                        }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <button className="text-blue-400 hover:text-blue-300 hover:underline">Download PDF</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
