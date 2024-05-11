"use client"; //change to server side
import Image from "next/image";
import { formatPrice } from "@/app/lib/formatPrice";
import styles from "./productCard.module.css";
import { ProductImage } from "./productImage";
import Link from "next/link";

export const ProductCard = ({ productId, productName, imageUrl, price }) => {
  const handleAddToCart = (e) => {
    e.stopPropagation();
    console.log(`Product with id ${productId} added to cart`);
  };

  return (
    <Link href={`/p/${productId}`} className={styles.productCard}>
      <ProductImage src={imageUrl} alt={productName} height={256} width={256} />
      <h2>{productName}</h2>
      <div className={styles.footer}>
        <p>{formatPrice(price)}</p>
        <button onClick={handleAddToCart}>
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
    </Link>
  );
};
