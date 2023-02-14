import { useContext, useState } from "react";
import { User } from "../../types/types";
import styles from "./opinions.module.scss";
import { useHandleApiCall } from "../../hooks/useHandleApiCall";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const DisplayOpinions = ({ user }: { user: User }) => {
  const { handleApiCall } = useHandleApiCall("PATCH", true);
  const {
    state: { user: loggedUser },
  } = useContext(AuthContext);
  const { positive: positiveInitial, negative: negativeInitial } =
    user.opinionsFromUsers;

  const [positive, setPositive] = useState(positiveInitial);
  const [negative, setNegative] = useState(negativeInitial);
  const isLoggedUser = loggedUser?._id === user._id;

  const handleSetOpinion = (type: "positive" | "negative") => {
    if (!isLoggedUser) {
      handleApiCall(
        `/opinions/set/${user._id}/${type}`,
        {},
        {},
        (data, err) => {
          if (err && typeof err === "string") {
            toast.error(err);
          } else if (!loggedUser) toast.error("You have to be logged");
          else {
            type === "positive"
              ? setPositive((prev) => prev + 1)
              : setNegative((prev) => prev + 1);
          }
        }
      );
    }
  };

  return (
    <div className={styles.opinions_action}>
      <h4>Opinions</h4>
      <div className={styles.opinions}>
        <div
          onClick={() => handleSetOpinion("positive")}
          className={`${styles.opinion} ${styles.positive} ${
            !isLoggedUser ? styles.can_hover : null
          }`}
        >
          {positive}
        </div>
        <div
          onClick={() => handleSetOpinion("negative")}
          className={`${styles.opinion} ${styles.negative}  ${
            !isLoggedUser ? styles.can_hover : null
          }`}
        >
          {negative}
        </div>
      </div>
    </div>
  );
};

export default DisplayOpinions;
