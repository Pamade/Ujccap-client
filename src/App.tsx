import "./styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import VerifyPage from "./Pages/VerifyPage/VerifyPage";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext/AuthContext";
import WindowLoader from "./Components/windowLoader/WindowLoader";
import ForgotPassword from "./Pages/ForgotPasswordVerify/ForgotPassword";
import ForgotPasswordChange from "./Pages/ForgotPasswordChange/ForgotPasswordChange";
import Logout from "./Pages/Logout/Logout";
import SellerRegister from "./Pages/SellerRegister/SellerRegister";
import PutAuction from "./Pages/PutAuction/PutAuction";
import Profile from "./Pages/Profile/Profile";
import SellerDetails from "./Pages/Profile/SellerDetails/SellerDetails";
import UpdateOffer from "./Pages/UpdateOffer/UpdateOffer";
import { PageLoading } from "./context/PageLoadingContext";
import Account from "./Pages/Profile/Account/Account";
import UpdateEmail from "./Pages/Profile/Account/UpdateEmail/UpdateEmail";
import UpdatePassword from "./Pages/Profile/Account/UpdatePassword/UpdatePassword";
import DisplayOffers from "./Components/displayOffers/DisplayOffers";
import SellingOffers from "./Pages/Profile/SellingOffers/SellingOffers";
import Favourites from "./Pages/Profile/Favourites/Favourites";
import OfferNoAuth from "./Pages/OfferNoAuth/OfferNoAuth";
import AnyUserProfile from "./Pages/AnyUserProfile/AnyUserProfile";
import OffersAnyUser from "./Pages/OffersAnyUser/OffersAnyUser";

const App = () => {
  const {
    state: { user, loading },
  } = useContext(AuthContext);

  const {
    state: { loading: loadingPage },
  } = useContext(PageLoading);

  return (
    <div className="App">
      {loading || loadingPage ? <WindowLoader /> : ""}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/auth/:id/verify/:token" element={<VerifyPage />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/forgot-password"
          element={user ? <Navigate to="/" /> : <ForgotPassword />}
        />
        <Route
          path="/forgot-password/:id/verify/:token"
          element={user ? <Navigate to="/" /> : <ForgotPasswordChange />}
        />
        <Route path="/profile" element={<Profile />}>
          <Route path="informations" element={<SellerDetails />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="selling-offers" element={<SellingOffers />} />
          <Route path="account" element={<Account />}>
            <Route path="update-email" element={<UpdateEmail />} />
            <Route path="update-password" element={<UpdatePassword />} />
          </Route>
        </Route>
        <Route path="offer/:offerId" element={<OfferNoAuth />} />
        <Route
          path="/user-offers-all/"
          element={
            <DisplayOffers
              apiCall={"/userOffers/fetch-offers-all/"}
              expired={true}
              showAdditional={false}
              showFilters={true}
              authorizedApiCall={true}
              showButtons={true}
              redirectTo={"offerUpdate"}
            />
          }
        />
        <Route path="/offers-user/:userId" element={<OffersAnyUser />} />
        <Route
          path="/offers-user-favourites"
          element={
            <DisplayOffers
              apiCall={"/userOffers/fetch-offers-user-favourties-all"}
              expired={false}
              showAdditional={true}
              showFilters={true}
              authorizedApiCall={true}
              showButtons={true}
              redirectTo={"offer"}
            />
          }
        />
        <Route
          path={"/offers-categories/:categories"}
          element={
            <DisplayOffers
              apiCall={"/offersNoAuth/fetch-offers-categories/"}
              expired={false}
              param={"categories"}
              showAdditional={true}
              showFilters={true}
              authorizedApiCall={false}
              showButtons={true}
              redirectTo="offer"
            />
          }
        />
        <Route path="/user/:userId" element={<AnyUserProfile />} />
        <Route path="/update-offer/:offerId" element={<UpdateOffer />} />
        <Route path="/seller-register" element={<SellerRegister />} />
        <Route path="/put-auction" element={<PutAuction />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
};

export default App;
