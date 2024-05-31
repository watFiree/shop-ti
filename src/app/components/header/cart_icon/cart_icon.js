import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

export const CartIcon = () => {
  return (
    <Button
      color="primary"
      as={Link}
      href="/koszyk"
      startContent={
        <Image
          src="/cart.svg"
          alt="Koszyk"
          style={{ filter: "invert(100%)" }}
          width={24}
          height={24}
          priority
        />
      }
    >
      Koszyk
    </Button>
  );
};
