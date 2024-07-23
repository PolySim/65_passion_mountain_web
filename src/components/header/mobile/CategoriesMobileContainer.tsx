"use client";

import { PropsWithChildren, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useHeaderStore } from "@/store/headerStore";

const CategoriesMobileContainer = ({ children }: PropsWithChildren) => {
  const isOpen = useHeaderStore((state) => state.burgerMenuOpen);
  const state = useHeaderStore((state) => state.stateOpen);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!isOpen || !element) return;
    if (state === null) {
      element.scrollLeft = 0;
    } else {
      element.scrollLeft = window.innerWidth;
    }
  }, [state, isOpen]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute transition top-0 left-0 h-screen w-screen overflow-x-hidden flex scroll-smooth",
        {
          "-translate-x-full": !isOpen,
          "translate-x-0": isOpen,
        },
      )}
    >
      {children}
    </div>
  );
};

export default CategoriesMobileContainer;
