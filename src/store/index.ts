import { create } from "zustand";

interface BuddieState {
  token: string;
  setToken: (token: string) => void;
}

export const useBuddieStore = create<BuddieState>()((set) => ({
  token: "",
  setToken: (token) => set((state) => ({ token })),
}));
