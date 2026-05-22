'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AppShell } from '@/components/layout/AppShell';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { ContentTypePill } from '@/components/ui/ContentTypePill';
import { useStore } from '@/store/useStore';
import type { LiveFeedItem, FeedContentType, Publisher } from '@/types';
import {
  Building2, Globe, Users, ShieldCheck, Clock, Upload,
  CheckCircle2, XCircle, Plus, FileText, Send, ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const categoryLabel: Record<string, string> = {
  news_agency: 'News Agency',
  newspaper: 'Newspaper',
  research_institute: 'Research Institute',
  government: 'Government',
  university: 'University',
  ngo: 'NGO',
  financial_media: 'Financial Media',
  broadcast: 'Broadcast',
};

const uploadTypeOptions: { value: FeedContentType; label: string }[] = [
  { value: 'news', label: 'News Article' },
  { value: 'investigation', label: 'Investigation' },
  { value: 'scientific', label: 'Scientific Paper' },
  { value: 'latex_report', label: 'LaTeX Report' },
  { value: 'dataset', label: 'Dataset' },
  { value: 'pdf', label: 'PDF Document' },
  { value: 'ai_report', label: 'AI Report' },
  { value: 'signal', label: 'Signal / Alert' },
];

function UploadModal({
  publisher,
  onClose,
}: {
  publisher: Publisher;
  onClose: () => void;
}) {
  const { addFeedItem } = useStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [type, setType] = useState<FeedContentType>('news');
  const [region, setRegion] = useState('');
  const [tags, setTags] = useState('');
  const [severity, setSeverity] = useState<string>('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const allowed = publisher.allowedTypes;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f && f.type === 'application/pdf') setPdfFile(f);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !excerpt.trim()) return;

    let pdfUrl: string | undefined;
    if (pdfFile) {
      pdfUrl = URL.createObjectURL(pdfFile);
    }

    const item: LiveFeedItem = {
      id: 'lf-upload-' + Date.now(),
      type,
      title,
      excerpt,
      publisherId: publisher.id,
      publisherName: publisher.name,
      author: 'Editorial Team',
      trustScore: publisher.trustScore,
      verificationLevel: publisher.verificationLevel,
      timestamp: 'Ahora mismo',
      region: region || undefined,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      severity: (severity as LiveFeedItem['severity']) || undefined,
      hasPDF: !!pdfFile,
      pdfUrl,
      credibilityScore: publisher.trustScore,
      views: 0,
    };

    addFeedItem(item);
    setSubmitted(true);
    setTimeout(onClose, 1800);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="w-[560px] max-h-[90vh] overflow-y-auto bg-[var(--void-2)] border border-[var(--rule-gold)]"
      >
        <div className="px-6 py-4 border-b border-[var(--rule)] flex items-center justify-between">
          <div>
            <div className="text-[9px] tracking-[0.2em] text-[var(--gold)] uppercase mb-0.5">{publisher.name}</div>
            <div className="text-[15px] font-bold text-[var(--ink)]" style={{ fontFamily: 'var(--font-serif)' }}>
              Publicar Contenido
            </div>
          </div>
          <button onClick={onClose} className="text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors">
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
              <CheckCircle2 className="w-12 h-12 text-[var(--positive)] mb-3" />
            </motion.div>
            <div className="text-[14px] font-semibold text-[var(--ink)]">Publicado en el Feed</div>
            <div className="text-[11px] text-[var(--ink-3)] mt-1">El contenido ya aparece en CHRONIQ Feed</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Type */}
            <div>
              <label className="label-caps block mb-2">Tipo de contenido</label>
              <div className="flex flex-wrap gap-1.5">
                {uploadTypeOptions
                  .filter(o => allowed.includes(o.value))
                  .map(o => (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => setType(o.value)}
                      className={cn(
                        'text-[9px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 border transition-all',
                        type === o.value
                          ? 'text-[var(--gold)] border-[var(--rule-gold)] bg-[var(--gold-dim)]'
                          : 'text-[var(--ink-3)] border-[var(--rule)] hover:text-[var(--ink-2)]'
                      )}
                    >
                      {o.label}
                    </button>
                  ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="label-caps block mb-1.5">Título *</label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                placeholder="Titular del artículo o documento..."
                className="w-full bg-[var(--void-3)] border border-[var(--rule)] text-[var(--ink)] text-[13px] px-3 py-2 outline-none focus:border-[var(--rule-gold)] placeholder:text-[var(--ink-3)]"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="label-caps block mb-1.5">Resumen / Excerpt *</label>
              <textarea
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
                required
                rows={3}
                placeholder="Descripción o resumen del contenido..."
                className="w-full bg-[var(--void-3)] border border-[var(--rule)] text-[var(--ink)] text-[13px] px-3 py-2 outline-none focus:border-[var(--rule-gold)] placeholder:text-[var(--ink-3)] resize-none"
              />
            </div>

            {/* Region + Severity row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-caps block mb-1.5">Región</label>
                <input
                  value={region}
                  onChange={e => setRegion(e.target.value)}
                  placeholder="e.g. Europe, Asia..."
                  className="w-full bg-[var(--void-3)] border border-[var(--rule)] text-[var(--ink)] text-[13px] px-3 py-2 outline-none focus:border-[var(--rule-gold)] placeholder:text-[var(--ink-3)]"
                />
              </div>
              <div>
                <label className="label-caps block mb-1.5">Severidad</label>
                <select
                  value={severity}
                  onChange={e => setSeverity(e.target.value)}
                  className="w-full bg-[var(--void-3)] border border-[var(--rule)] text-[var(--ink)] text-[13px] px-3 py-2 outline-none focus:border-[var(--rule-gold)]"
                >
                  <option value="">Ninguna</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="label-caps block mb-1.5">Tags (separados por coma)</label>
              <input
                value={tags}
                onChange={e => setTags(e.target.value)}
                placeholder="geopolitics, europe, energy..."
                className="w-full bg-[var(--void-3)] border border-[var(--rule)] text-[var(--ink)] text-[13px] px-3 py-2 outline-none focus:border-[var(--rule-gold)] placeholder:text-[var(--ink-3)]"
              />
            </div>

            {/* PDF Upload */}
            <div>
              <label className="label-caps block mb-1.5">Adjuntar PDF (opcional)</label>
              <div
                onClick={() => fileRef.current?.click()}
                className={cn(
                  'border border-dashed px-4 py-4 text-center cursor-pointer transition-colors',
                  pdfFile
                    ? 'border-[var(--rule-gold)] bg-[var(--gold-dim)]'
                    : 'border-[var(--rule)] hover:border-[var(--ink-3)]'
                )}
              >
                {pdfFile ? (
                  <div className="flex items-center justify-center gap-2">
                    <FileText className="w-4 h-4 text-[var(--gold)]" />
                    <span className="text-[11px] text-[var(--gold)] font-semibold">{pdfFile.name}</span>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-5 h-5 text-[var(--ink-3)] mx-auto mb-1" />
                    <span className="text-[11px] text-[var(--ink-3)]">Click para subir PDF</span>
                  </div>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[var(--gold-dim)] border border-[var(--rule-gold)] text-[var(--gold)] font-bold tracking-[0.15em] text-[11px] uppercase py-3 hover:bg-[var(--gold)]/20 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              Publicar en CHRONIQ Feed
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function PublishersPage() {
  const { publishers, updatePublisherStatus } = useStore();
  const [uploadTarget, setUploadTarget] = useState<Publisher | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'pending'>('all');

  const shown = filter === 'all' ? publishers : publishers.filter(p => p.status === filter);
  const activeCount = publishers.filter(p => p.status === 'active').length;
  const pendingCount = publishers.filter(p => p.status === 'pending').length;

  return (
    <AppShell>
      <div className="flex flex-col h-full min-h-0">

        {/* Header */}
        <div className="shrink-0 px-6 py-4 border-b border-[var(--rule)]">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <Building2 className="w-3.5 h-3.5 text-[var(--gold)]" />
                <span className="label-caps text-[var(--gold)]">Chroniq Publishers</span>
              </div>
              <h1 className="text-[22px] font-bold tracking-tight text-[var(--ink)]" style={{ fontFamily: 'var(--font-serif)' }}>
                Publisher Registry
              </h1>
              <p className="text-[11px] text-[var(--ink-3)] mt-0.5">
                Red global de medios, agencias e instituciones verificadas. Solo publishers autorizados por el grafo de confianza pueden publicar en CHRONIQ Feed.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-[9px] tracking-[0.12em] text-[var(--ink-3)] uppercase mb-0.5">Activos</div>
                <div className="text-[22px] font-bold font-mono text-[var(--positive)]">{activeCount}</div>
              </div>
              <div className="text-right">
                <div className="text-[9px] tracking-[0.12em] text-[var(--ink-3)] uppercase mb-0.5">Pendientes</div>
                <div className="text-[22px] font-bold font-mono text-orange-400">{pendingCount}</div>
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-1.5">
            {(['all', 'active', 'pending'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'text-[9px] font-bold tracking-[0.12em] uppercase px-3 py-1.5 border transition-all capitalize',
                  filter === f
                    ? 'text-[var(--gold)] border-[var(--rule-gold)] bg-[var(--gold-dim)]'
                    : 'text-[var(--ink-3)] border-[var(--rule)] hover:text-[var(--ink-2)]'
                )}
              >
                {f === 'all' ? 'Todos' : f === 'active' ? 'Verificados' : 'Pendientes de aprobación'}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {shown.map((pub, i) => (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={cn(
                  'border bg-[var(--void-2)] flex flex-col',
                  pub.status === 'pending'
                    ? 'border-orange-400/30'
                    : pub.status === 'active'
                    ? 'border-[var(--rule)] hover:border-[var(--rule-gold)]'
                    : 'border-[var(--crimson)]/30',
                  'transition-colors'
                )}
              >
                {/* Card header */}
                <div className="p-4 border-b border-[var(--rule)]">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{pub.flag}</span>
                      <div>
                        <div className="text-[13px] font-bold text-[var(--ink)] leading-none">{pub.name}</div>
                        <div className="text-[9px] text-[var(--ink-3)] mt-0.5">{pub.country} · {categoryLabel[pub.category]}</div>
                      </div>
                    </div>
                    <div className={cn(
                      'text-[8px] font-bold tracking-[0.12em] uppercase px-1.5 py-0.5 border shrink-0',
                      pub.status === 'active'    ? 'text-[var(--positive)] border-[var(--positive)]/40 bg-[var(--positive)]/10' :
                      pub.status === 'pending'   ? 'text-orange-400 border-orange-400/30 bg-orange-400/10' :
                      'text-[var(--crimson-bright)] border-[var(--crimson)]/40 bg-[var(--crimson-dim)]'
                    )}>
                      {pub.status === 'active' ? 'Verificado' : pub.status === 'pending' ? 'Pendiente' : 'Suspendido'}
                    </div>
                  </div>
                  <p className="text-[10px] text-[var(--ink-3)] leading-relaxed line-clamp-2">{pub.description}</p>
                </div>

                {/* Stats */}
                <div className="px-4 py-3 grid grid-cols-3 gap-2 border-b border-[var(--rule)]">
                  <div>
                    <div className="text-[8px] tracking-[0.1em] text-[var(--ink-3)] uppercase mb-0.5">Trust</div>
                    <div className="text-[14px] font-bold font-mono text-[var(--gold)]">{pub.trustScore}</div>
                  </div>
                  <div>
                    <div className="text-[8px] tracking-[0.1em] text-[var(--ink-3)] uppercase mb-0.5">Publicados</div>
                    <div className="text-[14px] font-bold font-mono text-[var(--ink)]">{pub.publishedCount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[8px] tracking-[0.1em] text-[var(--ink-3)] uppercase mb-0.5">Desde</div>
                    <div className="text-[10px] font-mono text-[var(--ink-2)]">{pub.joinedAt.slice(0, 7)}</div>
                  </div>
                </div>

                {/* Trust bar */}
                <div className="px-4 pt-2 pb-1">
                  <div className="h-0.5 bg-[var(--void-3)]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: pub.trustScore + '%' }}
                      transition={{ duration: 0.8, delay: i * 0.05 }}
                      className={cn(
                        'h-full',
                        pub.trustScore >= 90 ? 'bg-[var(--gold)]' :
                        pub.trustScore >= 75 ? 'bg-[var(--ink-2)]' : 'bg-orange-400'
                      )}
                    />
                  </div>
                </div>

                {/* Allowed types */}
                <div className="px-4 py-2 flex flex-wrap gap-1">
                  {pub.allowedTypes.slice(0, 4).map(t => (
                    <ContentTypePill key={t} type={t} />
                  ))}
                  {pub.allowedTypes.length > 4 && (
                    <span className="text-[8px] text-[var(--ink-3)]">+{pub.allowedTypes.length - 4}</span>
                  )}
                </div>

                {/* Actions */}
                <div className="p-3 mt-auto flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                  {pub.status === 'active' ? (
                    <button
                      onClick={() => setUploadTarget(pub)}
                      className="flex-1 flex items-center justify-center gap-1.5 text-[10px] font-bold tracking-[0.12em] uppercase py-2 border border-[var(--rule-gold)] bg-[var(--gold-dim)] text-[var(--gold)] hover:bg-[var(--gold)]/20 transition-colors"
                    >
                      <Upload className="w-3 h-3" />
                      Subir Contenido
                    </button>
                  ) : pub.status === 'pending' ? (
                    <div className="flex-1 flex gap-2">
                      <button
                        onClick={() => updatePublisherStatus(pub.id, 'active')}
                        className="flex-1 flex items-center justify-center gap-1 text-[9px] font-bold uppercase py-2 border border-[var(--positive)]/40 bg-[var(--positive)]/10 text-[var(--positive)] hover:bg-[var(--positive)]/20 transition-colors"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        Aprobar
                      </button>
                      <button
                        onClick={() => updatePublisherStatus(pub.id, 'suspended')}
                        className="flex-1 flex items-center justify-center gap-1 text-[9px] font-bold uppercase py-2 border border-[var(--crimson)]/30 bg-[var(--crimson-dim)] text-[var(--crimson-bright)] hover:bg-[var(--crimson)]/20 transition-colors"
                      >
                        <XCircle className="w-3 h-3" />
                        Rechazar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => updatePublisherStatus(pub.id, 'active')}
                      className="flex-1 flex items-center justify-center gap-1.5 text-[10px] font-bold tracking-[0.12em] uppercase py-2 border border-[var(--rule)] text-[var(--ink-3)] hover:text-[var(--ink-2)] transition-colors"
                    >
                      Reactivar
                    </button>
                  )}
                  </div>
                  <Link
                    href={`/publishers/${pub.id}`}
                    className="flex items-center justify-center gap-1.5 text-[9px] font-bold tracking-[0.1em] uppercase py-1.5 border border-[var(--rule)] text-[var(--ink-3)] hover:text-[var(--ink-2)] hover:border-[var(--rule-gold)] transition-colors"
                  >
                    <ChevronRight className="w-3 h-3" />
                    Ver perfil
                  </Link>
                </div>
              </motion.div>
            ))}

            {/* Register new publisher card */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: shown.length * 0.04 + 0.1 }}
              className="border border-dashed border-[var(--rule)] hover:border-[var(--rule-gold)] min-h-[240px] flex flex-col items-center justify-center gap-3 text-[var(--ink-3)] hover:text-[var(--gold)] transition-colors p-6"
            >
              <Plus className="w-8 h-8" />
              <div className="text-center">
                <div className="text-[12px] font-semibold">Registrar Publisher</div>
                <div className="text-[10px] mt-0.5 text-[var(--ink-3)]">Solicitar acceso a CHRONIQ Network</div>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {uploadTarget && (
          <UploadModal publisher={uploadTarget} onClose={() => setUploadTarget(null)} />
        )}
      </AnimatePresence>
    </AppShell>
  );
}
