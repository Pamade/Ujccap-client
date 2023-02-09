import DisplayOffers from "../../Components/displayOffers/DisplayOffers";
import styles from "../../styles/profile.module.scss";
import Avatar from "../Profile/Avatar/Avatar";
import WindowLoader from "../../Components/windowLoader/WindowLoader";
import ListItem from "./ListItem/ListItem";
import ButtonRedirectToAll from "../Profile/ButtonRedirectToAll/ButtonRedirectToAll";
import { useFetchAnyUser } from "../../hooks/useFetchAnyUser";
import NotFound from "../../Components/NotFound/NotFound";

import DisplayOpinions from "../../Components/opinions/DisplayOpinions";
const AnyUserProfile = () => {
  const { user, loading } = useFetchAnyUser();

  if (loading && !user) return <WindowLoader />;
  else if (user && !loading)
    return (
      <section className={styles.section}>
        <div className={styles.content}>
          {!user && !loading ? (
            <NotFound value="User not found" />
          ) : (
            <>
              <div className={styles.container_first}>
                {user.seller && (
                  <h3 className={styles.seller_name}>
                    {user.seller.name} {user.seller.surname}
                  </h3>
                )}
                <Avatar changable={false} user={user} />
                <div className={styles.side}>
                  <ul className={styles.contact_list}>
                    <ListItem label="EMAIL" value={user.email} />
                    {user.seller && (
                      <>
                        <ListItem
                          label="PHONE NUMBER"
                          value={String(user.seller.phoneNumber)}
                        />
                        <ListItem label="CITY" value={user.seller.city} />
                        <ListItem label="ADDRESS" value={user.seller.address} />
                        <ListItem
                          label="POST CODE"
                          value={user.seller.postCode}
                        />
                      </>
                    )}
                  </ul>
                </div>
              </div>
              <div className={styles.container_second}>
                <DisplayOpinions user={user} />
                <ButtonRedirectToAll path={`/offers-user/${user._id}`} />
                {user && (
                  <DisplayOffers
                    apiCall={"/offersNoAuth/fetch-offers-user-id-profile/"}
                    expired={false}
                    param={"userId"}
                    showAdditional={false}
                    showFilters={false}
                    authorizedApiCall={false}
                    showButtons={false}
                    profile={true}
                    redirectTo={"offer"}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </section>
    );
  else if (!user && !loading) return <NotFound value="User not found" />;
  return <></>;
};

export default AnyUserProfile;
