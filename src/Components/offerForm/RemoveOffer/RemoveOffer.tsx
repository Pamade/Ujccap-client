import React, { useState } from "react";
import styles from "./remove-offer.module.scss";
import { useHandleApiCall } from "../../../hooks/useHandleApiCall";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  offerId: string;
  offerName: string;
}

const RemoveOffer = ({ offerId, offerName }: Props) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const { handleApiCall } = useHandleApiCall("DELETE", true);
  const navigate = useNavigate();
  const handleClickConfirmation = () => {
    setIsConfirmationOpen(!isConfirmationOpen);
  };
  const handleCancelConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();

    handleApiCall(
      `/userOffers/delete-offer/${offerId}`,
      {},
      {},
      (data, error) => {
        if (typeof data === "string") {
          navigate("/user-offers-all");
          toast.success(data);
        } else if (typeof error === "string") {
          navigate("/user-offers-all");
          toast.error(error);
        }
      }
    );
  };

  return (
    <form onSubmit={handleDelete} className={styles.form}>
      <div onClick={handleClickConfirmation} className={styles.btn}>
        Remove Offer
      </div>
      {isConfirmationOpen && (
        <div className={styles.confirmation}>
          <h4 className={styles.h2}>
            You are deleting offer {offerName}. Are you sure?
          </h4>
          <div className={styles.buttons_wrapper}>
            <div
              onClick={handleCancelConfirmation}
              className={`${styles.decision_button} ${styles.btn_cancel}`}
            >
              Cancel
            </div>
            <button
              className={`${styles.decision_button} ${styles.btn_confirm}`}
            >
              Yes, delete
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default RemoveOffer;
