import { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./button-redirect-to-all.module.scss";
import { FiltersContext } from "../../../context/FiltersContext/FiltersContext";
const ButtonRedirectToAll = ({ path }: { path: string }) => {
  const { dispatch } = useContext(FiltersContext);
  return (
    <Link
      to={path}
      onClick={() => {
        dispatch({ type: "RESET_STATE" });
      }}
      className={styles.all_offers_btn}
    >
      ALL OFFERS
    </Link>
  );
};

export default ButtonRedirectToAll;
