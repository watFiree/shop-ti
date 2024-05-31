import { cookies } from "next/headers";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { DeliveryForm } from "@/app/components/deliveryForm/deliveryForm";
import { PlaceOrderButton } from "@/app/components/placeOrderButton/placeOrderButton";
import { CourierRadioForm } from "@/app/components/courierForm/courierForm";
import { PaymentRadioForm } from "@/app/components/paymentForm/paymentForm";
import { OrderProductsList } from "@/app/components/orderProductsList/orderProductsList";
import styles from "./basket.module.css";

const getCouriers = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/couriers`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch {
    return { data: {} };
  }
};

const getPayments = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/payments`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch {
    return { data: {} };
  }
};

const getBasketData = async (basketId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/order/${basketId}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch {
    return { data: {} };
  }
};

const Heading = ({ text }) => (
  <div className="flex row justify-between">
    <h2 className="text-3xl">{text}</h2>

    <Button
      href="/"
      as={Link}
      color="default"
      size="md"
      variant="light"
      startContent={<p>{"<"}</p>}
      className="text-foreground-500 w-min"
    >
      Wróć do zakupów
    </Button>
  </div>
);

const CheckoutPage = async () => {
  const cookiesStore = cookies();
  const basketId = cookiesStore.get("basketId");
  const { data: couriers } = await getCouriers();
  const { data: paymentMethods } = await getPayments();
  const { data: basket } = await getBasketData(basketId?.value || "");

  if (!basket?.products?.length) {
    return (
      <div className={styles.container}>
        <Heading text="Koszyk jest pusty" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Heading text="Zrealizuje swoje zamównienie" />
      <OrderProductsList products={basket.products} />
      <CourierRadioForm basketId={basketId.value} couriers={couriers} />
      <DeliveryForm />
      <PaymentRadioForm
        basketId={basketId.value}
        paymentMethods={paymentMethods}
      />
      <PlaceOrderButton orderId={basketId.value} price={basket.totalPrice} />
    </div>
  );
};

export default CheckoutPage;
