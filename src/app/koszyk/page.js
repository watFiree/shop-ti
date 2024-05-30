import { cookies } from "next/headers";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { formatPrice } from "@/app/lib/formatPrice";
import { DeliveryForm } from "@/app/components/deliveryForm/deliveryForm";
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
  const response = await fetch(`http://localhost:3000/api/order/${basketId}`);
  return response.json();
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
      <h2 className="text-3xl">Zrealizuje swoje zamównienie</h2>
      <OrderProductsList products={basket.products} />
      <CourierRadioForm basketId={basketId.value} couriers={couriers} />
      <DeliveryForm />
      <PaymentRadioForm
        basketId={basketId.value}
        paymentMethods={paymentMethods}
      />

      <Button
        color="success"
        variant="shadow"
        size="lg"
        endContent={
          <Chip variant="shadow">
            Do zapłaty: {formatPrice(basket.totalPrice)}
          </Chip>
        }
      >
        Złóż zamówienie
      </Button>
    </div>
  );
};

export default CheckoutPage;
