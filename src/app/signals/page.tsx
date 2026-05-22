'use client';
import { AppShell } from '@/components/layout/AppShell';
import { motion } from 'framer-motion';
import { mockMarketSignals } from '@/data/mockData';
import { generateTimeSeriesData } from '@/data/mockData';
import { GlowCard } from '@/components/ui/GlowCard';
import { cn } from '@/lib/utils';
import { BarChart2, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function SignalsPage() {
  return (
    <AppShell>
      <div className="p-4 space-y-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-0.5">
            <Activity className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-bold text-white">Market Signals</h1>
          </div>
          <p className="text-xs text-slate-400">AI-synthesized financial intelligence · Cross-asset correlation · Macro regime detection</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockMarketSignals.map((signal, i) => {
            const sparkData = generateTimeSeriesData(20, signal.price, signal.price * 0.05);
            const isUp = signal.change >= 0;
            return (
              <GlowCard key={signal.id} glow={isUp ? 'green' : 'red'} hover>
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06 }}
                  className="p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-base font-bold text-white font-mono">{signal.symbol}</div>
                      <div className="text-[11px] text-slate-500">{signal.asset}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white font-mono">
                        {signal.price.toLocaleString()}
                      </div>
                      <div className={cn(
                        'flex items-center gap-0.5 justify-end text-sm font-mono font-bold',
                        isUp ? 'text-emerald-400' : 'text-red-400'
                      )}>
                        {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                        {isUp ? '+' : ''}{signal.change.toFixed(2)} ({isUp ? '+' : ''}{signal.changePercent.toFixed(2)}%)
                      </div>
                    </div>
                  </div>

                  {/* Sparkline */}
                  <div style={{ height: 60 }} className="mb-3">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={sparkData.map((v, i) => ({ i, v }))} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
                        <defs>
                          <linearGradient id={`sg-${signal.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={isUp ? '#10b981' : '#ef4444'} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={isUp ? '#10b981' : '#ef4444'} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="v"
                          stroke={isUp ? '#10b981' : '#ef4444'}
                          strokeWidth={1.5}
                          fill={`url(#sg-${signal.id})`}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Signal bars */}
                  <div className="grid grid-cols-2 gap-1.5 mb-3">
                    <div>
                      <div className="text-[10px] text-slate-500 mb-0.5">Bullish signal</div>
                      <div className="h-1.5 bg-slate-700/50 rounded-full">
                        <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${signal.bullishScore * 100}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 mb-0.5">Bearish signal</div>
                      <div className="h-1.5 bg-slate-700/50 rounded-full">
                        <div className="h-full bg-red-500 rounded-full transition-all" style={{ width: `${signal.bearishScore * 100}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* AI prediction */}
                  <div className="p-2 rounded-lg bg-slate-800/40 border border-slate-700/20">
                    <div className="text-[10px] text-slate-500 mb-0.5">ARIA forecast</div>
                    <p className="text-[11px] text-slate-300 italic">{signal.aiPrediction}</p>
                  </div>

                  <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-500">
                    <BarChart2 className="w-3 h-3" />
                    Vol: {signal.volume}M · Updated: {signal.timestamp}
                  </div>
                </motion.div>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
