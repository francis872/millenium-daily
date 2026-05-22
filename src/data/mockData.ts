import {
  Article,
  IntelligenceEvent,
  MarketSignal,
  GeopoliticalAlert,
  PredictionModel,
  AIInsight,
  ChartDataPoint,
  ChroniqNode,
  ChroniqEdge,
  ChroniqFeedItem,
  AnomalySignal,
  ResearchPaper,
  Publisher,
  LiveFeedItem,
  LiveStream,
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
    publishedAt: '2026-05-21T08:00:00.000Z',
    updatedAt: '2026-05-21T09:30:00.000Z',
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
    publishedAt: '2026-05-21T05:00:00.000Z',
    updatedAt: '2026-05-21T09:00:00.000Z',
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
    publishedAt: '2026-05-20T22:00:00.000Z',
    updatedAt: '2026-05-21T07:00:00.000Z',
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
    publishedAt: '2026-05-20T10:00:00.000Z',
    updatedAt: '2026-05-21T04:00:00.000Z',
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
    timestamp: '2026-05-21T09:37:00.000Z',
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
    timestamp: '2026-05-21T09:15:00.000Z',
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
    timestamp: '2026-05-21T08:30:00.000Z',
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
    timestamp: '2026-05-21T07:00:00.000Z',
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
    timestamp: '2026-05-21T05:00:00.000Z',
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
    timestamp: '2026-05-21T02:00:00.000Z',
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
  { id: 'g1', region: 'Asia-Pacific', country: 'Taiwan Strait', riskLevel: 87, type: 'Military Tension', description: 'PLA exercise frequency at 5-year high', timestamp: '2026-05-21T08:00:00.000Z', escalationProbability: 0.34 },
  { id: 'g2', region: 'Eastern Europe', country: 'Ukraine', riskLevel: 91, type: 'Active Conflict', description: 'Frontline activity intensifying along 3 axes', timestamp: '2026-05-21T09:00:00.000Z', escalationProbability: 0.61 },
  { id: 'g3', region: 'Middle East', country: 'Iran', riskLevel: 72, type: 'Nuclear Activity', description: 'Enrichment activity at Fordow anomalous', timestamp: '2026-05-21T06:00:00.000Z', escalationProbability: 0.27 },
  { id: 'g4', region: 'South Asia', country: 'Pakistan-India LOC', riskLevel: 65, type: 'Border Tension', description: 'Ceasefire violations increased 180% MoM', timestamp: '2026-05-21T04:00:00.000Z', escalationProbability: 0.18 },
  { id: 'g5', region: 'Africa', country: 'Sudan', riskLevel: 78, type: 'Civil Conflict', description: 'RSF-SAF engagement expanding to new regions', timestamp: '2026-05-21T02:00:00.000Z', escalationProbability: 0.45 },
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
    lastUpdated: '2026-05-21T09:30:00.000Z',
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
    lastUpdated: '2026-05-21T08:00:00.000Z',
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
    lastUpdated: '2026-05-21T09:15:00.000Z',
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
    lastUpdated: '2026-05-21T06:00:00.000Z',
  },
];

export const mockAIInsights: AIInsight[] = [
  {
    id: 'ins-001',
    type: 'anomaly',
    title: 'Narrative Manipulation Detected — Ukraine Coverage',
    content: 'AI analysis of 14,200 articles across 87 outlets identifies coordinated narrative shift. 23 outlets showing synchronous framing changes within 6h window — pattern consistent with state-sponsored influence operation.',
    confidence: 0.89,
    timestamp: '2026-05-21T09:45:00.000Z',
  },
  {
    id: 'ins-002',
    type: 'prediction',
    title: 'Fed Rate Decision — Model Consensus',
    content: 'Aggregate of 12 economic models indicates 78% probability of 25bps cut at next FOMC meeting. Divergence from market pricing (94% probability) suggests significant volatility risk around announcement.',
    confidence: 0.78,
    timestamp: '2026-05-21T09:15:00.000Z',
  },
  {
    id: 'ins-003',
    type: 'summary',
    title: 'Daily Intelligence Briefing — Critical Vectors',
    content: '3 critical-level events active. Highest concern: simultaneous energy grid anomalies across EU + unscheduled Fed convening + SCS naval positioning. Correlation analysis suggests low probability of coincidence (p < 0.03).',
    confidence: 0.85,
    timestamp: '2026-05-21T09:00:00.000Z',
  },
  {
    id: 'ins-004',
    type: 'alert',
    title: 'New Disinformation Campaign Identified',
    content: 'Novel AI-generated content network detected across 340+ social accounts. Campaign targeting central bank credibility in 4 countries. Fingerprint matches infrastructure used in 2024 election interference operations.',
    confidence: 0.91,
    timestamp: '2026-05-21T08:30:00.000Z',
  },
];

// ── CHRONIQ Graph Network ─────────────────────────────────────────────────────

export const mockGraphNodes: ChroniqNode[] = [
  { id: 'n-001', label: 'Reuters Institute', type: 'institution', trustScore: 98, verificationLevel: 'institutional', country: 'UK', connections: 47, credibilityLayer: 'Tier-1 Media Authority', publishCount: 4821, x: 420, y: 180 },
  { id: 'n-002', label: 'MIT Media Lab', type: 'university', trustScore: 97, verificationLevel: 'institutional', country: 'USA', connections: 63, credibilityLayer: 'Scientific Authority', publishCount: 2340, x: 250, y: 280 },
  { id: 'n-003', label: 'ARIA Intelligence', type: 'analyst', trustScore: 96, verificationLevel: 'partner', country: 'Network', connections: 91, credibilityLayer: 'AI-Verified Intelligence', publishCount: 8120, x: 380, y: 320 },
  { id: 'n-004', label: 'Marcus Chen', type: 'journalist', trustScore: 94, verificationLevel: 'verified', country: 'USA', connections: 28, credibilityLayer: 'Senior Correspondent', publishCount: 892, x: 560, y: 260 },
  { id: 'n-005', label: 'Elena Vasquez', type: 'journalist', trustScore: 92, verificationLevel: 'verified', country: 'ESP', connections: 19, credibilityLayer: 'Investigative Journalist', publishCount: 441, x: 200, y: 180 },
  { id: 'n-006', label: 'CERN Research', type: 'university', trustScore: 99, verificationLevel: 'institutional', country: 'CH', connections: 55, credibilityLayer: 'Scientific Peak Authority', publishCount: 1876, x: 140, y: 350 },
  { id: 'n-007', label: 'EU Commission', type: 'government', trustScore: 89, verificationLevel: 'government', country: 'EU', connections: 72, credibilityLayer: 'Government Authority', publishCount: 3200, x: 310, y: 140 },
  { id: 'n-008', label: 'James Okafor', type: 'journalist', trustScore: 91, verificationLevel: 'verified', country: 'NGA', connections: 14, credibilityLayer: 'Data Journalist', publishCount: 328, x: 490, y: 380 },
  { id: 'n-009', label: 'Stanford AI Lab', type: 'university', trustScore: 98, verificationLevel: 'institutional', country: 'USA', connections: 48, credibilityLayer: 'Scientific Authority', publishCount: 1543, x: 620, y: 180 },
  { id: 'n-010', label: 'Interpol Liaison', type: 'government', trustScore: 95, verificationLevel: 'government', country: 'INT', connections: 33, credibilityLayer: 'Intelligence Partner', publishCount: 287, x: 680, y: 340 },
];

export const mockGraphEdges: ChroniqEdge[] = [
  { source: 'n-001', target: 'n-003', type: 'trust', weight: 0.95 },
  { source: 'n-002', target: 'n-003', type: 'verification', weight: 0.88 },
  { source: 'n-003', target: 'n-004', type: 'collaboration', weight: 0.76 },
  { source: 'n-003', target: 'n-005', type: 'publishing', weight: 0.71 },
  { source: 'n-006', target: 'n-002', type: 'reference', weight: 0.92 },
  { source: 'n-007', target: 'n-001', type: 'verification', weight: 0.84 },
  { source: 'n-004', target: 'n-001', type: 'publishing', weight: 0.89 },
  { source: 'n-008', target: 'n-003', type: 'collaboration', weight: 0.68 },
  { source: 'n-009', target: 'n-002', type: 'reference', weight: 0.91 },
  { source: 'n-010', target: 'n-007', type: 'trust', weight: 0.87 },
  { source: 'n-005', target: 'n-007', type: 'reference', weight: 0.72 },
  { source: 'n-009', target: 'n-003', type: 'verification', weight: 0.90 },
];

// ── CHRONIQ Feed ─────────────────────────────────────────────────────────────

export const mockChroniqFeed: ChroniqFeedItem[] = [
  {
    id: 'cf-001', type: 'signal', title: 'CRITICAL: EU Energy Grid Anomaly Detected — Cross-Border Cascade Risk',
    excerpt: 'ARIA anomaly detection flagged simultaneous load fluctuations across 7 EU member states. Pattern consistent with coordinated infrastructure stress test or precursor event.',
    author: 'ARIA Intelligence', institution: 'CHRONIQ Intelligence Network', trustScore: 96,
    verificationLevel: 'partner', timestamp: '2026-05-21T09:56:00.000Z',
    region: 'Europe', tags: ['energy', 'infrastructure', 'critical'], entities: ['EU Commission', 'Entsoe', 'Germany'],
    relatedIds: ['cf-005', 'cf-009'], severity: 'critical', signalStrength: 0.94, credibilityScore: 96, views: 4821, propagationScore: 0.89,
  },
  {
    id: 'cf-002', type: 'scientific', title: 'Quantum-Resistant Cryptography: NIST Final Standards Impact Analysis',
    excerpt: 'This paper analyzes the deployment timeline and strategic implications of NIST post-quantum cryptographic standards for sovereign digital infrastructure.',
    author: 'Dr. Yuki Tanaka', institution: 'MIT Media Lab', trustScore: 97,
    verificationLevel: 'institutional', timestamp: '2026-05-21T09:32:00.000Z',
    region: 'Global', tags: ['cryptography', 'quantum', 'security'], entities: ['NIST', 'MIT', 'NSA'],
    relatedIds: ['cf-007'], severity: 'high', hasLatex: true, hasPDF: true, credibilityScore: 97, views: 2341, propagationScore: 0.76,
  },
  {
    id: 'cf-003', type: 'ai_report', title: 'ARIA Weekly Intelligence Synthesis: South China Sea — Week 21',
    excerpt: 'Automated synthesis of 847 intelligence signals across naval positioning, diplomatic cables, and economic indicators. Escalation probability: 34% (↑8pp vs prior week).',
    author: 'ARIA Intelligence', institution: 'CHRONIQ Intelligence Network', trustScore: 96,
    verificationLevel: 'partner', timestamp: '2026-05-21T09:15:00.000Z',
    region: 'Asia-Pacific', tags: ['geopolitics', 'naval', 'china'], entities: ['PLA Navy', 'USS Ronald Reagan', 'Taiwan Strait'],
    relatedIds: ['cf-001', 'cf-006'], severity: 'high', hasChart: true, credibilityScore: 94, views: 8921, propagationScore: 0.91,
  },
  {
    id: 'cf-004', type: 'pdf', title: 'IMF World Economic Outlook — Q2 2026 Supplementary Dataset',
    excerpt: 'Full dataset release: GDP projections, inflation vectors, and debt sustainability analysis for 189 member countries. Revised global growth: 2.8% (−0.3pp).',
    author: 'IMF Research', institution: 'International Monetary Fund', trustScore: 99,
    verificationLevel: 'institutional', timestamp: '2026-05-21T08:00:00.000Z',
    region: 'Global', tags: ['economics', 'imf', 'gdp'], entities: ['IMF', 'World Bank', 'Federal Reserve'],
    relatedIds: ['cf-008'], hasPDF: true, hasChart: true, credibilityScore: 99, views: 15420, propagationScore: 0.95,
  },
  {
    id: 'cf-005', type: 'investigation', title: 'Shadow Infrastructure: How State Actors Route Cyber Operations Through Neutral Cloud Providers',
    excerpt: 'A 6-month OSINT investigation mapping the command-and-control infrastructure of three nation-state threat actors through compromised commercial cloud services.',
    author: 'Elena Vasquez', institution: 'Reuters Institute', trustScore: 98,
    verificationLevel: 'verified', timestamp: '2026-05-21T06:00:00.000Z',
    region: 'Global', tags: ['cybersecurity', 'osint', 'statecraft'], entities: ['AWS', 'Azure', 'APT-41'],
    relatedIds: ['cf-001'], severity: 'critical', hasPDF: true, credibilityScore: 95, views: 19870, propagationScore: 0.88,
  },
  {
    id: 'cf-006', type: 'news', title: 'Taiwan Semiconductor Export Controls: Emergency Session Convened',
    excerpt: 'TSMC emergency board session called following US Treasury guidance on advanced node exports. Market impact: SOXX −3.2% pre-market.',
    author: 'Marcus Chen', institution: 'Reuters Institute', trustScore: 98,
    verificationLevel: 'verified', timestamp: '2026-05-21T05:00:00.000Z',
    region: 'Asia-Pacific', tags: ['semiconductors', 'taiwan', 'exports'], entities: ['TSMC', 'NVIDIA', 'US Treasury'],
    relatedIds: ['cf-003', 'cf-004'], severity: 'high', credibilityScore: 96, views: 31200, propagationScore: 0.93,
  },
  {
    id: 'cf-007', type: 'latex_report', title: 'Stochastic Modeling of Cascade Failure Propagation in Interconnected Critical Infrastructure',
    excerpt: 'We present a novel stochastic differential equation framework for modeling cascade failure propagation in interdependent infrastructure networks.',
    author: 'Prof. Andreas Weber', institution: 'ETH Zürich', trustScore: 97,
    verificationLevel: 'institutional', timestamp: '2026-05-21T02:00:00.000Z',
    region: 'Europe', tags: ['mathematics', 'infrastructure', 'risk'], entities: ['ETH Zürich', 'EPFL', 'IEEE'],
    relatedIds: ['cf-001', 'cf-002'], hasLatex: true, hasPDF: true, credibilityScore: 97, views: 3241, propagationScore: 0.72,
  },
  {
    id: 'cf-008', type: 'dataset', title: 'CHRONIQ Financial Stress Index — Real-Time Composite (Q2 2026)',
    excerpt: 'Composite index aggregating 140 financial stress indicators across sovereign debt, interbank lending, currency volatility, and commodity markets.',
    author: 'ARIA Intelligence', institution: 'CHRONIQ Intelligence Network', trustScore: 96,
    verificationLevel: 'partner', timestamp: '2026-05-20T22:00:00.000Z',
    region: 'Global', tags: ['finance', 'stress-index', 'markets'], entities: ['Federal Reserve', 'ECB', 'BIS'],
    relatedIds: ['cf-004', 'cf-006'], hasChart: true, credibilityScore: 93, views: 7651, propagationScore: 0.84,
  },
];

// ── CHRONIQ Anomaly Signals ───────────────────────────────────────────────────

export const mockAnomalySignals: AnomalySignal[] = [
  {
    id: 'sig-001', type: 'geopolitical', title: 'SCS Naval Concentration — Triple Fleet Convergence',
    description: 'SATINT analysis shows unprecedented convergence of three carrier battle groups at contested maritime boundary. No scheduled exercises logged.',
    severity: 'critical', confidence: 0.91, detectedAt: '2026-05-21T09:58:00.000Z',
    region: 'South China Sea', signalScore: 94, escalationProbability: 0.41,
    relatedEntities: ['PLA Navy', 'USS Ronald Reagan', 'JMSDF'],
    timeline: [{ t: '-6h', v: 22 }, { t: '-4h', v: 38 }, { t: '-2h', v: 61 }, { t: '-1h', v: 78 }, { t: 'now', v: 94 }],
  },
  {
    id: 'sig-002', type: 'financial', title: 'Coordinated Short Position — European Sovereign Debt',
    description: 'Unusual clustering of short positions across Italian and Greek sovereign bonds. Pattern consistent with coordinated institutional strategy.',
    severity: 'high', confidence: 0.87, detectedAt: '2026-05-21T09:42:00.000Z',
    region: 'Europe', signalScore: 81, escalationProbability: 0.28,
    relatedEntities: ['ECB', 'BTP Italy', 'GGBs Greece'],
    timeline: [{ t: '-6h', v: 34 }, { t: '-4h', v: 41 }, { t: '-2h', v: 58 }, { t: '-1h', v: 71 }, { t: 'now', v: 81 }],
  },
  {
    id: 'sig-003', type: 'narrative', title: 'Coordinated Disinformation Vector — Central Bank Credibility',
    description: '340+ accounts amplifying identical narrative attacking ECB/Fed independence. Network fingerprint matches prior state-actor infrastructure.',
    severity: 'high', confidence: 0.89, detectedAt: '2026-05-21T09:25:00.000Z',
    region: 'Global', signalScore: 78, escalationProbability: 0.22,
    relatedEntities: ['ECB', 'Federal Reserve', 'Twitter/X'],
    timeline: [{ t: '-6h', v: 15 }, { t: '-4h', v: 28 }, { t: '-2h', v: 52 }, { t: '-1h', v: 67 }, { t: 'now', v: 78 }],
  },
  {
    id: 'sig-004', type: 'market', title: 'Semiconductor Supply Chain Disruption Alert',
    description: 'AI supply chain analysis detects 3σ deviation in rare earth shipment patterns from 4 key extraction zones. 60-90 day impact window.',
    severity: 'medium', confidence: 0.76, detectedAt: '2026-05-21T08:00:00.000Z',
    region: 'Asia', signalScore: 64, escalationProbability: 0.18,
    relatedEntities: ['TSMC', 'ASML', 'Lynas Rare Earths'],
    timeline: [{ t: '-6h', v: 28 }, { t: '-4h', v: 35 }, { t: '-2h', v: 48 }, { t: '-1h', v: 57 }, { t: 'now', v: 64 }],
  },
  {
    id: 'sig-005', type: 'security', title: 'Zero-Day Exploit — Critical Infrastructure SCADA Systems',
    description: 'CVE-2026-18947 actively exploited in energy sector SCADA systems. 14 confirmed incidents across 3 continents in 6-hour window.',
    severity: 'critical', confidence: 0.95, detectedAt: '2026-05-21T06:00:00.000Z',
    region: 'Global', signalScore: 97, escalationProbability: 0.55,
    relatedEntities: ['Siemens SCADA', 'CISA', 'Schneider Electric'],
    timeline: [{ t: '-6h', v: 45 }, { t: '-4h', v: 73 }, { t: '-2h', v: 88 }, { t: '-1h', v: 93 }, { t: 'now', v: 97 }],
  },
];

// ── CHRONIQ Research Papers ────────────────────────────────────────────────────

export const mockResearchPapers: ResearchPaper[] = [
  {
    id: 'rp-001', title: 'Adversarial Robustness in Large Language Models Under Distribution Shift',
    authors: ['Dr. Yuki Tanaka', 'Prof. Sarah Mitchell'], institution: 'MIT Media Lab',
    abstract: 'We investigate the robustness of instruction-tuned LLMs under systematic adversarial distribution shift, introducing a novel threat model $\\mathcal{T}_{\\epsilon}$ parameterized by perturbation radius $\\epsilon$ in the embedding space.',
    hasLatex: true, hasPDF: true, citationCount: 234, publishedAt: '2026-04-15',
    category: 'AI Safety', trustScore: 97, doi: '10.48550/arXiv.2604.18234',
    equations: ['\\mathcal{T}_{\\epsilon}(x) = \\{x\' : \\|x\' - x\\|_2 \\leq \\epsilon\\}', 'L_{\\text{adv}} = \\max_{\\delta \\in \\mathcal{T}} \\mathcal{L}(f(x + \\delta), y)'],
  },
  {
    id: 'rp-002', title: 'Stochastic Cascade Failure in Interdependent Infrastructure Networks',
    authors: ['Prof. Andreas Weber', 'Dr. Lena Fischer'], institution: 'ETH Zürich',
    abstract: 'A mathematical framework for cascade failure propagation using coupled stochastic differential equations. The failure probability follows a modified Galton-Watson branching process.',
    hasLatex: true, hasPDF: true, citationCount: 89, publishedAt: '2026-03-22',
    category: 'Infrastructure Risk', trustScore: 97, doi: '10.1007/s11749-026-0891-3',
    equations: ['\\frac{dF_i}{dt} = -\\alpha F_i + \\beta \\sum_{j \\in N(i)} A_{ij} F_j + \\sigma W_t', 'P(\\text{cascade}) = 1 - e^{-\\lambda n^{\\gamma}}'],
  },
  {
    id: 'rp-003', title: 'Graph-Theoretic Trust Propagation in Decentralized Media Networks',
    authors: ['Prof. James Liu', 'Dr. Amara Diallo'], institution: 'Stanford AI Lab',
    abstract: 'We model institutional trust propagation as a random walk on a weighted directed graph $G = (V, E, w)$ where edge weights encode credibility relationships.',
    hasLatex: true, hasPDF: true, citationCount: 156, publishedAt: '2026-02-10',
    category: 'Network Theory', trustScore: 98, doi: '10.1145/3589334.3645498',
    equations: ['\\pi_v = \\frac{1-d}{|V|} + d \\sum_{u \\in B(v)} \\frac{w_{u,v}}{C(u)} \\pi_u', 'T(v) = \\sum_{k=0}^{\\infty} \\alpha^k (P^k)_v \\cdot t_0'],
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

// ─── PUBLISHER REGISTRY ──────────────────────────────────────────────────────
export const mockPublishers: Publisher[] = [
  {
    id: 'pub-reuters', name: 'Reuters', shortName: 'RTRS', country: 'United Kingdom', flag: '🇬🇧',
    category: 'news_agency', trustScore: 97, verificationLevel: 'verified', status: 'active',
    description: 'International news organization covering world affairs, business and markets with unmatched global reach across 200 countries.',
    publishedCount: 1842, joinedAt: '2025-01-15', nodeId: 'node-reuters',
    allowedTypes: ['news', 'pdf', 'dataset'],
    followers: 142800, website: 'https://reuters.com', founded: '1851',
    headquartersCity: 'London', specialties: ['Breaking News', 'Financial Markets', 'Geopolitics', 'Wire Service'],
    liveStreams: [
      { id: 'ls-reuters-1', publisherId: 'pub-reuters', title: 'Reuters World News Live', description: 'Continuous live world news coverage', isLive: true, viewers: 8420 },
      { id: 'ls-reuters-2', publisherId: 'pub-reuters', title: 'Markets Closing Bell', description: 'NYSE and global market close', isLive: false, scheduledAt: '18:00 UTC' },
    ],
  },
  {
    id: 'pub-ap', name: 'Associated Press', shortName: 'AP', country: 'United States', flag: '🇺🇸',
    category: 'news_agency', trustScore: 96, verificationLevel: 'verified', status: 'active',
    description: 'Not-for-profit news agency headquartered in New York City. Trusted source of fast, accurate, unbiased news since 1846.',
    publishedCount: 2103, joinedAt: '2025-01-15', nodeId: 'node-ap',
    allowedTypes: ['news', 'pdf', 'ai_report'],
    followers: 189300, website: 'https://apnews.com', founded: '1846',
    headquartersCity: 'New York', specialties: ['Wire Service', 'Photography', 'Fact-Check', 'Elections'],
    liveStreams: [
      { id: 'ls-ap-1', publisherId: 'pub-ap', title: 'AP Live: Washington Bureau', description: 'US politics and policy live', isLive: true, viewers: 5210 },
    ],
  },
  {
    id: 'pub-mit', name: 'MIT Media Lab', shortName: 'MIT', country: 'United States', flag: '🇺🇸',
    category: 'research_institute', trustScore: 97, verificationLevel: 'institutional', status: 'active',
    description: 'Interdisciplinary research laboratory at MIT studying the intersection of technology, media, science, art, and design.',
    publishedCount: 234, joinedAt: '2025-02-10', nodeId: 'node-mit',
    allowedTypes: ['scientific', 'pdf', 'latex_report', 'dataset', 'ai_report'],
    followers: 41200, website: 'https://media.mit.edu', founded: '1985',
    headquartersCity: 'Cambridge MA', specialties: ['AI Research', 'Human-Computer Interaction', 'Synthetic Biology', 'Data Science'],
    liveStreams: [
      { id: 'ls-mit-1', publisherId: 'pub-mit', title: 'MIT AI Research Symposium 2026', description: 'Live symposium on frontier AI', isLive: false, scheduledAt: '2026-06-10' },
    ],
  },
  {
    id: 'pub-cern', name: 'CERN Research', shortName: 'CERN', country: 'Switzerland', flag: '🇨🇭',
    category: 'research_institute', trustScore: 99, verificationLevel: 'institutional', status: 'active',
    description: 'European Organization for Nuclear Research — world\'s largest particle physics laboratory operating the Large Hadron Collider.',
    publishedCount: 89, joinedAt: '2025-03-01', nodeId: 'node-cern',
    allowedTypes: ['scientific', 'latex_report', 'pdf', 'dataset'],
    followers: 62100, website: 'https://cern.ch', founded: '1954',
    headquartersCity: 'Geneva', specialties: ['Particle Physics', 'Astrophysics', 'Computing', 'Open Science'],
    liveStreams: [
      { id: 'ls-cern-1', publisherId: 'pub-cern', title: 'LHC Run 4 — Live Collision Data', description: 'Live particle collision stream from LHC', isLive: true, viewers: 12800 },
    ],
  },
  {
    id: 'pub-eu', name: 'EU Commission Press', shortName: 'EU', country: 'Belgium', flag: '🇪🇺',
    category: 'government', trustScore: 89, verificationLevel: 'government', status: 'active',
    description: 'Official press service of the European Commission. Legislative updates, policy briefings and institutional communications.',
    publishedCount: 567, joinedAt: '2025-01-20', nodeId: 'node-eu',
    allowedTypes: ['news', 'pdf', 'dataset'],
    followers: 88400, website: 'https://ec.europa.eu', founded: '1958',
    headquartersCity: 'Brussels', specialties: ['EU Policy', 'Legislation', 'Trade', 'Climate'],
    liveStreams: [
      { id: 'ls-eu-1', publisherId: 'pub-eu', title: 'European Parliament Session', description: 'Live plenary session coverage', isLive: false, scheduledAt: '2026-05-22' },
    ],
  },
  {
    id: 'pub-interpol', name: 'Interpol Intelligence', shortName: 'INTPOL', country: 'France', flag: '🇫🇷',
    category: 'government', trustScore: 95, verificationLevel: 'government', status: 'active',
    description: 'International Criminal Police Organization — global law enforcement cooperation and crime intelligence unit.',
    publishedCount: 43, joinedAt: '2025-04-05', nodeId: 'node-interpol',
    allowedTypes: ['signal', 'alert', 'pdf'],
    followers: 34600, website: 'https://interpol.int', founded: '1923',
    headquartersCity: 'Lyon', specialties: ['Cybercrime', 'Terrorism', 'Financial Crime', 'Fugitive Intelligence'],
    liveStreams: [],
  },
  {
    id: 'pub-aljazeera', name: 'Al Jazeera Media', shortName: 'AJE', country: 'Qatar', flag: '🇶🇦',
    category: 'broadcast', trustScore: 82, verificationLevel: 'verified', status: 'active',
    description: 'International Arabic news channel and media network based in Doha. Covering global affairs with a focus on the Middle East and Global South.',
    publishedCount: 891, joinedAt: '2025-02-28',
    allowedTypes: ['news', 'pdf', 'investigation'],
    followers: 210500, website: 'https://aljazeera.com', founded: '1996',
    headquartersCity: 'Doha', specialties: ['Middle East', 'Conflict Coverage', 'Investigative Journalism', 'Arabic Media'],
    liveStreams: [
      { id: 'ls-aje-1', publisherId: 'pub-aljazeera', title: 'Al Jazeera English Live', description: 'Continuous English broadcast', isLive: true, viewers: 34200 },
      { id: 'ls-aje-2', publisherId: 'pub-aljazeera', title: 'AJ+ Breaking', description: 'Breaking news feed', isLive: true, viewers: 12100 },
    ],
  },
  {
    id: 'pub-stanford', name: 'Stanford AI Lab', shortName: 'SAIL', country: 'United States', flag: '🇺🇸',
    category: 'university', trustScore: 98, verificationLevel: 'institutional', status: 'active',
    description: 'Stanford Artificial Intelligence Laboratory — world leader in AI research spanning machine learning, robotics, NLP and AI ethics.',
    publishedCount: 178, joinedAt: '2025-03-15', nodeId: 'node-stanford',
    allowedTypes: ['scientific', 'latex_report', 'pdf', 'ai_report', 'dataset'],
    followers: 53900, website: 'https://ai.stanford.edu', founded: '1962',
    headquartersCity: 'Stanford CA', specialties: ['Machine Learning', 'Robotics', 'NLP', 'AI Safety'],
    liveStreams: [
      { id: 'ls-sail-1', publisherId: 'pub-stanford', title: 'HAI Annual Conference', description: 'Human-Centered AI annual summit', isLive: false, scheduledAt: '2026-06-01' },
    ],
  },
  {
    id: 'pub-lemonde', name: 'Le Monde', shortName: 'LMD', country: 'France', flag: '🇫🇷',
    category: 'newspaper', trustScore: 88, verificationLevel: 'verified', status: 'active',
    description: 'French daily afternoon newspaper founded in 1944. One of the most influential European media outlets with strong international coverage.',
    publishedCount: 1203, joinedAt: '2025-05-01',
    allowedTypes: ['news', 'investigation', 'pdf'],
    followers: 97300, website: 'https://lemonde.fr', founded: '1944',
    headquartersCity: 'Paris', specialties: ['European Politics', 'Culture', 'Investigative Journalism', 'Opinion'],
    liveStreams: [],
  },
  {
    id: 'pub-aria', name: 'ARIA Intelligence', shortName: 'ARIA', country: 'United Kingdom', flag: '🇬🇧',
    category: 'research_institute', trustScore: 96, verificationLevel: 'verified', status: 'active',
    description: 'Advanced Research & Invention Agency — UK\'s strategic intelligence and research body. Embedded analytics, geospatial intelligence and AI-assisted signal detection.',
    publishedCount: 312, joinedAt: '2025-01-10', nodeId: 'node-aria',
    allowedTypes: ['ai_report', 'signal', 'alert', 'dataset', 'pdf'],
    followers: 28800, website: 'https://aria.org.uk', founded: '2022',
    headquartersCity: 'London', specialties: ['Strategic Intelligence', 'AI Signals', 'Geospatial Analysis', 'Anomaly Detection'],
    liveStreams: [
      { id: 'ls-aria-1', publisherId: 'pub-aria', title: 'ARIA Signal Monitor', description: 'Live signal anomaly feed', isLive: true, viewers: 1840 },
    ],
  },
  {
    id: 'pub-pending1', name: 'GlobalWatch NGO', shortName: 'GW', country: 'Netherlands', flag: '🇳🇱',
    category: 'ngo', trustScore: 61, verificationLevel: 'pending', status: 'pending',
    description: 'Independent watchdog organization monitoring global financial flows and institutional corruption.',
    publishedCount: 0, joinedAt: '2026-05-18',
    allowedTypes: ['news', 'investigation'],
    followers: 0, website: 'https://globalwatch.org', founded: '2019',
    headquartersCity: 'Amsterdam', specialties: ['Financial Transparency', 'Anti-Corruption', 'NGO Oversight'],
    liveStreams: [],
  },
  {
    id: 'pub-pending2', name: 'Seoul Economic Times', shortName: 'SET', country: 'South Korea', flag: '🇰🇷',
    category: 'newspaper', trustScore: 74, verificationLevel: 'pending', status: 'pending',
    description: 'South Korean financial newspaper specializing in Asia-Pacific market analysis, semiconductor industry and Korean macroeconomics.',
    publishedCount: 0, joinedAt: '2026-05-20',
    allowedTypes: ['news', 'dataset'],
    followers: 0, website: 'https://seoulecon.kr', founded: '2015',
    headquartersCity: 'Seoul', specialties: ['Asia-Pacific Markets', 'Semiconductor Industry', 'Korean Economy'],
    liveStreams: [],
  },
];

// ─── LIVE FEED (initial items) ────────────────────────────────────────────────
export const mockLiveFeed: LiveFeedItem[] = [
  {
    id: 'lf-001', type: 'signal', title: 'CRITICAL: Unscheduled Fed Emergency Session Detected',
    excerpt: 'Satellite cross-referencing and insider movement analysis suggests an unscheduled Federal Reserve emergency convening is underway. Bond volatility spikes confirm anomaly at 3-sigma threshold.',
    publisherId: 'pub-aria', publisherName: 'ARIA Intelligence', author: 'ARIA Automated Signal',
    trustScore: 96, verificationLevel: 'verified', timestamp: '2m ago', region: 'United States',
    tags: ['federal reserve', 'monetary policy', 'emergency'], severity: 'critical',
    hasPDF: false, credibilityScore: 94, views: 8421,
  },
  {
    id: 'lf-002', type: 'news', title: 'EU Energy Ministers Reach Emergency Accord on Winter Gas Reserves',
    excerpt: 'Following 72 hours of closed-door negotiations in Brussels, EU energy ministers have reached an emergency accord mandating member states to maintain 90% gas storage capacity by October 1.',
    publisherId: 'pub-eu', publisherName: 'EU Commission Press', author: 'Brussels Bureau',
    trustScore: 89, verificationLevel: 'government', timestamp: '18m ago', region: 'European Union',
    tags: ['energy', 'EU', 'gas reserves', 'winter'], severity: 'high',
    hasPDF: true, credibilityScore: 91, views: 4820,
  },
  {
    id: 'lf-003', type: 'scientific', title: 'Quantum-Resistant Cryptography: Field Implementation Results',
    excerpt: 'MIT Media Lab presents real-world deployment results of lattice-based post-quantum cryptographic algorithms across 14 financial institutions. Average overhead: 2.3ms per transaction.',
    publisherId: 'pub-mit', publisherName: 'MIT Media Lab', author: 'Dr. Yuki Tanaka',
    trustScore: 97, verificationLevel: 'institutional', timestamp: '1h ago', region: 'Global',
    tags: ['quantum', 'cryptography', 'fintech', 'security'],
    hasPDF: true, hasLatex: true, credibilityScore: 98, views: 3102,
  },
  {
    id: 'lf-004', type: 'investigation', title: 'Shadow Fleet: 34 Vessels Circumventing Sanctions Identified',
    excerpt: 'Exclusive investigation using AIS spoofing detection and satellite imagery cross-referenced with port authority records reveals a coordinated network of 34 vessels actively circumventing international oil sanctions.',
    publisherId: 'pub-aljazeera', publisherName: 'Al Jazeera Media', author: 'Investigative Unit',
    trustScore: 82, verificationLevel: 'verified', timestamp: '2h ago', region: 'Middle East / Asia',
    tags: ['sanctions', 'shipping', 'oil', 'investigation'], severity: 'high',
    hasPDF: true, credibilityScore: 87, views: 12400,
  },
  {
    id: 'lf-005', type: 'dataset', title: 'IMF World Economic Outlook: Q2 2026 Full Dataset',
    excerpt: 'Complete dataset release for the IMF World Economic Outlook Q2 2026. Includes GDP projections, inflation forecasts, debt sustainability analysis for 194 member countries.',
    publisherId: 'pub-ap', publisherName: 'Associated Press', author: 'Economics Desk',
    trustScore: 96, verificationLevel: 'verified', timestamp: '3h ago', region: 'Global',
    tags: ['IMF', 'economics', 'GDP', 'forecast'],
    hasPDF: true, credibilityScore: 96, views: 6780,
  },
  {
    id: 'lf-006', type: 'alert', title: 'INTERPOL RED NOTICE: Cybercriminal Network Targeting Critical Infrastructure',
    excerpt: 'INTERPOL issues Red Notice for 7 individuals linked to SCADA exploitation campaign targeting European water treatment and power distribution systems.',
    publisherId: 'pub-interpol', publisherName: 'Interpol Intelligence', author: 'Cybercrime Division',
    trustScore: 95, verificationLevel: 'government', timestamp: '4h ago', region: 'Europe',
    tags: ['interpol', 'cybercrime', 'infrastructure', 'SCADA'], severity: 'critical',
    hasPDF: true, credibilityScore: 97, views: 9230,
  },
  {
    id: 'lf-007', type: 'latex_report', title: 'Neural Scaling Laws in Geopolitical Prediction Models',
    excerpt: 'Stanford AI Lab introduces GEOPRED-7B: a 7-billion parameter language model fine-tuned on declassified geopolitical intelligence reports. Achieves 0.81 AUC on conflict escalation prediction.',
    publisherId: 'pub-stanford', publisherName: 'Stanford AI Lab', author: 'Prof. James Liu',
    trustScore: 98, verificationLevel: 'institutional', timestamp: '6h ago', region: 'Global',
    tags: ['AI', 'geopolitics', 'machine learning', 'prediction'],
    hasPDF: true, hasLatex: true, credibilityScore: 98, views: 4501,
  },
  {
    id: 'lf-008', type: 'news', title: 'South China Sea: Type 055 Destroyer Group Spotted Near Disputed Reef',
    excerpt: 'Reuters exclusive: satellite imagery analysis by Planet Labs shows a PLAN Type 055 destroyer group within 12 nautical miles of Scarborough Shoal, a disputed territory in the South China Sea.',
    publisherId: 'pub-reuters', publisherName: 'Reuters', author: 'Marcus Chen',
    trustScore: 97, verificationLevel: 'verified', timestamp: '8h ago', region: 'South China Sea',
    tags: ['China', 'navy', 'South China Sea', 'geopolitics'], severity: 'high',
    hasPDF: false, credibilityScore: 95, views: 18400,
  },
];
