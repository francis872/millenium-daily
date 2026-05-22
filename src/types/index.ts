export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  content: string;
  excerpt: string;
  author: Author;
  category: ArticleCategory;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  status: 'draft' | 'published' | 'archived';
  type: ArticleType;
  featuredImage?: string;
  views: number;
  aiGenerated: boolean;
  confidenceScore?: number;
  sources: Source[];
}

export interface Author {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  isAI: boolean;
}

export interface Source {
  id: string;
  title: string;
  url: string;
  type: 'primary' | 'secondary' | 'ai';
  reliability: number;
}

export type ArticleCategory =
  | 'geopolitics'
  | 'economy'
  | 'technology'
  | 'science'
  | 'security'
  | 'climate'
  | 'intelligence'
  | 'markets';

export type ArticleType =
  | 'news'
  | 'analysis'
  | 'investigation'
  | 'scientific'
  | 'predictive'
  | 'interactive';

export interface IntelligenceEvent {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  region: string;
  timestamp: string;
  confidence: number;
  sources: number;
  tags: string[];
  trend: 'rising' | 'falling' | 'stable';
}

export interface MarketSignal {
  id: string;
  asset: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  signal: 'bullish' | 'bearish' | 'neutral';
  aiPrediction?: string;
}

export interface GeopoliticalAlert {
  id: string;
  region: string;
  country: string;
  riskLevel: number;
  type: string;
  description: string;
  timestamp: string;
  escalationProbability: number;
}

export interface PredictionModel {
  id: string;
  title: string;
  description: string;
  category: string;
  probability: number;
  confidence: number;
  timeframe: string;
  trend: number[];
  factors: string[];
  lastUpdated: string;
}

export interface AIInsight {
  id: string;
  type: 'summary' | 'alert' | 'prediction' | 'anomaly';
  title: string;
  content: string;
  confidence: number;
  timestamp: string;
  relatedArticles?: string[];
}

export interface ChartDataPoint {
  timestamp: string;
  value: number;
  label?: string;
}

// ── CHRONIQ Types ─────────────────────────────────────────────────────────────

export type FeedContentType =
  | 'news'
  | 'pdf'
  | 'scientific'
  | 'latex_report'
  | 'dataset'
  | 'ai_report'
  | 'signal'
  | 'alert'
  | 'live_stream'
  | 'dashboard'
  | 'investigation';

export type TrustLevel = 'verified' | 'institutional' | 'analyst' | 'partner' | 'government' | 'pending';

export interface ChroniqNode {
  id: string;
  label: string;
  type: 'agency' | 'journalist' | 'researcher' | 'government' | 'university' | 'analyst' | 'institution';
  trustScore: number;
  verificationLevel: TrustLevel;
  country: string;
  connections: number;
  credibilityLayer: string;
  publishCount: number;
  x?: number;
  y?: number;
}

export interface ChroniqEdge {
  source: string;
  target: string;
  type: 'trust' | 'verification' | 'collaboration' | 'reference' | 'publishing';
  weight: number;
}

export interface ChroniqFeedItem {
  id: string;
  type: FeedContentType;
  title: string;
  excerpt: string;
  author: string;
  authorNode?: string; // graph node id
  institution: string;
  trustScore: number;
  verificationLevel: TrustLevel;
  timestamp: string;
  region?: string;
  tags: string[];
  entities: string[];
  relatedIds: string[];
  severity?: 'critical' | 'high' | 'medium' | 'low';
  hasLatex?: boolean;
  hasPDF?: boolean;
  hasChart?: boolean;
  signalStrength?: number;
  credibilityScore: number;
  views: number;
  propagationScore: number;
}

export type PublisherCategory =
  | 'news_agency'
  | 'newspaper'
  | 'research_institute'
  | 'government'
  | 'university'
  | 'ngo'
  | 'financial_media'
  | 'broadcast';

export interface Publisher {
  id: string;
  name: string;
  shortName: string;
  country: string;
  flag: string;
  category: PublisherCategory;
  trustScore: number;
  verificationLevel: TrustLevel;
  status: 'active' | 'pending' | 'suspended';
  description: string;
  publishedCount: number;
  joinedAt: string;
  nodeId?: string; // linked graph node
  allowedTypes: FeedContentType[];
}

export interface LiveFeedItem {
  id: string;
  type: FeedContentType;
  title: string;
  excerpt: string;
  publisherId: string;
  publisherName: string;
  author: string;
  trustScore: number;
  verificationLevel: TrustLevel;
  timestamp: string;
  region?: string;
  tags: string[];
  severity?: 'critical' | 'high' | 'medium' | 'low';
  hasPDF?: boolean;
  pdfUrl?: string;       // blob URL for uploaded PDFs
  hasLatex?: boolean;
  latexContent?: string;
  credibilityScore: number;
  views: number;
}

export interface AnomalySignal {
  id: string;
  type: 'financial' | 'geopolitical' | 'narrative' | 'social' | 'market' | 'security';
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  confidence: number;
  detectedAt: string;
  region: string;
  signalScore: number;
  escalationProbability: number;
  relatedEntities: string[];
  timeline: { t: string; v: number }[];
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  institution: string;
  abstract: string;
  hasLatex: boolean;
  hasPDF: boolean;
  citationCount: number;
  publishedAt: string;
  category: string;
  trustScore: number;
  doi?: string;
  equations?: string[];
}
