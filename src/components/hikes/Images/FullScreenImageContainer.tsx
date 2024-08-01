"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { useHikingStore } from "@/store/hikingStore";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const FullScreenImageContainer = ({
  children,
  imageLength,
}: PropsWithChildren<{ imageLength: number }>) => {
  const [isOpen, setIsOpen] = useState(false);
  const imageIndexOpen = useHikingStore((state) => state.imageIndexOpen);
  const setImageIndexOpen = useHikingStore((state) => state.setImageIndexOpen);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageIndexOpen === null) {
      setIsOpen(false);
    } else if (!isOpen) {
      setTimeout(() => {
        setIsOpen(true);
      }, 100);
    }
    const element = containerRef.current;
    if (element) {
      element.scrollLeft = (imageIndexOpen || 0) * window.innerWidth;
    }
  }, [imageIndexOpen, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const toggleNavigation = (isLeft: boolean) => {
    if (imageIndexOpen === null) return;
    if (isLeft) {
      setImageIndexOpen(
        imageIndexOpen === 0 ? imageLength - 1 : imageIndexOpen - 1,
      );
    } else {
      setImageIndexOpen(
        imageIndexOpen === imageLength - 1 ? 0 : imageIndexOpen + 1,
      );
    }
  };

  const handleKeys = (keyEvent: KeyboardEvent) => {
    switch (keyEvent.key) {
      case "Escape":
        setImageIndexOpen(null);
        break;
      case "ArrowLeft":
        toggleNavigation(true);
        break;
      case "ArrowRight":
        toggleNavigation(false);
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeys);
    return () => {
      document.removeEventListener("keydown", handleKeys);
    };
  });

  return (
    imageIndexOpen !== null && (
      <div
        ref={containerRef}
        className={cn(
          "flex fixed top-0 left-0 bg-black/70 w-screen h-screen overflow-x-auto snap-x snap-mandatory  z-10",
          {
            "scroll-smooth": isOpen,
          },
        )}
      >
        <X
          className="fixed top-4 right-4 text-white h-8 w-8 z-20 cursor-pointer"
          onClick={() => setImageIndexOpen(null)}
        />
        <ChevronLeft
          onClick={() => toggleNavigation(true)}
          className="fixed top-1/2 left-4 -translate-y-1/2 text-white h-8 w-8 z-20 cursor-pointer"
        />
        <ChevronRight
          onClick={() => toggleNavigation(false)}
          className="fixed top-1/2 right-4 -translate-y-1/2 text-white h-8 w-8 z-20 cursor-pointer"
        />
        {children}
      </div>
    )
  );
};

export default FullScreenImageContainer;
