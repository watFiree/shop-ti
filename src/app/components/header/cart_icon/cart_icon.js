import Image from "next/image";
import Link from "next/link";
import { pathname } from "@/app/koszyk/page";

export const CartIcon = () => {
  return (
    <Link href={pathname}>
      <Image
        src="/cart.svg"
        alt="Koszyk"
        style={{ filter: "invert(100%)" }}
        width={32}
        height={32}
        priority
      />
    </Link>
  );
};
