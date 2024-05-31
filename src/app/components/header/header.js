import { Suspense } from "react";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import { Logo } from "./logo/logo";
import { CartIcon } from "./cart_icon/cart_icon";
import { Navigation } from "./navigation/navigation";

export const Header = () => {
  return (
    <Navbar shouldHideOnScroll className="bg-stone-900	">
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent justify="center">
        <Suspense fallback={<h1>loading</h1>}>
          <Navigation />
        </Suspense>
      </NavbarContent>
      <NavbarContent justify="end">
        <CartIcon />
      </NavbarContent>
    </Navbar>
  );
};
