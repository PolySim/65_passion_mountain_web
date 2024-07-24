"use client";

import React, { PropsWithChildren } from "react";
import { useHeaderStore } from "@/store/headerStore";

const CloseModalContainer = ({ children }: PropsWithChildren) => {
  const toggleBurgerOpen = useHeaderStore(
    (state) => state.toggleBurgerMenuOpen,
  );

  return <div onClick={() => toggleBurgerOpen()}>{children}</div>;
};

export default CloseModalContainer;
