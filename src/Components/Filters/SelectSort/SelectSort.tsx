import { useContext } from "react";
import Select from "react-select";
import styles from "../filters.module.scss";
import { Props } from "../Filters";

import {
  FiltersContext,
  UpdateSortFields,
} from "../../../context/FiltersContext/FiltersContext";

type Values =
  | "name"
  | "-name"
  | ""
  | "price"
  | "-price"
  | "createdAt"
  | "-createdAt";

export interface SortFieldTypes {
  value: Values;
  label: string;
  type: UpdateSortFields;
}

const sortValuesName: SortFieldTypes[] = [
  { value: "name", label: "A-Z", type: "name" },
  { value: "-name", label: "Z-A", type: "name" },
  { value: "", label: "Null", type: "name" },
];

const sortValuesPrice: SortFieldTypes[] = [
  { value: "price", label: "Lowest Price", type: "price" },
  { value: "-price", label: "Highest Price", type: "price" },
  { value: "", label: "Null", type: "price" },
];

const sortValuesCreationTime: SortFieldTypes[] = [
  { value: "-createdAt", label: "Newest", type: "createdAt" },
  { value: "createdAt", label: "Oldest", type: "createdAt" },
  { value: "", label: "Null", type: "createdAt" },
];

export const options: SortFieldTypes[] = [
  ...sortValuesName,
  ...sortValuesCreationTime,
  ...sortValuesPrice,
];

const SelectSort = ({
  controlStyles,
  handleChange,
}: Omit<Props, "debouncedSearch">) => {
  const { dispatch, state } = useContext(FiltersContext);

  const handleSelectChange = (vals: any) => {
    dispatch({ type: "UPDATE_SORT", typeSort: vals.type, payload: vals });
  };

  const getInitialValue = (type: UpdateSortFields) => {
    if (state.sort && typeof state.sort !== "string") {
      return state.sort.find((item) => item.type === type) || "";
    }
  };

  const selectOption = {
    className: styles.select_sort,
    styles: controlStyles,
    onChange: handleSelectChange,
    onBlur: handleChange,
  };

  return (
    <>
      <h3 className={styles.h3}>Sort</h3>
      <div className={styles.sort_wrapper}>
        <Select
          placeholder="By name"
          options={sortValuesName}
          {...selectOption}
          value={getInitialValue("name")}
        />
        <Select
          placeholder="By price"
          options={sortValuesPrice}
          {...selectOption}
          value={getInitialValue("price")}
        />
        <Select
          placeholder="By creation time"
          options={sortValuesCreationTime}
          {...selectOption}
          value={getInitialValue("createdAt")}
        />
      </div>
    </>
  );
};

export default SelectSort;
