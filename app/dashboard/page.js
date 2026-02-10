"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getUserDashboardData } from './actions';
import SubscriptionCard from '@/components/dashboard/SubscriptionCard';
import DownloadSection from '@/components/dashboard/DownloadSection';
import SetupGuide from '@/components/dashboard/SetupGuide';
import OrderList from '@/components/dashboard/OrderList';
import SupportWidget from '@/components/dashboard/SupportWidget';
import Button from '@/components/ui/Button';

export default function Dashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && user?.email) {
      loadDashboard();
    }
  }, [user, authLoading]);

  const loadDashboard = async () => {
    try {
      const res = await getUserDashboardData(user.email);
      if (!res.error) {
        setData(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
    </div>
  );

  return (
    <div className="pb-20 animate-fade-in">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
            Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">{data?.user.name}</span>
          </h1>
          <p className="text-gray-400">Welcome to your premium control panel.</p>
        </div>
        <div className="flex gap-3">
          <Button size="sm" variant="outline">Refresh Playlist</Button>
          <Button size="sm">Extend Plan</Button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto">
        <SubscriptionCard sub={data?.subscription} />
        <DownloadSection sub={data?.subscription} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SetupGuide />
          <div className="mt-8">
            <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button className="p-4 bg-[#0f172a] rounded-xl border border-gray-800 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all text-left group">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform origin-left">🔒</div>
                <div className="font-bold text-white text-sm">Parental Control</div>
              </button>
              <button className="p-4 bg-[#0f172a] rounded-xl border border-gray-800 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all text-left group">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform origin-left">🧪</div>
                <div className="font-bold text-white text-sm">Request Trial</div>
              </button>
            </div>
            <OrderList orders={data?.orders} />
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-6">Support & Help</h3>
        <SupportWidget />
      </div>

      <footer className="text-center text-gray-500 text-sm mt-20 pb-10 border-t border-gray-800 pt-10">
        &copy; 2024 IPShopTV. All rights reserved. <br />
        <span className="text-xs opacity-50">v2.5.0 Premium Build</span>
      </footer>
    </div>
  );
}
