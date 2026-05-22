'use client';
import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { AIResearchPanel } from '@/components/ai/ResearchPanel';
import { PdfViewerModal } from '@/components/ui/PdfViewerModal';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export function AppShell({ children }: { children: ReactNode }) {
  const { aiPanelOpen } = useStore();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[var(--void)]">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar />
        <div className="flex flex-1 min-h-0 overflow-hidden">
          <main className="flex-1 overflow-y-auto min-w-0">
            {children}
          </main>
          <AnimatePresence>
            {aiPanelOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 360, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                className="shrink-0 border-l border-[var(--rule)] overflow-hidden"
              >
                <AIResearchPanel />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <PdfViewerModal />
    </div>
  );
}
