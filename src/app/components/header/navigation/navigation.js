import Link from "next/link";
import styles from "./navigation.module.css";

const getAllCategories = async () => {
  const response = await fetch("http://localhost:3000/api/categories");
  return response.json();
};

export const Navigation = async () => {
  const categories = await getAllCategories();

  return (
    <nav>
      <ul className={styles.list}>
        {categories.data.map(({ id, name }) => (
          <li key={id}>
            <Link href={`/c/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
