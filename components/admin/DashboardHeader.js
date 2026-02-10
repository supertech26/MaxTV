"use client";
import { Bell, Search, Command, ChevronDown } from 'lucide-react';

export default function DashboardHeader({ title, description }) {
    return (
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 sticky top-0 bg-[#02040a]/80 backdrop-blur-xl z-40 transition-all">
            <div className="flex flex-col justify-center">
                <h1 className="text-sm font-semibold text-white tracking-tight">{title}</h1>
                {description && <p className="text-[11px] text-gray-500 hidden md:block">{description}</p>}
            </div>

            <div className="flex items-center gap-4">
                {/* Global Search - Command K visual */}
                <div className="relative hidden md:flex items-center group">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors" size={14} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-[#0b1221] border border-white/5 rounded-md pl-9 pr-12 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50 w-64 transition-all placeholder:text-gray-600"
                    />
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] text-gray-600 font-mono border border-white/5 rounded px-1">
                        <Command size={10} /> <span>K</span>
                    </div>
                </div>

                <div className="h-6 w-px bg-white/5 mx-1 hidden md:block" />

                <button className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors relative">
                    <Bell size={16} />
                    <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-emerald-500 rounded-full border border-[#02040a]" />
                </button>

                <button className="flex items-center gap-2 hover:bg-white/5 rounded-full pl-1 pr-2 py-1 transition-colors">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" />
                    <ChevronDown size={12} className="text-gray-500" />
                </button>
            </div>
        </header>
    );
}
