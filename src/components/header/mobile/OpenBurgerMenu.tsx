"use client";

import { useHeaderStore } from "@/store/headerStore";

const OpenBurgerMenu = () => {
  const burgerMenuOpen = useHeaderStore((state) => state.burgerMenuOpen);
  const setBurgerMenuOpen = useHeaderStore(
    (state) => state.toggleBurgerMenuOpen,
  );

  return (
    <div
      onClick={setBurgerMenuOpen}
      className={`flex z-30 relative text-black w-[50px] mt-2.5 ${burgerMenuOpen ? "menu-open" : "menu-close"}`}
    >
      <span />
      <span />
      <span />
    </div>
  );
};

export default OpenBurgerMenu;
