import React from "react";
import DisplayOffers from "../../Components/displayOffers/DisplayOffers";
import SellerInfoForOffer from "../../Components/SellerInfoForOffer/SellerInfoForOffer";
import { useFetchAnyUser } from "../../hooks/useFetchAnyUser";
import WindowLoader from "../../Components/windowLoader/WindowLoader";
import NotFound from "../../Components/NotFound/NotFound";
const OffersAnyUser = () => {
  const { user, loading } = useFetchAnyUser();

  if (loading && !user) return <WindowLoader />;
  else if (user) {
    return (
      <section>
        <div style={{ width: "90%", margin: "0 auto" }}>
          <SellerInfoForOffer user={user!} />
        </div>
        <DisplayOffers
          apiCall={"/offersNoAuth/fetch-offers-user-id/"}
          expired={false}
          param={"userId"}
          showAdditional={false}
          showFilters={true}
          authorizedApiCall={false}
          showButtons={true}
          redirectTo={"offer"}
        />
      </section>
    );
  }
  return <NotFound value="User not found" />;
};

export default OffersAnyUser;
