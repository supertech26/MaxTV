"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight, Loader2, Calendar } from 'lucide-react';

export default function ExtendSubscriptionModal({ sub, onClose, onSave }) {
    const [months, setMonths] = useState(1);
    const [loading, setLoading] = useState(false);

    const currentEndDate = sub.endDate ? new Date(sub.endDate) : new Date();
    // If expired, start from today
    const startDate = currentEndDate < new Date() ? new Date() : currentEndDate;

    const newEndDate = new Date(startDate);
    newEndDate.setMonth(newEndDate.getMonth() + parseInt(months));

    const handleSubmit = async () => {
        setLoading(true);
        await onSave(sub.id, { endDate: newEndDate, status: 'active' }); // Auto-activate on extend
        setLoading(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#02040a]/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-[#0b1221] border border-white/10 rounded-xl w-full max-w-md shadow-2xl relative overflow-hidden"
            >
                <div className="flex justify-between items-center px-6 py-4 border-b border-white/5">
                    <h2 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
                        Extend Subscription
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/5">
                        <X size={16} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Date Visualizer */}
                    <div className="flex items-center justify-between text-sm bg-[#02040a] p-4 rounded-lg border border-white/5">
                        <div className="text-left">
                            <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Current</p>
                            <p className={sub.endDate && new Date(sub.endDate) < new Date() ? "text-red-400 font-mono" : "text-gray-300 font-mono"}>
                                {sub.endDate ? new Date(sub.endDate).toLocaleDateString() : 'Now'}
                            </p>
                        </div>
                        <div className="text-gray-600">
                            <ArrowRight size={14} />
                        </div>
                        <div className="text-right">
                            <p className="text-emerald-500 text-[10px] uppercase tracking-wider mb-1">New Expiry</p>
                            <p className="text-white font-mono font-bold">{newEndDate.toLocaleDateString()}</p>
                        </div>
                    </div>

                    {/* Duration Selection */}
                    <div className="grid grid-cols-4 gap-2">
                        {[1, 3, 6, 12].map((m) => (
                            <button
                                key={m}
                                onClick={() => setMonths(m)}
                                className={`py-3 rounded-md border transition-all flex flex-col items-center justify-center relative ${months === m
                                        ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20 z-10'
                                        : 'bg-[#02040a] border-white/5 text-gray-400 hover:border-white/20 hover:text-white'
                                    }`}
                            >
                                <span className="text-sm font-bold">{m}</span>
                                <span className="text-[9px] uppercase opacity-70">Month{m > 1 ? 's' : ''}</span>
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-md text-xs font-bold transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 uppercase tracking-wide"
                    >
                        {loading ? <Loader2 size={14} className="animate-spin" /> : 'Confirm Extension'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
