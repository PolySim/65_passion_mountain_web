import WindowSizeContainer from "@/service/WindowSizeContainer";
import NavBarMobile from "@/components/header/NavBarMobile";
import NavBarDesktop from "@/components/header/NavBarDesktop";

const NavBar = () => {
  const width = 1048;
  return (
    <>
      <WindowSizeContainer maxWidth={width}>
        <NavBarMobile />
      </WindowSizeContainer>
      <WindowSizeContainer minWidth={width}>
        <NavBarDesktop />
      </WindowSizeContainer>
    </>
  );
};

export default NavBar;
