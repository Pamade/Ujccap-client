import { useContext } from "react";
import { CategoriesValuesType } from "../../../../utils/categoriesValues";
import styles from "../show-categories.module.scss";
import { Link } from "react-router-dom";
import { FiltersContext } from "../../../../context/FiltersContext/FiltersContext";
interface Props {
  category: CategoriesValuesType;
}

const SingleCategory = ({ category }: Props) => {
  const { dispatch } = useContext(FiltersContext);
  return (
    <Link
      to={`/offers-categories/${category.value}`}
      onClick={() => dispatch({ type: "RESET_STATE" })}
      className={styles.single_category_wrapper}
    >
      <h5 className={styles.name}>{category.label}</h5>
      <img className={styles.icon} alt={category.label} src={category.icon} />
    </Link>
  );
};

export default SingleCategory;
