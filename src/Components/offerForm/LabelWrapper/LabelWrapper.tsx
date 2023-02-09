import styles from "./label-wrapper.module.scss";

interface Props {
  number: string;
  label: string;
}

const LabelWrapper = ({ number, label }: Props) => {
  return (
    <div className={styles.label_wrapper}>
      <div className={styles.circle}>
        <span className={styles.number}>{number}</span>
      </div>
      <h5 className={styles.h5}>{label}</h5>
    </div>
  );
};

export default LabelWrapper;
