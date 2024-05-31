import { Header } from "@/app/components/header/header";
import { ProductPageBody } from "@/app/components/productPage/product_page";

const getProductInfo = async (productId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/products/${productId}`
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch {
    return { data: {} };
  }
};

const ProductPage = async ({ params }) => {
  const product = await getProductInfo(params.productId);

  return (
    <div>
      <Header />
      <ProductPageBody productInfo={product.data} />
    </div>
  );
};

export default ProductPage;
