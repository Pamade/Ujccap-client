import React from "react";
import styles from "./success-or-error-box.module.scss";
interface Props {
  error?: string;
  success?: string;
}

const SuccessOrErrorBox = ({ error, success }: Props) => {
  return (
    <div className={`${styles.box} ${success ? styles.success : styles.error}`}>
      {error && <p className={styles.text}>{error}</p>}
      {success && <p className={styles.text}>{success}</p>}
    </div>
  );
};

export default SuccessOrErrorBox;
