import React, { useContext } from "react";
import styles from "../filters.module.scss";
import Select from "react-select";
import { categoriesValues } from "../../../utils/categoriesValues";
import makeAnimated from "react-select/animated";
import { Props } from "../Filters";
import { FiltersContext } from "../../../context/FiltersContext/FiltersContext";

const animatedComponents = makeAnimated();

const Categories = ({
  handleChange,
  controlStyles,
}: Omit<Props, "debouncedSearch">) => {
  const { dispatch, state } = useContext(FiltersContext);

  const handleSelectChange = (vals: any) => {
    dispatch({ type: "UPDATE_CATEGORIES", payload: vals });
  };

  const displayInitialValues =
    typeof state.categories !== "string" ? state.categories : undefined;

  return (
    <div className={styles.category_wrapper}>
      <label className={styles.label}>Category</label>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={categoriesValues}
        onChange={handleSelectChange}
        onBlur={handleChange}
        value={displayInitialValues}
        styles={controlStyles}
      />
    </div>
  );
};

export default Categories;
