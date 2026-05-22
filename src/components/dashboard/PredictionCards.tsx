'use client';
import { motion } from 'framer-motion';
import { GlowCard, ConfidenceMeter } from '@/components/ui/GlowCard';
import { mockPredictions } from '@/data/mockData';
import { timeAgo, cn } from '@/lib/utils';
import { TrendingUp, Clock, Tag } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

function ProbabilityRing({ value, color }: { value: number; color: string }) {
  const data = [{ value: Math.round(value * 100), fill: color }];
  return (
    <div className="relative w-14 h-14 shrink-0">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="50%" innerRadius="65%" outerRadius="100%" data={data} startAngle={90} endAngle={-270}>
          <RadialBar dataKey="value" cornerRadius={0} background={{ fill: 'var(--void-4)' }} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-bold font-mono text-[var(--ink)]">{Math.round(value * 100)}%</span>
      </div>
    </div>
  );
}

export function PredictionCards() {
  const colors = ['var(--gold)', 'var(--crimson-bright)', '#f97316', 'var(--positive)'];

  return (
    <GlowCard glow="cyan" className="flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--rule)]">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-3.5 h-3.5 text-[var(--gold)]" />
          <span className="text-[12px] font-semibold text-[var(--ink)] tracking-wide">Predictive Models</span>
        </div>
        <span className="text-[9px] font-mono tracking-[0.15em] text-[var(--ink-3)]">AI-GENERATED</span>
      </div>
      <div className="divide-y divide-[var(--rule)]">
        {mockPredictions.map((pred, i) => (
          <motion.div
            key={pred.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="px-4 py-3 hover:bg-[var(--void-3)] transition-colors"
          >
            <div className="flex items-start gap-3">
              <ProbabilityRing value={pred.probability} color={colors[i % colors.length]} />
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-semibold text-[var(--ink)] mb-0.5">{pred.title}</div>
                <div className="text-[11px] text-[var(--ink-3)] mb-2">{pred.description}</div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="flex items-center gap-1 text-[10px] text-[var(--ink-3)] font-mono">
                    <Clock className="w-2.5 h-2.5" />{pred.timeframe}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-[var(--ink-3)]">
                    <Tag className="w-2.5 h-2.5" />{pred.category}
                  </span>
                </div>
                <div className="mt-2">
                  <ConfidenceMeter value={pred.confidence} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </GlowCard>
  );
}
