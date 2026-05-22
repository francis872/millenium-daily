'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

/* ─────────────────────────────────────────────────────────────────────
   GlowCard → renamed conceptually to "EditorialCard"
   API preserved for backward compat; glow variants now map to
   editorial accent styles (gold top-rule, crimson top-rule, etc.)
───────────────────────────────────────────────────────────────────── */

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  /** accent variant — maps to top-border accent color */
  glow?: 'cyan' | 'purple' | 'green' | 'red' | 'none';
  hover?: boolean;
  onClick?: () => void;
}

const accentMap = {
  cyan:   'border-t-[var(--gold)]',
  purple: 'border-t-[var(--gold)]',
  green:  'border-t-[var(--positive)]',
  red:    'border-t-[var(--crimson)]',
  none:   'border-t-transparent',
};

export function GlowCard({ children, className, glow = 'none', hover = false, onClick }: GlowCardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -1 } : {}}
      transition={{ duration: 0.15 }}
      className={cn(
        'border border-[var(--rule)] border-t-2 bg-[var(--void-2)] transition-colors duration-200',
        accentMap[glow],
        hover && 'cursor-pointer hover:border-[rgba(255,255,255,0.12)]',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   StatBadge
───────────────────────────────────────────────────────────────────── */
interface StatBadgeProps {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
}

export function StatBadge({ label, value, trend }: StatBadgeProps) {
  return (
    <div className="flex items-center gap-2 px-2.5 py-1.5 border border-[var(--rule)] bg-[var(--void-3)]">
      <span className="text-[10px] text-[var(--ink-3)] tracking-wide">{label}</span>
      <span className="text-[11px] font-mono font-bold text-[var(--gold)]">{value}</span>
      {trend === 'up'   && <span className="text-[10px] text-[var(--positive)]">↑</span>}
      {trend === 'down' && <span className="text-[10px] text-[var(--crimson)]">↓</span>}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   SeverityBadge
───────────────────────────────────────────────────────────────────── */
interface SeverityBadgeProps {
  severity: 'critical' | 'high' | 'medium' | 'low';
  pulse?: boolean;
}

export function SeverityBadge({ severity, pulse = false }: SeverityBadgeProps) {
  const config = {
    critical: { style: 'text-[var(--crimson-bright)] border-[var(--crimson)]/40 bg-[var(--crimson-dim)]', label: 'CRITICAL' },
    high:     { style: 'text-orange-400 border-orange-700/40 bg-orange-950/40',                           label: 'HIGH' },
    medium:   { style: 'text-[var(--gold)] border-[var(--gold)]/30 bg-[var(--gold-dim)]',                 label: 'MEDIUM' },
    low:      { style: 'text-[var(--ink-2)] border-[var(--rule)] bg-[var(--void-3)]',                     label: 'LOW' },
  }[severity];

  const dotColor = {
    critical: 'bg-[var(--crimson-bright)]',
    high: 'bg-orange-400',
    medium: 'bg-[var(--gold)]',
    low: 'bg-[var(--ink-3)]',
  }[severity];

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2 py-0.5 border text-[9px] font-bold tracking-[0.15em]',
      config.style
    )}>
      {pulse && <span className={cn('w-1.5 h-1.5 rounded-full pulse-dot', dotColor)} />}
      {config.label}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   ConfidenceMeter
───────────────────────────────────────────────────────────────────── */
export function ConfidenceMeter({ value, size = 'sm' }: { value: number; size?: 'sm' | 'md' }) {
  const trackColor = value >= 0.85 ? 'bg-[var(--gold)]' : value >= 0.65 ? 'bg-orange-500' : 'bg-[var(--crimson)]';
  const h = size === 'sm' ? 'h-[2px]' : 'h-[3px]';
  return (
    <div className="flex items-center gap-2">
      <div className={cn('flex-1 rounded-none bg-[var(--void-4)]', h)}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value * 100}%` }}
          transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
          className={cn('h-full', trackColor)}
        />
      </div>
      <span className="text-[10px] font-mono text-[var(--ink-3)]">{Math.round(value * 100)}%</span>
    </div>
  );
}

