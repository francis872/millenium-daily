'use client';
import { motion } from 'framer-motion';
import { Bell, Brain } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { breakingNews } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function TopBar() {
  const { toggleAIPanel, aiPanelOpen, liveMode, toggleLiveMode } = useStore();
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const utc = time ? time.toUTCString().slice(5, 22) : '— — UTC';

  return (
    <header className="shrink-0 border-b border-[var(--rule)] bg-[var(--void)] z-20">

      {/* â”€â”€ Upper bar: masthead â”€â”€ */}
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
            aria-label="Toggle CHRONIQ AI panel"
            className={cn(
              'flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 border transition-all',
              aiPanelOpen
                ? 'text-[var(--gold)] border-[var(--rule-gold)] bg-[var(--gold-dim)]'
                : 'text-[var(--ink-3)] border-[var(--rule)] hover:text-[var(--gold)] hover:border-[var(--rule-gold)]'
            )}
          >
            <Brain className="w-3 h-3" />
            CHRONIQ AI
          </motion.button>
        </div>
      </div>

      {/* â”€â”€ Breaking news ticker â”€â”€ */}
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
                )}>â—†</span>
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
