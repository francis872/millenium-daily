'use client';
import { motion } from 'framer-motion';
import { GlowCard } from '@/components/ui/GlowCard';
import { mockGeopoliticalAlerts } from '@/data/mockData';
import { timeAgo } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Globe } from 'lucide-react';

export function GeopoliticalRiskBoard() {
  return (
    <GlowCard glow="red" className="flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--rule)]">
        <div className="flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-[var(--crimson-bright)]" />
          <span className="text-[12px] font-semibold text-[var(--ink)] tracking-wide">Geopolitical Risk</span>
        </div>
        <span className="text-[9px] font-mono tracking-[0.15em] text-[var(--ink-3)]">OSINT VERIFIED</span>
      </div>
      <div className="divide-y divide-[var(--rule)]">
        {mockGeopoliticalAlerts.map((alert, i) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.06 }}
            className="px-4 py-3 hover:bg-[var(--void-3)] transition-colors"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-bold text-[var(--ink)]">{alert.country}</span>
                <span className={cn(
                  'text-[9px] px-1.5 py-0.5 border font-bold tracking-[0.12em]',
                  alert.riskLevel >= 85 ? 'text-[var(--crimson-bright)] border-[var(--crimson)]/30 bg-[var(--crimson-dim)]' :
                  alert.riskLevel >= 70 ? 'text-orange-400 border-orange-700/30 bg-orange-950/40' :
                  'text-[var(--gold)] border-[var(--gold)]/30 bg-[var(--gold-dim)]'
                )}>
                  {alert.type}
                </span>
              </div>
              <span className="text-[10px] text-[var(--ink-3)] font-mono">{timeAgo(alert.timestamp)}</span>
            </div>
            <div className="text-[11px] text-[var(--ink-3)] mb-2">{alert.description}</div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-1">
                <span className="label-caps shrink-0">Risk</span>
                <div className="flex-1 h-[2px] bg-[var(--void-4)]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${alert.riskLevel}%` }}
                    transition={{ duration: 0.7, delay: i * 0.1 }}
                    className={cn(
                      'h-full',
                      alert.riskLevel >= 85 ? 'bg-[var(--crimson)]' :
                      alert.riskLevel >= 70 ? 'bg-orange-500' : 'bg-[var(--gold)]'
                    )}
                  />
                </div>
                <span className="text-[10px] font-mono text-[var(--ink-3)] shrink-0">{alert.riskLevel}</span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className="label-caps">Escalation</span>
                <span className={cn(
                  'text-[10px] font-bold font-mono',
                  alert.escalationProbability >= 0.5 ? 'text-[var(--crimson-bright)]' :
                  alert.escalationProbability >= 0.3 ? 'text-orange-400' : 'text-[var(--gold)]'
                )}>
                  {Math.round(alert.escalationProbability * 100)}%
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </GlowCard>
  );
}
