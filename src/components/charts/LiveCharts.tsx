'use client';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';
import { GlowCard } from '@/components/ui/GlowCard';
import { spxData, btcData, vixData } from '@/data/mockData';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { BarChart2 } from 'lucide-react';

const CHARTS = [
  { id: 'spx', label: 'S&P 500', data: spxData, color: '#C4A05A', gradientFrom: 'rgba(196,160,90,0.25)', gradientTo: 'rgba(196,160,90,0)' },
  { id: 'btc', label: 'BTC/USD', data: btcData, color: '#B8272C', gradientFrom: 'rgba(184,39,44,0.2)', gradientTo: 'rgba(184,39,44,0)' },
  { id: 'vix', label: 'VIX', data: vixData, color: '#f97316', gradientFrom: 'rgba(249,115,22,0.2)', gradientTo: 'rgba(249,115,22,0)' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--void-3)] border border-[var(--rule)] px-3 py-2 shadow-xl">
        <div className="text-[12px] font-mono text-[var(--ink)]">{payload[0].value.toLocaleString()}</div>
        <div className="text-[10px] text-[var(--ink-3)]">
          {new Date(payload[0].payload.timestamp).toLocaleTimeString()}
        </div>
      </div>
    );
  }
  return null;
};

export function LiveCharts() {
  const [active, setActive] = useState('spx');
  const chart = CHARTS.find(c => c.id === active)!;
  const first = chart.data[0]?.value ?? 0;
  const last = chart.data[chart.data.length - 1]?.value ?? 0;
  const change = ((last - first) / first) * 100;

  return (
    <GlowCard glow="cyan" className="flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--rule)]">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-3.5 h-3.5 text-[var(--gold)]" />
          <span className="text-[12px] font-semibold text-[var(--ink)] tracking-wide">Live Markets</span>
        </div>
        <div className="flex gap-0.5">
          {CHARTS.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={cn(
                'px-2 py-0.5 text-[10px] font-bold tracking-[0.12em] transition-all border',
                active === c.id
                  ? 'bg-[var(--gold-dim)] text-[var(--gold)] border-[var(--rule-gold)]'
                  : 'text-[var(--ink-3)] border-transparent hover:text-[var(--ink)]'
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <div className="px-4 pt-3 pb-1 flex items-baseline gap-3">
        <span className="text-xl font-bold font-mono text-[var(--ink)]">
          {last.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </span>
        <span className={cn(
          'text-[12px] font-mono font-bold',
          change >= 0 ? 'text-[var(--positive)]' : 'text-[var(--crimson-bright)]'
        )}>
          {change >= 0 ? '+' : ''}{change.toFixed(2)}%
        </span>
        <span className="text-[10px] text-[var(--ink-3)] font-mono ml-auto">Last 4h · 5min</span>
      </div>
      <div className="px-2 pb-3" style={{ height: 160 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chart.data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id={`grad-${chart.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chart.color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={chart.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" strokeOpacity={1} />
            <XAxis dataKey="timestamp" hide />
            <YAxis domain={['auto', 'auto']} hide />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={chart.color}
              strokeWidth={2}
              fill={`url(#grad-${chart.id})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlowCard>
  );
}
