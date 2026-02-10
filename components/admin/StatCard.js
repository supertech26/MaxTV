import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StatCard({ title, value, trend, trendValue, icon: Icon, color = "blue" }) {
    const isPositive = trend === 'up';
    const isNeutral = trend === 'neutral';

    const colorStyles = {
        blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
        emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
        amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
        purple: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    };

    return (
        <div className="bg-[#0b1221] border border-white/5 rounded-lg p-5 hover:border-white/10 transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div className={cn("p-2 rounded-md", colorStyles[color])}>
                    <Icon size={18} />
                </div>
                {trend && (
                    <div className={cn("flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full border",
                        isPositive ? "text-emerald-400 bg-emerald-500/5 border-emerald-500/10" :
                            isNeutral ? "text-gray-400 bg-gray-500/5 border-gray-500/10" : "text-red-400 bg-red-500/5 border-red-500/10"
                    )}>
                        {isPositive ? <ArrowUpRight size={12} /> : isNeutral ? <Minus size={12} /> : <ArrowDownRight size={12} />}
                        {trendValue}
                    </div>
                )}
            </div>

            <div>
                <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">{title}</h3>
                <span className="text-2xl font-semibold text-white tracking-tight">{value}</span>
            </div>
        </div>
    );
}
