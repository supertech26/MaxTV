"use client";

export default function SupportWidget() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* WhatsApp Card */}
            <div className="md:col-span-1 bg-[#25D366] text-white p-6 rounded-2xl shadow-lg shadow-green-900/20 relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer">
                <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2">WhatsApp Support</h3>
                    <p className="text-green-100 text-sm mb-4">Chat instantly with our technical team.</p>
                    <button className="bg-white text-[#25D366] px-4 py-2 rounded-lg font-bold text-sm">Start Chat</button>
                </div>
                <div className="absolute -right-4 -bottom-4 text-green-700/30 text-9xl">
                    💬
                </div>
            </div>

            {/* Ticket Card */}
            <div className="md:col-span-2 bg-[#0f172a] p-6 rounded-2xl border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-xl font-bold text-white mb-2">Open a Support Ticket</h3>
                    <p className="text-gray-400 text-sm">Having issues? Submit a detailed request and we&apos;ll fix it.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-blue-600/20">
                    Create Ticket
                </button>
            </div>
        </div>
    );
}
