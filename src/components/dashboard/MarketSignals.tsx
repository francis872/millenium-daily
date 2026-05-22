'use client';
import { motion } from 'framer-motion';
import { GlowCard } from '@/components/ui/GlowCard';
import { mockMarketSignals } from '@/data/mockData';
import { formatPercent } from '@/lib/utils';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MarketSignals() {
  return (
    <GlowCard glow="green" className="flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--rule)]">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-[var(--gold)]" />
          <span className="text-[12px] font-semibold text-[var(--ink)] tracking-wide">Asset Intelligence</span>
        </div>
        <span className="text-[9px] font-mono tracking-[0.15em] text-[var(--ink-3)]">AI-ENHANCED</span>
      </div>
      <div className="divide-y divide-[var(--rule)]">
        {mockMarketSignals.map((signal, i) => (
          <motion.div
            key={signal.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="px-4 py-2.5 hover:bg-[var(--void-3)] transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={cn(
                  'w-[2px] h-6 shrink-0',
                  signal.signal === 'bullish' ? 'bg-[var(--positive)]' :
                  signal.signal === 'bearish' ? 'bg-[var(--crimson)]' : 'bg-[var(--gold)]'
                )} />
                <div>
                  <div className="text-[12px] font-bold font-mono text-[var(--ink)]">{signal.symbol}</div>
                  <div className="text-[10px] text-[var(--ink-3)]">{signal.asset}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[12px] font-mono font-bold text-[var(--ink)]">
                  {signal.symbol === 'EURUSD' ? signal.price.toFixed(4) :
                   signal.price >= 1000 ? signal.price.toLocaleString() : signal.price.toFixed(2)}
                </div>
                <div className={cn(
                  'text-[11px] font-mono flex items-center gap-0.5 justify-end',
                  signal.change >= 0 ? 'text-[var(--positive)]' : 'text-[var(--crimson-bright)]'
                )}>
                  {signal.change >= 0 ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                  {formatPercent(signal.changePercent)}
                </div>
              </div>
            </div>
            {signal.aiPrediction && (
              <div className="mt-1.5 ml-4 text-[10px] text-[var(--ink-3)] italic border-l border-[var(--rule-gold)] pl-2">
                {signal.aiPrediction}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </GlowCard>
  );
}
