import { useState } from "react";
import Cookie from "js-cookie";
import { toast } from "react-toastify";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

export const AddedToBasketModal = ({ isOpen, onOpenChange }) => (
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
            <Button as={Link} href="/koszyk" color="success" onPress={onClose}>
              Przejdź do koszyka
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
);

export const useAddToBasket = ({ productId, openModal }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToBasket = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    setIsLoading(true);
    const basketId = Cookie.get("basketId");
    try {
      const endpoint = basketId
        ? `http://localhost:3000/api/order/${basketId}/products`
        : "http://localhost:3000/api/order";
      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({ productId }),
      });

      const data = response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }
      openModal();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleAddToBasket };
};
