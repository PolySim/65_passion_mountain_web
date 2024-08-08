import WindowSizeContainer from "@/service/WindowSizeContainer";
import NavBarMobile from "@/components/header/mobile/NavBarMobile";
import NavBarDesktop from "@/components/header/NavBarDesktop";
import { getCategories } from "@/utils/categories/categoriesAction";

const NavBar = async () => {
  const WIDTH = 1048;

  const categories = await getCategories();
  return (
    <>
      <WindowSizeContainer maxWidth={WIDTH}>
        <NavBarMobile categories={categories} />
      </WindowSizeContainer>
      <WindowSizeContainer minWidth={WIDTH}>
        <NavBarDesktop categories={categories} />
      </WindowSizeContainer>
    </>
  );
};

export default NavBar;
