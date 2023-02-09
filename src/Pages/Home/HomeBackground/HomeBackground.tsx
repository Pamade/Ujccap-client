import styles from "./home-background.module.scss";
import { useContext, useState } from "react";
import { FiltersContext } from "../../../context/FiltersContext/FiltersContext";
interface Props {
  img: React.MutableRefObject<HTMLImageElement | null>;
}

const HomeBackground = ({ img }: Props) => {
  const { dispatch } = useContext(FiltersContext);
  const [search, setSearch] = useState("");
  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: "UPDATE_TEXT_OR_NUMBER_INPUT",
      field: "name",
      payload: search,
    });
    const scrollHeight = window.innerHeight;
    window.scrollTo(0, scrollHeight);
  };

  return (
    <section
      className={styles.background}
      style={{ backgroundImage: `url(${img.current?.src})` }}
    >
      <div className={styles.text_content}>
        <h1 className={styles.h1}>
          The best place for selling, buying trading!
        </h1>
        <h3 className={styles.h3}>Buy and sell without provision</h3>
        <form onSubmit={handleSubmitSearch} className={styles.form}>
          <input
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search..."
            className={styles.input}
          />
          <button className={styles.btn}>Search</button>
        </form>
      </div>
    </section>
  );
};

export default HomeBackground;
