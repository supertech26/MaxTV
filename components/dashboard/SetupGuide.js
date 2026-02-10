"use client";
import { useState } from 'react';

export default function SetupGuide() {
    const [activeTab, setActiveTab] = useState('smarttv');

    const tabs = [
        { id: 'smarttv', label: 'Smart TV (Samsung/LG)', icon: '📺' },
        { id: 'firestick', label: 'Firestick / Android', icon: '🔥' },
        { id: 'ios', label: 'Apple iOS', icon: '🍎' },
        { id: 'pc', label: 'Windows / Mac', icon: '💻' },
    ];

    const content = {
        smarttv: (
            <div className="space-y-4">
                <p>1. Go to your TV App Store and search for <strong>&quot;IBO Player&quot;</strong> or <strong>&quot;Smarters Pro&quot;</strong>.</p>
                <p>2. Install and open the app.</p>
                <p>3. Note down the <strong>Device ID</strong> and <strong>Key</strong> displayed on screen.</p>
                <p>4. Enter these details in our <a href="#" className="text-emerald-400 underline">Playlist Uploader</a> or send them to support.</p>
            </div>
        ),
        firestick: (
            <div className="space-y-4">
                <p>1. Install &quot;Downloader&quot; app from the Amazon App Store.</p>
                <p>2. Open Downloader and enter code: <strong>78522</strong> to download IPTV Smarters.</p>
                <p>3. Open IPTV Smarters and select &quot;Login with Xtream Codes&quot;.</p>
                <p>4. Enter your details from the Subscription Card above.</p>
            </div>
        ),
        ios: (
            <div className="space-y-4">
                <p>1. Download &quot;GSE Smart IPTV&quot; or &quot;Smarters Player Lite&quot; from App Store.</p>
                <p>2. Open app and choose &quot;Xtream Codes API&quot;.</p>
                <p>3. Enter Username, Password, and URL provided above.</p>
            </div>
        ),
        pc: (
            <div className="space-y-4">
                <p>1. Download VLC Media Player.</p>
                <p>2. Open VLC, go to Media &gt; Open Network Stream.</p>
                <p>3. Paste your M3U URL and click Play.</p>
            </div>
        )
    };

    return (
        <div className="bg-[#0f172a] rounded-2xl border border-gray-800 overflow-hidden my-8">
            <div className="p-6 border-b border-gray-800">
                <h3 className="text-xl font-bold text-white">Setup Guide</h3>
                <p className="text-gray-400 text-sm">How to install on your device</p>
            </div>

            <div className="flex overflow-x-auto border-b border-gray-800">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.id
                            ? 'text-emerald-400 border-b-2 border-emerald-400 bg-emerald-500/5'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <span>{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="p-8 text-gray-300 text-sm leading-relaxed">
                {content[activeTab]}
            </div>
        </div>
    );
}
