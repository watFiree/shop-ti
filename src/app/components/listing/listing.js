import { ProductsList } from "./productsList/productsList";

export const Listing = ({ name, products }) => {
  return (
    <div>
      <h2 className="text-3xl px-6 py-6">{name}</h2>
      <ProductsList products={products} />
    </div>
  );
};
