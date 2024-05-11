import { ProductCard } from "../../productCard/productCard";
import styles from "./productsList.module.css";

export const ProductsList = ({ products }) => {
  return (
    <div className={styles.productsList}>
      {products.map(({ id, name, price }) => (
        <ProductCard
          key={id}
          productId={id}
          imageUrl={`/productImage_${id}.webp`}
          productName={name}
          price={price}
        />
      ))}
    </div>
  );
};
