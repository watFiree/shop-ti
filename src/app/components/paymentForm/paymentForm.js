"use client";
import { formatPrice } from "@/app/lib/formatPrice";
import { toast } from "react-toastify";
import { RadioGroup, Radio } from "@nextui-org/radio";

export const PaymentRadioForm = ({ basketId, paymentMethods }) => {
  const updateOrderPaymentMethod = async (value) => {
    try {
      const response = await fetch(`./api/order/${basketId}/payment`, {
        method: "POST",
        body: JSON.stringify({ paymentMethodId: value }),
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
      label="Metody płatności"
      onValueChange={updateOrderPaymentMethod}
    >
      {paymentMethods.map(({ id, name, price }) => (
        <Radio key={id} value={id} description={formatPrice(price)}>
          {name}
        </Radio>
      ))}
    </RadioGroup>
  );
};
