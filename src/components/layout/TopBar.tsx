'use client';
import { motion } from 'framer-motion';
import { Bell, Brain } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { breakingNews } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function TopBar() {
  const { toggleAIPanel, aiPanelOpen, liveMode, toggleLiveMode } = useStore();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const utc = time.toUTCString().slice(5, 22); // "21 May 2026 14:32:10"

  return (
    <header className="shrink-0 border-b border-[var(--rule)] bg-[var(--void)] z-20">

      {/* ── Upper bar: masthead ── */}
      <div className="flex items-center h-9 px-5 gap-4 border-b border-[var(--rule)]">
        {/* Date / edition */}
        <span className="text-[10px] tracking-[0.15em] text-[var(--ink-3)] uppercase font-mono">{utc} UTC</span>

        <div className="flex-1 flex justify-center">
          {/* Live indicator */}
          <button
            onClick={toggleLiveMode}
            className={cn(
              'flex items-center gap-1.5 text-[9px] font-bold tracking-[0.2em] uppercase transition-colors',
              liveMode ? 'text-[var(--crimson-bright)]' : 'text-[var(--ink-3)]'
            )}
          >
            {liveMode && <span className="w-1 h-1 rounded-full bg-[var(--crimson-bright)] pulse-dot" />}
            {liveMode ? 'Live' : 'Paused'}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            aria-label="Notifications"
            className="relative text-[var(--ink-3)] hover:text-[var(--gold)] transition-colors"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[var(--crimson-bright)] pulse-dot" />
          </button>

          <motion.button
            onClick={toggleAIPanel}
            whileTap={{ scale: 0.96 }}
            aria-label="Toggle ARIA panel"
            className={cn(
              'flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 border transition-all',
              aiPanelOpen
                ? 'text-[var(--gold)] border-[var(--rule-gold)] bg-[var(--gold-dim)]'
                : 'text-[var(--ink-3)] border-[var(--rule)] hover:text-[var(--gold)] hover:border-[var(--rule-gold)]'
            )}
          >
            <Brain className="w-3 h-3" />
            ARIA
          </motion.button>
        </div>
      </div>

      {/* ── Breaking news ticker ── */}
      <div className="flex items-center h-8 overflow-hidden">
        <div className="flex items-center gap-0 px-4 shrink-0 border-r border-[var(--rule)] h-full">
          <span className="text-[9px] font-bold tracking-[0.2em] text-[var(--crimson-bright)] uppercase">
            Breaking
          </span>
        </div>
        <div className="flex-1 overflow-hidden relative h-full flex items-center">
          <div className="ticker-animation flex items-center gap-10 whitespace-nowrap">
            {[...breakingNews, ...breakingNews].map((item, i) => (
              <span key={i} className="flex items-center gap-2 text-[11px] text-[var(--ink-2)]">
                <span className={cn(
                  'text-[8px]',
                  item.severity === 'critical' ? 'text-[var(--crimson-bright)]' :
                  item.severity === 'high'     ? 'text-orange-400' : 'text-[var(--gold)]'
                )}>◆</span>
                {item.headline}
                <span className="text-[var(--ink-3)] text-[10px]">{item.time}</span>
                <span className="text-[var(--rule)] mx-2 text-base">|</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}


export function TopBar() {
  const { toggleAIPanel, aiPanelOpen, liveMode, toggleLiveMode } = useStore();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="h-12 flex items-center bg-slate-900/90 border-b border-slate-800/60 backdrop-blur-xl shrink-0 z-20 overflow-hidden">
      {/* Breaking news ticker */}
      <div className="flex-1 overflow-hidden flex items-center">
        <div className="flex items-center gap-2 px-3 shrink-0">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-500/20 border border-red-500/30 text-[10px] font-bold tracking-widest text-red-400 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            LIVE
          </span>
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div className="ticker-animation flex items-center gap-8 whitespace-nowrap">
            {[...breakingNews, ...breakingNews].map((item, i) => (
              <span key={i} className="flex items-center gap-2 text-xs text-slate-300">
                <span className={cn(
                  'text-[10px] font-bold',
                  item.severity === 'critical' ? 'text-red-400' :
                  item.severity === 'high' ? 'text-orange-400' : 'text-yellow-400'
                )}>◆</span>
                {item.headline}
                <span className="text-slate-500 text-[10px]">{item.time}</span>
                <span className="text-slate-700 mx-2">|</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-1 px-3 shrink-0 border-l border-slate-800/60">
        {/* Live mode toggle */}
        <button
          onClick={toggleLiveMode}
          className={cn(
            'flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold tracking-wide transition-all',
            liveMode
              ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
              : 'text-slate-400 bg-slate-800/50 border border-slate-700/50'
          )}
        >
          <Wifi className="w-3 h-3" />
          {liveMode ? 'LIVE' : 'PAUSED'}
        </button>

        {/* Clock */}
        <div className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-mono text-slate-400 border border-slate-800/60">
          <Clock className="w-3 h-3" />
          {time.toUTCString().slice(17, 25)} UTC
        </div>

        {/* Notifications */}
        <button aria-label="Notifications" className="relative p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
        </button>

        {/* AI Panel */}
        <motion.button
          onClick={toggleAIPanel}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-all border',
            aiPanelOpen
              ? 'text-purple-400 bg-purple-500/10 border-purple-500/30'
              : 'text-slate-400 border-slate-700/50 hover:text-white hover:bg-slate-800/50'
          )}
        >
          <Brain className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[11px]">ARIA</span>
        </motion.button>
      </div>
    </header>
  );
}
