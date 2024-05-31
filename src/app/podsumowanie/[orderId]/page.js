import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Link } from "@nextui-org/link";
import { OrderProductsList } from "@/app/components/orderProductsList/orderProductsList";
import { formatPrice } from "@/app/lib/formatPrice";
import styles from "./summary.module.css";
import { redirect } from "next/navigation";

const getOrderSummary = async (orderId) => {
  const response = await fetch(`http://localhost:3000/api/order/${orderId}`);

  if (!response.ok) {
    redirect("/");
  }
  const data = await response.json();

  return data;
};

const OrderSummary = async ({ params }) => {
  const { data } = await getOrderSummary(params.orderId);

  return (
    <div className={styles.container}>
      <div className="flex row justify-between">
        <h2 className="text-3xl">Podsumowanie zamówienia</h2>

        <Button
          href="/"
          as={Link}
          color="default"
          size="md"
          variant="primary"
          startContent={<p>{"<"}</p>}
          className="w-min"
        >
          Wróć do zakupów
        </Button>
      </div>
      <div>
        <h3 className="text-foreground-500 pb-2">Metoda dostawy</h3>
        <p>
          {data.courierType.name}{" "}
          <Chip>{formatPrice(data.courierType.price)}</Chip>
        </p>
      </div>
      <div>
        <h3 className="text-foreground-500 pb-2">Adres dostawy</h3>
        <p>{`${data.deliveryAddress.firstName} ${data.deliveryAddress.surname}`}</p>
        <p>{`${data.deliveryAddress.addressLine}, ${data.deliveryAddress.postalCode}, ${data.deliveryAddress.city}`}</p>
        <p>{data.deliveryAddress.phoneNumber}</p>
      </div>
      <div>
        <h3 className="text-foreground-500 pb-2">Metoda płatności</h3>
        <p>
          {data.paymentType.name}{" "}
          <Chip>{formatPrice(data.paymentType.price)}</Chip>
        </p>
      </div>
      <OrderProductsList products={data.products} />
      <Chip color="success" size="lg">
        Opłacono kwotę: {formatPrice(data.totalPrice)}
      </Chip>
    </div>
  );
};

export default OrderSummary;
