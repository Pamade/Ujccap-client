import styles from "../../styles/offer-container.module.scss";
import OfferForm from "../../Components/offerForm/OfferForm";
import { Offer, User } from "../../types/types";
import { daysToDate } from "../../utils/daysToDate";

const initialOfferInformations: Offer = {
  _id: "",
  name: "",
  description: "",
  price: 0,
  categories: [],
  location: "",
  images: [],
  mainImage: "",
  expirationDate: daysToDate("1"),
  createdAt: Date.now(),
  updatedAt: Date.now(),
  user: {} as User,
};

const PutAuction = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.h2}>Create Offer</h2>
        <OfferForm
          data={initialOfferInformations}
          sendData={{ value: "add-offer", method: "POST" }}
        />
      </div>
    </section>
  );
};

export default PutAuction;
