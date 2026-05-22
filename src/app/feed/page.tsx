'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { AppShell } from '@/components/layout/AppShell';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { ContentTypePill } from '@/components/ui/ContentTypePill';
import { mockChroniqFeed, mockAnomalySignals } from '@/data/mockData';
import type { FeedContentType } from '@/types';
import { Activity, Eye, Share2, ArrowUpRight, Filter, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const FILTERS: { label: string; value: FeedContentType | 'all' }[] = [
  { label: 'All',         value: 'all' },
  { label: 'News',        value: 'news' },
  { label: 'PDF',         value: 'pdf' },
  { label: 'Scientific',  value: 'scientific' },
  { label: 'Signals',     value: 'signal' },
  { label: 'AI Reports',  value: 'ai_report' },
  { label: 'Datasets',    value: 'dataset' },
];

export default function FeedPage() {
  const [filter, setFilter] = useState<FeedContentType | 'all'>('all');

  const filtered = filter === 'all'
    ? mockChroniqFeed
    : mockChroniqFeed.filter(i => i.type === filter);

  return (
    <AppShell>
      <div className="flex flex-col h-full min-h-0">

        {/* Header */}
        <div className="shrink-0 px-6 py-4 border-b border-[var(--rule)]">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <Zap className="w-3.5 h-3.5 text-[var(--gold)]" />
                <span className="label-caps text-[var(--gold)]">Chroniq Feed</span>
              </div>
              <h1 className="text-[22px] font-bold tracking-tight text-[var(--ink)]" style={{ fontFamily: 'var(--font-serif)' }}>
                Intelligence Stream
              </h1>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-[var(--ink-3)]">
              <Activity className="w-3 h-3 text-[var(--crimson-bright)]" />
              <span>{mockChroniqFeed.length} items</span>
              <span className="mx-2 text-[var(--rule)]">|</span>
              <span>{mockAnomalySignals.filter(s => s.severity === 'critical').length} critical signals</span>
            </div>
          </div>

          {/* Filter bar */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3 h-3 text-[var(--ink-3)] shrink-0" />
            {FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  'text-[9px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 border transition-all',
                  filter === f.value
                    ? 'text-[var(--gold)] border-[var(--rule-gold)] bg-[var(--gold-dim)]'
                    : 'text-[var(--ink-3)] border-[var(--rule)] hover:text-[var(--ink-2)] hover:border-[var(--ink-3)]/30'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Body: feed + sidebar */}
        <div className="flex flex-1 min-h-0 overflow-hidden">

          {/* Main feed */}
          <div className="flex-1 overflow-y-auto divide-y divide-[var(--rule)]">
            {filtered.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.25 }}
                className="px-6 py-4 hover:bg-[var(--void-2)] transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    {/* Type + severity */}
                    <div className="flex items-center gap-2 mb-2">
                      <ContentTypePill type={item.type} />
                      {item.severity && (
                        <span className={cn(
                          'text-[8px] font-bold tracking-[0.1em] uppercase px-1.5 py-0.5 border',
                          item.severity === 'critical'  ? 'text-[var(--crimson-bright)] border-[var(--crimson)]/40 bg-[var(--crimson-dim)]' :
                          item.severity === 'high'      ? 'text-orange-400 border-orange-400/30 bg-orange-400/10' :
                          item.severity === 'medium'    ? 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10' :
                          'text-[var(--ink-3)] border-[var(--rule)]'
                        )}>
                          {item.severity}
                        </span>
                      )}
                      <span className="text-[9px] text-[var(--ink-3)] ml-auto">{item.timestamp}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-[14px] font-semibold text-[var(--ink)] leading-snug mb-1.5 group-hover:text-white transition-colors"
                      style={{ fontFamily: 'var(--font-serif)' }}>
                      {item.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-[12px] text-[var(--ink-3)] leading-relaxed mb-3 line-clamp-2">
                      {item.excerpt}
                    </p>

                    {/* Author + institution + trust */}
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] text-[var(--ink-2)]">{item.author}</span>
                      {item.institution && (
                        <span className="text-[10px] text-[var(--ink-3)]">· {item.institution}</span>
                      )}
                      {item.region && (
                        <span className="text-[9px] text-[var(--ink-3)] border border-[var(--rule)] px-1.5 py-0.5 ml-auto">{item.region}</span>
                      )}
                    </div>

                    <TrustBadge
                      trustScore={item.credibilityScore}
                      verificationLevel={item.verificationLevel}
                      compact
                    />

                    {/* Entities */}
                    {item.entities.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {item.entities.map(e => (
                          <span key={e} className="text-[8px] text-[var(--ink-3)] bg-[var(--void-3)] border border-[var(--rule)] px-1.5 py-0.5">
                            {e}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Metrics column */}
                  <div className="flex flex-col items-end gap-2 shrink-0 ml-2">
                    {item.signalStrength !== undefined && (
                      <div className="text-right">
                        <div className="text-[8px] text-[var(--ink-3)] uppercase tracking-wide mb-0.5">Signal</div>
                        <div className="text-[14px] font-mono font-bold text-[var(--crimson-bright)]">
                          {item.signalStrength}%
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-[var(--ink-3)]">
                      <Eye className="w-3 h-3" />
                      <span className="text-[9px] font-mono">{item.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[var(--ink-3)]">
                      <Share2 className="w-3 h-3" />
                      <span className="text-[9px] font-mono">{item.propagationScore}</span>
                    </div>
                    <button className="mt-1 text-[var(--ink-3)] hover:text-[var(--gold)] transition-colors opacity-0 group-hover:opacity-100">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Right sidebar: active signals */}
          <div className="w-64 shrink-0 border-l border-[var(--rule)] bg-[var(--void)] overflow-y-auto">
            <div className="p-4 border-b border-[var(--rule)]">
              <div className="flex items-center gap-1.5 mb-1">
                <Activity className="w-3 h-3 text-[var(--crimson-bright)]" />
                <span className="label-caps text-[var(--crimson-bright)]">Active Signals</span>
              </div>
              <div className="text-[10px] text-[var(--ink-3)]">{mockAnomalySignals.length} anomalies detected</div>
            </div>
            <div className="divide-y divide-[var(--rule)]">
              {mockAnomalySignals.map((signal) => (
                <div key={signal.id} className="p-3 hover:bg-[var(--void-2)] transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className={cn(
                      'text-[8px] font-bold tracking-[0.1em] px-1 py-0.5 border uppercase',
                      signal.severity === 'critical' ? 'text-[var(--crimson-bright)] border-[var(--crimson)]/40 bg-[var(--crimson-dim)]' :
                      signal.severity === 'high'     ? 'text-orange-400 border-orange-400/30 bg-orange-400/10' :
                      'text-yellow-400 border-yellow-400/30 bg-yellow-400/10'
                    )}>
                      {signal.severity}
                    </span>
                    <span className="text-[9px] font-mono text-[var(--gold)]">{signal.signalScore}</span>
                  </div>
                  <div className="text-[11px] text-[var(--ink-2)] leading-snug mb-1">{signal.title}</div>
                  <div className="text-[9px] text-[var(--ink-3)]">{signal.region}</div>
                  {/* Score bar */}
                  <div className="mt-2 h-0.5 bg-[var(--void-3)]">
                    <div
                      className="h-full bg-[var(--gold)]"
                      style={{ width: signal.signalScore + '%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </AppShell>
  );
}
