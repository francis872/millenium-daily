import { readFileSync, writeFileSync } from 'fs';

const existing = readFileSync('src/data/mockData.ts', 'utf8');

const additions = `
// ─── PUBLISHER REGISTRY ──────────────────────────────────────────────────────
export const mockPublishers: Publisher[] = [
  {
    id: 'pub-reuters', name: 'Reuters', shortName: 'RTRS', country: 'United Kingdom', flag: '🇬🇧',
    category: 'news_agency', trustScore: 97, verificationLevel: 'verified', status: 'active',
    description: 'International news organization covering world affairs, business and markets.',
    publishedCount: 1842, joinedAt: '2025-01-15', nodeId: 'node-reuters',
    allowedTypes: ['news', 'pdf', 'dataset'],
  },
  {
    id: 'pub-ap', name: 'Associated Press', shortName: 'AP', country: 'United States', flag: '🇺🇸',
    category: 'news_agency', trustScore: 96, verificationLevel: 'verified', status: 'active',
    description: 'Not-for-profit news agency headquartered in New York City.',
    publishedCount: 2103, joinedAt: '2025-01-15', nodeId: 'node-ap',
    allowedTypes: ['news', 'pdf', 'ai_report'],
  },
  {
    id: 'pub-mit', name: 'MIT Media Lab', shortName: 'MIT', country: 'United States', flag: '🇺🇸',
    category: 'research_institute', trustScore: 97, verificationLevel: 'institutional', status: 'active',
    description: 'Interdisciplinary research laboratory at MIT studying technology and society.',
    publishedCount: 234, joinedAt: '2025-02-10', nodeId: 'node-mit',
    allowedTypes: ['scientific', 'pdf', 'latex_report', 'dataset', 'ai_report'],
  },
  {
    id: 'pub-cern', name: 'CERN Research', shortName: 'CERN', country: 'Switzerland', flag: '🇨🇭',
    category: 'research_institute', trustScore: 99, verificationLevel: 'institutional', status: 'active',
    description: 'European Organization for Nuclear Research — world leading physics laboratory.',
    publishedCount: 89, joinedAt: '2025-03-01', nodeId: 'node-cern',
    allowedTypes: ['scientific', 'latex_report', 'pdf', 'dataset'],
  },
  {
    id: 'pub-eu', name: 'EU Commission Press', shortName: 'EU', country: 'Belgium', flag: '🇪🇺',
    category: 'government', trustScore: 89, verificationLevel: 'government', status: 'active',
    description: 'Official press service of the European Commission.',
    publishedCount: 567, joinedAt: '2025-01-20', nodeId: 'node-eu',
    allowedTypes: ['news', 'pdf', 'dataset'],
  },
  {
    id: 'pub-interpol', name: 'Interpol Intelligence', shortName: 'INTPOL', country: 'France', flag: '🇫🇷',
    category: 'government', trustScore: 95, verificationLevel: 'government', status: 'active',
    description: 'International Criminal Police Organization — crime intelligence unit.',
    publishedCount: 43, joinedAt: '2025-04-05', nodeId: 'node-interpol',
    allowedTypes: ['signal', 'alert', 'pdf'],
  },
  {
    id: 'pub-aljazeera', name: 'Al Jazeera Media', shortName: 'AJE', country: 'Qatar', flag: '🇶🇦',
    category: 'broadcast', trustScore: 82, verificationLevel: 'verified', status: 'active',
    description: 'International Arabic news channel and media network based in Doha.',
    publishedCount: 891, joinedAt: '2025-02-28',
    allowedTypes: ['news', 'pdf', 'investigation'],
  },
  {
    id: 'pub-stanford', name: 'Stanford AI Lab', shortName: 'SAIL', country: 'United States', flag: '🇺🇸',
    category: 'university', trustScore: 98, verificationLevel: 'institutional', status: 'active',
    description: 'Stanford Artificial Intelligence Laboratory — cutting edge AI research.',
    publishedCount: 178, joinedAt: '2025-03-15', nodeId: 'node-stanford',
    allowedTypes: ['scientific', 'latex_report', 'pdf', 'ai_report', 'dataset'],
  },
  {
    id: 'pub-lemonde', name: 'Le Monde', shortName: 'LMD', country: 'France', flag: '🇫🇷',
    category: 'newspaper', trustScore: 88, verificationLevel: 'verified', status: 'active',
    description: 'French daily afternoon newspaper with strong international focus.',
    publishedCount: 1203, joinedAt: '2025-05-01',
    allowedTypes: ['news', 'investigation', 'pdf'],
  },
  {
    id: 'pub-aria', name: 'ARIA Intelligence', shortName: 'ARIA', country: 'United Kingdom', flag: '🇬🇧',
    category: 'research_institute', trustScore: 96, verificationLevel: 'verified', status: 'active',
    description: 'Advanced Research & Invention Agency — UK strategic intelligence research.',
    publishedCount: 312, joinedAt: '2025-01-10', nodeId: 'node-aria',
    allowedTypes: ['ai_report', 'signal', 'alert', 'dataset', 'pdf'],
  },
  {
    id: 'pub-pending1', name: 'GlobalWatch NGO', shortName: 'GW', country: 'Netherlands', flag: '🇳🇱',
    category: 'ngo', trustScore: 61, verificationLevel: 'pending', status: 'pending',
    description: 'Independent watchdog organization monitoring global financial flows.',
    publishedCount: 0, joinedAt: '2026-05-18',
    allowedTypes: ['news', 'investigation'],
  },
  {
    id: 'pub-pending2', name: 'Seoul Economic Times', shortName: 'SET', country: 'South Korea', flag: '🇰🇷',
    category: 'newspaper', trustScore: 74, verificationLevel: 'pending', status: 'pending',
    description: 'South Korean financial newspaper specializing in Asia-Pacific markets.',
    publishedCount: 0, joinedAt: '2026-05-20',
    allowedTypes: ['news', 'dataset'],
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
`;

writeFileSync('src/data/mockData.ts', existing + additions, 'utf8');
console.log('Added', additions.length, 'chars to mockData.ts');
