import OpenBurgerMenu from "@/components/header/mobile/OpenBurgerMenu";
import { CategoryInformation } from "@/types/Categories.type";
import React from "react";
import CategoryMobile from "@/components/header/mobile/CategoryMobile";
import CategoriesMobileContainer from "@/components/header/mobile/CategoriesMobileContainer";
import StateMobileContainer from "@/components/header/mobile/StateMobileContainer";

const BurgerMenu = ({ categories }: { categories: CategoryInformation[] }) => {
  return (
    <>
      <OpenBurgerMenu />
      <CategoriesMobileContainer>
        <div className="flex flex-col justify-center items-center gap-8 p-4 w-screen min-w-screen h-screen bg-white ">
          <p className="text-xl font-bold text-orange font-rubik">Favoris</p>
          {categories.map((category, index) => (
            <React.Fragment key={index}>
              <CategoryMobile category={category} />
            </React.Fragment>
          ))}
        </div>
        <StateMobileContainer />
      </CategoriesMobileContainer>
    </>
  );
};

export default BurgerMenu;
