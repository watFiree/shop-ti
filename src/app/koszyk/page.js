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
  const response = await fetch(`http://localhost:3000/api/couriers`);
  return response.json();
};

const getPayments = async () => {
  const response = await fetch(`http://localhost:3000/api/payments`);
  return response.json();
};

const getBasketData = async (basketId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/order/${basketId}`);
    return await response.json();
  } catch (error) {
    console.log(error);
    return { data: {} };
  }
};

const CheckoutPage = async () => {
  const cookiesStore = cookies();
  const basketId = cookiesStore.get("basketId");
  const { data: couriers } = await getCouriers();
  const { data: paymentMethods } = await getPayments();
  const { data: basket } = await getBasketData(basketId?.value || "");

  if (!basket?.products?.length) {
    return (
      <div>
        <h1>koszyk jest pusty</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className="flex row justify-between">
        <h2 className="text-3xl">Zrealizuje swoje zamównienie</h2>

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
