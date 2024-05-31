"use client";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { formatPrice } from "@/app/lib/formatPrice";
import { ProductImage } from "../productCard/productImage";

export const OrderProductsList = ({ products }) => {
  return (
    <div>
      <h3 className="text-foreground-500 pb-2">Lista produktów</h3>
      <div className="flex flex-col gap-2">
        {products.map((product) => (
          <Card
            key={product.productBasketId}
            shadow="sm"
            className="flex-row	max-w-80"
          >
            <CardBody className="max-w-16 min-w-16 min-h-16 p-0">
              <ProductImage
                width={64}
                height={64}
                alt={product.productName}
                src={`/productImage_${product.productId}.webp`}
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
    </div>
  );
};
