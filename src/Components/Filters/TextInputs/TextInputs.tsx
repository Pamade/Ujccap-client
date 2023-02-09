import { useContext } from "react";
import styles from "../filters.module.scss";
import { Props } from "../Filters";
import { FiltersContext } from "../../../context/FiltersContext/FiltersContext";

const TextInputs = ({
  debouncedSearch,
  handleChange,
}: Omit<Props, "controlStyles">) => {
  const inputOptions = {
    onBlur: handleChange,
    className: styles.input_text,
    type: "text",
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => debouncedSearch(e),
  };
  const { state } = useContext(FiltersContext);

  return (
    <div className={styles.name_location_wrapper}>
      <div>
        <label className={styles.label}>Name</label>
        <input name="name" defaultValue={state.name} {...inputOptions} />
      </div>
      <div>
        <label className={styles.label}>Location</label>
        <input
          name="location"
          defaultValue={state.location}
          {...inputOptions}
        />
      </div>
    </div>
  );
};

export default TextInputs;
