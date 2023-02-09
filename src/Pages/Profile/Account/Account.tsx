import stylesWrapper from "../account-details.module.scss";
import styles from "./account.module.scss";
import { Link, Outlet } from "react-router-dom";

const Account = () => {
  return (
    <div className={stylesWrapper.wrapper}>
      <h2>Account</h2>
      <div className={styles.link_wrapper}>
        <Link className={styles.link} to="./update-email">
          Update Email
        </Link>
        <Link className={styles.link} to="./update-password">
          Update Password
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Account;
