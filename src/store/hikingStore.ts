import { create } from "zustand";

type UseHikingStore = {
  imageIndexOpen: number | null;
  setImageIndexOpen: (index: number | null) => void;
};

export const useHikingStore = create<UseHikingStore>()((set) => ({
  imageIndexOpen: null,
  setImageIndexOpen: (index: number | null) =>
    set(() => ({ imageIndexOpen: index })),
}));
