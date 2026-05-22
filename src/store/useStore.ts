import { create } from 'zustand';
import { Article, IntelligenceEvent, MarketSignal, AIInsight, LiveFeedItem, Publisher } from '@/types';
import { mockPublishers, mockLiveFeed } from '@/data/mockData';

interface DashboardState {
  activeSection: string;
  sidebarOpen: boolean;
  aiPanelOpen: boolean;
  selectedArticle: Article | null;
  liveMode: boolean;
  alerts: IntelligenceEvent[];
  signals: MarketSignal[];
  insights: AIInsight[];
  searchQuery: string;
  // Publisher & Feed state
  feedItems: LiveFeedItem[];
  publishers: Publisher[];
  followedPublisherIds: string[];
  selectedPdfUrl: string | null;
  selectedPdfTitle: string | null;

  setActiveSection: (section: string) => void;
  toggleSidebar: () => void;
  toggleAIPanel: () => void;
  setSelectedArticle: (article: Article | null) => void;
  toggleLiveMode: () => void;
  setSearchQuery: (query: string) => void;
  addAlert: (alert: IntelligenceEvent) => void;
  addFeedItem: (item: LiveFeedItem) => void;
  addPublisher: (pub: Publisher) => void;
  updatePublisherStatus: (id: string, status: Publisher['status']) => void;
  followPublisher: (id: string) => void;
  unfollowPublisher: (id: string) => void;
  openPdf: (url: string, title: string) => void;
  closePdf: () => void;
}

export const useStore = create<DashboardState>((set) => ({
  activeSection: 'dashboard',
  sidebarOpen: true,
  aiPanelOpen: false,
  selectedArticle: null,
  liveMode: true,
  alerts: [],
  signals: [],
  insights: [],
  searchQuery: '',
  feedItems: mockLiveFeed,
  publishers: mockPublishers,
  followedPublisherIds: [],
  selectedPdfUrl: null,
  selectedPdfTitle: null,

  setActiveSection: (section) => set({ activeSection: section }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleAIPanel: () => set((state) => ({ aiPanelOpen: !state.aiPanelOpen })),
  setSelectedArticle: (article) => set({ selectedArticle: article }),
  toggleLiveMode: () => set((state) => ({ liveMode: !state.liveMode })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  addAlert: (alert) => set((state) => ({ alerts: [alert, ...state.alerts.slice(0, 49)] })),
  addFeedItem: (item) => set((state) => ({ feedItems: [item, ...state.feedItems] })),
  addPublisher: (pub) => set((state) => ({ publishers: [...state.publishers, pub] })),
  updatePublisherStatus: (id, status) =>
    set((state) => ({
      publishers: state.publishers.map(p => p.id === id ? { ...p, status } : p),
    })),
  followPublisher: (id) =>
    set((state) => ({
      followedPublisherIds: state.followedPublisherIds.includes(id)
        ? state.followedPublisherIds
        : [...state.followedPublisherIds, id],
      publishers: state.publishers.map(p => p.id === id ? { ...p, followers: p.followers + 1 } : p),
    })),
  unfollowPublisher: (id) =>
    set((state) => ({
      followedPublisherIds: state.followedPublisherIds.filter(f => f !== id),
      publishers: state.publishers.map(p => p.id === id ? { ...p, followers: Math.max(0, p.followers - 1) } : p),
    })),
  openPdf: (url, title) => set({ selectedPdfUrl: url, selectedPdfTitle: title }),
  closePdf: () => set({ selectedPdfUrl: null, selectedPdfTitle: null }),
}));
