import { Listing } from "@/app/components/listing/listing";

const getProductsForCategory = async (categoryId) => {
  const response = await fetch(
    `http://localhost:3000/api/products/${categoryId}`
  );
  return response.json();
};

const getCategoryInfo = async (categoryId) => {
  const response = await fetch(
    `http://localhost:3000/api/category/${categoryId}`
  );
  return response.json();
};

const CategoryPage = async ({ params }) => {
  const products = await getProductsForCategory(params.categoryId);
  const category = await getCategoryInfo(params.categoryId);

  return (
    <div>
      <Listing name={category.data.name} products={products.data} />
    </div>
  );
};

export default CategoryPage;
