import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const code = `'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppShell } from '@/components/layout/AppShell';
import { useStore } from '@/store/useStore';
import type { PublisherCategory } from '@/types';
import {
  Building2, Globe, FileText, Shield, CheckCircle2,
  ChevronRight, AlertTriangle, Newspaper, FlaskConical,
  Radio, Users, Lock, Send, ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';

const CATEGORIES: { value: PublisherCategory; label: string; desc: string; icon: any }[] = [
  { value: 'news_agency',       label: 'Agencia de Noticias',    desc: 'Agencias internacionales y nacionales de distribución noticiosa',   icon: Newspaper },
  { value: 'newspaper',         label: 'Periódico / Diario',     desc: 'Medios impresos y digitales con cobertura editorial',               icon: FileText },
  { value: 'broadcast',         label: 'Televisión / Radio',     desc: 'Medios audiovisuales de transmisión masiva',                       icon: Radio },
  { value: 'research_institute',label: 'Instituto de Investigación', desc: 'Centros académicos, think tanks y laboratorios',               icon: FlaskConical },
  { value: 'government',        label: 'Organismo Gubernamental', desc: 'Instituciones estatales, ministerios y entidades oficiales',       icon: Shield },
  { value: 'ngo',               label: 'ONG / Organización Civil', desc: 'Organizaciones no gubernamentales con rigor informativo verificado', icon: Users },
  { value: 'intelligence_firm', label: 'Firma de Inteligencia',   desc: 'Empresas especializadas en análisis geopolítico y de riesgos',     icon: Globe },
  { value: 'academic',          label: 'Institución Académica',   desc: 'Universidades y centros de educación superior con publicaciones',  icon: Building2 },
];

const STEPS = ['Tipo de organización', 'Información institucional', 'Acceso y verificación', 'Revisión'];

type Step = 0 | 1 | 2 | 3;

export default function JoinPage() {
  const { addPublisher } = useStore();
  const [step, setStep] = useState<Step>(0);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [category, setCategory] = useState<PublisherCategory | ''>('');
  const [form, setForm] = useState({
    name: '',
    shortName: '',
    country: '',
    flag: '',
    description: '',
    website: '',
    founded: '',
    headquartersCity: '',
    contactEmail: '',
    contactName: '',
    motivation: '',
  });

  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }));

  const canNext = () => {
    if (step === 0) return category !== '';
    if (step === 1) return form.name.length > 2 && form.country.length > 1 && form.description.length > 20;
    if (step === 2) return form.contactEmail.includes('@') && form.contactName.length > 2;
    return true;
  };

  const handleSubmit = () => {
    if (!category) return;
    addPublisher({
      id: 'pub-' + Date.now(),
      name: form.name,
      shortName: form.shortName || form.name.slice(0, 6).toUpperCase(),
      country: form.country,
      flag: form.flag || '🌐',
      category: category as PublisherCategory,
      trustScore: 0,
      verificationLevel: 'unverified',
      status: 'pending',
      description: form.description,
      publishedCount: 0,
      joinedAt: '2026-05-21',
      allowedTypes: [],
      followers: 0,
      website: form.website,
      founded: form.founded,
      headquartersCity: form.headquartersCity,
      specialties: [],
      liveStreams: [],
    });
    setSubmitted(true);
  };

  const SelectedCategory = category ? CATEGORIES.find(c => c.value === category) : null;

  if (submitted) {
    return (
      <AppShell>
        <div className="min-h-screen flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg w-full text-center space-y-6"
          >
            <div className="flex justify-center">
              <div className="w-16 h-16 border-2 border-[var(--gold)] flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-[var(--gold)]" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--ink)] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                Solicitud enviada
              </h1>
              <p className="text-sm text-[var(--ink-3)] leading-relaxed">
                Tu organización ha sido registrada con estado <span className="text-[var(--gold)]">pendiente de verificación</span>. El equipo de CHRONIQ revisará la solicitud y validará la identidad institucional antes de activar el acceso.
              </p>
            </div>
            <div className="border border-[var(--rule)] bg-[var(--void-2)] p-4 text-left space-y-2">
              <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--ink-3)] font-bold mb-3">Resumen</div>
              <div className="text-sm text-[var(--ink)]">{form.name}</div>
              <div className="text-xs text-[var(--ink-3)]">{SelectedCategory?.label} · {form.country}</div>
              <div className="text-xs text-[var(--ink-3)]">{form.contactEmail}</div>
            </div>
            <div className="border border-[var(--rule)] bg-[var(--void-3)] p-4">
              <div className="flex items-start gap-3">
                <Lock className="w-4 h-4 text-[var(--ink-3)] mt-0.5 shrink-0" />
                <p className="text-[11px] text-[var(--ink-3)] leading-relaxed text-left">
                  CHRONIQ es una plataforma institucional. El acceso para publicar está restringido exclusivamente a medios de comunicación, agencias, organismos de investigación e instituciones verificadas. No se otorga acceso a individuos privados.
                </p>
              </div>
            </div>
            <Link
              href="/publishers"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.1em] uppercase text-[var(--gold)] border border-[var(--rule-gold)] px-4 py-2 hover:bg-[var(--gold-dim)] transition-colors"
            >
              <Building2 className="w-3.5 h-3.5" />
              Ver directorio de publishers
            </Link>
          </motion.div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <Link href="/publishers" className="inline-flex items-center gap-1.5 text-[11px] text-[var(--ink-3)] hover:text-[var(--ink)] mb-5 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver al directorio
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 border border-[var(--gold)]/40 flex items-center justify-center shrink-0 mt-1">
              <Building2 className="w-5 h-5 text-[var(--gold)]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--ink)]" style={{ fontFamily: 'var(--font-serif)' }}>
                Registro institucional
              </h1>
              <p className="text-xs text-[var(--ink-3)] mt-1 leading-relaxed">
                Solicita acceso para tu organización como publisher en la red CHRONIQ. Solo medios, agencias, prensa e instituciones verificadas.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Access warning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="border border-[var(--rule)] bg-[var(--void-3)] p-4 flex items-start gap-3"
        >
          <AlertTriangle className="w-4 h-4 text-[var(--gold-bright)] shrink-0 mt-0.5" />
          <div>
            <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-[var(--gold-bright)] mb-1">Plataforma institucional</div>
            <p className="text-[11px] text-[var(--ink-3)] leading-relaxed">
              CHRONIQ opera bajo un sistema de control de acceso basado en teoría de grafos. El acceso para publicar está restringido a instituciones verificadas. Las solicitudes de personas individuales o civiles serán rechazadas automáticamente.
            </p>
          </div>
        </motion.div>

        {/* Step indicator */}
        <div className="flex items-center gap-0">
          {STEPS.map((label, i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div className={[
                  'w-6 h-6 flex items-center justify-center text-[10px] font-bold border transition-colors',
                  i < step ? 'border-[var(--gold)] bg-[var(--gold)] text-[var(--void)]' :
                  i === step ? 'border-[var(--gold)] text-[var(--gold)]' :
                  'border-[var(--rule)] text-[var(--ink-3)]'
                ].join(' ')}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className="text-[9px] text-[var(--ink-3)] whitespace-nowrap hidden sm:block">{label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={['flex-1 h-px mx-2 transition-colors', i < step ? 'bg-[var(--gold)]/40' : 'bg-[var(--rule)]'].join(' ')} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >

            {/* STEP 0: Category */}
            {step === 0 && (
              <div className="space-y-3">
                <div className="text-sm font-semibold text-[var(--ink)] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                  ¿Qué tipo de organización representa?
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CATEGORIES.map(cat => {
                    const Icon = cat.icon;
                    const selected = category === cat.value;
                    return (
                      <button
                        key={cat.value}
                        onClick={() => setCategory(cat.value)}
                        className={[
                          'flex items-start gap-3 p-3 border text-left transition-colors',
                          selected
                            ? 'border-[var(--gold)] bg-[var(--gold-dim)]'
                            : 'border-[var(--rule)] bg-[var(--void-2)] hover:border-[var(--rule-gold)]'
                        ].join(' ')}
                      >
                        <Icon className={['w-4 h-4 mt-0.5 shrink-0', selected ? 'text-[var(--gold)]' : 'text-[var(--ink-3)]'].join(' ')} />
                        <div>
                          <div className={['text-xs font-bold', selected ? 'text-[var(--gold)]' : 'text-[var(--ink)]'].join(' ')}>
                            {cat.label}
                          </div>
                          <div className="text-[10px] text-[var(--ink-3)] mt-0.5 leading-relaxed">{cat.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 1: Institutional info */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="text-sm font-semibold text-[var(--ink)] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                  Información institucional
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--ink-3)] mb-1.5">Nombre completo de la organización *</label>
                    <input
                      value={form.name}
                      onChange={e => set('name', e.target.value)}
                      placeholder="Ej: Reuters News Agency"
                      className="w-full bg-[var(--void-2)] border border-[var(--rule)] px-3 py-2 text-sm text-[var(--ink)] placeholder-[var(--ink-3)] focus:outline-none focus:border-[var(--gold)]/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--ink-3)] mb-1.5">Nombre corto / Sigla</label>
                    <input
                      value={form.shortName}
                      onChange={e => set('shortName', e.target.value)}
                      placeholder="Ej: Reuters"
                      className="w-full bg-[var(--void-2)] border border-[var(--rule)] px-3 py-2 text-sm text-[var(--ink)] placeholder-[var(--ink-3)] focus:outline-none focus:border-[var(--gold)]/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--ink-3)] mb-1.5">País *</label>
                    <input
                      value={form.country}
                      onChange={e => set('country', e.target.value)}
                      placeholder="Ej: United Kingdom"
                      className="w-full bg-[var(--void-2)] border border-[var(--rule)] px-3 py-2 text-sm text-[var(--ink)] placeholder-[var(--ink-3)] focus:outline-none focus:border-[var(--gold)]/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--ink-3)] mb-1.5">Ciudad sede</label>
                    <input
                      value={form.headquartersCity}
                      onChange={e => set('headquartersCity', e.target.value)}
                      placeholder="Ej: London"
                      className="w-full bg-[var(--void-2)] border border-[var(--rule)] px-3 py-2 text-sm text-[var(--ink)] placeholder-[var(--ink-3)] focus:outline-none focus:border-[var(--gold)]/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--ink-3)] mb-1.5">Año de fundación</label>
                    <input
                      value={form.founded}
                      onChange={e => set('founded', e.target.value)}
                      placeholder="Ej: 1851"
                      className="w-full bg-[var(--void-2)] border border-[var(--rule)] px-3 py-2 text-sm text-[var(--ink)] placeholder-[var(--ink-3)] focus:outline-none focus:border-[var(--gold)]/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--ink-3)] mb-1.5">Sitio web</label>
                    <input
                      value={form.website}
                      onChange={e => set('website', e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-[var(--void-2)] border border-[var(--rule)] px-3 py-2 text-sm text-[var(--ink)] placeholder-[var(--ink-3)] focus:outline-none focus:border-[var(--gold)]/60 transition-colors"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--ink-3)] mb-1.5">Descripción institucional *</label>
                    <textarea
                      value={form.description}
                      onChange={e => set('description', e.target.value)}
                      rows={3}
                      placeholder="Describe brevemente la misión, cobertura y enfoque editorial de tu organización..."
                      className="w-full bg-[var(--void-2)] border border-[var(--rule)] px-3 py-2 text-sm text-[var(--ink)] placeholder-[var(--ink-3)] focus:outline-none focus:border-[var(--gold)]/60 transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Contact & verification */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="text-sm font-semibold text-[var(--ink)] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                  Contacto y verificación
                </div>
                <div className="border border-[var(--rule)] bg-[var(--void-3)] p-4 text-[11px] text-[var(--ink-3)] leading-relaxed">
                  CHRONIQ verificará la identidad de la organización contactando directamente a través de los canales oficiales. Proporciona datos de un representante autorizado.
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--ink-3)] mb-1.5">Nombre del representante *</label>
                    <input
                      value={form.contactName}
                      onChange={e => set('contactName', e.target.value)}
                      placeholder="Nombre completo"
                      className="w-full bg-[var(--void-2)] border border-[var(--rule)] px-3 py-2 text-sm text-[var(--ink)] placeholder-[var(--ink-3)] focus:outline-none focus:border-[var(--gold)]/60 transition-colors"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--ink-3)] mb-1.5">Email institucional *</label>
                    <input
                      value={form.contactEmail}
                      onChange={e => set('contactEmail', e.target.value)}
                      placeholder="nombre@organizacion.com"
                      type="email"
                      className="w-full bg-[var(--void-2)] border border-[var(--rule)] px-3 py-2 text-sm text-[var(--ink)] placeholder-[var(--ink-3)] focus:outline-none focus:border-[var(--gold)]/60 transition-colors"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--ink-3)] mb-1.5">¿Por qué quiere unirse a CHRONIQ?</label>
                    <textarea
                      value={form.motivation}
                      onChange={e => set('motivation', e.target.value)}
                      rows={3}
                      placeholder="Describe el interés de tu organización en la plataforma..."
                      className="w-full bg-[var(--void-2)] border border-[var(--rule)] px-3 py-2 text-sm text-[var(--ink)] placeholder-[var(--ink-3)] focus:outline-none focus:border-[var(--gold)]/60 transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Review */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="text-sm font-semibold text-[var(--ink)] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                  Revisión de solicitud
                </div>
                <div className="border border-[var(--rule)] bg-[var(--void-2)] divide-y divide-[var(--rule)]">
                  {[
                    { label: 'Tipo', value: SelectedCategory?.label },
                    { label: 'Organización', value: form.name },
                    { label: 'País', value: form.country },
                    { label: 'Ciudad', value: form.headquartersCity || '—' },
                    { label: 'Fundada', value: form.founded || '—' },
                    { label: 'Web', value: form.website || '—' },
                    { label: 'Representante', value: form.contactName },
                    { label: 'Email', value: form.contactEmail },
                  ].map(row => (
                    <div key={row.label} className="flex items-center px-4 py-2.5">
                      <div className="text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--ink-3)] w-28 shrink-0">{row.label}</div>
                      <div className="text-sm text-[var(--ink)]">{row.value}</div>
                    </div>
                  ))}
                </div>
                <div className="border border-[var(--rule)] bg-[var(--void-3)] p-4">
                  <div className="text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--ink-3)] mb-2">Descripción</div>
                  <p className="text-xs text-[var(--ink)] leading-relaxed">{form.description}</p>
                </div>
                <div className="border border-[var(--rule)] bg-[var(--void-3)] p-4 flex items-start gap-3">
                  <Lock className="w-4 h-4 text-[var(--ink-3)] mt-0.5 shrink-0" />
                  <p className="text-[11px] text-[var(--ink-3)] leading-relaxed">
                    Al enviar esta solicitud confirmas que representas a la organización indicada y que la información proporcionada es verídica. CHRONIQ se reserva el derecho de rechazar o revocar el acceso en cualquier momento.
                  </p>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--rule)]">
          <button
            onClick={() => setStep(s => Math.max(0, s - 1) as Step)}
            disabled={step === 0}
            className="flex items-center gap-1.5 text-xs font-bold tracking-[0.08em] uppercase text-[var(--ink-3)] hover:text-[var(--ink)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Anterior
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep(s => (s + 1) as Step)}
              disabled={!canNext()}
              className="flex items-center gap-1.5 text-xs font-bold tracking-[0.1em] uppercase py-2.5 px-5 border border-[var(--rule-gold)] bg-[var(--gold-dim)] text-[var(--gold)] hover:bg-[var(--gold)]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Siguiente
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-1.5 text-xs font-bold tracking-[0.1em] uppercase py-2.5 px-5 border border-[var(--rule-gold)] bg-[var(--gold-dim)] text-[var(--gold)] hover:bg-[var(--gold)]/20 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              Enviar solicitud
            </button>
          )}
        </div>

      </div>
    </AppShell>
  );
}
`;

mkdirSync(join(__dirname, 'src/app/join'), { recursive: true });
writeFileSync(join(__dirname, 'src/app/join/page.tsx'), code);
console.log('Created src/app/join/page.tsx');
