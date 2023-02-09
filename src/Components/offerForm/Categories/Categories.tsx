import React from "react";
import styles from "./categories.module.scss";
import stylesError from "../FormField/form-field.module.scss";
import { toast } from "react-toastify";
import { Offer } from "../../../types/types";
import { categoriesValues } from "../../../utils/categoriesValues";

interface Props {
  offerInformations: Offer;
  setOfferInformations: React.Dispatch<React.SetStateAction<Offer>>;
  validationError: {
    [key: string]: string;
  };
}

const Categories = ({
  offerInformations,
  setOfferInformations,
  validationError,
}: Props) => {
  const handleClick = (value: string) => {
    const falseCount = offerInformations.categories.length;
    categoriesValues.map((element) => {
      if (element.value === value) {
        if (
          falseCount === 5 &&
          !offerInformations.categories.includes(element.value)
        ) {
          toast.error("You can choose max 5 categories");
        } else {
          let copyOfferCategories = [...offerInformations.categories];
          copyOfferCategories.includes(element.value)
            ? (copyOfferCategories = copyOfferCategories.filter(
                (item) => item !== element.value
              ))
            : copyOfferCategories.push(element.value);

          setOfferInformations({
            ...offerInformations,
            categories: copyOfferCategories,
          });
        }
      }
      return element;
    });
  };

  if (!offerInformations.categories) return <></>;
  return (
    <>
      {validationError &&
        validationError.categories &&
        offerInformations.categories.length === 0 && (
          <div className={stylesError.error}>
            {validationError.categories && (
              <p style={{ margin: "1rem 0" }}>Choose atleast one category</p>
            )}
          </div>
        )}
      <div className={styles.wrapper}>
        {categoriesValues.map((category) => (
          <div
            onClick={() => handleClick(category.value)}
            key={category.value}
            className={
              offerInformations.categories.length !== 0 &&
              offerInformations.categories.includes(category.value)
                ? `${styles.btn} ${styles.btn_selected}`
                : styles.btn
            }
          >
            <span>{category.label}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Categories;
