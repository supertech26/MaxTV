"use client";

export default function SubscriptionCard({ sub }) {
    if (!sub) {
        return (
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center border border-gray-700">
                <h3 className="text-xl text-gray-300 mb-4">No Active Subscription</h3>
                <p className="text-gray-400 mb-6">Get started with our premium IPTV service today.</p>
                <a href="/pricing" className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-emerald-500/20">
                    Buy Subscription
                </a>
            </div>
        );
    }

    const isExpired = sub.daysRemaining <= 0;

    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] mainly-bg border border-gray-800 shadow-2xl group">
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${isExpired ? 'from-red-500/10 to-orange-500/10' : 'from-emerald-500/10 to-cyan-500/10'} opacity-50`}></div>

            <div className="relative p-8 md:p-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isExpired ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                                {isExpired ? 'Expired' : 'Active'}
                            </span>
                            <span className="text-gray-400 text-xs font-mono uppercase">ID: #{sub.id}</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-1 tracking-tight">
                            {sub.planName}
                        </h2>
                        <p className="text-gray-400 text-sm">Valid until: {new Date(sub.endDate).toLocaleDateString()}</p>
                    </div>

                    {!isExpired && (
                        <div className="text-right">
                            <div className="text-4xl font-bold text-white mb-1">{sub.daysRemaining}</div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">Days Left</div>
                        </div>
                    )}
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between text-xs text-gray-400 mb-2 font-medium">
                        <span>Progress</span>
                        <span>{Math.round(sub.progress)}% Remaining</span>
                    </div>
                    <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-1000 ease-out ${isExpired ? 'bg-red-500' : 'bg-gradient-to-r from-emerald-400 to-cyan-400'}`}
                            style={{ width: `${sub.progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#050b18]/50 p-4 rounded-xl border border-gray-700/50 backdrop-blur-sm">
                        <div className="text-xs text-gray-500 uppercase mb-1 font-semibold">Username</div>
                        <div className="text-white font-mono bg-black/30 p-2 rounded border border-gray-700/50 select-all">
                            {sub.username || 'user' + sub.id}
                        </div>
                    </div>
                    <div className="bg-[#050b18]/50 p-4 rounded-xl border border-gray-700/50 backdrop-blur-sm">
                        <div className="text-xs text-gray-500 uppercase mb-1 font-semibold">Password</div>
                        <div className="text-white font-mono bg-black/30 p-2 rounded border border-gray-700/50 select-all tracking-widest">
                            ••••••••
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-800 flex justify-end">
                    <button className="bg-white text-black hover:bg-gray-200 font-bold py-3 px-8 rounded-xl transition-colors shadow-lg shadow-white/10">
                        {isExpired ? 'Renew Subscription' : 'Extend Plan'}
                    </button>
                </div>
            </div>
        </div>
    );
}
