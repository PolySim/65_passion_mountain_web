import { Claims } from "@auth0/nextjs-auth0";
import { create } from "zustand";

type UseUserStore = {
  user: Claims | null;
  setUser: (user: Claims) => void;
  idToken: string | null;
  setIdToken: (idToken: string) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
};

export const useUserStore = create<UseUserStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  idToken: null,
  setIdToken: (idToken) => set({ idToken }),
  isAdmin: false,
  setIsAdmin: (isAdmin) => set({ isAdmin }),
}));
