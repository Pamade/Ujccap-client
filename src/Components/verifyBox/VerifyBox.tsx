import { Link } from "react-router-dom";
import styles from "./verify.module.scss";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useContext } from "react";
interface VerifyProps {
  msg: string;
  to: string;
  textColor: "black" | "white";
}

const VerifyBox = ({ msg, to, textColor }: VerifyProps) => {
  const {
    state: { user },
  } = useContext(AuthContext);

  return (
    <div className={`${styles.box} ${textColor}`}>
      <p className={styles.message}>{msg}</p>
      {user ? (
        <Link to="/" className={styles.link}>
          Go to home page
        </Link>
      ) : (
        <Link to={to} className={styles.link}>
          Go to login page
        </Link>
      )}
    </div>
  );
};

export default VerifyBox;
