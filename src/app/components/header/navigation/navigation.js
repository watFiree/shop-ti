import Link from "next/link";
import styles from "./navigation.module.css";

const getAllCategories = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/categories");
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch {
    return { data: [] };
  }
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
