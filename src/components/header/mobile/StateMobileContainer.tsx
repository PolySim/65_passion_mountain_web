"use client";

import { useHeaderStore } from "@/store/headerStore";
import React, { useEffect, useState } from "react";
import { HikingState } from "@/types/Categories.type";
import { getCategoryState } from "@/utils/categories/categoriesAction";
import CloseModalContainer from "@/components/header/mobile/CloseModalContainer";
import { CategoryId } from "@/routes";

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
      <CloseModalContainer>
        <CategoryId.Link
          categoryId={stateOpen?.toString() || ""}
          className="text-xl font-bold text-black font-rubik"
        >
          Voir tout
        </CategoryId.Link>
      </CloseModalContainer>
      {(states || []).map((state) => (
        <React.Fragment key={`${stateOpen}-${state.id}`}>
          <CloseModalContainer>
            <p className="text-xl font-bold text-black font-rubik">
              {state.state}
            </p>
          </CloseModalContainer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default StateMobileContainer;
