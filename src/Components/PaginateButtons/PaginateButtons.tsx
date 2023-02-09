import React, { useContext } from "react";
import styles from "./paginate-buttons.module.scss";
import Button from "./Button";
import { FiltersContext } from "../../context/FiltersContext/FiltersContext";

interface Props {
  offersCount: number;
  refScroll?: React.MutableRefObject<HTMLHeadingElement | null>;
}
type PageActions = "SET_PAGE" | "NEXT_PAGE" | "PREVIOUS_PAGE";
const PER_PAGE = 6 as const;

const PaginateButtons = ({ offersCount, refScroll }: Props) => {
  const {
    state: { page },
    dispatch,
  } = useContext(FiltersContext);
  const currentPage = Number(page);
  const totalPages = Math.ceil(offersCount / PER_PAGE);
  const pageBack = currentPage - 1;
  const pageNext = currentPage + 1;

  const switchPage = (type: PageActions, page?: number) => {
    if (refScroll) {
      refScroll.current?.scrollIntoView();
    }

    if (type === "SET_PAGE" && page) {
      dispatch({
        type: "SET_PAGE",
        payload: page,
      });
    } else if (type !== "SET_PAGE") {
      dispatch({
        type: type,
      });
    }
  };

  return (
    <section className={styles.wrapper}>
      {currentPage > 1 && (
        <Button
          page={pageBack}
          switchPage={() => switchPage("PREVIOUS_PAGE")}
        />
      )}
      <Button active={true} page={currentPage} />
      {currentPage < totalPages && (
        <Button page={pageNext} switchPage={() => switchPage("NEXT_PAGE")} />
      )}
      {currentPage + 1 !== totalPages && currentPage !== totalPages && (
        <Button
          page={totalPages}
          switchPage={() => switchPage("SET_PAGE", totalPages)}
        />
      )}
    </section>
  );
};

export default PaginateButtons;
