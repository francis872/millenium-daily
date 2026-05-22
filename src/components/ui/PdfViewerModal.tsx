'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink } from 'lucide-react';
import { useStore } from '@/store/useStore';

export function PdfViewerModal() {
  const { selectedPdfUrl, selectedPdfTitle, closePdf } = useStore();

  return (
    <AnimatePresence>
      {selectedPdfUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closePdf}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-[90vw] h-[90vh] bg-[var(--void-2)] border border-[var(--rule-gold)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--rule)] shrink-0">
              <div>
                <div className="text-[9px] tracking-[0.2em] text-[var(--gold)] uppercase mb-0.5">PDF Document</div>
                <div className="text-[13px] font-semibold text-[var(--ink)] truncate max-w-[60vw]">
                  {selectedPdfTitle}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={selectedPdfUrl}
                  download={selectedPdfTitle + '.pdf'}
                  className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] text-[var(--ink-3)] hover:text-[var(--gold)] transition-colors px-3 py-1.5 border border-[var(--rule)] hover:border-[var(--rule-gold)]"
                >
                  <Download className="w-3 h-3" />
                  Descargar
                </a>
                <button
                  onClick={closePdf}
                  className="text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors p-1.5 hover:bg-[var(--void-3)]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            {/* PDF frame */}
            <div className="flex-1 min-h-0 bg-[var(--void-3)]">
              <iframe
                src={selectedPdfUrl}
                className="w-full h-full border-0"
                title={selectedPdfTitle || 'PDF Document'}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
