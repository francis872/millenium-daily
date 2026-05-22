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

        {/* â”€â”€ Masthead headline â”€â”€ */}
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
                Global intelligence overview Â· AI-enhanced signals Â· Real-time analysis
              </p>
            </div>
            <div className="text-right shrink-0 hidden md:block">
              <div className="label-caps mb-0.5">Threat Level</div>
              <div className="text-base font-bold font-mono text-orange-400 tracking-wider">ELEVATED</div>
            </div>
          </div>
        </motion.div>

        {/* â”€â”€ KPI strip â”€â”€ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--rule)]">
          {[
            { label: 'Active Alerts',      value: '6',   sub: '2 critical Â· 4 high',  icon: AlertTriangle, color: 'var(--crimson-bright)' },
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

        {/* â”€â”€ ARIA insights â”€â”€ */}
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

        {/* â”€â”€ Main editorial grid â”€â”€ */}
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

