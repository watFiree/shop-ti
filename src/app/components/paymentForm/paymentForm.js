"use client";
import { formatPrice } from "@/app/lib/formatPrice";
import { RadioGroup, Radio } from "@nextui-org/radio";

export const PaymentRadioForm = ({ basketId, paymentMethods }) => {
  const updateOrderPaymentMethod = async (value) => {
    try {
      const response = await fetch(`./api/order/${basketId}/payment`, {
        method: "POST",
        body: JSON.stringify({ paymentMethodId: value }),
      });

      await response.json();
    } catch (error) {
      console.log("error");
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
