import ButtonRedirectToAll from "../ButtonRedirectToAll/ButtonRedirectToAll";
import DisplayOffers from "../../../Components/displayOffers/DisplayOffers";
const Favourites = () => {
  return (
    <div>
      <ButtonRedirectToAll path={"/offers-user-favourites"} />
      <DisplayOffers
        apiCall={"/userOffers/fetch-offers-user-favourties-profile/"}
        expired={false}
        showAdditional={true}
        showFilters={false}
        authorizedApiCall={true}
        showButtons={false}
        profile={true}
        redirectTo="offer"
      />
    </div>
  );
};

export default Favourites;
