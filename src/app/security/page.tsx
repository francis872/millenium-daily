'use client';
import { AppShell } from '@/components/layout/AppShell';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, AlertTriangle, Check, Activity } from 'lucide-react';
import { GlowCard } from '@/components/ui/GlowCard';
import { cn } from '@/lib/utils';

const THREAT_FEEDS = [
  { id: 1, type: 'MISINFORMATION', title: 'Coordinated narrative injection detected', source: 'Social media cluster — East European origin', severity: 'critical', time: '2m ago' },
  { id: 2, type: 'DEEPFAKE', title: 'AI-generated video flagged in breaking story', source: 'Video analysis module v3.2', severity: 'high', time: '8m ago' },
  { id: 3, type: 'SOURCE INTEGRITY', title: 'Anonymous source credibility score dropping', source: 'Source monitoring agent', severity: 'medium', time: '15m ago' },
  { id: 4, type: 'CITATION FRAUD', title: 'Duplicate study cited in 3 separate outlets', source: 'Academic database cross-check', severity: 'medium', time: '24m ago' },
  { id: 5, type: 'DATA LEAK', title: 'Unverified classified document circulating', source: 'Document authentication module', severity: 'high', time: '41m ago' },
];

const INTEGRITY_CHECKS = [
  { label: 'Source Verification', status: 'pass', score: 97 },
  { label: 'Fact Database Sync', status: 'pass', score: 100 },
  { label: 'Deepfake Detection', status: 'pass', score: 99 },
  { label: 'Bias Scanning', status: 'pass', score: 94 },
  { label: 'Legal Compliance', status: 'pass', score: 100 },
  { label: 'GDPR Data Handling', status: 'pass', score: 100 },
  { label: 'Encryption Layer', status: 'pass', score: 100 },
  { label: 'AI Content Flagging', status: 'warn', score: 87 },
];

const severityStyles: Record<string, string> = {
  critical: 'text-red-400 border-red-500/30 bg-red-500/10',
  high: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
  medium: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
  low: 'text-green-400 border-green-500/30 bg-green-500/10',
};

export default function SecurityPage() {
  return (
    <AppShell>
      <div className="p-4 space-y-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-0.5">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-bold text-white">Information Security Center</h1>
          </div>
          <p className="text-xs text-slate-400">Misinformation detection · Deepfake analysis · Source integrity · OPSEC monitoring</p>
        </motion.div>

        {/* Status bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { icon: Shield, label: 'Threat Level', value: 'ELEVATED', color: 'orange' },
            { icon: Eye, label: 'Active Monitors', value: '1,247', color: 'cyan' },
            { icon: AlertTriangle, label: 'Flagged Items', value: '18', color: 'red' },
            { icon: Lock, label: 'Integrity Score', value: '96.4%', color: 'green' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="p-3 rounded-xl border border-slate-800/60 bg-slate-900/40"
              >
                <Icon className={`w-4 h-4 text-${item.color}-400 mb-1.5`} />
                <div className="text-[10px] text-slate-500 uppercase tracking-wide mb-0.5">{item.label}</div>
                <div className={`text-lg font-bold font-mono text-${item.color}-400`}>{item.value}</div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Threat feeds */}
          <GlowCard glow="red" className="flex flex-col">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800/60">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-bold text-white">Active Threat Feeds</span>
            </div>
            <div className="divide-y divide-slate-800/40">
              {THREAT_FEEDS.map((threat, i) => (
                <motion.div
                  key={threat.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="px-4 py-3 hover:bg-slate-800/20 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded border', severityStyles[threat.severity])}>
                      {threat.type}
                    </span>
                    <span className="text-[10px] text-slate-500 ml-auto">{threat.time}</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-200 mb-0.5">{threat.title}</div>
                  <div className="text-[11px] text-slate-500">{threat.source}</div>
                </motion.div>
              ))}
            </div>
          </GlowCard>

          {/* Integrity checks */}
          <GlowCard glow="green" className="flex flex-col">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800/60">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold text-white">System Integrity</span>
            </div>
            <div className="p-4 space-y-3">
              {INTEGRITY_CHECKS.map((check, i) => (
                <motion.div
                  key={check.label}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.04 }}
                  className="flex items-center gap-3"
                >
                  <div className={cn(
                    'w-5 h-5 rounded-full flex items-center justify-center shrink-0',
                    check.status === 'pass' ? 'bg-emerald-500/20' : 'bg-yellow-500/20'
                  )}>
                    <Check className={cn('w-3 h-3', check.status === 'pass' ? 'text-emerald-400' : 'text-yellow-400')} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-300">{check.label}</span>
                      <span className={cn('text-[11px] font-mono font-bold', check.status === 'pass' ? 'text-emerald-400' : 'text-yellow-400')}>
                        {check.score}%
                      </span>
                    </div>
                    <div className="h-1 bg-slate-700/40 rounded-full">
                      <div
                        className={cn('h-full rounded-full transition-all', check.status === 'pass' ? 'bg-emerald-500' : 'bg-yellow-500')}
                        style={{ width: `${check.score}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlowCard>
        </div>
      </div>
    </AppShell>
  );
}
