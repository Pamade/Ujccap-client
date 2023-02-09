import moment from "moment";
import HeartIcon from "../../../HeartIcon/HeartIcon";
import styles from "./user-additional.module.scss";
import { User, Offer } from "../../../../types/types";
import { Link } from "react-router-dom";
interface Props {
  offer: Offer;
  user: User;
}
const UserAdditional = ({ offer, user }: Props) => {
  return (
    <div className={styles.additional_info_wrapper}>
      <div className={styles.created_heart_wrapper}>
        <p className={styles.added}>
          Added {moment(offer.createdAt).fromNow()}
        </p>
        <HeartIcon offerId={offer._id} userId={user._id} />
      </div>
      <Link to={`/user/${user._id}`} className={styles.user}>
        <div className={styles.name_avatar}>
          <p className={styles.name}>{user.seller!.name}</p>
          <img alt="avatar" className={styles.user_avatar} src={user.avatar} />
        </div>
      </Link>
    </div>
  );
};

export default UserAdditional;
