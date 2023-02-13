import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useVerifyPermissions } from "../../hooks/useVerifyPermissions";
import styles from "../../styles/profile.module.scss";
import { Link } from "react-router-dom";
import { useResendVerificationToken } from "../../hooks/useResendVerificationToken";
import List from "./List/List";
import Avatar from "./Avatar/Avatar";
import DisplayOffers from "../../Components/displayOffers/DisplayOffers";
import DisplayOpinions from "../../Components/opinions/DisplayOpinions";
const Profile = () => {
  const { sendToken, loading } = useResendVerificationToken();
  const {
    state: { user },
  } = useContext(AuthContext);

  useVerifyPermissions(user ? user : false);

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <div className={styles.container_first}>
          {user?.seller && (
            <h3 className={styles.seller_name}>
              {user?.seller?.name} {user?.seller?.surname}
            </h3>
          )}
          {user && <Avatar changable={true} user={user} />}
          <div className={styles.side}>
            <div className={styles.side_offers_wrapper}>
              {user && (
                <>
                  {user.recentlyWatched.length !== 0 && (
                    <h3 className={styles.h3}>Recently Watched</h3>
                  )}
                  <DisplayOffers
                    apiCall={`userOffers/fetch-offers-recently-watched/${user._id}`}
                    expired={false}
                    emptyLabel
                    showAdditional={true}
                    showFilters={false}
                    authorizedApiCall={true}
                    profile={true}
                    showButtons={false}
                    redirectTo="offer"
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div className={styles.container_second}>
          {!user?.isAuthenticated && (
            <div onClick={() => sendToken()} className={styles.action}>
              Verify email
            </div>
          )}
          {loading && <span>Sending...</span>}
          {user && <DisplayOpinions user={user} />}
          {!user?.seller && user?.isAuthenticated && (
            <Link className={styles.action} to="/seller-register">
              Become Seller
            </Link>
          )}
          {user?.seller && (
            <Link className={styles.action} to="/put-auction">
              Put up an Auciton
            </Link>
          )}
          <List />
        </div>
      </div>
    </section>
  );
};

export default Profile;
