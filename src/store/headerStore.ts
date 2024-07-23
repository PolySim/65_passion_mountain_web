import { create } from "zustand";

type HeaderStore = {
  imageHover: number;
  setImageHover: (index: number) => void;
  burgerMenuOpen: boolean;
  toggleBurgerMenuOpen: () => void;
  stateOpen: number | null;
  toggleStateOpen: (categoryId: number | null) => void;
};

export const useHeaderStore = create<HeaderStore>()((set) => ({
  imageHover: 0,
  setImageHover: (index: number) => set(() => ({ imageHover: index })),
  burgerMenuOpen: false,
  toggleBurgerMenuOpen: () =>
    set((state) => ({
      burgerMenuOpen: !state.burgerMenuOpen,
      stateOpen: null,
    })),
  stateOpen: null,
  toggleStateOpen: (categoryId) => set((state) => ({ stateOpen: categoryId })),
}));
