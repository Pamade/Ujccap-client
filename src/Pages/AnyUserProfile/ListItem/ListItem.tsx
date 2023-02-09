import styles from "./list-item.module.scss";
interface Props {
  label: string;
  value: string;
}

const ListItem = ({ label, value }: Props) => {
  return (
    <li className={styles.li}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
    </li>
  );
};

export default ListItem;
