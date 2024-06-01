"use client";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { toast } from "react-toastify";
import { formatPrice } from "@/app/lib/formatPrice";

export const PlaceOrderButton = ({ price, orderId }) => {
  const router = useRouter();

  const placeAnOrder = async () => {
    const deliveryAddressString = sessionStorage.getItem("deliveryForm");
    const deliveryAddressData = JSON.parse(deliveryAddressString);
    if (Object.values(deliveryAddressData).some((value) => !value)) {
      toast.error("Brakujące dane w formularzu");
      return;
    }

    try {
      const response = await fetch(`./api/order/${orderId}`, {
        method: "PUT",
        body: JSON.stringify({ deliveryAddressData }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }

      router.push(`/podsumowanie/${orderId}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Button
      color="success"
      variant="shadow"
      size="lg"
      endContent={
        <Chip variant="shadow">Do zapłaty: {formatPrice(price)}</Chip>
      }
      onClick={placeAnOrder}
    >
      Złóż zamówienie
    </Button>
  );
};
