"use client";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { formatPrice } from "@/app/lib/formatPrice";

export const PlaceOrderButton = ({ price, orderId }) => {
  const router = useRouter();

  const placeAnOrder = async () => {
    const deliveryAddressString = sessionStorage.getItem("deliveryForm");
    const deliveryAddressData = JSON.parse(deliveryAddressString);
    if (Object.values(deliveryAddressData).some((value) => !value)) {
      console.log("delivery form not full");
      return;
    }

    try {
      const response = await fetch(`./api/order/${orderId}`, {
        method: "PUT",
        body: JSON.stringify({ deliveryAddressData }),
      });

      console.log(response.ok);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }

      router.push(`/podsumowanie/${orderId}`);
    } catch (error) {
      console.log(error.message);
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
