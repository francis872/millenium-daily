'use client';
import { cn } from '@/lib/utils';
import type { FeedContentType } from '@/types';
import { FileText, Cpu, FlaskConical, Sigma, Brain, Newspaper, Search, BarChart2, Radio, Layers, AlertTriangle } from 'lucide-react';

interface ContentTypePillProps {
  type: FeedContentType;
}

const typeConfig: Record<FeedContentType, { label: string; color: string; border: string; bg: string; Icon: React.ComponentType<{className?: string}> }> = {
  news:          { label: 'NEWS',        color: 'text-[var(--ink-2)]',          border: 'border-[var(--rule)]',        bg: 'bg-transparent',          Icon: Newspaper },
  pdf:           { label: 'PDF',         color: 'text-[var(--gold)]',           border: 'border-[var(--gold)]/40',     bg: 'bg-[var(--gold-dim)]',    Icon: FileText },
  scientific:    { label: 'SCIENTIFIC',  color: 'text-[var(--gold)]',           border: 'border-[var(--gold)]/40',     bg: 'bg-[var(--gold-dim)]',    Icon: FlaskConical },
  latex_report:  { label: 'LaTeX',       color: 'text-[var(--ink-2)]',          border: 'border-[var(--rule)]',        bg: 'bg-transparent',          Icon: Sigma },
  dataset:       { label: 'DATASET',     color: 'text-[var(--positive)]',       border: 'border-[var(--positive)]/40', bg: 'bg-[var(--positive)]/10', Icon: BarChart2 },
  ai_report:     { label: 'AI REPORT',   color: 'text-[var(--gold)]',           border: 'border-[var(--gold)]/40',     bg: 'bg-[var(--gold-dim)]',    Icon: Brain },
  signal:        { label: 'SIGNAL',      color: 'text-[var(--crimson-bright)]', border: 'border-[var(--crimson)]/40',  bg: 'bg-[var(--crimson-dim)]', Icon: Cpu },
  alert:         { label: 'ALERT',       color: 'text-[var(--crimson-bright)]', border: 'border-[var(--crimson)]/40',  bg: 'bg-[var(--crimson-dim)]', Icon: AlertTriangle },
  live_stream:   { label: 'LIVE',        color: 'text-[var(--crimson-bright)]', border: 'border-[var(--crimson)]/40',  bg: 'bg-[var(--crimson-dim)]', Icon: Radio },
  dashboard:     { label: 'DASHBOARD',   color: 'text-[var(--ink-2)]',          border: 'border-[var(--rule)]',        bg: 'bg-transparent',          Icon: Layers },
  investigation: { label: 'INVESTIGATION',color: 'text-orange-400',             border: 'border-orange-400/30',        bg: 'bg-orange-400/10',        Icon: Search },
};

export function ContentTypePill({ type }: ContentTypePillProps) {
  const cfg = typeConfig[type];
  const { Icon } = cfg;
  return (
    <span className={cn(
      'inline-flex items-center gap-1 text-[8px] font-bold tracking-[0.14em] px-1.5 py-0.5 border shrink-0',
      cfg.color, cfg.border, cfg.bg
    )}>
      <Icon className="w-2.5 h-2.5" />
      {cfg.label}
    </span>
  );
}
