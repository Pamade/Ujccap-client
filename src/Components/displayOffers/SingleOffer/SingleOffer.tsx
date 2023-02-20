import { User } from "../../../types/types";
import styles from "./single-offer.module.scss";
import { AiFillEuroCircle } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserAdditional from "./UserAdditional/UserAdditional";
import DisplayCategories from "../../displayCategories/DisplayCategories";
import { Offer } from "../../../types/types";
import { RedirectSingleOffer } from "../DisplayOffers";
interface Props {
  offer: Offer;
  showAdditional: boolean;
  redirectTo: RedirectSingleOffer;
  profile?: boolean;
  user?: User;
}

const SingleOffer = ({
  offer,
  showAdditional,
  redirectTo,
  user,
  profile,
}: Props) => {
  const navigate = useNavigate();

  const handleNavigateToOffer = () => {
    const navigateLink =
      redirectTo === "offerUpdate"
        ? `/update-offer/${offer._id}`
        : `/offer/${offer._id}`;
    navigate(navigateLink);
  };

  return (
    <div
      className={
        profile
          ? styles.single_offer_wrapper_profile
          : styles.single_offer_wrapper
      }
    >
      <div
        onClick={handleNavigateToOffer}
        className={styles.single_only_offer_wrapper}
      >
        <h4 className={styles.h4}>{offer.name}</h4>
        <img className={styles.img} src={offer.mainImage} alt={offer.name} />
        <div className={styles.info_wrapper}>
          <p className={styles.icon_text}>
            <AiFillEuroCircle /> {offer.price}
          </p>
          <p className={styles.icon_text}>
            <FaMapMarkerAlt /> {offer.location}
          </p>
          <DisplayCategories categories={offer.categories} />
        </div>
      </div>
      {showAdditional && user && <UserAdditional user={user} offer={offer} />}
    </div>
  );
};

export default SingleOffer;
