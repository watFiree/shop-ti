"use client";
import { toast } from "react-toastify";
import { formatPrice } from "@/app/lib/formatPrice";
import { RadioGroup, Radio } from "@nextui-org/radio";

export const CourierRadioForm = ({ basketId, selectedId, couriers }) => {
  const updateOrderCourier = async (value) => {
    try {
      const response = await fetch(`./api/order/${basketId}/courier`, {
        method: "POST",
        body: JSON.stringify({ courierId: value }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <RadioGroup
      label="Kurierzy"
      defaultValue={selectedId}
      onValueChange={updateOrderCourier}
    >
      {couriers.map(({ id, name, price }) => (
        <Radio key={id} value={id} description={formatPrice(price)}>
          {name}
        </Radio>
      ))}
    </RadioGroup>
  );
};
