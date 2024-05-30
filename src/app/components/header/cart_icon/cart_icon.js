import Image from "next/image";
import Link from "next/link";

export const CartIcon = () => {
  return (
    <Link href="/koszyk">
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
