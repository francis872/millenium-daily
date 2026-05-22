import { NextRequest, NextResponse } from 'next/server';
import { mockIntelligenceEvents } from '@/data/mockData';

export async function GET(_request: NextRequest) {
  return NextResponse.json({
    events: mockIntelligenceEvents,
    total: mockIntelligenceEvents.length,
    lastUpdated: new Date().toISOString(),
  });
}
