import {
  Article,
  IntelligenceEvent,
  MarketSignal,
  GeopoliticalAlert,
  PredictionModel,
  AIInsight,
  ChartDataPoint,
} from '@/types';

export const mockAuthors = [
  { id: 'ai-1', name: 'ARIA Intelligence', role: 'AI Analyst', isAI: true },
  { id: 'u-1', name: 'Marcus Chen', role: 'Senior Correspondent', isAI: false },
  { id: 'u-2', name: 'Elena Vasquez', role: 'Investigative Journalist', isAI: false },
  { id: 'u-3', name: 'James Okafor', role: 'Data Journalist', isAI: false },
];

export const mockArticles: Article[] = [
  {
    id: 'art-001',
    slug: 'global-ai-governance-crisis',
    title: 'The AI Governance Crisis: How Nations Are Racing to Control Artificial General Intelligence',
    subtitle: 'A comprehensive intelligence analysis of global AI regulatory frameworks and their geopolitical implications',
    excerpt: 'As AGI development accelerates, a critical governance vacuum emerges between competing regulatory frameworks of the US, EU, and China...',
    content: `## Executive Summary

The global race to develop and govern artificial intelligence has entered a critical phase. This analysis examines the diverging regulatory trajectories of three major blocs and their implications for global stability.

## Mathematical Framework

The governance gap can be modeled as:

$$G(t) = \\int_0^t [\\alpha C(\\tau) - \\beta R(\\tau)] d\\tau$$

Where $C(\\tau)$ represents cumulative AI capability development and $R(\\tau)$ represents regulatory response capacity.

## Key Findings

- The United States maintains a **capability-first** approach, prioritizing innovation with voluntary frameworks
- The European Union's AI Act creates a **risk-tiered** governance model
- China's centralized approach enables rapid deployment but raises global concerns

## Economic Projections

Given the current trajectory, the AI sector will represent:

$$\\text{GDP Impact} = \\sum_{i=1}^{n} \\frac{\\Delta P_i \\cdot L_i}{(1+r)^{t_i}}$$

Where $\\Delta P_i$ is productivity gain in sector $i$.`,
    author: mockAuthors[0],
    category: 'technology',
    tags: ['AI', 'Governance', 'Geopolitics', 'AGI'],
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    readTime: 12,
    status: 'published',
    type: 'investigation',
    views: 47823,
    aiGenerated: true,
    confidenceScore: 0.94,
    sources: [
      { id: 's1', title: 'EU AI Act 2024', url: '#', type: 'primary', reliability: 0.98 },
      { id: 's2', title: 'NIST AI RMF', url: '#', type: 'primary', reliability: 0.97 },
    ],
  },
  {
    id: 'art-002',
    slug: 'global-debt-spiral',
    title: 'The $330 Trillion Debt Spiral: Modeling Systemic Risk in Sovereign Markets',
    subtitle: 'Quantitative analysis of interconnected sovereign debt dynamics and contagion pathways',
    excerpt: 'Global debt has reached unprecedented levels. Our models suggest three critical threshold scenarios for 2025-2027...',
    content: `## The Debt Architecture

Global sovereign debt has crossed the $330 trillion threshold. The following model describes cascade risk:

$$P(\\text{default cascade}) = 1 - \\prod_{i=1}^{n} (1 - p_i \\cdot c_{ij})$$

## Interest Rate Sensitivity

$$\\Delta V = -D \\cdot V_0 \\cdot \\frac{\\Delta y}{1 + y}$$

Where $D$ is modified duration and $y$ is yield.`,
    author: mockAuthors[2],
    category: 'economy',
    tags: ['Debt', 'Markets', 'Risk', 'Economics'],
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    readTime: 18,
    status: 'published',
    type: 'scientific',
    views: 89241,
    aiGenerated: false,
    confidenceScore: 0.91,
    sources: [
      { id: 's3', title: 'IMF World Economic Outlook', url: '#', type: 'primary', reliability: 0.99 },
    ],
  },
  {
    id: 'art-003',
    slug: 'arctic-resource-war',
    title: 'Arctic Resource War: Intelligence Assessment of Emerging Territorial Conflicts',
    subtitle: 'OSINT analysis of military positioning and resource extraction activity in the Arctic Circle',
    excerpt: 'Satellite intelligence reveals unprecedented military infrastructure expansion along contested Arctic shipping routes...',
    content: `## Intelligence Summary

Recent satellite data indicates significant military infrastructure development at multiple Arctic locations. This assessment synthesizes OSINT data from 847 verified sources.

## Probability Model

The escalation probability follows:

$$P(E) = \\sigma\\left(\\beta_0 + \\sum_{i} \\beta_i x_i\\right)$$

Key variables include naval deployment density, resource discovery announcements, and diplomatic signal frequency.`,
    author: mockAuthors[1],
    category: 'geopolitics',
    tags: ['Arctic', 'Military', 'OSINT', 'Resources'],
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    readTime: 15,
    status: 'published',
    type: 'investigation',
    views: 34567,
    aiGenerated: false,
    confidenceScore: 0.87,
    sources: [],
  },
  {
    id: 'art-004',
    slug: 'quantum-computing-cryptography',
    title: 'Q-Day Approaches: Quantum Computing and the End of Current Cryptographic Standards',
    subtitle: 'Technical analysis of quantum threat timelines and post-quantum cryptography readiness',
    excerpt: 'NIST estimates Q-Day — the point at which quantum computers can break RSA-2048 — may arrive within 7 years...',
    content: `## Cryptographic Vulnerability

The threat model for RSA encryption under quantum attack:

$$T_{\\text{break}} = O\\left(\\left(\\log N\\right)^3\\right)$$

Using Shor's algorithm on a fault-tolerant quantum computer with:

$$n = 2 \\lceil \\log_2 N \\rceil + 3 \\text{ logical qubits}$$`,
    author: mockAuthors[0],
    category: 'technology',
    tags: ['Quantum', 'Cryptography', 'Security', 'NIST'],
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    readTime: 20,
    status: 'published',
    type: 'scientific',
    views: 62109,
    aiGenerated: true,
    confidenceScore: 0.96,
    sources: [],
  },
];

export const mockIntelligenceEvents: IntelligenceEvent[] = [
  {
    id: 'evt-001',
    title: 'Unusual Naval Activity Detected — South China Sea',
    description: 'Satellite imagery analysis shows deployment of 3 carrier battle groups within 48-hour window. Anomalous pattern vs 12-month baseline.',
    severity: 'critical',
    category: 'Military',
    region: 'Asia-Pacific',
    timestamp: new Date(Date.now() - 23 * 60 * 1000).toISOString(),
    confidence: 0.92,
    sources: 14,
    tags: ['Naval', 'China', 'SCS'],
    trend: 'rising',
  },
  {
    id: 'evt-002',
    title: 'European Energy Grid Anomaly — Potential Cyber Intrusion',
    description: 'SCADA system irregularities detected across 3 EU member state networks. Pattern consistent with state-sponsored reconnaissance.',
    severity: 'critical',
    category: 'Cyber',
    region: 'Europe',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    confidence: 0.78,
    sources: 8,
    tags: ['Cyber', 'Energy', 'EU', 'SCADA'],
    trend: 'rising',
  },
  {
    id: 'evt-003',
    title: 'Federal Reserve Emergency Meeting — Unscheduled',
    description: 'Board members convening outside regular schedule. Bond market volatility index spiked 340% in preceding 6-hour window.',
    severity: 'high',
    category: 'Financial',
    region: 'North America',
    timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    confidence: 0.88,
    sources: 22,
    tags: ['Fed', 'Markets', 'Emergency'],
    trend: 'rising',
  },
  {
    id: 'evt-004',
    title: 'Sahel Region Displacement Crisis Accelerating',
    description: 'UNHCR data shows 340% increase in cross-border displacement over 30-day period. Conflict vectors expanding northward.',
    severity: 'high',
    category: 'Humanitarian',
    region: 'Africa',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    confidence: 0.95,
    sources: 31,
    tags: ['Sahel', 'Displacement', 'Africa'],
    trend: 'rising',
  },
  {
    id: 'evt-005',
    title: 'Greenland Ice Sheet Melt Rate Exceeds Model Predictions',
    description: 'New satellite altimetry data shows melt rate 2.3x higher than IPCC worst-case scenario for 2026. Immediate sea-level revision required.',
    severity: 'medium',
    category: 'Climate',
    region: 'Arctic',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    confidence: 0.97,
    sources: 6,
    tags: ['Climate', 'Arctic', 'Sea Level'],
    trend: 'rising',
  },
  {
    id: 'evt-006',
    title: 'New BRICS Digital Currency Protocol Announced',
    description: 'mBridge expansion includes 8 new nations. Settlement volume projections suggest 12% erosion of USD dominance by 2028.',
    severity: 'medium',
    category: 'Financial',
    region: 'Global',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    confidence: 0.84,
    sources: 19,
    tags: ['BRICS', 'CBDC', 'Dollar'],
    trend: 'stable',
  },
];

export const mockMarketSignals: MarketSignal[] = [
  { id: 'm1', asset: 'S&P 500', symbol: 'SPX', price: 5847.23, change: -34.21, changePercent: -0.58, volume: '2.3B', signal: 'bearish', aiPrediction: 'Short-term pressure, support at 5,780' },
  { id: 'm2', asset: 'Bitcoin', symbol: 'BTC', price: 94320.00, change: 2140.50, changePercent: 2.32, volume: '48.2B', signal: 'bullish', aiPrediction: 'Breakout pattern forming above $96K' },
  { id: 'm3', asset: 'Gold', symbol: 'XAUUSD', price: 3342.80, change: 28.40, changePercent: 0.86, volume: '89.4B', signal: 'bullish', aiPrediction: 'Safe haven demand increasing' },
  { id: 'm4', asset: 'EUR/USD', symbol: 'EURUSD', price: 1.0823, change: -0.0034, changePercent: -0.31, volume: '6.2T', signal: 'bearish', aiPrediction: 'ECB policy divergence pressure' },
  { id: 'm5', asset: 'Crude Oil WTI', symbol: 'WTI', price: 78.43, change: 1.23, changePercent: 1.59, volume: '1.1B', signal: 'bullish', aiPrediction: 'Supply disruption risk premium building' },
  { id: 'm6', asset: 'NASDAQ', symbol: 'NDX', price: 20341.56, change: -127.88, changePercent: -0.62, volume: '4.8B', signal: 'neutral', aiPrediction: 'AI sector rotation creating mixed signals' },
];

export const mockGeopoliticalAlerts: GeopoliticalAlert[] = [
  { id: 'g1', region: 'Asia-Pacific', country: 'Taiwan Strait', riskLevel: 87, type: 'Military Tension', description: 'PLA exercise frequency at 5-year high', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), escalationProbability: 0.34 },
  { id: 'g2', region: 'Eastern Europe', country: 'Ukraine', riskLevel: 91, type: 'Active Conflict', description: 'Frontline activity intensifying along 3 axes', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), escalationProbability: 0.61 },
  { id: 'g3', region: 'Middle East', country: 'Iran', riskLevel: 72, type: 'Nuclear Activity', description: 'Enrichment activity at Fordow anomalous', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), escalationProbability: 0.27 },
  { id: 'g4', region: 'South Asia', country: 'Pakistan-India LOC', riskLevel: 65, type: 'Border Tension', description: 'Ceasefire violations increased 180% MoM', timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), escalationProbability: 0.18 },
  { id: 'g5', region: 'Africa', country: 'Sudan', riskLevel: 78, type: 'Civil Conflict', description: 'RSF-SAF engagement expanding to new regions', timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), escalationProbability: 0.45 },
];

export const mockPredictions: PredictionModel[] = [
  {
    id: 'pred-001',
    title: 'US-China Decoupling Acceleration',
    description: 'Probability of major technology/financial decoupling event within 18 months',
    category: 'Geopolitics',
    probability: 0.73,
    confidence: 0.81,
    timeframe: '18 months',
    trend: [45, 48, 52, 55, 61, 67, 70, 71, 73],
    factors: ['Semiconductor export controls', 'CIPS adoption', 'Military posturing', 'Election cycle'],
    lastUpdated: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: 'pred-002',
    title: 'Global Recession Onset',
    description: 'Probability of synchronized global recession (2 consecutive quarters negative GDP growth in G7+)',
    category: 'Economics',
    probability: 0.41,
    confidence: 0.72,
    timeframe: '12 months',
    trend: [28, 31, 35, 38, 36, 39, 42, 40, 41],
    factors: ['Yield curve inversion', 'Credit conditions', 'Consumer confidence', 'Manufacturing PMI'],
    lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'pred-003',
    title: 'Major Cyber Infrastructure Attack',
    description: 'Probability of a state-sponsored attack causing critical infrastructure disruption in NATO member state',
    category: 'Cyber Security',
    probability: 0.67,
    confidence: 0.79,
    timeframe: '6 months',
    trend: [40, 44, 50, 55, 58, 62, 64, 65, 67],
    factors: ['APT activity level', 'Geopolitical tension', 'Defense investment', 'Vulnerability exposure'],
    lastUpdated: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
  {
    id: 'pred-004',
    title: 'AGI Capability Threshold',
    description: 'Probability of demonstrated AGI-level performance (MMLU >95%, ARC-AGI >90%, GPQA >90%) within 24 months',
    category: 'Technology',
    probability: 0.58,
    confidence: 0.65,
    timeframe: '24 months',
    trend: [20, 25, 30, 35, 40, 45, 50, 54, 58],
    factors: ['Scaling laws continuation', 'Compute availability', 'Algorithmic breakthroughs', 'Safety constraints'],
    lastUpdated: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockAIInsights: AIInsight[] = [
  {
    id: 'ins-001',
    type: 'anomaly',
    title: 'Narrative Manipulation Detected — Ukraine Coverage',
    content: 'AI analysis of 14,200 articles across 87 outlets identifies coordinated narrative shift. 23 outlets showing synchronous framing changes within 6h window — pattern consistent with state-sponsored influence operation.',
    confidence: 0.89,
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    id: 'ins-002',
    type: 'prediction',
    title: 'Fed Rate Decision — Model Consensus',
    content: 'Aggregate of 12 economic models indicates 78% probability of 25bps cut at next FOMC meeting. Divergence from market pricing (94% probability) suggests significant volatility risk around announcement.',
    confidence: 0.78,
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
  {
    id: 'ins-003',
    type: 'summary',
    title: 'Daily Intelligence Briefing — Critical Vectors',
    content: '3 critical-level events active. Highest concern: simultaneous energy grid anomalies across EU + unscheduled Fed convening + SCS naval positioning. Correlation analysis suggests low probability of coincidence (p < 0.03).',
    confidence: 0.85,
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'ins-004',
    type: 'alert',
    title: 'New Disinformation Campaign Identified',
    content: 'Novel AI-generated content network detected across 340+ social accounts. Campaign targeting central bank credibility in 4 countries. Fingerprint matches infrastructure used in 2024 election interference operations.',
    confidence: 0.91,
    timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
  },
];

// Generate time series data
export function generateTimeSeriesData(points: number, baseValue: number, volatility: number): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  let value = baseValue;
  const now = Date.now();
  for (let i = points; i >= 0; i--) {
    value += (Math.random() - 0.5) * volatility;
    value = Math.max(value, baseValue * 0.7);
    data.push({
      timestamp: new Date(now - i * 5 * 60 * 1000).toISOString(),
      value: Math.round(value * 100) / 100,
    });
  }
  return data;
}

export const spxData = generateTimeSeriesData(48, 5847, 30);
export const btcData = generateTimeSeriesData(48, 94320, 800);
export const vixData = generateTimeSeriesData(48, 18, 2);

export const breakingNews = [
  { id: 'bn1', headline: 'BREAKING: Fed emergency meeting concludes — no statement issued', time: '2m ago', severity: 'critical' },
  { id: 'bn2', headline: 'EU activates Article 42.7 mutual defense clause for first time', time: '14m ago', severity: 'critical' },
  { id: 'bn3', headline: 'OpenAI announces GPT-5 deployment halted pending safety review', time: '28m ago', severity: 'high' },
  { id: 'bn4', headline: 'China imposes export ban on rare earth elements critical for semiconductors', time: '41m ago', severity: 'high' },
  { id: 'bn5', headline: 'IMF revises global growth forecast down to 2.1% for 2026', time: '1h ago', severity: 'medium' },
  { id: 'bn6', headline: 'Arctic passage opens 6 weeks earlier than record — climate alarm', time: '2h ago', severity: 'medium' },
  { id: 'bn7', headline: 'WHO declares mpox variant PHEiC — global health emergency', time: '3h ago', severity: 'high' },
  { id: 'bn8', headline: 'TSMC announces $65B Arizona fab — US chip independence milestone', time: '4h ago', severity: 'low' },
];
