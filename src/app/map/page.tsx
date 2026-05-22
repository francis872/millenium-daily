'use client';
import { AppShell } from '@/components/layout/AppShell';
import { mockGeopoliticalAlerts } from '@/data/mockData';
import { GlowCard, SeverityBadge } from '@/components/ui/GlowCard';
import { Globe, AlertTriangle, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

// Simplified world map placeholder with region markers
const REGIONS = [
  { id: 'eastasia', label: 'East Asia', x: 78, y: 35, risk: 'critical', events: 4 },
  { id: 'mideast', label: 'Middle East', x: 55, y: 42, risk: 'high', events: 3 },
  { id: 'europe', label: 'Europe', x: 47, y: 25, risk: 'medium', events: 2 },
  { id: 'easteurope', label: 'Eastern Europe', x: 52, y: 27, risk: 'high', events: 5 },
  { id: 'sahel', label: 'Sahel', x: 45, y: 50, risk: 'high', events: 2 },
  { id: 'southasia', label: 'South Asia', x: 67, y: 44, risk: 'medium', events: 2 },
  { id: 'latam', label: 'Latin America', x: 25, y: 62, risk: 'low', events: 1 },
];

const riskColors: Record<string, string> = {
  critical: '#ef4444',
  high: '#f97316',
  medium: '#eab308',
  low: '#22c55e',
};

export default function MapPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <AppShell><div className="p-4 text-slate-400 text-sm">Loading...</div></AppShell>;
  return (
    <AppShell>
      <div className="p-4 space-y-4">
        <div className="animate-in fade-in duration-300">
          <div className="flex items-center gap-2 mb-0.5">
            <Globe className="w-5 h-5 text-[var(--gold)]" />
            <h1 className="text-xl font-bold text-[var(--ink)]" style={{ fontFamily: 'var(--font-serif)' }}>CHRONIQ Atlas</h1>
          </div>
          <p className="text-xs text-[var(--ink-3)]">Geopolitical tension monitoring · Regional conflict analysis · Escalation probability</p>
        </div>

        {/* Map visualization */}
        <GlowCard glow="cyan" className="overflow-hidden">
          <div className="relative bg-slate-950/80 border-b border-slate-800/60" style={{ height: 360 }}>
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Continents - simplified blobs */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 70" preserveAspectRatio="none">
              {/* North America */}
              <ellipse cx="20" cy="32" rx="12" ry="14" fill="#334155" />
              {/* South America */}
              <ellipse cx="26" cy="58" rx="7" ry="10" fill="#334155" />
              {/* Europe */}
              <ellipse cx="47" cy="28" rx="6" ry="7" fill="#334155" />
              {/* Africa */}
              <ellipse cx="48" cy="50" rx="7" ry="12" fill="#334155" />
              {/* Asia */}
              <ellipse cx="68" cy="33" rx="17" ry="14" fill="#334155" />
              {/* Australia */}
              <ellipse cx="80" cy="58" rx="7" ry="5" fill="#334155" />
            </svg>

            {/* Risk markers */}
            {REGIONS.map((region) => (
                <div
                  key={region.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${region.x}%`, top: `${region.y}%` }}
                >
                  <div className="flex flex-col items-center">
                  <div className="relative w-4 h-4">
                  {/* Pulse ring */}
                  {region.risk === 'critical' && (
                    <div
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{ backgroundColor: riskColors[region.risk], opacity: 0.4 }}
                    />
                  )}
                  <div
                    className="w-4 h-4 rounded-full border-2 border-slate-900 flex items-center justify-center cursor-pointer hover:scale-125 transition-transform relative z-10"
                    style={{ backgroundColor: riskColors[region.risk] }}
                    title={`${region.label}: ${region.events} events`}
                  >
                    <span className="text-[8px] font-bold text-white">{region.events}</span>
                  </div>
                </div>
                <div className="mt-1 text-[9px] text-slate-400 bg-slate-900/80 px-1 rounded whitespace-nowrap">
                  {region.label}
                </div>
                  </div>
                </div>
            ))}

            {/* Legend */}
            <div className="absolute bottom-3 left-3 flex flex-col gap-1 bg-slate-900/80 border border-slate-800/60 rounded-lg p-2">
              {Object.entries(riskColors).map(([level, color]) => (
                <div key={level} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-[10px] text-slate-400 capitalize">{level}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-800/40">
            {mockGeopoliticalAlerts.slice(0, 4).map((alert, i) => (
              <div
                key={alert.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800/20 transition-colors"
              >
                <SeverityBadge severity={alert.riskLevel >= 85 ? 'critical' : alert.riskLevel >= 70 ? 'high' : alert.riskLevel >= 50 ? 'medium' : 'low'} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-200 truncate">{alert.region}</div>
                  <div className="text-[11px] text-slate-400 truncate">{alert.description}</div>
                </div>
                <div className="flex items-center gap-1 text-xs text-orange-400">
                  <TrendingUp className="w-3 h-3" />
                  <span className="font-mono">{Math.round(alert.escalationProbability * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </GlowCard>
      </div>
    </AppShell>
  );
}
