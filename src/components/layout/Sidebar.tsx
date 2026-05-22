'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FileText, Brain, TrendingUp, Newspaper,
  Radio, Shield, Globe, Activity, Search, Settings, Bell,
  ChevronLeft, ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';

const navItems = [
  {
    group: 'Intelligence',
    items: [
      { label: 'Dashboard',   href: '/',            icon: LayoutDashboard },
      { label: 'Live Feed',   href: '/live',         icon: Radio },
      { label: 'Global Map',  href: '/map',          icon: Globe },
    ],
  },
  {
    group: 'Journalism',
    items: [
      { label: 'Articles',    href: '/articles',     icon: Newspaper },
      { label: 'AI Editor',   href: '/editor',       icon: FileText },
      { label: 'Research',    href: '/research',     icon: Brain },
    ],
  },
  {
    group: 'Analysis',
    items: [
      { label: 'Predictions', href: '/predictions',  icon: TrendingUp },
      { label: 'Signals',     href: '/signals',      icon: Activity },
      { label: 'Security',    href: '/security',     icon: Shield },
    ],
  },
];

export function Sidebar() {
  const pathname  = usePathname();
  const { sidebarOpen, toggleSidebar } = useStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 220 : 56 }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex flex-col h-full bg-[var(--void)] border-r border-[var(--rule)] z-30 overflow-hidden shrink-0"
    >
      {/* ── Masthead logo ── */}
      <div className={cn(
        'flex items-center h-14 shrink-0 border-b border-[var(--rule)]',
        sidebarOpen ? 'px-5' : 'px-0 justify-center'
      )}>
        {sidebarOpen ? (
          <AnimatePresence mode="wait">
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <div
                className="text-[13px] font-bold tracking-[0.22em] text-[var(--ink)] uppercase"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Millenium
              </div>
              <div className="text-[9px] tracking-[0.35em] text-[var(--gold)] uppercase font-bold mt-0.5">
                Daily
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div
            className="text-[11px] font-bold text-[var(--gold)] tracking-wider"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            MD
          </div>
        )}
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-5">
        {navItems.map((group) => (
          <div key={group.group}>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="px-5 mb-2"
                >
                  <div className="section-rule">
                    <span className="label-caps">{group.group}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="space-y-px">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <div className={cn(
                      'flex items-center gap-3 transition-all duration-150 relative group',
                      sidebarOpen ? 'px-5 py-2' : 'px-0 py-2.5 justify-center',
                      isActive
                        ? 'text-[var(--ink)]'
                        : 'text-[var(--ink-3)] hover:text-[var(--ink-2)]'
                    )}>
                      {/* Active gold left bar */}
                      {isActive && (
                        <motion.div
                          layoutId="nav-active"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-5 bg-[var(--gold)]"
                          transition={{ duration: 0.2 }}
                        />
                      )}
                      <Icon className={cn('w-3.5 h-3.5 shrink-0', isActive && 'text-[var(--gold)]')} />
                      <AnimatePresence>
                        {sidebarOpen && (
                          <motion.span
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -6 }}
                            transition={{ duration: 0.12 }}
                            className={cn(
                              'text-[12px] tracking-wide truncate',
                              isActive ? 'font-semibold text-[var(--ink)]' : 'font-normal'
                            )}
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ── Bottom ── */}
      <div className={cn('border-t border-[var(--rule)] py-2 space-y-px', sidebarOpen ? '' : '')}>
        {[
          { icon: Search,   label: 'Search'   },
          { icon: Bell,     label: 'Alerts'   },
          { icon: Settings, label: 'Settings' },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            aria-label={label}
            className={cn(
              'flex items-center gap-3 w-full transition-colors text-[var(--ink-3)] hover:text-[var(--ink-2)] py-2',
              sidebarOpen ? 'px-5' : 'px-0 justify-center'
            )}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[12px] truncate"
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>

      {/* ── Toggle ── */}
      <button
        onClick={toggleSidebar}
        aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        className="absolute -right-3 top-16 w-6 h-6 bg-[var(--void-3)] border border-[var(--rule)] flex items-center justify-center text-[var(--ink-3)] hover:text-[var(--gold)] hover:border-[var(--rule-gold)] transition-colors z-40"
      >
        {sidebarOpen ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
      </button>
    </motion.aside>
  );
}

import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';

const navItems = [
  {
    group: 'INTELLIGENCE',
    items: [
      { label: 'Mission Control', href: '/', icon: LayoutDashboard },
      { label: 'Live Feed', href: '/live', icon: Radio },
      { label: 'Global Map', href: '/map', icon: Globe },
    ],
  },
  {
    group: 'JOURNALISM',
    items: [
      { label: 'Articles', href: '/articles', icon: Newspaper },
      { label: 'AI Editor', href: '/editor', icon: FileText },
      { label: 'Research AI', href: '/research', icon: Brain },
    ],
  },
  {
    group: 'ANALYSIS',
    items: [
      { label: 'Predictions', href: '/predictions', icon: TrendingUp },
      { label: 'Signals', href: '/signals', icon: Activity },
      { label: 'Security', href: '/security', icon: Shield },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 240 : 64 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative flex flex-col h-full bg-slate-900/95 border-r border-slate-800/60 backdrop-blur-xl z-30 overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-slate-800/60 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.4)]">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="min-w-0"
              >
                <div className="text-sm font-bold text-white tracking-wide truncate">MILLENIUM</div>
                <div className="text-[10px] text-cyan-400 tracking-widest truncate">DAILY</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-4">
        {navItems.map((group) => (
          <div key={group.group}>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-2 mb-2"
                >
                  <span className="text-[9px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                    {group.group}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      whileHover={{ x: 2 }}
                      className={cn(
                        'flex items-center gap-3 px-2 py-2 rounded-lg transition-all duration-200 group relative',
                        isActive
                          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-indicator"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-cyan-400 rounded-r"
                        />
                      )}
                      <Icon className={cn(
                        'w-4 h-4 shrink-0',
                        isActive && 'text-cyan-400',
                      )} />
                      <AnimatePresence>
                        {sidebarOpen && (
                          <motion.span
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8 }}
                            transition={{ duration: 0.15 }}
                            className="text-sm font-medium truncate"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="p-2 border-t border-slate-800/60 space-y-0.5">
        {[
          { icon: Search, label: 'Search' },
          { icon: Bell, label: 'Alerts' },
          { icon: Settings, label: 'Settings' },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex items-center gap-3 px-2 py-2 w-full rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
          >
            <Icon className="w-4 h-4 shrink-0" />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm truncate"
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>

      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-40 shadow-lg"
      >
        {sidebarOpen ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
      </button>
    </motion.aside>
  );
}
