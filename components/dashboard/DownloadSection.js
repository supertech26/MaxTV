"use client";
import { useState } from 'react';

export default function DownloadSection({ sub }) {
    const [copied, setCopied] = useState(null);

    if (!sub) return null;

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(null), 2000);
    };

    const links = [
        {
            label: "M3U Playlist URL",
            value: sub.m3uUrl || "http://line.ipshoptv.com/get.php?username=...",
            icon: "📋",
            color: "emerald"
        },
        {
            label: "EPG URL",
            value: sub.epgUrl || "http://line.ipshoptv.com/xmltv.php?username=...",
            icon: "📺",
            color: "blue"
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            {links.map((link, idx) => (
                <div key={idx} className="bg-[#0f172a] p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors group">
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-${link.color}-500/10 text-${link.color}-400`}>
                            {link.icon}
                        </div>
                        <h4 className="font-semibold text-white">{link.label}</h4>
                    </div>

                    <div className="bg-[#050b18] p-3 rounded-lg border border-gray-800 font-mono text-xs text-gray-400 break-all mb-4 relative group-hover:border-gray-700 transition-colors">
                        {link.value.substring(0, 50)}...
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => copyToClipboard(link.value, link.label)}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${copied === link.label
                                    ? 'bg-green-500 text-white'
                                    : 'bg-white/5 hover:bg-white/10 text-white'
                                }`}
                        >
                            {copied === link.label ? 'Copied!' : 'Copy Link'}
                        </button>
                        {link.label.includes('M3U') && (
                            <button className="flex-1 py-2 rounded-lg text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white transition-colors">
                                Download File
                            </button>
                        )}
                    </div>
                </div>
            ))}

            {/* Web Player Card */}
            <div className="md:col-span-2 bg-gradient-to-r from-violet-900/20 to-fuchsia-900/20 p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-violet-600/20">
                        ▶️
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Web Player</h3>
                        <p className="text-gray-400 text-sm">Watch directly in your browser without installing apps.</p>
                    </div>
                </div>
                <a href="/web-player" className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg shadow-white/5 w-full md:w-auto text-center">
                    Launch Player
                </a>
            </div>
        </div>
    );
}
