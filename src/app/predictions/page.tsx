'use client';
import { AppShell } from '@/components/layout/AppShell';
import { motion } from 'framer-motion';
import { mockPredictions } from '@/data/mockData';
import { cn, timeAgo } from '@/lib/utils';
import { TrendingUp, Clock, Tag, AlertTriangle, BarChart2 } from 'lucide-react';
import { GlowCard, ConfidenceMeter } from '@/components/ui/GlowCard';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { generateTimeSeriesData } from '@/data/mockData';

const COLORS = ['#06b6d4', '#8b5cf6', '#ef4444', '#10b981'];

function ProbabilityGauge({ value, color }: { value: number; color: string }) {
  const deg = value * 180;
  return (
    <div className="relative w-24 h-12 overflow-hidden">
      <div className="absolute inset-0 rounded-t-full border-4 border-slate-700/50" />
      <div
        className="absolute inset-0 rounded-t-full border-4 border-transparent"
        style={{
          borderTopColor: color,
          borderLeftColor: value > 0.25 ? color : 'transparent',
          borderRightColor: value > 0.75 ? color : 'transparent',
          transform: 'rotate(0deg)',
        }}
      />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
        <div className="text-base font-bold font-mono text-white" style={{ color }}>
          {Math.round(value * 100)}%
        </div>
      </div>
    </div>
  );
}

export default function PredictionsPage() {
  const scenarios = [
    { name: 'Status Quo', probability: 27, color: '#06b6d4' },
    { name: 'Partial Decoupling', probability: 45, color: '#8b5cf6' },
    { name: 'Full Decoupling', probability: 18, color: '#ef4444' },
    { name: 'New Framework', probability: 10, color: '#10b981' },
  ];

  const trendData = generateTimeSeriesData(24, 50, 8);

  return (
    <AppShell>
      <div className="p-4 space-y-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-0.5">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <h1 className="text-xl font-bold text-white">Predictive Intelligence Engine</h1>
          </div>
          <p className="text-xs text-slate-400">AI-powered probability forecasting · Scenario modeling · Risk simulation</p>
        </motion.div>

        {/* Disclaimer */}
        <div className="flex items-center gap-2 p-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
          <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />
          <p className="text-xs text-yellow-200/80">
            All predictions are AI-generated probabilistic models based on available intelligence signals. Not investment or policy advice.
          </p>
        </div>

        {/* Main predictions grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {mockPredictions.map((pred, i) => {
            const trendChartData = pred.trend.map((v, idx) => ({ idx, value: v }));
            return (
              <GlowCard key={pred.id} glow="purple" className="p-4" hover>
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border text-purple-400 border-purple-500/30 bg-purple-500/10">
                          {pred.category.toUpperCase()}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-slate-500">
                          <Clock className="w-2.5 h-2.5" />{pred.timeframe}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white mb-1">{pred.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{pred.description}</p>
                    </div>
                    <div className="ml-4 shrink-0 text-right">
                      <div
                        className="text-3xl font-bold font-mono"
                        style={{ color: COLORS[i % COLORS.length] }}
                      >
                        {Math.round(pred.probability * 100)}%
                      </div>
                      <div className="text-[10px] text-slate-500">probability</div>
                    </div>
                  </div>

                  {/* Trend sparkline */}
                  <div className="mb-3" style={{ height: 60 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendChartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
                        <defs>
                          <linearGradient id={`g-${pred.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke={COLORS[i % COLORS.length]}
                          strokeWidth={1.5}
                          fill={`url(#g-${pred.id})`}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Confidence */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wide">Model confidence</span>
                    </div>
                    <ConfidenceMeter value={pred.confidence} size="md" />
                  </div>

                  {/* Key factors */}
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wide mb-1.5">Key factors</div>
                    <div className="flex flex-wrap gap-1.5">
                      {pred.factors.map((f) => (
                        <span key={f} className="flex items-center gap-0.5 text-[10px] text-slate-400 px-1.5 py-0.5 rounded bg-slate-800/50 border border-slate-700/30">
                          <Tag className="w-2 h-2" />{f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/40 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">Updated {timeAgo(pred.lastUpdated)}</span>
                    <span className="text-[10px] text-purple-400">↑ Trend: rising</span>
                  </div>
                </motion.div>
              </GlowCard>
            );
          })}
        </div>

        {/* Scenario analysis */}
        <GlowCard glow="cyan" className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-bold text-white">Scenario Distribution — US-China Relations 2027</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scenarios} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" strokeOpacity={0.5} horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748b' }} tickFormatter={(v) => `${v}%`} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#94a3b8' }} width={110} />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                    content={({ active, payload }) =>
                      active && payload?.length ? (
                        <div className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white">
                          {payload[0].payload.name}: <strong>{payload[0].value}%</strong>
                        </div>
                      ) : null
                    }
                  />
                  <Bar dataKey="probability" radius={[0, 4, 4, 0]}>
                    {scenarios.map((s, idx) => (
                      <Cell key={idx} fill={s.color} fillOpacity={0.8} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {scenarios.map((s) => (
                <div key={s.name} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-800/30 border border-slate-700/20">
                  <div className="w-2 h-8 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-slate-200">{s.name}</div>
                    <div className="mt-1 h-1 bg-slate-700/50 rounded-full">
                      <div className="h-full rounded-full" style={{ width: `${s.probability}%`, backgroundColor: s.color }} />
                    </div>
                  </div>
                  <span className="text-sm font-bold font-mono" style={{ color: s.color }}>{s.probability}%</span>
                </div>
              ))}
            </div>
          </div>
        </GlowCard>
      </div>
    </AppShell>
  );
}
