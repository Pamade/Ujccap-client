import styles from "../filters.module.scss";
import { useContext, useEffect } from "react";
import { FiltersContext } from "../../../context/FiltersContext/FiltersContext";
import { useSearchParams } from "react-router-dom";

interface ImageShow {
  type: "SWITCH_HAS_IMAGE";
  param: "hasImage";
  label: string;
}
interface ExpiredShow {
  type: "SWITCH_SHOW_EXPIRED";
  param: "showExpired";
  label: string;
}

type Switch = ImageShow | ExpiredShow;

const Checkbox = ({ type }: { type: Switch }) => {
  const { dispatch, state } = useContext(FiltersContext);
  const [searchParams] = useSearchParams();

  return (
    <div className={styles.checkbox_wrapper}>
      <p>{type.label}</p>
      <input
        onChange={() => dispatch({ type: type.type })}
        value={String(state[type.param])}
        checked={state[type.param] ? true : false}
        type="checkbox"
      />
    </div>
  );
};

export default Checkbox;
