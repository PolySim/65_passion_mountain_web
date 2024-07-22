import { Home } from "@/routes";
import NavBar from "@/components/header/NavBar";

const Header = () => {
  return (
    <header className="flex justify-between">
      <Home.Link className="text-green-dark font-bebas tracking-[2px] md:tracking-[3px] text-xl md:text-2xl w-fil text-center">
        65 Passion Montagne
      </Home.Link>
      <NavBar />
    </header>
  );
};

export default Header;
