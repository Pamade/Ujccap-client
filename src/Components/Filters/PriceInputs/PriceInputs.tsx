import { useContext } from "react";
import styles from "../filters.module.scss";
import { Props } from "../Filters";
import { FiltersContext } from "../../../context/FiltersContext/FiltersContext";

const PriceInputs = ({
  debouncedSearch,
  handleChange,
}: Omit<Props, "controlStyles">) => {
  const { state } = useContext(FiltersContext);
  const { priceFrom, priceTo } = state;

  const displayInitialPriceFrom =
    priceFrom === 0 || !priceFrom ? "" : priceFrom;
  const displayInitialPriceTo = priceTo === 0 || !priceTo ? "" : priceTo;

  const options = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => debouncedSearch(e),
    onBlur: handleChange,
    type: "number",
  };

  return (
    <div className="price_wrapper">
      <label className={styles.label}>Price</label>
      <div className={styles.inputs_price}>
        <input
          {...options}
          name="priceFrom"
          placeholder="From"
          defaultValue={displayInitialPriceFrom}
        />
        <input
          {...options}
          name="priceTo"
          placeholder="To"
          defaultValue={displayInitialPriceTo}
        />
      </div>
    </div>
  );
};

export default PriceInputs;
