'use client';
import { AppShell } from '@/components/layout/AppShell';
import { motion } from 'framer-motion';
import { FileText, Sparkles, Save, Eye, Code, Sigma, List, Bold, Italic, Link2, Image } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { GlowCard } from '@/components/ui/GlowCard';

const TOOLBAR_GROUPS = [
  [
    { icon: Bold, label: 'Bold', action: '**bold**' },
    { icon: Italic, label: 'Italic', action: '_italic_' },
    { icon: Link2, label: 'Link', action: '[text](url)' },
  ],
  [
    { icon: List, label: 'List', action: '\n- item' },
    { icon: Code, label: 'Code', action: '`code`' },
    { icon: Sigma, label: 'LaTeX', action: '$equation$' },
    { icon: Image, label: 'Image', action: '![alt](url)' },
  ],
];

const TEMPLATES = [
  { id: 'news', label: 'Breaking News', icon: '⚡' },
  { id: 'investigation', label: 'Investigation', icon: '🔍' },
  { id: 'scientific', label: 'Scientific', icon: '⚗️' },
  { id: 'analysis', label: 'Analysis', icon: '📊' },
  { id: 'predictive', label: 'Predictive', icon: '🔮' },
];

const TEMPLATE_CONTENT: Record<string, string> = {
  news: `# Breaking: [HEADLINE]

**By [Author] · ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}**

---

[Lead paragraph — the most important information first. Answer: Who, What, When, Where, Why.]

## Details

[Second paragraph — supporting details and context.]

## Background

[Third paragraph — relevant background information.]

## What's Next

[Final paragraph — implications and what to watch for.]

---
*Sources: [list sources]*`,

  scientific: `# [TITLE]

**Abstract**

[Brief summary of the article's main findings and significance.]

---

## Introduction

[Background context and motivation for this analysis.]

## Methodology

The analysis employs the following mathematical framework:

$$E = mc^2$$

Where $E$ represents energy, $m$ represents mass, and $c$ is the speed of light.

## Data Analysis

Given the relationship:

$$\\frac{\\partial f}{\\partial x} = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$

## Results

[Present findings with supporting data and visualizations.]

## Conclusions

[Summary of findings and their broader implications.]

---

## References

1. [Author, A. (Year). Title. Journal, Volume(Issue), Pages.]`,

  investigation: `# INVESTIGATION: [HEADLINE]

*An investigative report by [Author]*

---

## Key Findings

- **Finding 1**: [Critical discovery with supporting evidence]
- **Finding 2**: [Second key finding]  
- **Finding 3**: [Third discovery]

## The Evidence

[Detailed examination of the evidence gathered through investigation.]

## Timeline

| Date | Event | Significance |
|------|-------|--------------|
| [Date] | [Event] | [Why it matters] |

## Sources

[Description of primary and secondary sources used.]

## Conclusion

[Summary of findings and their significance for public interest.]`,

  analysis: `# [TITLE]: A Quantitative Analysis

**Intelligence Classification: OPEN SOURCE**

---

## Executive Summary

[Brief overview of the analysis and key conclusions.]

## Quantitative Framework

The core model for this analysis:

$$\\text{Index} = \\sum_{i=1}^{n} w_i \\cdot f(x_i)$$

Where $w_i$ represents the weight of factor $i$.

## Key Variables

| Factor | Weight | Current Value | Trend |
|--------|--------|---------------|-------|
| Factor A | 35% | [value] | ↑ |
| Factor B | 25% | [value] | → |
| Factor C | 40% | [value] | ↓ |

## Scenario Analysis

**Bull Case**: [Description and probability estimate]  
**Base Case**: [Description and probability estimate]  
**Bear Case**: [Description and probability estimate]

## Conclusion

[Final assessment and recommendations.]`,
};

export default function EditorPage() {
  const [content, setContent] = useState(TEMPLATE_CONTENT.news);
  const [title, setTitle] = useState('');
  const [activeTemplate, setActiveTemplate] = useState('news');
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);

  const aiActions = [
    { label: 'Suggest headline', action: 'headline' },
    { label: 'Improve lead', action: 'lead' },
    { label: 'Add sources', action: 'sources' },
    { label: 'Fact-check', action: 'factcheck' },
    { label: 'Expand section', action: 'expand' },
  ];

  async function runAI(action: string) {
    setLoadingAI(true);
    await new Promise(r => setTimeout(r, 1000));
    const suggestions: Record<string, string> = {
      headline: '💡 Suggested headline: "Global Intelligence Crisis: AI Governance Frameworks Collapse as AGI Threshold Approaches"',
      lead: '💡 Stronger lead: "With three nuclear-capable powers rewriting the rules of engagement and global AI capabilities surpassing previous forecasts by 340%, this moment represents the most consequential geopolitical inflection point since 1989."',
      sources: '💡 Recommended sources: IMF World Economic Outlook (April 2026), NATO Strategic Concept 2022, OpenAI Model Spec v2, RAND Corporation: AI Risk Assessment 2025',
      factcheck: '✓ Fact-check complete: 94% accuracy score. Flag: Verify "840%" figure with primary source. The claim about SCADA vulnerabilities requires attribution.',
      expand: '💡 Suggested expansion: Consider adding a section on the economic implications, specifically analyzing the Beveridge Curve shifts post-AI deployment and historical analogues from the Industrial Revolution.',
    };
    setAiSuggestion(suggestions[action] || 'AI analysis complete.');
    setLoadingAI(false);
  }

  function handleSave() {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  }

  function insertTemplate(id: string) {
    setActiveTemplate(id);
    setContent(TEMPLATE_CONTENT[id] || '');
  }

  return (
    <AppShell>
      <div className="flex flex-col h-full">
        {/* Editor toolbar */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800/60 bg-slate-900/60 flex-wrap gap-y-2">
          <div className="flex items-center gap-2 mr-2">
            <FileText className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-bold text-white">AI Article Editor</span>
          </div>

          {/* Templates */}
          <div className="flex gap-1 mr-2">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => insertTemplate(t.id)}
                className={cn(
                  'flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition-all border',
                  activeTemplate === t.id
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                    : 'border-slate-700/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                )}
              >
                <span>{t.icon}</span>
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </div>

          {/* Formatting buttons */}
          {TOOLBAR_GROUPS.map((group, gi) => (
            <div key={gi} className="flex gap-0.5">
              {group.map(({ icon: Icon, label, action }) => (
                <button
                  key={label}
                  title={label}
                  onClick={() => setContent(c => c + action)}
                  className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          ))}

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={cn(
                'flex items-center gap-1.5 px-2 py-1 rounded text-[11px] border transition-all',
                showPreview
                  ? 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                  : 'border-slate-700/40 text-slate-400 hover:text-white hover:bg-slate-800/50'
              )}
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-3 py-1 rounded text-[11px] font-bold bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/25 transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* Main editor */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {/* Title input */}
            <div className="px-6 py-3 border-b border-slate-800/40">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Article headline..."
                className="w-full bg-transparent text-xl font-bold text-white placeholder-slate-600 focus:outline-none"
              />
            </div>

            {/* Editor / Preview */}
            <div className="flex-1 flex min-h-0 overflow-hidden">
              {/* Editor pane */}
              <div className={cn('flex-1 overflow-hidden', showPreview && 'hidden lg:flex lg:flex-col')}>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-full bg-transparent text-sm text-slate-300 placeholder-slate-600 focus:outline-none resize-none p-6 font-mono leading-relaxed"
                  placeholder="Start writing your article..."
                  spellCheck={false}
                />
              </div>

              {/* Preview pane */}
              {showPreview && (
                <div className="flex-1 overflow-y-auto p-6 border-l border-slate-800/40 prose prose-invert prose-sm max-w-none">
                  <h1 className="text-white font-bold text-2xl mb-4">{title || 'Untitled Article'}</h1>
                  <div className="text-slate-300 whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {content}
                  </div>
                </div>
              )}
            </div>

            {/* Status bar */}
            <div className="flex items-center gap-4 px-4 py-1.5 border-t border-slate-800/40 bg-slate-900/40 text-[10px] text-slate-500 font-mono">
              <span>{content.split(/\s+/).filter(Boolean).length} words</span>
              <span>{content.length} chars</span>
              <span>~{Math.ceil(content.split(/\s+/).length / 200)} min read</span>
              <span className="ml-auto text-emerald-400">{saving ? '● Saving...' : '● Saved'}</span>
            </div>
          </div>

          {/* AI Sidebar */}
          <div className="w-72 border-l border-slate-800/60 flex flex-col bg-slate-900/40 hidden xl:flex">
            <div className="px-4 py-3 border-b border-slate-800/40">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-bold text-white">AI Writing Assistant</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {aiActions.map((a) => (
                  <button
                    key={a.action}
                    onClick={() => runAI(a.action)}
                    className="px-2 py-1 rounded bg-slate-800/60 border border-slate-700/40 text-[11px] text-slate-300 hover:text-white hover:border-purple-500/30 transition-all"
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            {/* AI suggestion output */}
            <div className="flex-1 p-4 overflow-y-auto">
              {loadingAI && (
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <div className="w-3 h-3 border border-purple-400 border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </div>
              )}
              {aiSuggestion && !loadingAI && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs text-slate-300 leading-relaxed"
                >
                  {aiSuggestion}
                </motion.div>
              )}
              {!aiSuggestion && !loadingAI && (
                <div className="text-xs text-slate-500 italic">
                  Click an action above to get AI assistance with your article.
                </div>
              )}
            </div>

            {/* LaTeX quick reference */}
            <div className="p-4 border-t border-slate-800/40">
              <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">LaTeX Quick Ref</div>
              <div className="space-y-1 font-mono text-[10px] text-slate-400">
                <div>{'$x^2 + y^2 = z^2$'} {'\u2192'} inline</div>
                <div>{'$$\\sum_{n=1}^{\\infty}$$'} {'\u2192'} block</div>
                <div>{'$\\frac{a}{b}$'} {'\u2192'} fraction</div>
                <div>{'$\\sqrt{x}$'} {'\u2192'} root</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
