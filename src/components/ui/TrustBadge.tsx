'use client';
import { cn } from '@/lib/utils';
import type { TrustLevel } from '@/types';
import { ShieldCheck, ShieldAlert, Shield, User, Building2, Globe } from 'lucide-react';

interface TrustBadgeProps {
  trustScore: number;
  verificationLevel: TrustLevel;
  credibilityLayer?: string;
  compact?: boolean;
}

const levelConfig: Record<TrustLevel, { label: string; color: string; border: string; bg: string; Icon: React.ComponentType<{className?: string}> }> = {
  verified:      { label: 'Verified',     color: 'text-[var(--gold)]',            border: 'border-[var(--gold)]/40',     bg: 'bg-[var(--gold-dim)]',    Icon: ShieldCheck },
  institutional: { label: 'Institutional',color: 'text-[var(--positive)]',        border: 'border-[var(--positive)]/40', bg: 'bg-[var(--positive)]/10', Icon: Building2 },
  analyst:       { label: 'Analyst',      color: 'text-[var(--ink-2)]',           border: 'border-[var(--rule)]',        bg: 'bg-transparent',          Icon: User },
  partner:       { label: 'Partner',      color: 'text-orange-400',               border: 'border-orange-400/30',        bg: 'bg-orange-400/10',        Icon: Globe },
  government:    { label: 'Government',   color: 'text-[var(--crimson-bright)]',  border: 'border-[var(--crimson)]/40',  bg: 'bg-[var(--crimson-dim)]', Icon: ShieldAlert },
  pending:       { label: 'Pending',      color: 'text-[var(--ink-3)]',           border: 'border-[var(--rule)]',        bg: 'bg-transparent',          Icon: Shield },
};

export function TrustBadge({ trustScore, verificationLevel, credibilityLayer, compact = false }: TrustBadgeProps) {
  const cfg = levelConfig[verificationLevel];
  const { Icon } = cfg;
  const scoreColor = trustScore >= 90 ? 'text-[var(--gold)]' : trustScore >= 75 ? 'text-[var(--ink-2)]' : 'text-orange-400';

  if (compact) {
    return (
      <span className={cn(
        'inline-flex items-center gap-1 text-[9px] font-bold tracking-[0.1em] px-1.5 py-0.5 border',
        cfg.color, cfg.border, cfg.bg
      )}>
        <Icon className="w-2.5 h-2.5" />
        {trustScore}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className={cn(
        'inline-flex items-center gap-1 text-[9px] font-bold tracking-[0.1em] px-1.5 py-0.5 border',
        cfg.color, cfg.border, cfg.bg
      )}>
        <Icon className="w-2.5 h-2.5" />
        {cfg.label}
      </span>
      <span className={cn('text-[10px] font-mono font-bold', scoreColor)}>
        {trustScore}
      </span>
      {credibilityLayer && (
        <span className="text-[9px] text-[var(--ink-3)] tracking-wide">{credibilityLayer}</span>
      )}
    </div>
  );
}
