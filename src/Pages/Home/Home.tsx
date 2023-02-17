import { useState, useRef, useEffect } from "react";
import background from "../../images/background.jpg";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import Modal from "../../Components/Modal/Modal";
import { PageLoading } from "../../context/PageLoadingContext";
import DisplayOffers from "../../Components/displayOffers/DisplayOffers";
import ShowCategories from "./ShowCategories/ShowCategories";
import HomeBackground from "./HomeBackground/HomeBackground";
const Home = () => {
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);
  const img = useRef<null | HTMLImageElement>(null);
  const {
    state: { user },
  } = useContext(AuthContext);
  const {
    state: { loading },
    dispatch,
  } = useContext(PageLoading);

  useEffect(() => {
    dispatch({ type: "LOADING_START" });
    img.current = new Image();
    img.current.src = background;
    img.current.onload = () => {
      setIsBackgroundLoaded(true);
      dispatch({ type: "LOADING_END" });
    };
  }, [dispatch]);

  if (!isBackgroundLoaded || loading) return <></>;
  return (
    <>
      {user && user.locals && user.locals.modalLocal ? <Modal /> : ""}
      <HomeBackground img={img} />
      <ShowCategories />
      <DisplayOffers
        showAdditional={true}
        expired={false}
        apiCall={"/offersNoAuth/fetch-offers-main-page"}
        showFilters={true}
        authorizedApiCall={false}
        showButtons={true}
        redirectTo="offer"
      />
    </>
  );
};

export default Home;
