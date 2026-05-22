import { writeFileSync } from 'fs';

const content = `'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FileText, TrendingUp, Newspaper,
  Radio, Shield, Globe, Activity, Search, Settings, Bell,
  ChevronLeft, ChevronRight, Network, Rss, FlaskConical, Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';

const navItems = [
  {
    group: 'Intelligence',
    items: [
      { label: 'Dashboard',    href: '/',          icon: LayoutDashboard, badge: null },
      { label: 'Chroniq Feed', href: '/feed',       icon: Rss,             badge: 'NEW' },
      { label: 'Atlas',        href: '/map',         icon: Globe,           badge: null },
      { label: 'Live',         href: '/live',        icon: Radio,           badge: 'LIVE' },
    ],
  },
  {
    group: 'Network',
    items: [
      { label: 'Graph',        href: '/graph',       icon: Network,         badge: 'NEW' },
      { label: 'Signals',      href: '/signals',     icon: Activity,        badge: null },
      { label: 'Predictions',  href: '/predictions', icon: TrendingUp,      badge: null },
    ],
  },
  {
    group: 'Research',
    items: [
      { label: 'Research',     href: '/research',    icon: FlaskConical,    badge: null },
      { label: 'Articles',     href: '/articles',    icon: Newspaper,       badge: null },
      { label: 'AI Editor',    href: '/editor',      icon: FileText,        badge: null },
    ],
  },
  {
    group: 'System',
    items: [
      { label: 'Security',     href: '/security',    icon: Shield,          badge: null },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 224 : 56 }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex flex-col h-full bg-[var(--void)] border-r border-[var(--rule)] z-30 overflow-hidden shrink-0"
    >
      {/* CHRONIQ Logo */}
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
              className="flex items-center gap-2.5"
            >
              <div className="w-6 h-6 border border-[var(--gold)] flex items-center justify-center shrink-0">
                <Zap className="w-3 h-3 text-[var(--gold)]" />
              </div>
              <div>
                <div
                  className="text-[14px] font-bold tracking-[0.18em] text-[var(--ink)] uppercase leading-none"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  Chroniq
                </div>
                <div className="text-[8px] tracking-[0.3em] text-[var(--ink-3)] uppercase mt-0.5">
                  Cognitive Network
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="w-7 h-7 border border-[var(--gold)]/40 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-[var(--gold)]" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-4">
        {navItems.map((group) => (
          <div key={group.group}>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="px-5 mb-1"
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
                  <Link key={item.href + item.label} href={item.href}>
                    <div className={cn(
                      'flex items-center gap-3 transition-all duration-150 relative group',
                      sidebarOpen ? 'px-5 py-1.5' : 'px-0 py-2 justify-center',
                      isActive ? 'text-[var(--ink)]' : 'text-[var(--ink-3)] hover:text-[var(--ink-2)]'
                    )}>
                      {isActive && (
                        <motion.div
                          layoutId="nav-active"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-[var(--gold)]"
                          transition={{ duration: 0.2 }}
                        />
                      )}
                      <Icon className={cn('w-3.5 h-3.5 shrink-0', isActive && 'text-[var(--gold)]')} />
                      <AnimatePresence>
                        {sidebarOpen && (
                          <motion.div
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -6 }}
                            transition={{ duration: 0.12 }}
                            className="flex items-center gap-2 flex-1 min-w-0"
                          >
                            <span className={cn(
                              'text-[12px] tracking-wide truncate flex-1',
                              isActive ? 'font-semibold text-[var(--ink)]' : 'font-normal'
                            )}>
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className={cn(
                                'text-[8px] font-bold tracking-[0.12em] px-1 py-px border shrink-0',
                                item.badge === 'LIVE'
                                  ? 'text-[var(--crimson-bright)] border-[var(--crimson)]/30 bg-[var(--crimson-dim)]'
                                  : 'text-[var(--gold)] border-[var(--gold)]/30 bg-[var(--gold-dim)]'
                              )}>
                                {item.badge}
                              </span>
                            )}
                          </motion.div>
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

      {/* Bottom actions */}
      <div className="border-t border-[var(--rule)] py-2 space-y-px">
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

      {/* Toggle */}
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
`;

writeFileSync('src/components/layout/Sidebar.tsx', content, 'utf8');
console.log('Done: ' + content.length + ' chars');
