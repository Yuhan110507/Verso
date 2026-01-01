import { create } from 'zustand';
import { User } from 'firebase/auth';

interface AppState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  sidebarOpen: boolean;
  currentWork: string | null;
  readingMode: 'normal' | 'immerse' | 'typewriter';

  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSidebarOpen: (open: boolean) => void;
  setCurrentWork: (workId: string | null) => void;
  setReadingMode: (mode: 'normal' | 'immerse' | 'typewriter') => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  sidebarOpen: true,
  currentWork: null,
  readingMode: 'normal',

  setUser: (user) => set({ user }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setCurrentWork: (workId) => set({ currentWork: workId }),
  setReadingMode: (mode) => set({ readingMode: mode }),
}));
