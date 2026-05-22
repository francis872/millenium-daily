'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, X, Send, Loader2, Sparkles, AlertTriangle, BarChart2, BookOpen } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { GlowCard } from '@/components/ui/GlowCard';
import { mockAIInsights } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const QUICK_ACTIONS = [
  { icon: AlertTriangle, label: 'Detect misinformation', prompt: 'Analyze current news for potential misinformation or narrative manipulation.' },
  { icon: BarChart2, label: 'Market analysis', prompt: 'Generate a brief market intelligence briefing for current conditions.' },
  { icon: Sparkles, label: 'Draft article', prompt: 'Draft an investigative article lead on the most critical current event.' },
  { icon: BookOpen, label: 'Briefing', prompt: 'Generate today\'s executive intelligence briefing.' },
];

const mockResponses = [
  'Based on analysis of 14,200+ sources, I\'ve identified **3 coordinated narrative shifts** in the past 24 hours. The most significant involves synchronized framing changes across 23 outlets regarding the EU energy situation. Pattern confidence: 89%.',
  'Current market intelligence signals **elevated systemic risk**. The correlation between unscheduled Fed activity and bond volatility spikes has historically preceded significant market corrections (correlation: 0.74 over 15 historical instances).',
  '**INVESTIGATIVE LEAD**: Satellite imagery analysis suggests undisclosed military infrastructure development at coordinates consistent with previously-reported activity. Cross-referenced with 6 OSINT sources. Recommend further investigation.',
  'Today\'s executive briefing identifies **3 critical-level vectors**: (1) EU cyber infrastructure anomalies, (2) SCS naval positioning, (3) Federal Reserve unscheduled convening. Probability of interconnection: 31%. Recommended monitoring: 4h intervals.',
];

export function AIResearchPanel() {
  const { toggleAIPanel } = useStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: 'ARIA online. I\'m your AI intelligence analyst. I can detect misinformation, analyze geopolitical patterns, draft investigative leads, generate briefings, and process intelligence signals. How can I assist?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  }

  return (
    <div className="w-[360px] h-full flex flex-col bg-[var(--void-2)]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--rule)]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[var(--gold-dim)] border border-[var(--rule-gold)] flex items-center justify-center">
            <Brain className="w-3.5 h-3.5 text-[var(--gold)]" />
          </div>
          <div>
            <div className="text-[12px] font-bold text-[var(--ink)] tracking-wider">ARIA</div>
            <div className="text-[9px] text-[var(--gold)] flex items-center gap-1 tracking-[0.15em] font-mono">
              <span className="w-1 h-1 rounded-full bg-[var(--gold)] pulse-dot" />
              INTELLIGENCE ANALYST
            </div>
          </div>
        </div>
        <button aria-label="Close ARIA panel" onClick={toggleAIPanel} className="text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Live Insights */}
      <div className="px-3 py-2 border-b border-[var(--rule)]">
        <div className="label-caps mb-2">Live Insights</div>
        <div className="space-y-1.5">
          {mockAIInsights.slice(0, 2).map((insight) => (
            <div key={insight.id} className="flex gap-2 p-2 bg-[var(--void-3)] border border-[var(--rule)]">
              <span className={cn(
                'text-[10px] mt-0.5',
                insight.type === 'anomaly' ? 'text-[var(--crimson-bright)]' :
                insight.type === 'prediction' ? 'text-[var(--gold)]' : 'text-[var(--ink-3)]'
              )}>
                {insight.type === 'anomaly' ? '⚠' : insight.type === 'prediction' ? '◈' : '●'}
              </span>
              <div>
                <div className="text-[10px] font-semibold text-[var(--ink)] leading-tight">{insight.title}</div>
                <div className="text-[10px] text-[var(--ink-3)] mt-0.5 line-clamp-2">{insight.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-3 py-2 border-b border-[var(--rule)]">
        <div className="label-caps mb-2">Quick Actions</div>
        <div className="grid grid-cols-2 gap-1">
          {QUICK_ACTIONS.map(({ icon: Icon, label, prompt }) => (
            <button
              key={label}
              onClick={() => sendMessage(prompt)}
              className="flex items-center gap-1.5 px-2 py-1.5 bg-[var(--void-3)] border border-[var(--rule)] text-[var(--ink-3)] hover:text-[var(--gold)] hover:border-[var(--rule-gold)] transition-all text-[10px] font-medium"
            >
              <Icon className="w-3 h-3 shrink-0" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn('flex gap-2', msg.role === 'user' ? 'flex-row-reverse' : '')}
            >
              {msg.role === 'assistant' && (
                <div className="w-5 h-5 bg-[var(--gold-dim)] border border-[var(--rule-gold)] flex items-center justify-center shrink-0 mt-0.5">
                  <Brain className="w-2.5 h-2.5 text-[var(--gold)]" />
                </div>
              )}
              <div className={cn(
                'max-w-[85%] px-3 py-2 text-[11px] leading-relaxed',
                msg.role === 'assistant'
                  ? 'bg-[var(--void-3)] border border-[var(--rule)] text-[var(--ink-2)]'
                  : 'bg-[var(--gold-dim)] border border-[var(--rule-gold)] text-[var(--ink)]'
              )}>
                {msg.content.split('**').map((part, i) =>
                  i % 2 === 1 ? <strong key={i} className="text-[var(--ink)] font-semibold">{part}</strong> : part
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
            <div className="w-5 h-5 bg-[var(--gold-dim)] border border-[var(--rule-gold)] flex items-center justify-center shrink-0">
              <Brain className="w-2.5 h-2.5 text-[var(--gold)]" />
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 bg-[var(--void-3)] border border-[var(--rule)]">
              <Loader2 className="w-3 h-3 text-[var(--gold)] animate-spin" />
              <span className="text-[11px] text-[var(--ink-3)]">Analyzing intelligence…</span>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-[var(--rule)]">
        <div className="flex gap-2 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
            }}
            placeholder="Ask ARIA anything..."
            rows={2}
            className="flex-1 px-3 py-2 bg-[var(--void-3)] border border-[var(--rule)] text-[var(--ink)] placeholder-[var(--ink-3)] text-[11px] resize-none focus:outline-none focus:border-[var(--rule-gold)] transition-colors font-mono"
          />
          <button
            aria-label="Send message"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="p-2 bg-[var(--gold-dim)] border border-[var(--rule-gold)] text-[var(--gold)] hover:bg-[var(--gold)]/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
