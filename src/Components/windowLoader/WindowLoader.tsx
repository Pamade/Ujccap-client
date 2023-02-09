import ClipLoader from "react-spinners/ClipLoader";
import styles from "./windowLoader.module.scss";

const override = {
  width: "20rem",
  height: "20rem",
};

interface Props {
  children?: JSX.Element;
}
const WindowLoader = ({ children }: Props) => {
  return (
    <div className="App">
      <div className={styles.background}>
        <ClipLoader
          cssOverride={override}
          className={styles.loader}
          color="red"
        />
      </div>
      {children}
    </div>
  );
};

export default WindowLoader;
