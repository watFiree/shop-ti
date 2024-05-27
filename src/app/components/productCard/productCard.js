"use client";
import { useState } from "react";
import Image from "next/image";
import Cookie from "js-cookie";
import { formatPrice } from "@/app/lib/formatPrice";
import styles from "./productCard.module.css";
import { ProductImage } from "./productImage";
import Link from "next/link";

export const ProductCard = ({ productId, productName, imageUrl, price }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState("");

  const handleAddToBasket = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    setIsLoading(true);
    setError("");
    const basketId = Cookie.get("basketId");
    try {
      const response = await fetch("http://localhost:3000/api/order", {
        method: basketId ? "PUT" : "POST",
        body: JSON.stringify({ productId }),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }

      setError("");
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link href={`/p/${productId}`}>
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
    </Link>
  );
};
