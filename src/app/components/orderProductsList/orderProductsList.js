import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { formatPrice } from "@/app/lib/formatPrice";

export const OrderProductsList = ({ products }) => {
  return (
    <div>
      <h3 className="text-foreground-500 pb-2">Lista produktów</h3>
      {products.map((product) => (
        <Card
          key={product.productBasketId}
          shadow="sm"
          className="flex-row	max-w-80"
        >
          <CardBody className="w-auto p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="64px"
              height="64px"
              alt={product.productName}
              className="object-cover"
              src={`/productImage_${product.productBasketId}.webp`}
            />
          </CardBody>
          <CardFooter className="flex flex-col justify-between py-2 px-3">
            <div className="flex flex-row justify-between w-full">
              <h3 className="text-default-800">{product.productName}</h3>
              <span className="text-default-500">x {product.quantity}</span>
            </div>
            <p className="text-default-700 ml-auto">
              {formatPrice(product.productPrice)}
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
