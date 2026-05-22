'use client';
import { AppShell } from '@/components/layout/AppShell';
import { motion } from 'framer-motion';
import { mockArticles } from '@/data/mockData';
import { timeAgo, cn } from '@/lib/utils';
import { Newspaper, Clock, Eye, Bot, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const categories = ['all', 'geopolitics', 'economy', 'technology', 'science', 'security', 'climate', 'intelligence', 'markets'];
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

export default function ArticlesPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = mockArticles.filter(a =>
    (activeCategory === 'all' || a.category === activeCategory) &&
    (search === '' || a.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AppShell>
      <div className="p-4 space-y-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-0.5">
            <Newspaper className="w-5 h-5 text-slate-400" />
            <h1 className="text-xl font-bold text-white">Intelligence Reports</h1>
          </div>
          <p className="text-xs text-slate-400">Investigative journalism · Scientific analysis · Predictive intelligence</p>
        </motion.div>

        {/* Filters */}
        <div className="flex gap-3 flex-wrap">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reports..."
              className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/40 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 w-60"
            />
          </div>
          <div className="flex gap-1 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-[11px] font-medium capitalize transition-all border',
                  activeCategory === cat
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                    : 'border-slate-700/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link href={`/articles/${article.slug}`}>
                <div className="h-full rounded-xl border border-slate-800/60 bg-slate-900/60 hover:border-slate-700/60 hover:bg-slate-800/40 transition-all p-4 flex flex-col gap-3 cursor-pointer group">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={cn(
                      'text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wide',
                      categoryColors[article.category] || 'text-slate-400 bg-slate-500/10 border-slate-500/20'
                    )}>
                      {article.category}
                    </span>
                    <span className={cn(
                      'text-[10px] px-1.5 py-0.5 rounded border capitalize',
                      article.type === 'investigation' ? 'text-orange-400 border-orange-500/20 bg-orange-500/10' :
                      article.type === 'scientific' ? 'text-blue-400 border-blue-500/20 bg-blue-500/10' :
                      'text-slate-400 border-slate-600/30 bg-slate-700/20'
                    )}>
                      {article.type}
                    </span>
                    {article.aiGenerated && (
                      <span className="flex items-center gap-0.5 text-[10px] text-purple-400 ml-auto">
                        <Bot className="w-2.5 h-2.5" /> AI
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors leading-snug mb-1 line-clamp-3">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{article.excerpt}</p>
                  </div>
                  <div className="mt-auto flex items-center gap-3 pt-2 border-t border-slate-800/40">
                    <div className="flex items-center gap-1.5">
                      <div className={cn(
                        'w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold',
                        article.author.isAI ? 'bg-purple-500/20 text-purple-400' : 'bg-cyan-500/20 text-cyan-400'
                      )}>
                        {article.author.isAI ? 'AI' : article.author.name[0]}
                      </div>
                      <span className="text-[10px] text-slate-400">{article.author.name}</span>
                    </div>
                    <span className="flex items-center gap-0.5 text-[10px] text-slate-500 ml-auto">
                      <Clock className="w-2.5 h-2.5" />{article.readTime}m
                    </span>
                    <span className="flex items-center gap-0.5 text-[10px] text-slate-500">
                      <Eye className="w-2.5 h-2.5" />{article.views.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-500">{timeAgo(article.publishedAt)}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500 text-sm">No articles found matching your filters.</div>
        )}
      </div>
    </AppShell>
  );
}
