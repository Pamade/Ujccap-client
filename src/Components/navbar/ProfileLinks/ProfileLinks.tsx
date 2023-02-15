import styles from "./profile-links.module.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext/AuthContext";

interface Props {
  setIsProfileNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const profileOptions = [
  { label: "PROFILE", to: "/profile/informations" },
  { label: "ACCOUNT", to: "/profile/account" },
  { label: "FAVOURITES", to: "/profile/favourites" },
];

const ProfileLinks = ({ setIsProfileNavOpen }: Props) => {
  const {
    state: { user },
  } = useContext(AuthContext);

  const displayProfileOptions = profileOptions.map((item) => {
    return (
      <li key={item.label} className={styles.profile_link}>
        <Link to={item.to}>{item.label}</Link>
      </li>
    );
  });

  return (
    <div className={`${styles.profile_wrapper}`}>
      <p className={styles.name}></p>
      <p>{user?.email}</p>
      {user?.seller ? (
        <Link to="/put-auction" className={styles.btn}>
          Put up an auction
        </Link>
      ) : user?.isAuthenticated ? (
        <Link
          onClick={() => setIsProfileNavOpen(false)}
          className={styles.btn}
          to="/seller-register"
        >
          BECOME SELLER!
        </Link>
      ) : (
        <p>You need to verify your email to become seller</p>
      )}
      <ul>{displayProfileOptions}</ul>
    </div>
  );
};

export default ProfileLinks;
