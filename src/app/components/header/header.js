import { Suspense } from "react";

import { Logo } from "./logo/logo";
import { CartIcon } from "./cart_icon/cart_icon";
import styles from "./header.module.css";
import { Navigation } from "./navigation/navigation";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <Suspense fallback={<h1>loading</h1>}>
        <Navigation />
      </Suspense>
      <CartIcon />
    </header>
  );
};
