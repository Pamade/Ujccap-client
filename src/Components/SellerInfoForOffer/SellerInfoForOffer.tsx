import { User } from "../../types/types";
import styles from "./seller-info-for-offer.module.scss";
import BoxInfo from "../../Pages/OfferNoAuth/OfferInfo/BoxInfo";
import { Link } from "react-router-dom";
const SellerInfoForOffer = ({ user }: { user: User }) => {
  const { avatar, email, _id } = user;
  const { address, city, name, phoneNumber, postCode, surname } = user.seller!;

  return (
    <div className={styles.wrapper}>
      <div className={styles.info_wrapper}>
        <div className={styles.box}>
          <h4 className={styles.heading}>User</h4>
          <Link to={`/user/${_id}`} className={styles.avatar_name_wrapper}>
            <img className={styles.avatar} src={avatar} alt="avatar" />
            <div className={styles.name_surname_wrapper}>
              <p className={styles.name}>{name}</p>
              <p className={styles.name}>{surname}</p>
            </div>
          </Link>
        </div>
        <div className={styles.box}>
          <h4 className={styles.heading}>Contact</h4>
          <BoxInfo value={email} label="Email" />
          <BoxInfo value={String(phoneNumber)} label="Phone Number" />
        </div>
        <div className={styles.box}>
          <h4 className={styles.heading}>Location Information</h4>
          <BoxInfo value={address} label="Address" />
          <BoxInfo value={city} label="City" />
          <BoxInfo value={postCode} label="Post Code" />
        </div>
      </div>
    </div>
  );
};

export default SellerInfoForOffer;
