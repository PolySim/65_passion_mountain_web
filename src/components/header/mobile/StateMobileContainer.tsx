"use client";

import { useHeaderStore } from "@/store/headerStore";
import { useEffect, useState } from "react";
import { HikingState } from "@/types/Categories.type";
import { getCategoryState } from "@/utils/categories/categoriesAction";

const StateMobileContainer = () => {
  const stateOpen = useHeaderStore((state) => state.stateOpen);
  const toggleOpen = useHeaderStore((state) => state.toggleStateOpen);
  const [states, setStates] = useState<HikingState[]>([]);

  useEffect(() => {
    if (stateOpen) {
      getCategoryState(stateOpen).then((res) => {
        setStates(res);
      });
    }
  }, [stateOpen]);

  return (
    <div className="flex flex-col justify-center items-center gap-8 p-4 h-screen w-screen min-w-screen bg-white">
      <p
        className="text-xl font-bold text-orange font-rubik"
        onClick={() => toggleOpen(null)}
      >
        Retour aux catégories
      </p>
      {(states || []).map((state) => (
        <p
          key={`${stateOpen}-${state.id}`}
          className="text-xl font-bold text-black font-rubik"
        >
          {state.state}
        </p>
      ))}
    </div>
  );
};

export default StateMobileContainer;
