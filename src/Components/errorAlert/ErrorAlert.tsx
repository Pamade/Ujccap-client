import { ErrorFields } from "../../types/types";
import styles from "./error-alert.module.scss";
interface Props {
  error: ErrorFields;
}
const ErrorAlert = ({ error }: Props) => {
  const msg: string[] = [];

  for (const value in error) {
    msg.push(error[value]);
  }
  return (
    <div className={styles.alert_wrapper}>
      {msg.map((item: string) => (
        <p key={item}>
          {item === "categories is required" ? "category is required" : item}
        </p>
      ))}
    </div>
  );
};

export default ErrorAlert;
