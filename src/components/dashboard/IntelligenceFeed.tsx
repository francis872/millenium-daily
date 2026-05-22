'use client';
import { motion } from 'framer-motion';
import { GlowCard, SeverityBadge, ConfidenceMeter } from '@/components/ui/GlowCard';
import { mockIntelligenceEvents } from '@/data/mockData';
import { timeAgo } from '@/lib/utils';
import { Shield, TrendingUp } from 'lucide-react';

export function IntelligenceFeed() {
  return (
    <GlowCard glow="cyan" className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--rule)]">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-[var(--gold)]" />
          <span className="text-[12px] font-semibold text-[var(--ink)] tracking-wide">Intelligence Feed</span>
        </div>
        <span className="text-[9px] font-bold tracking-[0.18em] text-[var(--crimson-bright)] flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-[var(--crimson-bright)] pulse-dot" />
          LIVE
        </span>
      </div>
      <div className="flex-1 overflow-y-auto divide-y divide-[var(--rule)]">
        {mockIntelligenceEvents.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="px-4 py-3 hover:bg-[var(--void-3)] transition-colors cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <SeverityBadge severity={event.severity} pulse={i === 0} />
              <span className="text-[10px] text-[var(--ink-3)] font-mono shrink-0">{timeAgo(event.timestamp)}</span>
            </div>
            <div className="text-[12px] font-semibold text-[var(--ink-2)] mb-1 group-hover:text-[var(--ink)] transition-colors">
              {event.title}
            </div>
            <div className="text-[11px] text-[var(--ink-3)] mb-2 line-clamp-2">{event.description}</div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] text-[var(--ink-3)] font-mono">{event.region}</span>
              <span className="text-[var(--rule)] text-base">·</span>
              <span className="text-[10px] text-[var(--ink-3)]">{event.sources} sources</span>
              <span className="text-[var(--rule)] text-base">·</span>
              <TrendingUp className={`w-3 h-3 ${event.trend === 'rising' ? 'text-[var(--crimson-bright)]' : 'text-[var(--ink-3)]'}`} />
            </div>
            <ConfidenceMeter value={event.confidence} />
          </motion.div>
        ))}
      </div>
    </GlowCard>
  );
}
