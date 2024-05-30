"use client";
import { formatPrice } from "@/app/lib/formatPrice";
import { RadioGroup, Radio } from "@nextui-org/radio";

export const CourierRadioForm = ({ basketId, couriers }) => {
  const updateOrderCourier = async (value) => {
    try {
      const response = await fetch(`./api/order/${basketId}/courier`, {
        method: "POST",
        body: JSON.stringify({ courierId: value }),
      });

      await response.json();
    } catch (error) {
      console.log(error, "error set coureir");
    }
  };
  return (
    <RadioGroup label="Kurierzy" onValueChange={updateOrderCourier}>
      {couriers.map(({ id, name, price }) => (
        <Radio key={id} value={id} description={formatPrice(price)}>
          {name}
        </Radio>
      ))}
    </RadioGroup>
  );
};
