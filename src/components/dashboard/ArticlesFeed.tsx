'use client';
import { motion } from 'framer-motion';
import { GlowCard } from '@/components/ui/GlowCard';
import { mockArticles } from '@/data/mockData';
import { timeAgo, cn } from '@/lib/utils';
import { Newspaper, Clock, Eye, Bot } from 'lucide-react';
import Link from 'next/link';

const categoryColors: Record<string, string> = {
  geopolitics: 'text-[var(--crimson-bright)] border-[var(--crimson)]/30 bg-[var(--crimson-dim)]',
  economy: 'text-[var(--positive)] border-[var(--positive)]/30 bg-[var(--positive)]/10',
  technology: 'text-[var(--gold)] border-[var(--gold)]/30 bg-[var(--gold-dim)]',
  science: 'text-sky-400 border-sky-700/30 bg-sky-900/20',
  security: 'text-orange-400 border-orange-700/30 bg-orange-950/30',
  climate: 'text-teal-400 border-teal-700/30 bg-teal-900/20',
  intelligence: 'text-[var(--gold)] border-[var(--gold)]/30 bg-[var(--gold-dim)]',
  markets: 'text-[var(--positive)] border-[var(--positive)]/30 bg-[var(--positive)]/10',
};

export function ArticlesFeed() {
  return (
    <GlowCard className="flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--rule)]">
        <div className="flex items-center gap-2">
          <Newspaper className="w-3.5 h-3.5 text-[var(--gold)]" />
          <span className="text-[12px] font-semibold text-[var(--ink)] tracking-wide">Latest Reports</span>
        </div>
        <Link href="/articles" className="text-[10px] text-[var(--gold)] hover:text-[var(--gold-bright)] tracking-[0.1em] transition-colors">
          All reports →
        </Link>
      </div>
      <div className="divide-y divide-[var(--rule)]">
        {mockArticles.map((article, i) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Link href={`/articles/${article.slug}`}>
              <div className="px-4 py-3 hover:bg-[var(--void-3)] transition-colors cursor-pointer group">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={cn(
                    'text-[9px] font-bold px-1.5 py-0.5 border uppercase tracking-[0.12em]',
                    categoryColors[article.category] || 'text-[var(--ink-3)] border-[var(--rule)] bg-[var(--void-3)]'
                  )}>
                    {article.category}
                  </span>
                  {article.aiGenerated && (
                    <span className="flex items-center gap-0.5 text-[9px] text-[var(--gold)] font-mono">
                      <Bot className="w-2.5 h-2.5" />AI
                    </span>
                  )}
                </div>
                <h3 className="text-[12px] font-semibold text-[var(--ink-2)] mb-1 group-hover:text-[var(--ink)] transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-[var(--ink-3)]">{article.author.name}</span>
                  <span className="flex items-center gap-1 text-[10px] text-[var(--ink-3)] font-mono">
                    <Clock className="w-2.5 h-2.5" />{article.readTime}m
                  </span>
                  <span className="text-[10px] text-[var(--ink-3)] ml-auto font-mono">{timeAgo(article.publishedAt)}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </GlowCard>
  );
}
