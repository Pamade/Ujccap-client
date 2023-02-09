import { useContext, useState, useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import styles from "./heart-icon.module.scss";
import { useHandleApiCall } from "../../hooks/useHandleApiCall";
import { toast } from "react-toastify";
interface Props {
  userId: string;
  offerId: string;
}

const HeartIcon = ({ userId, offerId }: Props) => {
  const {
    state: { user },
  } = useContext(AuthContext);

  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    if (user) {
      setIsFavourite(user.favourites.includes(offerId));
    }
  }, [user]);

  const { handleApiCall } = useHandleApiCall("PATCH", true, true);
  const handleUpdateFavouritesOffer = () => {
    setIsFavourite(!isFavourite);
    handleApiCall(`/favourites/update/${offerId}`, {}, {}, (data, err) => {
      if (err && typeof err === "string") {
        toast.error(err);
      }
    });
  };

  return user?._id === userId || !user ? (
    <></>
  ) : (
    <>
      <AiFillHeart
        onClick={handleUpdateFavouritesOffer}
        className={`${
          user && isFavourite
            ? `${styles.heart} ${styles.heart_favourite}`
            : styles.heart
        }`}
      />
    </>
  );
};

export default HeartIcon;
