import { readFileSync, writeFileSync } from 'fs';

const file = readFileSync('src/data/mockData.ts', 'utf8');

const oldBlock = `export const mockPublishers: Publisher[] = [
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
];`;

const newBlock = `export const mockPublishers: Publisher[] = [
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
];`;

if (!file.includes("id: 'pub-reuters'")) {
  console.error('Could not find mockPublishers block');
  process.exit(1);
}

const updated = file.replace(oldBlock, newBlock);
if (updated === file) {
  console.error('Replacement had no effect — block not matched exactly');
  process.exit(1);
}
writeFileSync('src/data/mockData.ts', updated, 'utf8');
console.log('mockPublishers updated with extended fields');
