import styles from "../../styles/offer-container.module.scss";
import React, { useContext, useState, useEffect } from "react";
import { useVerifyPermissions } from "../../hooks/useVerifyPermissions";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useHandleApiCall, CheckType } from "../../hooks/useHandleApiCall";
import { useParams } from "react-router-dom";
import OfferForm from "../../Components/offerForm/OfferForm";
import { useNavigate } from "react-router-dom";
import { Offer } from "../../types/types";
import { PageLoading } from "../../context/PageLoadingContext";

const UpdateOffer = () => {
  const { offerId } = useParams();
  const {
    state: { user },
  } = useContext(AuthContext);
  const {
    state: { loading },
    dispatch,
  } = useContext(PageLoading);

  const { handleApiCall } = useHandleApiCall("GET", true);
  const [initialOffer, setInitialOffer] = useState<Offer>({} as Offer);
  const navigate = useNavigate();
  useVerifyPermissions(user?.seller);

  useEffect(() => {
    const fetchOffer = async () => {
      if (offerId) {
        dispatch({ type: "LOADING_START" });
        await handleApiCall(
          `userOffers/fetch-offer/${offerId}`,
          {},
          {},
          (data, error) => {
            const isOffer = CheckType<Offer>(data);
            if (isOffer) {
              setInitialOffer(data);
            }
            if (error) {
              navigate("/");
            }
            dispatch({ type: "LOADING_END" });
          }
        );
      }
    };

    fetchOffer();
  }, [offerId]);

  if (loading) return <></>;
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.h2}>
          Update offer {initialOffer && initialOffer.name}
        </h2>
        <OfferForm
          data={initialOffer}
          updating={true}
          sendData={{ value: `update-offer/${offerId}`, method: "PUT" }}
        />
      </div>
    </section>
  );
};

export default UpdateOffer;
