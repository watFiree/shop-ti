"use client";
import Image from "next/image";
import { formatPrice } from "@/app/lib/formatPrice";
import { useDisclosure } from "@nextui-org/modal";
import styles from "./productCard.module.css";
import { ProductImage } from "./productImage";
import { AddedToBasketModal, useAddToBasket } from "./useAddToBasket";
import LinkNext from "next/link";

export const ProductCard = ({ productId, productName, imageUrl, price }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { handleAddToBasket, isLoading } = useAddToBasket({
    openModal: onOpen,
    productId: productId,
  });

  return (
    <>
      <LinkNext href={`/p/${productId}`}>
        <div className={styles.productCard}>
          <ProductImage
            src={imageUrl}
            alt={productName}
            height={256}
            width={256}
          />
          <h2>{productName}</h2>
          <div className={styles.footer}>
            <p>{formatPrice(price)}</p>
            <button onClick={handleAddToBasket} disabled={isLoading}>
              <Image
                src="/addBasket.svg"
                alt="Dodaj do koszyka"
                style={{ filter: "invert(100%)" }}
                width={22}
                height={22}
                priority
              />
            </button>
          </div>
        </div>
      </LinkNext>
      <AddedToBasketModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};
