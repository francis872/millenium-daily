import { writeFileSync, mkdirSync } from 'fs';

mkdirSync('src/app/feed', { recursive: true });

const feedPage = `'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppShell } from '@/components/layout/AppShell';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { ContentTypePill } from '@/components/ui/ContentTypePill';
import { useStore } from '@/store/useStore';
import type { LiveFeedItem, FeedContentType } from '@/types';
import {
  Rss, Upload, FileText, Eye, Clock, Globe, Tag,
  AlertTriangle, X, Send, CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const FILTER_OPTIONS: { value: FeedContentType | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'news', label: 'News' },
  { value: 'pdf', label: 'PDF' },
  { value: 'scientific', label: 'Scientific' },
  { value: 'signal', label: 'Signal' },
  { value: 'alert', label: 'Alert' },
  { value: 'investigation', label: 'Investigation' },
  { value: 'dataset', label: 'Dataset' },
  { value: 'latex_report', label: 'LaTeX' },
  { value: 'ai_report', label: 'AI Report' },
];

const severityColors: Record<string, string> = {
  low:      'text-[var(--ink-3)]',
  medium:   'text-yellow-500',
  high:     'text-orange-400',
  critical: 'text-[var(--crimson-bright)]',
};

function UploadQuickModal({ onClose }: { onClose: () => void }) {
  const { publishers, addFeedItem } = useStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const activePublishers = publishers.filter(p => p.status === 'active');
  const [pubId, setPubId] = useState(activePublishers[0]?.id ?? '');
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [type, setType] = useState<FeedContentType>('news');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) { setPdfFile(f); setType('pdf'); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !excerpt.trim() || !pubId) return;
    const pub = activePublishers.find(p => p.id === pubId)!;
    let pdfUrl: string | undefined;
    if (pdfFile) pdfUrl = URL.createObjectURL(pdfFile);

    const item: LiveFeedItem = {
      id: 'lf-quick-' + Date.now(),
      type,
      title,
      excerpt,
      publisherId: pub.id,
      publisherName: pub.name,
      author: 'Editorial',
      trustScore: pub.trustScore,
      verificationLevel: pub.verificationLevel,
      timestamp: 'Ahora mismo',
      tags: [],
      hasPDF: !!pdfFile,
      pdfUrl,
      credibilityScore: pub.trustScore,
      views: 0,
    };
    addFeedItem(item);
    setSubmitted(true);
    setTimeout(onClose, 1600);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96 }} animate={{ scale: 1 }} exit={{ scale: 0.96 }}
        onClick={e => e.stopPropagation()}
        className="w-[480px] bg-[var(--void-2)] border border-[var(--rule-gold)]"
      >
        <div className="px-5 py-3.5 border-b border-[var(--rule)] flex justify-between items-center">
          <div className="text-[13px] font-bold text-[var(--ink)]" style={{ fontFamily: 'var(--font-serif)' }}>
            Publicar en CHRONIQ Feed
          </div>
          <button onClick={onClose} className="text-[var(--ink-3)] hover:text-[var(--ink)]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center py-10">
            <CheckCircle2 className="w-10 h-10 text-[var(--positive)] mb-2" />
            <div className="text-[13px] font-semibold text-[var(--ink)]">Publicado con éxito</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <label className="label-caps block mb-1">Publisher</label>
              <select
                value={pubId}
                onChange={e => setPubId(e.target.value)}
                required
                className="w-full bg-[var(--void-3)] border border-[var(--rule)] text-[var(--ink)] text-[12px] px-3 py-2 outline-none focus:border-[var(--rule-gold)]"
              >
                {activePublishers.map(p => (
                  <option key={p.id} value={p.id}>{p.flag} {p.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-caps block mb-1">Tipo</label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value as FeedContentType)}
                  className="w-full bg-[var(--void-3)] border border-[var(--rule)] text-[var(--ink)] text-[12px] px-3 py-2 outline-none focus:border-[var(--rule-gold)]"
                >
                  {['news','scientific','pdf','latex_report','dataset','signal','alert','investigation','ai_report'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-caps block mb-1">Adjuntar PDF</label>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className={cn(
                    'w-full h-full flex items-center gap-1.5 text-[10px] font-bold uppercase px-3 border transition-colors',
                    pdfFile
                      ? 'text-[var(--gold)] border-[var(--rule-gold)] bg-[var(--gold-dim)]'
                      : 'text-[var(--ink-3)] border-[var(--rule)] hover:text-[var(--ink-2)]'
                  )}
                >
                  <FileText className="w-3 h-3 shrink-0" />
                  <span className="truncate">{pdfFile ? pdfFile.name : 'Subir PDF'}</span>
                </button>
                <input ref={fileRef} type="file" accept=".pdf" onChange={handleFile} className="hidden" />
              </div>
            </div>

            <div>
              <label className="label-caps block mb-1">Título *</label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                placeholder="Titular..."
                className="w-full bg-[var(--void-3)] border border-[var(--rule)] text-[var(--ink)] text-[12px] px-3 py-2 outline-none focus:border-[var(--rule-gold)] placeholder:text-[var(--ink-3)]"
              />
            </div>
            <div>
              <label className="label-caps block mb-1">Excerpt *</label>
              <textarea
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
                required
                rows={2}
                placeholder="Resumen breve..."
                className="w-full bg-[var(--void-3)] border border-[var(--rule)] text-[var(--ink)] text-[12px] px-3 py-2 outline-none focus:border-[var(--rule-gold)] placeholder:text-[var(--ink-3)] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 border border-[var(--rule-gold)] bg-[var(--gold-dim)] text-[var(--gold)] font-bold tracking-[0.12em] text-[10px] uppercase py-2.5 hover:bg-[var(--gold)]/20 transition-colors"
            >
              <Send className="w-3 h-3" />
              Publicar
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

function FeedCard({ item, index }: { item: LiveFeedItem; index: number }) {
  const { openPdf } = useStore();

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="border border-[var(--rule)] hover:border-[var(--rule-gold)] transition-colors bg-[var(--void-2)] p-4 group"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <ContentTypePill type={item.type} />
          {item.severity && (
            <span className={cn('text-[9px] font-bold tracking-[0.1em] uppercase', severityColors[item.severity])}>
              <AlertTriangle className="w-2.5 h-2.5 inline mr-0.5" />
              {item.severity}
            </span>
          )}
        </div>
        <TrustBadge trustScore={item.trustScore} verificationLevel={item.verificationLevel} compact />
      </div>

      {/* Title */}
      <h3 className="text-[14px] font-semibold text-[var(--ink)] leading-snug mb-1.5" style={{ fontFamily: 'var(--font-serif)' }}>
        {item.title}
      </h3>
      <p className="text-[11px] text-[var(--ink-3)] leading-relaxed mb-3 line-clamp-2">
        {item.excerpt}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-semibold text-[var(--gold)]">{item.publisherName}</span>
          {item.author && (
            <span className="text-[10px] text-[var(--ink-3)]">{item.author}</span>
          )}
          <span className="flex items-center gap-0.5 text-[9px] text-[var(--ink-3)]">
            <Clock className="w-2.5 h-2.5" />
            {item.timestamp}
          </span>
          {item.region && (
            <span className="flex items-center gap-0.5 text-[9px] text-[var(--ink-3)]">
              <Globe className="w-2.5 h-2.5" />
              {item.region}
            </span>
          )}
          {item.views != null && (
            <span className="flex items-center gap-0.5 text-[9px] text-[var(--ink-3)]">
              <Eye className="w-2.5 h-2.5" />
              {item.views.toLocaleString()}
            </span>
          )}
        </div>

        {item.hasPDF && item.pdfUrl && (
          <button
            onClick={() => openPdf(item.pdfUrl!, item.title)}
            className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 border border-[var(--rule-gold)] text-[var(--gold)] bg-[var(--gold-dim)] hover:bg-[var(--gold)]/20 transition-colors shrink-0"
          >
            <FileText className="w-3 h-3" />
            Ver PDF
          </button>
        )}
      </div>

      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
          {item.tags.map(tag => (
            <span
              key={tag}
              className="text-[8px] tracking-[0.08em] uppercase px-1.5 py-0.5 bg-[var(--void-3)] text-[var(--ink-3)] border border-[var(--rule)]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.article>
  );
}

export default function FeedPage() {
  const { feedItems } = useStore();
  const [filter, setFilter] = useState<FeedContentType | 'all'>('all');
  const [showUpload, setShowUpload] = useState(false);

  const shown = filter === 'all'
    ? feedItems
    : feedItems.filter(i => i.type === filter);

  return (
    <AppShell>
      <div className="flex flex-col h-full min-h-0">

        {/* Header */}
        <div className="shrink-0 px-6 py-4 border-b border-[var(--rule)]">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <Rss className="w-3.5 h-3.5 text-[var(--gold)]" />
                <span className="label-caps text-[var(--gold)]">Chroniq Feed</span>
                <span className="text-[8px] font-bold tracking-[0.15em] text-[var(--crimson-bright)] border border-[var(--crimson)]/40 bg-[var(--crimson-dim)] px-1.5 py-0.5">
                  LIVE
                </span>
              </div>
              <h1 className="text-[22px] font-bold tracking-tight text-[var(--ink)]" style={{ fontFamily: 'var(--font-serif)' }}>
                Global Intelligence Stream
              </h1>
              <p className="text-[11px] text-[var(--ink-3)] mt-0.5">
                Contenido publicado por publishers verificados — {feedItems.length} items activos
              </p>
            </div>
            <button
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2 text-[10px] font-bold tracking-[0.12em] uppercase px-4 py-2.5 border border-[var(--rule-gold)] bg-[var(--gold-dim)] text-[var(--gold)] hover:bg-[var(--gold)]/20 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              Publicar
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-1 flex-wrap">
            {FILTER_OPTIONS.map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  'text-[9px] font-bold tracking-[0.1em] uppercase px-2.5 py-1.5 border transition-all',
                  filter === f.value
                    ? 'text-[var(--gold)] border-[var(--rule-gold)] bg-[var(--gold-dim)]'
                    : 'text-[var(--ink-3)] border-[var(--rule)] hover:text-[var(--ink-2)]'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feed list */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-3 max-w-4xl">
            <AnimatePresence>
              {shown.length === 0 ? (
                <div className="text-center py-16 text-[var(--ink-3)] text-[12px]">
                  No hay contenido para este filtro
                </div>
              ) : (
                shown.map((item, i) => (
                  <FeedCard key={item.id} item={item} index={i} />
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showUpload && <UploadQuickModal onClose={() => setShowUpload(false)} />}
      </AnimatePresence>
    </AppShell>
  );
}
`;

writeFileSync('src/app/feed/page.tsx', feedPage, 'utf8');
console.log('feed page:', feedPage.length);
