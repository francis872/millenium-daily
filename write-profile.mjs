import { writeFileSync, mkdirSync } from 'fs';

mkdirSync('src/app/publishers/[id]', { recursive: true });

const profilePage = `'use client';
import { useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AppShell } from '@/components/layout/AppShell';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { ContentTypePill } from '@/components/ui/ContentTypePill';
import { useStore } from '@/store/useStore';
import type { LiveFeedItem, FeedContentType } from '@/types';
import {
  Building2, Globe, Calendar, Users, FileText, Radio,
  ShieldCheck, ChevronLeft, Upload, Eye, Clock,
  AlertTriangle, X, Send, CheckCircle2, Lock,
  PlayCircle, Wifi, Archive, Newspaper, BarChart3,
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

const severityColors: Record<string, string> = {
  low: 'text-[var(--ink-3)]',
  medium: 'text-yellow-500',
  high: 'text-orange-400',
  critical: 'text-[var(--crimson-bright)]',
};

type Tab = 'feed' | 'archive' | 'live' | 'about';

// ─── UPLOAD MODAL ─────────────────────────────────────────────────────────────
function PublishModal({ publisherId, publisherName, allowedTypes, onClose }: {
  publisherId: string;
  publisherName: string;
  allowedTypes: FeedContentType[];
  onClose: () => void;
}) {
  const { addFeedItem } = useStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [type, setType] = useState<FeedContentType>(allowedTypes[0] ?? 'news');
  const [region, setRegion] = useState('');
  const [tags, setTags] = useState('');
  const [severity, setSeverity] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) setPdfFile(f);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !excerpt.trim()) return;
    let pdfUrl: string | undefined;
    if (pdfFile) pdfUrl = URL.createObjectURL(pdfFile);

    const item: LiveFeedItem = {
      id: 'lf-pub-' + Date.now(),
      type, title, excerpt,
      publisherId,
      publisherName,
      author: 'Editorial',
      trustScore: 90,
      verificationLevel: 'verified',
      timestamp: 'Ahora mismo',
      region: region || undefined,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      severity: (severity as LiveFeedItem['severity']) || undefined,
      hasPDF: !!pdfFile,
      pdfUrl,
      credibilityScore: 90,
      views: 0,
    };
    addFeedItem(item);
    setSubmitted(true);
    setTimeout(onClose, 1800);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96 }} animate={{ scale: 1 }} exit={{ scale: 0.96 }}
        onClick={e => e.stopPropagation()}
        className="w-[520px] max-h-[90vh] overflow-y-auto bg-[var(--void-2)] border border-[var(--rule-gold)]"
      >
        <div className="px-5 py-4 border-b border-[var(--rule)] flex items-center justify-between">
          <div>
            <div className="text-[9px] tracking-[0.2em] text-[var(--gold)] uppercase mb-0.5">{publisherName}</div>
            <div className="text-[14px] font-bold text-[var(--ink)]" style={{ fontFamily: 'var(--font-serif)' }}>
              Nueva Publicación
            </div>
          </div>
          <button onClick={onClose} className="text-[var(--ink-3)] hover:text-[var(--ink)]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center py-12 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
              <CheckCircle2 className="w-12 h-12 text-[var(--positive)] mb-3" />
            </motion.div>
            <div className="text-[14px] font-semibold text-[var(--ink)]">Publicado en CHRONIQ Feed</div>
            <div className="text-[11px] text-[var(--ink-3)] mt-1">El contenido ya aparece en el feed global</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <label className="label-caps block mb-2">Tipo de contenido</label>
              <div className="flex flex-wrap gap-1.5">
                {allowedTypes.map(t => (
                  <button
                    key={t} type="button" onClick={() => setType(t)}
                    className={cn(
                      'text-[9px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 border transition-all',
                      type === t
                        ? 'text-[var(--gold)] border-[var(--rule-gold)] bg-[var(--gold-dim)]'
                        : 'text-[var(--ink-3)] border-[var(--rule)] hover:text-[var(--ink-2)]'
                    )}
                  >{t}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="label-caps block mb-1.5">Título *</label>
              <input value={title} onChange={e => setTitle(e.target.value)} required
                placeholder="Titular del artículo..."
                className="w-full bg-[var(--void-3)] border border-[var(--rule)] text-[var(--ink)] text-[13px] px-3 py-2 outline-none focus:border-[var(--rule-gold)] placeholder:text-[var(--ink-3)]" />
            </div>
            <div>
              <label className="label-caps block mb-1.5">Excerpt *</label>
              <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} required rows={3}
                placeholder="Resumen del contenido..."
                className="w-full bg-[var(--void-3)] border border-[var(--rule)] text-[var(--ink)] text-[13px] px-3 py-2 outline-none focus:border-[var(--rule-gold)] placeholder:text-[var(--ink-3)] resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-caps block mb-1.5">Región</label>
                <input value={region} onChange={e => setRegion(e.target.value)}
                  placeholder="Europe, Asia..."
                  className="w-full bg-[var(--void-3)] border border-[var(--rule)] text-[var(--ink)] text-[12px] px-3 py-2 outline-none focus:border-[var(--rule-gold)] placeholder:text-[var(--ink-3)]" />
              </div>
              <div>
                <label className="label-caps block mb-1.5">Severidad</label>
                <select value={severity} onChange={e => setSeverity(e.target.value)}
                  className="w-full bg-[var(--void-3)] border border-[var(--rule)] text-[var(--ink)] text-[12px] px-3 py-2 outline-none focus:border-[var(--rule-gold)]">
                  <option value="">Ninguna</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>
            <div>
              <label className="label-caps block mb-1.5">Tags</label>
              <input value={tags} onChange={e => setTags(e.target.value)}
                placeholder="geopolitics, europe..."
                className="w-full bg-[var(--void-3)] border border-[var(--rule)] text-[var(--ink)] text-[12px] px-3 py-2 outline-none focus:border-[var(--rule-gold)] placeholder:text-[var(--ink-3)]" />
            </div>
            <div>
              <label className="label-caps block mb-1.5">Adjuntar PDF</label>
              <div
                onClick={() => fileRef.current?.click()}
                className={cn(
                  'border border-dashed px-4 py-3 text-center cursor-pointer transition-colors',
                  pdfFile ? 'border-[var(--rule-gold)] bg-[var(--gold-dim)]' : 'border-[var(--rule)] hover:border-[var(--ink-3)]'
                )}
              >
                {pdfFile ? (
                  <div className="flex items-center justify-center gap-2">
                    <FileText className="w-4 h-4 text-[var(--gold)]" />
                    <span className="text-[11px] text-[var(--gold)] font-semibold">{pdfFile.name}</span>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-4 h-4 text-[var(--ink-3)] mx-auto mb-1" />
                    <span className="text-[10px] text-[var(--ink-3)]">Click para subir PDF / LaTeX</span>
                  </div>
                )}
                <input ref={fileRef} type="file" accept=".pdf,application/pdf" onChange={handleFile} className="hidden" />
              </div>
            </div>
            <button type="submit"
              className="w-full flex items-center justify-center gap-2 border border-[var(--rule-gold)] bg-[var(--gold-dim)] text-[var(--gold)] font-bold tracking-[0.15em] text-[11px] uppercase py-3 hover:bg-[var(--gold)]/20 transition-colors">
              <Send className="w-3.5 h-3.5" />
              Publicar en CHRONIQ Feed
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function PublisherProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { publishers, feedItems, followedPublisherIds, followPublisher, unfollowPublisher, openPdf } = useStore();
  const [activeTab, setActiveTab] = useState<Tab>('feed');
  const [showPublish, setShowPublish] = useState(false);

  const publisher = publishers.find(p => p.id === id);
  const isFollowing = followedPublisherIds.includes(id ?? '');
  const myFeed = feedItems.filter(i => i.publisherId === id);
  const pdfArchive = feedItems.filter(i => i.publisherId === id && i.hasPDF);

  if (!publisher) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-full text-[var(--ink-3)] text-[13px]">
          Publisher no encontrado
        </div>
      </AppShell>
    );
  }

  const canPublish = publisher.status === 'active';

  const tabs: { id: Tab; label: string; icon: React.ElementType; count?: number }[] = [
    { id: 'feed',    label: 'Feed',    icon: Newspaper,  count: myFeed.length },
    { id: 'archive', label: 'Archivo', icon: Archive,    count: pdfArchive.length },
    { id: 'live',    label: 'Live',    icon: Radio,      count: publisher.liveStreams?.filter(s => s.isLive).length },
    { id: 'about',   label: 'Acerca', icon: Building2 },
  ];

  return (
    <AppShell>
      <div className="flex flex-col h-full min-h-0 overflow-hidden">

        {/* Back nav */}
        <div className="shrink-0 px-6 pt-3 pb-0">
          <Link
            href="/publishers"
            className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--ink-3)] hover:text-[var(--gold)] transition-colors"
          >
            <ChevronLeft className="w-3 h-3" />
            Directorio de Publishers
          </Link>
        </div>

        {/* ── PROFILE HEADER ── */}
        <div className="shrink-0 px-6 py-5 border-b border-[var(--rule)]">
          <div className="flex items-start justify-between gap-4">
            {/* Left: identity */}
            <div className="flex items-start gap-4">
              {/* Avatar / flag */}
              <div className="w-16 h-16 bg-[var(--void-3)] border border-[var(--rule)] flex items-center justify-center text-3xl shrink-0">
                {publisher.flag}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h1 className="text-[20px] font-bold text-[var(--ink)] leading-none" style={{ fontFamily: 'var(--font-serif)' }}>
                    {publisher.name}
                  </h1>
                  <TrustBadge trustScore={publisher.trustScore} verificationLevel={publisher.verificationLevel} compact />
                  {publisher.status === 'pending' && (
                    <span className="text-[8px] font-bold tracking-[0.12em] uppercase px-1.5 py-0.5 border border-orange-400/30 bg-orange-400/10 text-orange-400">
                      Pendiente de verificación
                    </span>
                  )}
                  {publisher.status === 'suspended' && (
                    <span className="text-[8px] font-bold tracking-[0.12em] uppercase px-1.5 py-0.5 border border-[var(--crimson)]/30 bg-[var(--crimson-dim)] text-[var(--crimson-bright)]">
                      Suspendido
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-[10px] text-[var(--ink-3)] mb-2">
                  <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{publisher.country}</span>
                  <span>{categoryLabel[publisher.category]}</span>
                  {publisher.headquartersCity && <span className="flex items-center gap-1">📍 {publisher.headquartersCity}</span>}
                  {publisher.founded && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Est. {publisher.founded}</span>}
                  {publisher.website && (
                    <a href={publisher.website} target="_blank" rel="noopener noreferrer"
                      className="hover:text-[var(--gold)] transition-colors flex items-center gap-1">
                      <Globe className="w-3 h-3" />{publisher.website.replace(/https?:\\/\\//, '')}
                    </a>
                  )}
                </div>
                <p className="text-[11px] text-[var(--ink-3)] leading-relaxed max-w-2xl">{publisher.description}</p>
              </div>
            </div>

            {/* Right: actions */}
            <div className="flex flex-col items-end gap-2 shrink-0">
              {canPublish ? (
                <button
                  onClick={() => setShowPublish(true)}
                  className="flex items-center gap-2 text-[10px] font-bold tracking-[0.12em] uppercase px-4 py-2.5 border border-[var(--rule-gold)] bg-[var(--gold-dim)] text-[var(--gold)] hover:bg-[var(--gold)]/20 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Publicar
                </button>
              ) : (
                <div className="flex items-center gap-1.5 text-[10px] text-[var(--ink-3)] border border-[var(--rule)] px-3 py-2">
                  <Lock className="w-3 h-3" />
                  Acceso restringido
                </div>
              )}
              <button
                onClick={() => isFollowing ? unfollowPublisher(publisher.id) : followPublisher(publisher.id)}
                className={cn(
                  'flex items-center gap-1.5 text-[10px] font-bold tracking-[0.12em] uppercase px-4 py-2 border transition-all',
                  isFollowing
                    ? 'text-[var(--ink-3)] border-[var(--rule)] hover:border-[var(--crimson)]/40 hover:text-[var(--crimson-bright)]'
                    : 'text-[var(--ink-2)] border-[var(--rule)] hover:border-[var(--rule-gold)] hover:text-[var(--gold)]'
                )}
              >
                <Users className="w-3 h-3" />
                {isFollowing ? 'Siguiendo' : 'Seguir'}
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-[var(--rule)]">
            <div>
              <div className="text-[8px] tracking-[0.12em] text-[var(--ink-3)] uppercase mb-0.5">Trust Score</div>
              <div className="text-[18px] font-bold font-mono text-[var(--gold)]">{publisher.trustScore}</div>
            </div>
            <div>
              <div className="text-[8px] tracking-[0.12em] text-[var(--ink-3)] uppercase mb-0.5">Publicaciones</div>
              <div className="text-[18px] font-bold font-mono text-[var(--ink)]">{(publisher.publishedCount + myFeed.length).toLocaleString()}</div>
            </div>
            <div>
              <div className="text-[8px] tracking-[0.12em] text-[var(--ink-3)] uppercase mb-0.5">Seguidores</div>
              <div className="text-[18px] font-bold font-mono text-[var(--ink)]">{publisher.followers.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-[8px] tracking-[0.12em] text-[var(--ink-3)] uppercase mb-0.5">Archivo PDF</div>
              <div className="text-[18px] font-bold font-mono text-[var(--ink)]">{pdfArchive.length}</div>
            </div>
            {/* Trust bar */}
            <div className="flex-1 ml-4">
              <div className="flex items-center justify-between text-[8px] text-[var(--ink-3)] mb-1">
                <span>TRUST LEVEL</span>
                <span>{publisher.trustScore}/100</span>
              </div>
              <div className="h-1 bg-[var(--void-3)]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: publisher.trustScore + '%' }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className={cn(
                    'h-full',
                    publisher.trustScore >= 90 ? 'bg-[var(--gold)]' :
                    publisher.trustScore >= 75 ? 'bg-[var(--ink-2)]' : 'bg-orange-400'
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="shrink-0 flex items-center gap-0 border-b border-[var(--rule)] px-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-1.5 text-[10px] font-bold tracking-[0.12em] uppercase py-3 px-4 border-b-2 transition-colors',
                activeTab === tab.id
                  ? 'text-[var(--gold)] border-[var(--gold)]'
                  : 'text-[var(--ink-3)] border-transparent hover:text-[var(--ink-2)]'
              )}
            >
              <tab.icon className="w-3 h-3" />
              {tab.label}
              {tab.count != null && tab.count > 0 && (
                <span className={cn(
                  'text-[8px] font-bold px-1.5 py-0.5 min-w-[18px] text-center',
                  tab.id === 'live' ? 'bg-[var(--crimson-dim)] text-[var(--crimson-bright)] border border-[var(--crimson)]/30' : 'bg-[var(--void-3)] text-[var(--ink-3)]'
                )}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── CONTENT ── */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">

            {/* FEED TAB */}
            {activeTab === 'feed' && (
              <motion.div key="feed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 max-w-4xl space-y-3">
                {myFeed.length === 0 ? (
                  <div className="text-center py-16 text-[var(--ink-3)] text-[12px]">
                    {canPublish ? 'Aún no hay publicaciones. Usa el botón "Publicar" para empezar.' : 'Publisher en proceso de verificación.'}
                  </div>
                ) : myFeed.map((item, i) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border border-[var(--rule)] hover:border-[var(--rule-gold)] transition-colors bg-[var(--void-2)] p-4"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <ContentTypePill type={item.type} />
                        {item.severity && (
                          <span className={cn('text-[9px] font-bold tracking-[0.1em] uppercase', severityColors[item.severity])}>
                            <AlertTriangle className="w-2.5 h-2.5 inline mr-0.5" />{item.severity}
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="text-[14px] font-semibold text-[var(--ink)] leading-snug mb-1.5" style={{ fontFamily: 'var(--font-serif)' }}>
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-[var(--ink-3)] leading-relaxed mb-3 line-clamp-2">{item.excerpt}</p>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        {item.author && <span className="text-[10px] text-[var(--ink-3)]">{item.author}</span>}
                        <span className="flex items-center gap-0.5 text-[9px] text-[var(--ink-3)]">
                          <Clock className="w-2.5 h-2.5" />{item.timestamp}
                        </span>
                        {item.region && (
                          <span className="flex items-center gap-0.5 text-[9px] text-[var(--ink-3)]">
                            <Globe className="w-2.5 h-2.5" />{item.region}
                          </span>
                        )}
                        {item.views != null && (
                          <span className="flex items-center gap-0.5 text-[9px] text-[var(--ink-3)]">
                            <Eye className="w-2.5 h-2.5" />{item.views.toLocaleString()}
                          </span>
                        )}
                      </div>
                      {item.hasPDF && item.pdfUrl && (
                        <button
                          onClick={() => openPdf(item.pdfUrl!, item.title)}
                          className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 border border-[var(--rule-gold)] text-[var(--gold)] bg-[var(--gold-dim)] hover:bg-[var(--gold)]/20 transition-colors shrink-0"
                        >
                          <FileText className="w-3 h-3" />Ver PDF
                        </button>
                      )}
                    </div>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-[8px] tracking-[0.08em] uppercase px-1.5 py-0.5 bg-[var(--void-3)] text-[var(--ink-3)] border border-[var(--rule)]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.article>
                ))}
              </motion.div>
            )}

            {/* ARCHIVE TAB */}
            {activeTab === 'archive' && (
              <motion.div key="archive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6">
                <div className="mb-4">
                  <h2 className="text-[13px] font-bold text-[var(--ink)] mb-0.5" style={{ fontFamily: 'var(--font-serif)' }}>
                    Archivo de Documentos
                  </h2>
                  <p className="text-[10px] text-[var(--ink-3)]">PDFs, informes LaTeX y datasets publicados por {publisher.shortName}</p>
                </div>
                {pdfArchive.length === 0 ? (
                  <div className="text-center py-16 text-[var(--ink-3)] text-[12px] border border-dashed border-[var(--rule)]">
                    No hay documentos archivados todavía
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {pdfArchive.map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="border border-[var(--rule)] hover:border-[var(--rule-gold)] transition-colors bg-[var(--void-2)] p-4 flex items-start gap-3"
                      >
                        <div className="w-8 h-8 bg-[var(--gold-dim)] border border-[var(--rule-gold)] flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4 text-[var(--gold)]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[12px] font-semibold text-[var(--ink)] truncate">{item.title}</div>
                          <div className="text-[9px] text-[var(--ink-3)] mt-0.5">{item.timestamp}</div>
                          <div className="flex items-center gap-2 mt-2">
                            <ContentTypePill type={item.type} />
                            {item.pdfUrl && (
                              <button
                                onClick={() => openPdf(item.pdfUrl!, item.title)}
                                className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--gold)] hover:underline"
                              >
                                Ver PDF
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* LIVE TAB */}
            {activeTab === 'live' && (
              <motion.div key="live" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6">
                <div className="mb-4">
                  <h2 className="text-[13px] font-bold text-[var(--ink)] mb-0.5" style={{ fontFamily: 'var(--font-serif)' }}>
                    Transmisiones
                  </h2>
                  <p className="text-[10px] text-[var(--ink-3)]">Streams en vivo y programación de {publisher.name}</p>
                </div>
                {(!publisher.liveStreams || publisher.liveStreams.length === 0) ? (
                  <div className="text-center py-16 text-[var(--ink-3)] text-[12px] border border-dashed border-[var(--rule)]">
                    No hay transmisiones programadas
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {publisher.liveStreams.map((stream, i) => (
                      <motion.div
                        key={stream.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className={cn(
                          'border bg-[var(--void-2)] p-4',
                          stream.isLive ? 'border-[var(--crimson)]/40' : 'border-[var(--rule)]'
                        )}
                      >
                        {/* Live indicator */}
                        <div className="flex items-center gap-2 mb-3">
                          {stream.isLive ? (
                            <div className="flex items-center gap-1.5">
                              <motion.div
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ repeat: Infinity, duration: 1.2 }}
                                className="w-2 h-2 bg-[var(--crimson-bright)]"
                              />
                              <span className="text-[8px] font-bold tracking-[0.15em] uppercase text-[var(--crimson-bright)]">
                                En Vivo
                              </span>
                              {stream.viewers && (
                                <span className="text-[8px] text-[var(--ink-3)]">
                                  · {stream.viewers.toLocaleString()} espectadores
                                </span>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-[var(--ink-3)]">
                              <Clock className="w-2.5 h-2.5" />
                              <span className="text-[8px] font-bold tracking-[0.1em] uppercase">
                                Programado {stream.scheduledAt}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Preview area */}
                        <div className={cn(
                          'w-full h-32 flex items-center justify-center mb-3 relative overflow-hidden',
                          stream.isLive ? 'bg-[var(--crimson-dim)] border border-[var(--crimson)]/20' : 'bg-[var(--void-3)]'
                        )}>
                          {stream.isLive ? (
                            <>
                              <motion.div
                                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute inset-0 bg-[var(--crimson)]/10"
                              />
                              <Wifi className="w-8 h-8 text-[var(--crimson-bright)]" />
                            </>
                          ) : (
                            <PlayCircle className="w-8 h-8 text-[var(--ink-3)]" />
                          )}
                        </div>

                        <div className="text-[12px] font-semibold text-[var(--ink)] mb-1">{stream.title}</div>
                        <div className="text-[10px] text-[var(--ink-3)]">{stream.description}</div>

                        {stream.isLive && (
                          <button className="mt-3 w-full flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-[0.12em] py-2 bg-[var(--crimson-dim)] border border-[var(--crimson)]/30 text-[var(--crimson-bright)] hover:bg-[var(--crimson)]/20 transition-colors">
                            <Radio className="w-3 h-3" />
                            Ver transmisión
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* ABOUT TAB */}
            {activeTab === 'about' && (
              <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 max-w-2xl">
                <div className="space-y-6">
                  {/* Identity */}
                  <section>
                    <h2 className="text-[11px] font-bold tracking-[0.15em] uppercase text-[var(--gold)] mb-3 pb-2 border-b border-[var(--rule)]">
                      Identidad Institucional
                    </h2>
                    <dl className="grid grid-cols-2 gap-x-8 gap-y-3">
                      {[
                        ['Nombre completo', publisher.name],
                        ['Nombre corto', publisher.shortName],
                        ['País', publisher.country + ' ' + publisher.flag],
                        ['Categoría', categoryLabel[publisher.category]],
                        ['Ciudad sede', publisher.headquartersCity],
                        ['Fundado', publisher.founded],
                        ['Miembro desde', publisher.joinedAt],
                        ['Web', publisher.website],
                      ].filter(([, v]) => v).map(([label, value]) => (
                        <div key={label as string}>
                          <dt className="text-[9px] tracking-[0.1em] text-[var(--ink-3)] uppercase mb-0.5">{label}</dt>
                          <dd className="text-[12px] text-[var(--ink)]">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </section>

                  {/* Description */}
                  <section>
                    <h2 className="text-[11px] font-bold tracking-[0.15em] uppercase text-[var(--gold)] mb-3 pb-2 border-b border-[var(--rule)]">
                      Descripción
                    </h2>
                    <p className="text-[12px] text-[var(--ink-2)] leading-relaxed">{publisher.description}</p>
                  </section>

                  {/* Specialties */}
                  {publisher.specialties && publisher.specialties.length > 0 && (
                    <section>
                      <h2 className="text-[11px] font-bold tracking-[0.15em] uppercase text-[var(--gold)] mb-3 pb-2 border-b border-[var(--rule)]">
                        Especialidades
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {publisher.specialties.map(s => (
                          <span key={s} className="text-[10px] font-medium text-[var(--ink-2)] px-2.5 py-1 border border-[var(--rule)] bg-[var(--void-3)]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Allowed types */}
                  <section>
                    <h2 className="text-[11px] font-bold tracking-[0.15em] uppercase text-[var(--gold)] mb-3 pb-2 border-b border-[var(--rule)]">
                      Tipos de contenido autorizados
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {publisher.allowedTypes.map(t => <ContentTypePill key={t} type={t} />)}
                    </div>
                    <p className="text-[10px] text-[var(--ink-3)] mt-3">
                      Los tipos de contenido están definidos por el grafo de confianza CHRONIQ y el nivel de verificación institucional.
                      Solo publishers activos pueden publicar.
                    </p>
                  </section>

                  {/* Access control note */}
                  <section className="bg-[var(--void-3)] border border-[var(--rule)] p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-4 h-4 text-[var(--gold)]" />
                      <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--gold)]">Control de Acceso — CHRONIQ Graph</span>
                    </div>
                    <p className="text-[10px] text-[var(--ink-3)] leading-relaxed">
                      El acceso a CHRONIQ está regulado mediante teoría de grafos. Solo los nodos con verificación institucional o verificación de agencia acreditada pueden publicar contenido.
                      Los civiles y entidades sin acreditación no tienen acceso a herramientas de publicación.
                      Esto garantiza la integridad editorial y elimina la desinformación, el amarillismo y el contenido no verificado.
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <div>
                        <div className="text-[8px] text-[var(--ink-3)] mb-0.5">Nodo en grafo</div>
                        <div className="text-[10px] font-mono text-[var(--ink-2)]">{publisher.nodeId ?? 'Sin nodo asignado'}</div>
                      </div>
                      <div>
                        <div className="text-[8px] text-[var(--ink-3)] mb-0.5">Nivel de verificación</div>
                        <div className="text-[10px] font-mono text-[var(--gold)]">{publisher.verificationLevel.toUpperCase()}</div>
                      </div>
                    </div>
                  </section>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showPublish && (
          <PublishModal
            publisherId={publisher.id}
            publisherName={publisher.name}
            allowedTypes={publisher.allowedTypes}
            onClose={() => setShowPublish(false)}
          />
        )}
      </AnimatePresence>
    </AppShell>
  );
}
`;

writeFileSync('src/app/publishers/[id]/page.tsx', profilePage, 'utf8');
console.log('publisher [id] page:', profilePage.length, 'chars');
