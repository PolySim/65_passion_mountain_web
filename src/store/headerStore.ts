import { create } from "zustand";

type HeaderStore = {
  imageHover: number;
  setImageHover: (index: number) => void;
};

export const useHeaderStore = create<HeaderStore>()((set) => ({
  imageHover: 0,
  setImageHover: (index: number) => set(() => ({ imageHover: index })),
}));
