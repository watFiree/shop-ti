"use client";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { useDisclosure } from "@nextui-org/modal";
import { ProductImage } from "@/app/components/productCard/productImage";
import { formatPrice } from "@/app/lib/formatPrice";
import {
  AddedToBasketModal,
  useAddToBasket,
} from "@/app/components/productCard/useAddToBasket";

export const ProductPageBody = ({ productInfo }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { handleAddToBasket, isLoading } = useAddToBasket({
    openModal: onOpen,
    productId: productInfo.id,
  });
  return (
    <div className="flex flex-col md:flex-row p-6">
      <ProductImage
        src={`/productImage_${productInfo.id}.webp`}
        alt={productInfo.name}
        height={512}
        width={512}
        className="flex-1 min-w-32 max-w-xl"
      />
      <div className="flex flex-col py-4 md:px-4 min-w-96">
        <h3 className="text-4xl mb-4">{productInfo.name}</h3>
        <p className="text-2xl text-foreground-600 mb-2">
          {productInfo.description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <Chip size="lg" variant="bordered">
            {formatPrice(productInfo.price)}
          </Chip>
          <Button
            size="lg"
            color="success"
            disabled={isLoading}
            onClick={handleAddToBasket}
          >
            Dodaj do koszyka
          </Button>
        </div>
      </div>
      <AddedToBasketModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};
