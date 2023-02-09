import styles from "./show-categories.module.scss";
import { categoriesValues } from "../../../utils/categoriesValues";
import SingleCategory from "./SingleCategory/SingleCategory";

const ShowCategories = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Categories</h2>
      <div className={styles.categories_wrapper}>
        {categoriesValues.map((category) => (
          <SingleCategory key={category.label} category={category} />
        ))}
      </div>
    </div>
  );
};

export default ShowCategories;
