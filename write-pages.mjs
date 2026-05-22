import { writeFileSync, mkdirSync } from 'fs';

mkdirSync('src/app/graph', { recursive: true });
mkdirSync('src/app/feed', { recursive: true });

// ─── CHRONIQ GRAPH PAGE ───────────────────────────────────────────────────────
const graphPage = `'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { AppShell } from '@/components/layout/AppShell';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { mockGraphNodes, mockGraphEdges } from '@/data/mockData';
import type { ChroniqNode } from '@/types';
import { Network, Users, TrendingUp, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const edgeColor: Record<string, string> = {
  trust:           'rgba(196,160,90,0.5)',
  verification:    'rgba(184,39,44,0.5)',
  collaboration:   'rgba(59,110,80,0.5)',
  reference:       'rgba(156,149,137,0.35)',
  publishing:      'rgba(251,146,60,0.45)',
};

const nodeTypeColor: Record<string, string> = {
  institution: 'var(--gold)',
  government:  'var(--crimson-bright)',
  university:  'var(--positive)',
  journalist:  'var(--ink-2)',
  ai:          '#8B5CF6',
  organization:'var(--ink-3)',
};

// Scale: mock coords are 0-800 range, viewBox 800x520
const VB_W = 800;
const VB_H = 520;

function nodeRadius(score: number) {
  return 8 + (score - 80) * 0.3;
}

export default function GraphPage() {
  const [selected, setSelected] = useState<ChroniqNode | null>(null);
  const avgTrust = Math.round(mockGraphNodes.reduce((s, n) => s + n.trustScore, 0) / mockGraphNodes.length);
  const density = ((mockGraphEdges.length * 2) / (mockGraphNodes.length * (mockGraphNodes.length - 1))).toFixed(2);

  return (
    <AppShell>
      <div className="flex flex-col h-full min-h-0">

        {/* Header */}
        <div className="shrink-0 px-6 py-4 border-b border-[var(--rule)] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <Network className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span className="label-caps text-[var(--gold)]">Chroniq Graph</span>
            </div>
            <h1 className="text-[22px] font-bold tracking-tight text-[var(--ink)]" style={{ fontFamily: 'var(--font-serif)' }}>
              Trust Network
            </h1>
          </div>

          {/* Stats strip */}
          <div className="flex items-center gap-6">
            {[
              { icon: Users,     label: 'Nodes',         val: mockGraphNodes.length },
              { icon: Network,   label: 'Connections',   val: mockGraphEdges.length },
              { icon: TrendingUp,label: 'Avg Trust',      val: avgTrust },
              { icon: Shield,    label: 'Density',        val: density },
            ].map(({ icon: Icon, label, val }) => (
              <div key={label} className="text-right">
                <div className="flex items-center gap-1 justify-end mb-0.5">
                  <Icon className="w-3 h-3 text-[var(--ink-3)]" />
                  <span className="text-[9px] tracking-[0.12em] text-[var(--ink-3)] uppercase">{label}</span>
                </div>
                <div className="text-[18px] font-bold text-[var(--ink)] font-mono leading-none">{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 min-h-0">

          {/* SVG Graph canvas */}
          <div className="flex-1 min-w-0 relative bg-[var(--void-2)]">
            <svg
              viewBox={\`0 0 \${VB_W} \${VB_H}\`}
              className="w-full h-full"
              style={{ maxHeight: '100%' }}
            >
              {/* Grid dots */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="0.6" fill="rgba(255,255,255,0.04)" />
                </pattern>
              </defs>
              <rect width={VB_W} height={VB_H} fill="url(#grid)" />

              {/* Edges */}
              {mockGraphEdges.map((edge, i) => {
                const src = mockGraphNodes.find(n => n.id === edge.source);
                const tgt = mockGraphNodes.find(n => n.id === edge.target);
                if (!src || !tgt) return null;
                const x1 = src.x ?? 0;
                const y1 = src.y ?? 0;
                const x2 = tgt.x ?? 0;
                const y2 = tgt.y ?? 0;
                return (
                  <motion.line
                    key={i}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={edgeColor[edge.type] || 'rgba(255,255,255,0.1)'}
                    strokeWidth={edge.weight * 1.8}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                  />
                );
              })}

              {/* Nodes */}
              {mockGraphNodes.map((node, i) => {
                const x = node.x ?? 100;
                const y = node.y ?? 100;
                const r = nodeRadius(node.trustScore);
                const color = nodeTypeColor[node.type] || 'var(--ink-2)';
                const isSelected = selected?.id === node.id;
                return (
                  <motion.g
                    key={node.id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelected(isSelected ? null : node)}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06, duration: 0.35, ease: 'backOut' }}
                  >
                    {/* Glow ring on selected */}
                    {isSelected && (
                      <circle cx={x} cy={y} r={r + 6} fill="none" stroke={color} strokeWidth={1} opacity={0.4} />
                    )}
                    {/* Outer ring */}
                    <circle
                      cx={x} cy={y} r={r + 3}
                      fill="none"
                      stroke={color}
                      strokeWidth={isSelected ? 1.5 : 0.8}
                      opacity={isSelected ? 0.8 : 0.3}
                    />
                    {/* Node fill */}
                    <circle
                      cx={x} cy={y} r={r}
                      fill="var(--void-3)"
                      stroke={color}
                      strokeWidth={1.5}
                    />
                    {/* Trust score text */}
                    <text
                      x={x} y={y + 1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={r > 10 ? 7 : 6}
                      fill={color}
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {node.trustScore}
                    </text>
                    {/* Label below */}
                    <text
                      x={x} y={y + r + 9}
                      textAnchor="middle"
                      fontSize="8"
                      fill="rgba(240,235,225,0.55)"
                      fontFamily="sans-serif"
                    >
                      {node.label.split(' ')[0]}
                    </text>
                  </motion.g>
                );
              })}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 flex flex-col gap-1.5">
              <div className="text-[8px] tracking-[0.15em] text-[var(--ink-3)] uppercase mb-1">Edge Type</div>
              {Object.entries(edgeColor).map(([type, color]) => (
                <div key={type} className="flex items-center gap-1.5">
                  <div className="w-5 h-px" style={{ background: color }} />
                  <span className="text-[9px] text-[var(--ink-3)] capitalize">{type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Side panel */}
          <div className="w-72 shrink-0 border-l border-[var(--rule)] bg-[var(--void)] flex flex-col overflow-y-auto">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-5 space-y-5"
              >
                <div>
                  <div className="text-[9px] tracking-[0.15em] text-[var(--ink-3)] uppercase mb-1">Node Profile</div>
                  <div className="text-[16px] font-bold text-[var(--ink)] leading-snug" style={{ fontFamily: 'var(--font-serif)' }}>
                    {selected.label}
                  </div>
                  <div className="text-[11px] text-[var(--ink-3)] mt-1 capitalize">{selected.type} · {selected.country}</div>
                </div>

                <TrustBadge
                  trustScore={selected.trustScore}
                  verificationLevel={selected.verificationLevel}
                  credibilityLayer={selected.credibilityLayer}
                />

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Connections', val: selected.connections },
                    { label: 'Pub. Count',  val: selected.publishCount },
                  ].map(({ label, val }) => (
                    <div key={label} className="bg-[var(--void-2)] border border-[var(--rule)] p-3">
                      <div className="text-[9px] tracking-[0.1em] text-[var(--ink-3)] uppercase mb-1">{label}</div>
                      <div className="text-[20px] font-bold text-[var(--ink)] font-mono leading-none">{val}</div>
                    </div>
                  ))}
                </div>

                {/* Trust bar */}
                <div>
                  <div className="flex justify-between text-[9px] tracking-wide text-[var(--ink-3)] uppercase mb-1.5">
                    <span>Trust Score</span>
                    <span className="text-[var(--gold)] font-mono">{selected.trustScore}/100</span>
                  </div>
                  <div className="h-1 bg-[var(--void-3)] relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: selected.trustScore + '%' }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="absolute inset-y-0 left-0 bg-[var(--gold)]"
                    />
                  </div>
                </div>

                {/* Connected edges */}
                <div>
                  <div className="text-[9px] tracking-[0.15em] text-[var(--ink-3)] uppercase mb-2">Connections</div>
                  <div className="space-y-1.5">
                    {mockGraphEdges
                      .filter(e => e.source === selected.id || e.target === selected.id)
                      .map((edge, i) => {
                        const otherId = edge.source === selected.id ? edge.target : edge.source;
                        const other = mockGraphNodes.find(n => n.id === otherId);
                        return (
                          <div key={i} className="flex items-center justify-between text-[11px]">
                            <span className="text-[var(--ink-2)] truncate flex-1">{other?.label}</span>
                            <span
                              className="text-[9px] font-bold tracking-wide px-1 ml-2 shrink-0"
                              style={{ color: edgeColor[edge.type] }}
                            >
                              {edge.type}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <Network className="w-8 h-8 text-[var(--ink-3)] mb-3" />
                <div className="text-[12px] text-[var(--ink-3)]">Select a node to view its trust profile and connections</div>
                <div className="mt-4 space-y-2 w-full">
                  <div className="text-[9px] tracking-[0.15em] text-[var(--ink-3)] uppercase mb-2">Top Nodes by Trust</div>
                  {[...mockGraphNodes]
                    .sort((a, b) => b.trustScore - a.trustScore)
                    .slice(0, 5)
                    .map((node) => (
                      <button
                        key={node.id}
                        onClick={() => setSelected(node)}
                        className="w-full flex items-center justify-between px-3 py-2 border border-[var(--rule)] hover:border-[var(--rule-gold)] transition-colors text-left"
                      >
                        <span className="text-[11px] text-[var(--ink-2)] truncate">{node.label}</span>
                        <span className="text-[10px] font-mono font-bold text-[var(--gold)] ml-2 shrink-0">{node.trustScore}</span>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
`;

// ─── CHRONIQ FEED PAGE ────────────────────────────────────────────────────────
const feedPage = `'use client';
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
`;

writeFileSync('src/app/graph/page.tsx', graphPage, 'utf8');
writeFileSync('src/app/feed/page.tsx', feedPage, 'utf8');
console.log('graph/page.tsx:', graphPage.length);
console.log('feed/page.tsx:', feedPage.length);
