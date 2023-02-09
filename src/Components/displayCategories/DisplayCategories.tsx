import { Link } from "react-router-dom";
import styles from "./display-categories.module.scss";

const DisplayCategories = ({ categories }: { categories: string[] }) => {
  return (
    <ul className={styles.categories}>
      {categories.map((category: string) => (
        <Link
          key={category}
          className={styles.category}
          to={`/offers-categories/${category}`}
        >
          {category.split("-").join(" ")}
        </Link>
      ))}
    </ul>
  );
};

export default DisplayCategories;
