'use client';
import { AppShell } from '@/components/layout/AppShell';
import { motion } from 'framer-motion';
import { Brain, Search, Upload, FileText, Globe, Database, Sparkles, Loader2, Check } from 'lucide-react';
import { useState } from 'react';
import { GlowCard } from '@/components/ui/GlowCard';
import { cn } from '@/lib/utils';

const CAPABILITIES = [
  { icon: FileText, label: 'Summarize Documents', color: 'cyan', description: 'Upload or paste any document for AI-powered summarization' },
  { icon: Search, label: 'Fact Check', color: 'green', description: 'Verify claims against known sources and flag inconsistencies' },
  { icon: Globe, label: 'OSINT Analysis', color: 'purple', description: 'Cross-reference public intelligence sources and satellite data' },
  { icon: Database, label: 'Dataset Analysis', color: 'yellow', description: 'Upload CSV/JSON datasets for AI-powered pattern detection' },
  { icon: Sparkles, label: 'Draft Article', color: 'red', description: 'Generate complete article drafts from research notes' },
  { icon: Brain, label: 'Narrative Detection', color: 'orange', description: 'Identify narrative patterns and potential manipulation' },
];

const SAMPLE_RESULTS = [
  {
    id: 1,
    type: 'Summary',
    content: 'Document analysis complete. Key findings: The provided text discusses geopolitical dynamics across 3 regions with 14 unique data points. Primary thesis: structural realignment of global supply chains accelerating due to dual-use technology restrictions. Confidence: 94%.',
    badge: 'SUMMARY',
    badgeColor: 'cyan',
  },
  {
    id: 2,
    type: 'Entities',
    content: 'Identified entities: 12 nation-states, 8 institutions, 4 technology corporations, 2 multilateral organizations. Primary actors: United States, China, European Commission, TSMC, ASML. Geographic focus: Asia-Pacific, Atlantic corridor.',
    badge: 'NER',
    badgeColor: 'purple',
  },
  {
    id: 3,
    type: 'Sentiment',
    content: 'Sentiment analysis: 42% neutral, 31% negative (concern/threat framing), 27% positive (opportunity framing). Emotional valence trending toward anxiety (↑18% vs baseline). Possible agenda: constructing urgency narrative.',
    badge: 'SENTIMENT',
    badgeColor: 'orange',
  },
  {
    id: 4,
    type: 'Citations',
    content: 'Recommended citations: (1) RAND Corp: Technology Competition 2025, (2) IMF WEO April 2026, (3) NATO Strategic Concept, (4) BIS Annual Economic Report 2025, (5) SIPRI Arms Transfers Database.',
    badge: 'CITATIONS',
    badgeColor: 'green',
  },
];

const badgeColors: Record<string, string> = {
  cyan: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
  purple: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
  orange: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
  green: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
};

export default function ResearchPage() {
  const [text, setText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<typeof SAMPLE_RESULTS>([]);
  const [activeCapability, setActiveCapability] = useState<string | null>(null);

  async function analyze() {
    if (!text.trim()) return;
    setAnalyzing(true);
    setResults([]);
    await new Promise(r => setTimeout(r, 2000));
    setResults(SAMPLE_RESULTS);
    setAnalyzing(false);
  }

  return (
    <AppShell>
      <div className="p-4 space-y-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-0.5">
            <Brain className="w-5 h-5 text-purple-400" />
            <h1 className="text-xl font-bold text-white">AI Research Assistant</h1>
            <span className="text-[10px] font-bold tracking-widest text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">ARIA v2</span>
          </div>
          <p className="text-xs text-slate-400">Intelligent document analysis · OSINT synthesis · Narrative detection · Citation generation</p>
        </motion.div>

        {/* Capabilities grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.button
                key={cap.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setActiveCapability(cap.label === activeCapability ? null : cap.label)}
                className={cn(
                  'p-3 rounded-xl border text-left transition-all',
                  activeCapability === cap.label
                    ? `border-${cap.color}-500/40 bg-${cap.color}-500/10`
                    : 'border-slate-800/60 bg-slate-900/40 hover:border-slate-700/60 hover:bg-slate-800/30'
                )}
              >
                <Icon className={cn('w-4 h-4 mb-1.5', `text-${cap.color}-400`)} />
                <div className="text-xs font-semibold text-slate-200">{cap.label}</div>
                <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{cap.description}</div>
              </motion.button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Input panel */}
          <GlowCard glow="purple" className="flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/60">
              <span className="text-sm font-bold text-white">Research Input</span>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 px-2 py-1 rounded text-[11px] border border-slate-700/40 text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all">
                  <Upload className="w-3 h-3" />Upload
                </button>
              </div>
            </div>
            <div className="flex-1 flex flex-col p-3 gap-3">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste article text, intelligence report, dataset description, or research notes here for AI analysis...

Example: Paste any news article to get automatic fact-checking, sentiment analysis, entity recognition, and citation suggestions."
                className="flex-1 min-h-[280px] bg-slate-800/40 border border-slate-700/30 rounded-lg p-3 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-purple-500/40 resize-none font-mono leading-relaxed"
              />
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">
                  {text.split(/\s+/).filter(Boolean).length} words
                </span>
                <button
                  onClick={analyze}
                  disabled={!text.trim() || analyzing}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm font-medium"
                >
                  {analyzing ? (
                    <><Loader2 className="w-4 h-4 animate-spin" />Analyzing...</>
                  ) : (
                    <><Brain className="w-4 h-4" />Run Analysis</>
                  )}
                </button>
              </div>
            </div>
          </GlowCard>

          {/* Results panel */}
          <GlowCard glow="cyan" className="flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/60">
              <span className="text-sm font-bold text-white">Analysis Results</span>
              {results.length > 0 && (
                <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                  <Check className="w-3 h-3" />{results.length} modules complete
                </span>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {analyzing && (
                <div className="flex flex-col gap-3">
                  {['Running NLP pipeline...', 'Extracting entities...', 'Sentiment analysis...', 'Generating citations...'].map((step, i) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.3 }}
                      className="flex items-center gap-2 text-xs text-slate-400"
                    >
                      <Loader2 className="w-3 h-3 text-purple-400 animate-spin" />
                      {step}
                    </motion.div>
                  ))}
                </div>
              )}
              {results.map((result, i) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/30"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={cn(
                      'text-[10px] font-bold px-1.5 py-0.5 rounded border',
                      badgeColors[result.badgeColor] || 'text-slate-400 border-slate-600/30'
                    )}>
                      {result.badge}
                    </span>
                    <Check className="w-3 h-3 text-emerald-400 ml-auto" />
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{result.content}</p>
                </motion.div>
              ))}
              {!analyzing && results.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full gap-3 py-12 text-center">
                  <Brain className="w-8 h-8 text-slate-600" />
                  <div className="text-sm text-slate-500">Paste text in the input panel and run analysis to see results here.</div>
                </div>
              )}
            </div>
          </GlowCard>
        </div>
      </div>
    </AppShell>
  );
}
