import React from "react";
import styles from "./offer-info.module.scss";

interface Props {
  label: string;
  value?: string;
}

const BoxInfo = ({ label, value }: Props) => {
  return (
    <div className={styles.box_wrapper}>
      <p className={styles.label}>{label}</p>
      {value && <p className={styles.value}>{value}</p>}
    </div>
  );
};

export default BoxInfo;
