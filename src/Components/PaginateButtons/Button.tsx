import React from "react";
import styles from "./paginate-buttons.module.scss";

interface Props {
  switchPage?: () => void;
  page: number;
  active?: boolean;
}

const Button = ({ page, switchPage, active }: Props) => {
  return (
    <button
      onClick={switchPage}
      className={`${styles.btn} ${active && styles.active}`}
    >
      {page}
    </button>
  );
};

export default Button;
