import React, { createContext, useReducer } from "react";
import { Actions } from "./Actions";
import { FiltersReducer } from "./FiltersReducer";
import {
  options,
  SortFieldTypes,
} from "../../Components/Filters/SelectSort/SelectSort";
import {
  categoriesValues,
  CategoriesValuesType,
} from "../../utils/categoriesValues";

export type UpdateSortFields = "price" | "name" | "createdAt";
export interface FilterCategory {
  value: string;
  label: string;
}
export interface SortWithTypes {
  value: string;
  label: string;
  type: string;
}
export type InputFieldsTextNumber =
  | "name"
  | "location"
  | "priceFrom"
  | "priceTo";

export interface State {
  name?: string;
  location?: string;
  priceFrom?: number | string;
  priceTo?: number | string;
  categories?: FilterCategory[] | string;
  sort?: SortWithTypes[] | string;
  hasImage?: boolean | string;
  showExpired?: boolean | string;
  page?: number | string | null;
}

export const EmptyState = {
  name: "",
  location: "",
  priceFrom: 0,
  priceTo: 0,
  categories: [],
  sort: "",
  hasImage: false,
  showExpired: false,
  page: 1,
};

interface FiltersAppContext {
  state: State;
  dispatch: React.Dispatch<Actions>;
}

const searchParams = new URLSearchParams(window.location.search);
const setInitialValue = <T extends SortFieldTypes | CategoriesValuesType>(
  type: "sort" | "categories",
  arrayOfPossibleOptions: T[]
) => {
  const arr: T[] = [];
  const sortInitialValues = searchParams.get(type);
  const values = sortInitialValues?.split(",");

  arrayOfPossibleOptions.forEach((item) => {
    const v = values?.includes(item.value);
    if (v) {
      arr.push(item);
    }
  });
  return arr;
};

const setCategories = (): CategoriesValuesType[] => {
  let match: CategoriesValuesType | undefined;
  searchParams.forEach((value, key) => {
    const param = searchParams.get(key);
    match = categoriesValues.find((item) => item.value === param);
  });
  if (match) return [];
  else return setInitialValue("categories", categoriesValues);
};

export const INITIAL_STATE: State = {
  ...Object.entries(Object.fromEntries(searchParams)).reduce(
    (acc: State, [key, value]) => {
      return {
        ...acc,
        [key]: value,
      };
    },
    {}
  ),
  page: Number(searchParams.get("page")) || 1,
  categories: setCategories(),
  sort: setInitialValue("sort", options),
};

export const FiltersContext = createContext<FiltersAppContext>({
  state: INITIAL_STATE,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
});

export const FiltersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(FiltersReducer, INITIAL_STATE);

  return (
    <FiltersContext.Provider value={{ state, dispatch }}>
      {children}
    </FiltersContext.Provider>
  );
};
