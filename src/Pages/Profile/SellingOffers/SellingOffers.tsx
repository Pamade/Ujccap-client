import DisplayOffers from "../../../Components/displayOffers/DisplayOffers";
import ButtonRedirectToAll from "../ButtonRedirectToAll/ButtonRedirectToAll";
const SellingOffers = () => {
  return (
    <div>
      <ButtonRedirectToAll path={"/user-offers-all"} />
      <DisplayOffers
        apiCall={"/userOffers/fetch-offers-user-profile/"}
        expired={true}
        showAdditional={false}
        showFilters={false}
        authorizedApiCall={true}
        showButtons={false}
        redirectTo="offerUpdate"
        profile={true}
      />
    </div>
  );
};

export default SellingOffers;
