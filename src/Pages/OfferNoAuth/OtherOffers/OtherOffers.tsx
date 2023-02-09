import { RequiredOffer } from "../../../types/types";
import styles from "./other-offers.module.scss";
import SingleOffer from "../../../Components/displayOffers/SingleOffer/SingleOffer";
import { Link } from "react-router-dom";

interface Props {
  offers: RequiredOffer[];
  userId: string;
  type: "userOthers" | "categories";
  showAdditional: boolean;
}

const OtherOffers = ({ offers, userId, type, showAdditional }: Props) => {
  return (
    <div className={styles.wrapper}>
      <h4 className={styles.h4}>
        {type === "userOthers" ? "More from this user" : "Simillar Offers"}
      </h4>
      <div className={styles.offers}>
        {offers.map((offer) => (
          <SingleOffer
            key={offer._id}
            offer={offer}
            showAdditional={showAdditional}
            redirectTo="offer"
          />
        ))}
      </div>
      {type === "userOthers" && (
        <Link to={`/offers-user/${userId}`} className={styles.btn}>
          SHOW ALL USER'S OFFERS
        </Link>
      )}
    </div>
  );
};

export default OtherOffers;
