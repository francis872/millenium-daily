import { NextRequest, NextResponse } from 'next/server';
import { mockArticles } from '@/data/mockData';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const q = searchParams.get('q')?.toLowerCase();

  let articles = mockArticles;

  if (category && category !== 'all') {
    articles = articles.filter(a => a.category === category);
  }
  if (q) {
    articles = articles.filter(
      a => a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ articles, total: articles.length });
}
