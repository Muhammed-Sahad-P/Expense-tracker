import { create } from "zustand";

interface AuthState {
  user: { username: string; email: string } | null;
  setUser: (user: { username: string; email: string } | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
