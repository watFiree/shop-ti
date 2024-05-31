import { Header } from "@/app/components/header/header";
import { Listing } from "@/app/components/listing/listing";

const getProductsForCategory = async (categoryId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/products/${categoryId}`
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch {
    return { data: [] };
  }
};

const getCategoryInfo = async (categoryId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/category/${categoryId}`
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

const CategoryPage = async ({ params }) => {
  const products = await getProductsForCategory(params.categoryId);
  const category = await getCategoryInfo(params.categoryId);

  return (
    <div>
      <Header />
      <Listing name={category.data.name} products={products.data} />
    </div>
  );
};

export default CategoryPage;
