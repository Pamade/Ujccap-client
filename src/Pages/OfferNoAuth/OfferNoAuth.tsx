import { useEffect, useState, useContext } from "react";
import styles from "./offer-no-auth.module.scss";
import { useHandleApiCall, CheckType } from "../../hooks/useHandleApiCall";
import {
  RequiredOffer,
  User,
  OffersForSingleOfferPage,
} from "../../types/types";
import { useParams } from "react-router-dom";
import OfferInfo from "./OfferInfo/OfferInfo";
import ImagesPreview from "./ImagesPreview/ImagesPreview";
import _ from "lodash";
import WindowLoader from "../../Components/windowLoader/WindowLoader";
import OtherOffers from "./OtherOffers/OtherOffers";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import SellerInfoForOffer from "../../Components/SellerInfoForOffer/SellerInfoForOffer";
import NotFound from "../../Components/NotFound/NotFound";
export type OfferInfoPick = Pick<
  RequiredOffer,
  | "_id"
  | "name"
  | "price"
  | "location"
  | "expirationDate"
  | "description"
  | "categories"
>;
export type Images = Pick<RequiredOffer, "mainImage" | "images">;

const OfferNoAuth = () => {
  const { offerId } = useParams();
  const { handleApiCall, loading } = useHandleApiCall("GET", false, false);
  const [otherUserOffers, setOtherUserOffers] = useState<RequiredOffer[]>([]);
  const [mainOfferInfo, setMainOfferInfo] = useState<OfferInfoPick>(
    {} as OfferInfoPick
  );
  const [mainOfferImages, setMainOfferImages] = useState<string[]>([]);
  const [offersWithCategories, setOffersWithCategories] = useState<
    RequiredOffer[]
  >([]);
  const [user, setUser] = useState<User | null>(null);
  const {
    state: { loading: userLoading, user: userAuth },
  } = useContext(AuthContext);
  useEffect(() => {
    if (!userLoading) {
      handleApiCall(
        `/offersNoAuth/fetch-offer-and-simillar/${offerId}/${userAuth?._id}`,
        {},
        {},
        (data, error, user) => {
          const isOffer = CheckType<OffersForSingleOfferPage>(data);
          if (isOffer) {
            const { mainOffer, offersUser, offersCategories } = data;
            setUser(user!);
            const pickInfo = _.pick(mainOffer, [
              "_id",
              "name",
              "price",
              "location",
              "expirationDate",
              "description",
              "categories",
            ]);
            const pickImages = _.pick(mainOffer, ["mainImage", "images"]);
            const imagesNotEmpty = pickImages.images.filter((img) => img);
            setMainOfferInfo(pickInfo);
            setMainOfferImages([pickImages.mainImage, ...imagesNotEmpty]);
            setOffersWithCategories(offersCategories);
            setOtherUserOffers(offersUser);
          }
          if (error) {
            setUser(null);
          }
        }
      );
    }
  }, [offerId, userLoading]);

  if (loading && !userLoading && !user) return <WindowLoader />;
  if (user) {
    return Object.keys(mainOfferInfo).length !== 0 ? (
      <section className={styles.wrapper}>
        <div className={styles.info_images_wrapper}>
          <OfferInfo info={mainOfferInfo} userId={user._id} />
          <ImagesPreview imagesOffer={mainOfferImages} />
        </div>
        <SellerInfoForOffer user={user} />
        {otherUserOffers.length > 0 && (
          <OtherOffers
            offers={otherUserOffers}
            userId={user._id}
            type="userOthers"
            showAdditional={false}
          />
        )}
        {offersWithCategories.length > 0 && (
          <OtherOffers
            offers={offersWithCategories}
            userId={user._id}
            type="categories"
            showAdditional={true}
          />
        )}
      </section>
    ) : (
      <NotFound value="No offers" />
    );
  }
  return <NotFound value="Offer not found" />;
};

export default OfferNoAuth;
