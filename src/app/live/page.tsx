'use client';
import { AppShell } from '@/components/layout/AppShell';
import { motion, AnimatePresence } from 'framer-motion';
import { mockIntelligenceEvents, mockAIInsights, breakingNews } from '@/data/mockData';
import { timeAgo, cn } from '@/lib/utils';
import { Radio, AlertTriangle, Zap } from 'lucide-react';
import { SeverityBadge, GlowCard, ConfidenceMeter } from '@/components/ui/GlowCard';
import { useState, useEffect } from 'react';

export default function LiveFeedPage() {
  const [events, setEvents] = useState(mockIntelligenceEvents);
  const [tick, setTick] = useState(0);

  // Simulate new events arriving
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppShell>
      <div className="p-4 space-y-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-0.5">
            <Radio className="w-5 h-5 text-red-400" />
            <h1 className="text-xl font-bold text-white">Live Intelligence Feed</h1>
            <span className="text-[10px] font-bold tracking-widest text-red-400 px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              LIVE
            </span>
          </div>
          <p className="text-xs text-slate-400">Real-time global event monitoring · OSINT synthesis · AI-enhanced signals</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Breaking news column */}
          <GlowCard glow="red" className="flex flex-col">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800/60">
              <Zap className="w-4 h-4 text-red-400" />
              <span className="text-sm font-bold text-white">Breaking</span>
            </div>
            <div className="divide-y divide-slate-800/40">
              {breakingNews.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="px-4 py-3 hover:bg-slate-800/20 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn(
                      'w-1.5 h-1.5 rounded-full shrink-0',
                      item.severity === 'critical' ? 'bg-red-400 animate-pulse' :
                      item.severity === 'high' ? 'bg-orange-400' : 'bg-yellow-400'
                    )} />
                    <span className="text-[10px] text-slate-500">{item.time}</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-snug">{item.headline}</p>
                </motion.div>
              ))}
            </div>
          </GlowCard>

          {/* Intelligence events */}
          <GlowCard glow="cyan" className="flex flex-col">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800/60">
              <AlertTriangle className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-bold text-white">Intelligence Events</span>
            </div>
            <div className="divide-y divide-slate-800/40 overflow-y-auto">
              <AnimatePresence>
                {events.map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, backgroundColor: 'rgba(6,182,212,0.1)' }}
                    animate={{ opacity: 1, backgroundColor: 'rgba(0,0,0,0)' }}
                    transition={{ delay: i * 0.05, backgroundColor: { delay: 1, duration: 1 } }}
                    className="px-4 py-3 hover:bg-slate-800/20 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <SeverityBadge severity={event.severity} pulse={i === 0} />
                      <span className="text-[10px] text-slate-500">{timeAgo(event.timestamp)}</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-200 mb-1">{event.title}</div>
                    <div className="text-[11px] text-slate-400 mb-1.5 line-clamp-2">{event.description}</div>
                    <ConfidenceMeter value={event.confidence} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </GlowCard>

          {/* AI insights */}
          <GlowCard glow="purple" className="flex flex-col">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800/60">
              <span className="w-4 h-4 flex items-center justify-center text-purple-400">◈</span>
              <span className="text-sm font-bold text-white">ARIA Insights</span>
            </div>
            <div className="divide-y divide-slate-800/40">
              {mockAIInsights.map((insight, i) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="px-4 py-3 hover:bg-slate-800/20 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={cn(
                      'text-[10px] font-bold px-1.5 py-0.5 rounded border',
                      insight.type === 'anomaly' ? 'text-red-400 border-red-500/30 bg-red-500/10' :
                      insight.type === 'prediction' ? 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' :
                      insight.type === 'alert' ? 'text-orange-400 border-orange-500/30 bg-orange-500/10' :
                      'text-purple-400 border-purple-500/30 bg-purple-500/10'
                    )}>
                      {insight.type.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-slate-500 ml-auto">{timeAgo(insight.timestamp)}</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-200 mb-1">{insight.title}</div>
                  <div className="text-[11px] text-slate-400 leading-relaxed">{insight.content}</div>
                  <div className="mt-2">
                    <ConfidenceMeter value={insight.confidence} />
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
