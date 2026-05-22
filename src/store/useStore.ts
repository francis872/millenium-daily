import { create } from 'zustand';
import { Article, IntelligenceEvent, MarketSignal, AIInsight } from '@/types';

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

  setActiveSection: (section: string) => void;
  toggleSidebar: () => void;
  toggleAIPanel: () => void;
  setSelectedArticle: (article: Article | null) => void;
  toggleLiveMode: () => void;
  setSearchQuery: (query: string) => void;
  addAlert: (alert: IntelligenceEvent) => void;
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

  setActiveSection: (section) => set({ activeSection: section }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleAIPanel: () => set((state) => ({ aiPanelOpen: !state.aiPanelOpen })),
  setSelectedArticle: (article) => set({ selectedArticle: article }),
  toggleLiveMode: () => set((state) => ({ liveMode: !state.liveMode })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  addAlert: (alert) => set((state) => ({ alerts: [alert, ...state.alerts.slice(0, 49)] })),
}));
