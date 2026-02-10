"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Check, Loader2 } from 'lucide-react';

export default function EditSubscriptionModal({ sub, onClose, onSave }) {
    const [m3u, setM3u] = useState(sub.m3uUrl || '');
    const [mac, setMac] = useState(sub.macAddress || '');
    const [status, setStatus] = useState(sub.status);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate delay for feel
        // await new Promise(r => setTimeout(r, 500)); 
        await onSave(sub.id, { m3uUrl: m3u, macAddress: mac, status });
        setLoading(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#02040a]/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2 }}
                className="bg-[#0b1221] border border-white/10 rounded-xl w-full max-w-lg shadow-2xl relative overflow-hidden"
            >
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-white/5">
                    <div>
                        <h2 className="text-sm font-semibold text-white tracking-tight">Edit Subscription</h2>
                        <p className="text-[11px] text-gray-500 mt-0.5 font-mono">{sub.user.email}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/5"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="space-y-1.5">
                        <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider">M3U Playlist URL</label>
                        <input
                            type="text"
                            value={m3u}
                            onChange={e => setM3u(e.target.value)}
                            className="w-full bg-[#02040a] border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-gray-700 font-mono"
                            placeholder="http://line.xyz..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider">MAC Address</label>
                            <input
                                type="text"
                                value={mac}
                                onChange={e => setMac(e.target.value)}
                                className="w-full bg-[#02040a] border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all font-mono placeholder:text-gray-700 uppercase"
                                placeholder="00:1A:..."
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider">Status</label>
                            <div className="relative">
                                <select
                                    value={status}
                                    onChange={e => setStatus(e.target.value)}
                                    className="w-full bg-[#02040a] border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-emerald-500/50 outline-none appearance-none cursor-pointer"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="active">Active</option>
                                    <option value="expired">Expired</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <div className="px-6 py-4 bg-[#02040a]/50 border-t border-white/5 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-md text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-md text-xs font-semibold transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-white/5"
                    >
                        {loading && <Loader2 size={12} className="animate-spin" />}
                        Save Changes
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
