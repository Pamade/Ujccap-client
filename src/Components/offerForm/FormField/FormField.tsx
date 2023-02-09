import React from "react";
import styles from "./form-field.module.scss";

interface Props {
  field: {
    label: string;
    name: string;
    type: string;
    maxLength: number;
  };
  handleOnChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  data: {
    [key: string]: string | number | string[] | Date;
  };
  validationError: {
    [key: string]: string;
  };
  size: string;
}

const FormField = ({
  field,
  handleOnChange,
  data,
  validationError,
  size,
}: Props) => {
  const { name, maxLength, label, type } = field;

  const setFieldValue = (nameType: string): string => {
    const keys = Object.keys(data);
    let value: string | number = "";
    keys.forEach((item: string | number) => {
      if (item === nameType) {
        value = data[item] as string | number;
        if (data[item] === 0) value = "";
      }
    });
    return value;
  };

  const displayError =
    String(data[name]).length > maxLength ||
    (validationError[name] && !data[name]) ? (
      <label className={`${styles.error} ${styles.label}`}>
        {String(data[name]).length > maxLength
          ? `${label} max length is ${maxLength}`
          : `${label} is required`}
      </label>
    ) : (
      <label className={styles.label}>{label}</label>
    );

  if (type === "textarea") {
    return (
      <div className={`${styles.input_wrapper} ${styles.big}`}>
        {displayError}
        <textarea
          onChange={handleOnChange}
          className={`${styles.textarea} ${
            validationError[name] && styles.input_error
          }`}
          defaultValue={setFieldValue(name)}
          name={name}
        ></textarea>
      </div>
    );
  }

  return (
    <div
      className={`${styles.input_wrapper} ${
        size === "big" ? styles.big : styles.medium
      }`}
    >
      {displayError}
      <input
        onChange={handleOnChange}
        className={`${styles.input} ${
          size === "big" ? styles.big : styles.medium
        } ${validationError[name] && styles.input_error}`}
        defaultValue={setFieldValue(name)}
        type={type}
        name={name}
      />
    </div>
  );
};

export default FormField;
