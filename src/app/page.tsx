'use client';
import { AppShell } from '@/components/layout/AppShell';
import { IntelligenceFeed } from '@/components/dashboard/IntelligenceFeed';
import { MarketSignals } from '@/components/dashboard/MarketSignals';
import { GeopoliticalRiskBoard } from '@/components/dashboard/GeopoliticalRiskBoard';
import { PredictionCards } from '@/components/dashboard/PredictionCards';
import { LiveCharts } from '@/components/charts/LiveCharts';
import { ArticlesFeed } from '@/components/dashboard/ArticlesFeed';
import { motion } from 'framer-motion';
import { mockAIInsights } from '@/data/mockData';
import { cn, timeAgo } from '@/lib/utils';
import { AlertTriangle, Eye, Globe, TrendingUp } from 'lucide-react';

function SectionHeader({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <div className="section-rule mb-3">
      <span
        className={cn(
          'text-[10px] font-bold tracking-[0.22em] uppercase',
          accent ? 'text-[var(--gold)]' : 'text-[var(--ink-3)]'
        )}
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {label}
      </span>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="p-5 space-y-6 min-h-full">

        {/* ── Masthead headline ── */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-[var(--rule)] pb-4"
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1
                className="text-3xl font-bold leading-none tracking-tight text-[var(--ink)] mb-1"
                style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
              >
                Intelligence Briefing
              </h1>
              <p className="text-[11px] text-[var(--ink-3)] tracking-wide">
                Global intelligence overview · AI-enhanced signals · Real-time analysis
              </p>
            </div>
            <div className="text-right shrink-0 hidden md:block">
              <div className="label-caps mb-0.5">Threat Level</div>
              <div className="text-base font-bold font-mono text-orange-400 tracking-wider">ELEVATED</div>
            </div>
          </div>
        </motion.div>

        {/* ── KPI strip ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--rule)]">
          {[
            { label: 'Active Alerts',      value: '6',   sub: '2 critical · 4 high',  icon: AlertTriangle, color: 'var(--crimson-bright)' },
            { label: 'Intel Sources',      value: '847', sub: 'Verified active feeds', icon: Eye,           color: 'var(--gold)' },
            { label: 'Regions Monitored',  value: '142', sub: '97% global coverage',   icon: Globe,         color: 'var(--gold)' },
            { label: 'AI Predictions',     value: '24',  sub: 'Updated last 4h',       icon: TrendingUp,    color: 'var(--gold)' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-[var(--void-2)] px-5 py-4 flex items-start gap-4"
            >
              <s.icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: s.color }} />
              <div>
                <div
                  className="text-2xl font-bold font-mono leading-none mb-1"
                  style={{ color: s.color }}
                >
                  {s.value}
                </div>
                <div className="text-[11px] text-[var(--ink-2)] font-medium">{s.label}</div>
                <div className="text-[10px] text-[var(--ink-3)] mt-0.5">{s.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── ARIA insights ── */}
        <div>
          <SectionHeader label="ARIA Intelligence Feed" accent />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--rule)]">
            {mockAIInsights.map((insight, i) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.06 + i * 0.04 }}
                className="bg-[var(--void-2)] p-4 hover:bg-[var(--void-3)] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={cn(
                    'text-[9px] font-bold tracking-[0.15em] px-1.5 py-0.5 border uppercase',
                    insight.type === 'anomaly'    ? 'text-[var(--crimson-bright)] border-[var(--crimson)]/30 bg-[var(--crimson-dim)]' :
                    insight.type === 'prediction' ? 'text-[var(--gold)] border-[var(--gold)]/30 bg-[var(--gold-dim)]' :
                    insight.type === 'alert'      ? 'text-orange-400 border-orange-700/30 bg-orange-950/40' :
                                                    'text-[var(--ink-2)] border-[var(--rule)] bg-[var(--void-3)]'
                  )}>
                    {insight.type}
                  </span>
                  <span className="text-[10px] text-[var(--ink-3)] font-mono ml-auto">{timeAgo(insight.timestamp)}</span>
                </div>
                <div className="text-[12px] font-semibold text-[var(--ink)] mb-1.5 line-clamp-2 group-hover:text-[var(--gold)] transition-colors">
                  {insight.title}
                </div>
                <div className="text-[11px] text-[var(--ink-3)] line-clamp-2 leading-relaxed">{insight.content}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Main editorial grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-1">
            <SectionHeader label="Intelligence Events" />
            <IntelligenceFeed />
          </div>
          <div className="lg:col-span-1 space-y-5">
            <div>
              <SectionHeader label="Market Signals" />
              <LiveCharts />
            </div>
            <div>
              <SectionHeader label="Latest Reports" />
              <ArticlesFeed />
            </div>
          </div>
          <div className="lg:col-span-1 space-y-5">
            <div>
              <SectionHeader label="Asset Intelligence" />
              <MarketSignals />
            </div>
            <div>
              <SectionHeader label="Geopolitical Risk" />
              <GeopoliticalRiskBoard />
            </div>
            <div>
              <SectionHeader label="Predictive Models" accent />
              <PredictionCards />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}


export default function DashboardPage() {
  return (
    <AppShell>
      <div className="p-4 space-y-4 min-h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <Zap className="w-5 h-5 text-cyan-400" />
              <h1 className="text-xl font-bold text-white tracking-tight">Mission Control</h1>
              <span className="text-[10px] font-bold tracking-widest text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                LIVE
              </span>
            </div>
            <p className="text-xs text-slate-400">Global intelligence overview · Real-time signals · AI-enhanced analysis</p>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-[10px] text-slate-500 font-mono">THREAT LEVEL</div>
            <div className="text-lg font-bold text-orange-400 font-mono">ELEVATED</div>
          </div>
        </motion.div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Active Alerts', value: '6', sub: '2 critical · 4 high', color: 'red', icon: AlertTriangle },
            { label: 'Intel Sources', value: '847', sub: 'Verified active feeds', color: 'cyan', icon: Eye },
            { label: 'Regions Monitored', value: '142', sub: '97% coverage', color: 'blue', icon: Globe },
            { label: 'AI Predictions', value: '24', sub: 'Updated in last 4h', color: 'purple', icon: TrendingUp },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -2 }}
              className={`rounded-xl border p-4 flex items-start gap-3 cursor-default border-${s.color}-500/20 bg-${s.color}-500/5`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-${s.color}-500/15`}>
                <s.icon className={`w-4 h-4 text-${s.color}-400`} />
              </div>
              <div>
                <div className={`text-2xl font-bold font-mono text-${s.color}-300`}>{s.value}</div>
                <div className="text-xs text-slate-400 font-medium">{s.label}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{s.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Insights strip */}
        <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-3">
          <div className="text-[10px] font-bold tracking-widest text-purple-400 uppercase mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            ARIA Intelligence Feed
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {mockAIInsights.map((insight, i) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/60 hover:border-purple-500/20 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className={cn(
                    'text-[10px] font-bold px-1.5 py-0.5 rounded border',
                    insight.type === 'anomaly' ? 'text-red-400 bg-red-500/10 border-red-500/20' :
                    insight.type === 'prediction' ? 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' :
                    insight.type === 'alert' ? 'text-orange-400 bg-orange-500/10 border-orange-500/20' :
                    'text-purple-400 bg-purple-500/10 border-purple-500/20'
                  )}>
                    {insight.type.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-slate-500 ml-auto">{timeAgo(insight.timestamp)}</span>
                </div>
                <div className="text-xs font-semibold text-slate-200 mb-1 line-clamp-1">{insight.title}</div>
                <div className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{insight.content}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1">
            <IntelligenceFeed />
          </div>
          <div className="lg:col-span-1 space-y-4">
            <LiveCharts />
            <ArticlesFeed />
          </div>
          <div className="lg:col-span-1 space-y-4">
            <MarketSignals />
            <GeopoliticalRiskBoard />
            <PredictionCards />
          </div>
        </div>
      </div>
    </AppShell>
  );
}

