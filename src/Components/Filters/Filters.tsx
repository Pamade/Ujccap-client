import React, { useEffect, useContext } from "react";
import styles from "./filters.module.scss";
import { debounce, DebouncedFunc } from "lodash";
import SelectSort from "./SelectSort/SelectSort";
import TextInputs from "./TextInputs/TextInputs";
import PriceInputs from "./PriceInputs/PriceInputs";
import { useSearchParams } from "react-router-dom";
import Categories from "./Categories/Categories";
import Checkbox from "./Checkbox/Checkbox";

import {
  FiltersContext,
  SortWithTypes,
  FilterCategory,
  InputFieldsTextNumber,
  State,
} from "../../context/FiltersContext/FiltersContext";
export interface Props {
  controlStyles: object;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  debouncedSearch: DebouncedFunc<
    (e: React.ChangeEvent<HTMLInputElement>) => void
  >;
}

const BORDER_COLOR_FOCUS = "#326077";
const BORDER_COLOR = "rgb(149, 149, 149)";

const controlStyles = {
  control: (baseStyles: object, state: { isFocused: boolean }) => ({
    ...baseStyles,
    "&:hover": {
      borderColor: BORDER_COLOR_FOCUS,
    },
    borderColor: state.isFocused ? BORDER_COLOR_FOCUS : BORDER_COLOR,
    borderWidth: "2px",
    boxShadow: state.isFocused ? BORDER_COLOR_FOCUS : BORDER_COLOR,
  }),
};

interface PropsFilters {
  showExpired: boolean;
  param?: string;
}

const Filters = ({ showExpired, param }: PropsFilters) => {
  const { dispatch, state } = useContext(FiltersContext);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const stringFilters: { [key: string]: string } = {};
    console.log(state);
    let filter: keyof State;
    for (filter in state) {
      if (
        !state[filter] ||
        (state[filter] as []).length === 0 ||
        filter === param
      ) {
        continue;
      }
      if (Array.isArray(state[filter])) {
        const arrayValues = (state[filter] as []).map(
          (item: SortWithTypes | FilterCategory) =>
            (item.value && item.value) || item
        );
        const values = arrayValues.join(",");
        stringFilters[filter] = values;
      } else {
        if (filter === "page" && state[filter] === 1) {
          continue;
        } else {
          stringFilters[filter] = String(state[filter]);
        }
      }
    }

    setSearchParams(stringFilters);
  }, [state]);

  const updateTextOrNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetName = e.target.name as InputFieldsTextNumber;
    const value =
      targetName === "priceFrom" || targetName === "priceTo"
        ? Number(e.target.value)
        : e.target.value;

    dispatch({
      type: "UPDATE_TEXT_OR_NUMBER_INPUT",
      field: targetName,
      payload: value,
    });
  };

  const debouncedSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    updateTextOrNumberInput(e);
  }, 1000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTextOrNumberInput(e);
    debouncedSearch.cancel();
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <TextInputs
          handleChange={handleChange}
          debouncedSearch={debouncedSearch}
        />
        {param !== "categories" && (
          <Categories
            handleChange={handleChange}
            controlStyles={controlStyles}
          />
        )}
        <PriceInputs
          debouncedSearch={debouncedSearch}
          handleChange={handleChange}
        />
        <Checkbox
          type={{
            type: "SWITCH_HAS_IMAGE",
            param: "hasImage",
            label: "Show results with picture",
          }}
        />
        {showExpired && (
          <Checkbox
            type={{
              type: "SWITCH_SHOW_EXPIRED",
              param: "showExpired",
              label: "Show expired",
            }}
          />
        )}
        <SelectSort controlStyles={controlStyles} handleChange={handleChange} />
      </div>
    </section>
  );
};

export default Filters;
