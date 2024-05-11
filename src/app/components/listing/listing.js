import { ProductsList } from "./productsList/productsList";

export const Listing = ({ name, products }) => {
  return (
    <div>
      <h1>{name}</h1>
      <ProductsList products={products} />
    </div>
  );
};
