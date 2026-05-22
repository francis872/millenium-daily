'use client';
import { AppShell } from '@/components/layout/AppShell';
import { mockArticles } from '@/data/mockData';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn, timeAgo } from '@/lib/utils';
import { Clock, Eye, Bot, ChevronLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

const categoryColors: Record<string, string> = {
  geopolitics: 'text-red-400 border-red-500/30 bg-red-500/10',
  economy: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  technology: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
  science: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
  security: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
  climate: 'text-teal-400 border-teal-500/30 bg-teal-500/10',
  intelligence: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
  markets: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
};

function renderContent(text: string) {
  // Very basic markdown-to-JSX renderer
  return text.split('\n').map((line, i) => {
    if (line.startsWith('## ')) {
      return <h2 key={i} className="text-lg font-bold text-white mt-6 mb-3 border-b border-slate-800/60 pb-2">{line.slice(3)}</h2>;
    }
    if (line.startsWith('# ')) {
      return <h1 key={i} className="text-2xl font-bold text-white mt-2 mb-4">{line.slice(2)}</h1>;
    }
    if (line.startsWith('$$') && line.endsWith('$$')) {
      return (
        <div key={i} className="my-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/40 font-mono text-sm text-cyan-300 text-center overflow-x-auto">
          {line.slice(2, -2)}
        </div>
      );
    }
    if (line.startsWith('- ')) {
      return <li key={i} className="text-slate-300 ml-4 mb-1 list-disc">{line.slice(2)}</li>;
    }
    if (line.startsWith('---')) {
      return <hr key={i} className="border-slate-800/60 my-4" />;
    }
    if (line === '') return <br key={i} />;
    // Bold and inline code
    const parts = line.split(/(\*\*[^*]+\*\*|`[^`]+`|\$[^$]+\$)/g);
    return (
      <p key={i} className="text-slate-300 text-sm leading-relaxed mb-1">
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith('`') && part.endsWith('`')) {
            return <code key={j} className="px-1.5 py-0.5 rounded bg-slate-700/60 text-cyan-300 font-mono text-xs">{part.slice(1, -1)}</code>;
          }
          if (part.startsWith('$') && part.endsWith('$')) {
            return <code key={j} className="px-1.5 py-0.5 rounded bg-purple-900/40 text-purple-300 font-mono text-xs">{part.slice(1, -1)}</code>;
          }
          return part;
        })}
      </p>
    );
  });
}

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const article = mockArticles.find(a => a.slug === slug);
  if (!article) notFound();

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Back */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link href="/articles" className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors mb-6">
            <ChevronLeft className="w-3.5 h-3.5" />
            All Reports
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className={cn(
              'text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wide',
              categoryColors[article.category] || 'text-slate-400 bg-slate-500/10 border-slate-500/20'
            )}>
              {article.category}
            </span>
            <span className={cn(
              'text-[10px] px-2 py-0.5 rounded border capitalize',
              article.type === 'investigation' ? 'text-orange-400 border-orange-500/20 bg-orange-500/10' :
              article.type === 'scientific' ? 'text-blue-400 border-blue-500/20 bg-blue-500/10' :
              'text-slate-400 border-slate-600/30 bg-slate-700/20'
            )}>
              {article.type}
            </span>
            {article.aiGenerated && (
              <span className="flex items-center gap-1 text-[10px] text-purple-400 px-2 py-0.5 rounded border border-purple-500/20 bg-purple-500/10">
                <Bot className="w-2.5 h-2.5" /> AI-Assisted
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold text-white leading-tight mb-3">{article.title}</h1>
          {article.subtitle && (
            <p className="text-lg text-slate-400 mb-4 leading-relaxed">{article.subtitle}</p>
          )}

          <div className="flex items-center gap-4 flex-wrap py-3 border-y border-slate-800/40">
            <div className="flex items-center gap-2">
              <div className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold',
                article.author.isAI ? 'bg-purple-500/20 text-purple-400' : 'bg-cyan-500/20 text-cyan-400'
              )}>
                {article.author.isAI ? 'AI' : article.author.name[0]}
              </div>
              <div>
                <div className="text-xs font-medium text-slate-300">{article.author.name}</div>
                <div className="text-[10px] text-slate-500">{article.author.role}</div>
              </div>
            </div>
            <span className="flex items-center gap-1 text-[11px] text-slate-500">
              <Clock className="w-3 h-3" />{article.readTime} min read
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-500">
              <Eye className="w-3 h-3" />{article.views.toLocaleString()} views
            </span>
            <span className="text-[11px] text-slate-500">{timeAgo(article.publishedAt)}</span>
            {article.confidenceScore && (
              <div className="ml-auto flex items-center gap-2">
                <span className="text-[10px] text-slate-500">Confidence</span>
                <span className="text-[11px] font-bold font-mono text-emerald-400">{Math.round(article.confidenceScore * 100)}%</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Article Body */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="prose-container space-y-1"
        >
          {renderContent(article.content)}
        </motion.div>

        {/* Sources */}
        {article.sources.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 p-4 rounded-xl border border-slate-800/60 bg-slate-900/40"
          >
            <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-3">Sources</div>
            <div className="space-y-2">
              {article.sources.map((source) => (
                <div key={source.id} className="flex items-center gap-3 text-xs">
                  <span className={cn(
                    'px-1.5 py-0.5 rounded border text-[10px] font-bold',
                    source.type === 'primary' ? 'text-cyan-400 border-cyan-500/20 bg-cyan-500/10' : 'text-slate-400 border-slate-600/30'
                  )}>
                    {source.type.toUpperCase()}
                  </span>
                  <span className="text-slate-300">{source.title}</span>
                  <span className="text-[10px] text-slate-500 ml-auto">{Math.round(source.reliability * 100)}% reliable</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tags */}
        <div className="mt-4 flex gap-2 flex-wrap">
          {article.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-full bg-slate-800/50 border border-slate-700/40 text-[11px] text-slate-400">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
