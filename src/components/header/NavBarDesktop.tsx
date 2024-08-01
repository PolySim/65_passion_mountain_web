import { Button } from "@/components/ui/button";
import { UserService } from "@/service/UserService";
import { CategoryInformation } from "@/types/Categories.type";
import React from "react";
import ImageVisible from "./ImageVisible";
import Image from "next/image";
import CategoryHover from "./CategoryHover";
import HikingSate from "@/components/header/HikingSate";
import { CategoryId } from "@/routes";
import Logout from "@/components/header/Logout";

const NavBarDesktop = async ({
  categories,
}: {
  categories: CategoryInformation[];
}) => {
  const isAdmin = await UserService.isAdmin();

  return (
    <div className="flex items-center gap-4 w-fit">
      <div className="group relative py-4">
        <Button
          variant="ghost"
          weight="bold"
          className="hover:text-black text-base"
        >
          Categories
        </Button>
        <div className="absolute hidden group-hover:flex gap-8 top-full -left-full bg-white rounded-2xl border border-black/10 p-4 z-20 h-[400px] w-[581px]">
          <div className="flex flex-col justify-around">
            {categories.map((category, index) => (
              <React.Fragment key={index}>
                <CategoryHover category={category} index={index} />
              </React.Fragment>
            ))}
          </div>
          {categories.map((category, index) => (
            <React.Fragment key={category.id}>
              <ImageVisible index={index}>
                {index < 4 ? (
                  <HikingSate category={category} index={index} />
                ) : (
                  <Image
                    src={`${process.env.API_URL}/categories/getImage/${category.id}`}
                    alt={category.name}
                    className="object-cover rounded-lg"
                    width={300}
                    height={400}
                  />
                )}
              </ImageVisible>
            </React.Fragment>
          ))}
        </div>
      </div>
      <Button
        variant="ghost"
        weight="bold"
        className="text-orange text-base"
        asChild
      >
        <CategoryId.Link categoryId="favorite">Mes Favoris</CategoryId.Link>
      </Button>
      {isAdmin && <Button weight="bold">Admin</Button>}
      <Logout />
    </div>
  );
};

export default NavBarDesktop;
