"use client";

import { PropsWithChildren, useRef } from "react";

const CarouselContainer = ({ children }: PropsWithChildren) => {
  const containerRef = useRef<HTMLDivElement>(null);

  setInterval(() => {
    const element = containerRef.current;
    if (element) {
      element.scrollLeft =
        element.scrollLeft >= 3 * window.innerWidth
          ? 0
          : element.scrollLeft + window.innerWidth;
    }
  }, 10000);

  return (
    <div
      className="flex h-full w-screen overflow-x-hidden scroll-smooth"
      ref={containerRef}
    >
      {children}
    </div>
  );
};

export default CarouselContainer;
