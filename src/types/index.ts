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
