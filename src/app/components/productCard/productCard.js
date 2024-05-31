"use client";
import { useState } from "react";
import Image from "next/image";
import Cookie from "js-cookie";
import { formatPrice } from "@/app/lib/formatPrice";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import styles from "./productCard.module.css";
import { ProductImage } from "./productImage";
import LinkNext from "next/link";
import { Link } from "@nextui-org/link";

export const ProductCard = ({ productId, productName, imageUrl, price }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
      onOpen();
      setError("");
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Dodano do koszyka
              </ModalHeader>
              <ModalBody>
                <p>Produkt został dodany do koszyka</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Wróć
                </Button>
                <Button
                  as={Link}
                  href="/koszyk"
                  color="success"
                  onPress={onClose}
                >
                  Przejdź do koszyka
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
