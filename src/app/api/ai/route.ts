import { NextRequest, NextResponse } from 'next/server';

const AI_RESPONSES: Record<string, string> = {
  default: 'I\'ve analyzed the available intelligence signals. Based on current data patterns, here is my assessment...',
  misinformation: 'Running misinformation detection analysis. Cross-referencing with 847 known source patterns...',
  market: 'Synthesizing market intelligence across 23 asset classes. Key macro regimes detected...',
  draft: 'Generating article draft based on provided context and intelligence signals...',
  briefing: 'Compiling executive intelligence briefing from top-priority events...',
};

export async function POST(request: NextRequest) {
  const body = await request.json() as { message?: string; action?: string };
  const { message = '', action = 'default' } = body;

  // Simulated AI processing delay hint (client handles actual delay)
  const key = Object.keys(AI_RESPONSES).find(k => message.toLowerCase().includes(k) || action === k) ?? 'default';
  const responseText = AI_RESPONSES[key];

  return NextResponse.json({
    response: responseText,
    confidence: 0.87 + Math.random() * 0.12,
    processingTime: Math.floor(Math.random() * 800) + 200,
    sources: ['Reuters Intelligence', 'OSINT Feeds', 'Satellite Data', 'Financial Terminals'],
  });
}
