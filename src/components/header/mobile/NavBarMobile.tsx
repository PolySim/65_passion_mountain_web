import { CategoryInformation } from "@/types/Categories.type";
import { UserService } from "@/service/UserService";
import { Button } from "@/components/ui/button";
import React from "react";
import BurgerMenu from "@/components/header/mobile/BurgerMenu";

const NavBarMobile = async ({
  categories,
}: {
  categories: CategoryInformation[];
}) => {
  const isAdmin = await UserService.isAdmin();

  return (
    <div className="flex gap-6">
      {isAdmin && <Button weight="bold">Admin</Button>}
      <BurgerMenu categories={categories} />
    </div>
  );
};

export default NavBarMobile;
