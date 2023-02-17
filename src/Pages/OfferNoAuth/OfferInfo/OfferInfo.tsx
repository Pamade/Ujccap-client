import styles from "./offer-info.module.scss";
import { AiOutlineFieldTime } from "react-icons/ai";
import BoxInfo from "./BoxInfo";
import { OfferInfoPick } from "../OfferNoAuth";
import moment from "moment";
import DisplayCategories from "../../../Components/DisplayCategories/DisplayCategories";
import HeartIcon from "../../../Components/HeartIcon/HeartIcon";

interface Props {
  info: OfferInfoPick;
  userId: string;
}

const OfferInfo = ({ info, userId }: Props) => {
  const { name, price, location, expirationDate, description, categories } =
    info;

  const currentDate = new Date();
  const futureDate = moment(expirationDate);
  const duration = moment.duration(futureDate.diff(currentDate));
  const daysLeft = duration.days()
    ? `${
        duration.days() > 1
          ? duration.days() + " days "
          : duration.days() + " day "
      }`
    : "";
  const hoursLeft = duration.hours()
    ? `${
        duration.hours() > 1
          ? duration.hours() + " hours"
          : duration.hours() + " hour"
      } `
    : "";
  const minutesLeft = duration.minutes()
    ? `${
        duration.minutes() > 1
          ? duration.minutes() + " minutes"
          : duration.minutes() + " minute"
      } `
    : "";
  const timeLeft =
    duration.minutes() >= 0 ? daysLeft + hoursLeft + minutesLeft : "Expired";

  return (
    <div className={styles.wrapper}>
      <div className={styles.name_wrapper}>
        <h3 className={styles.name}>{name}</h3>
      </div>
      <div className={styles.time_left_wrapper}>
        <div>
          <AiOutlineFieldTime className={styles.icon} />
          <p className={styles.time}>
            TIME LEFT: <span>{timeLeft}</span>
          </p>
        </div>

        <HeartIcon offerId={info._id} userId={userId} />
      </div>
      <div className={styles.info_wrapper}>
        <BoxInfo label="Price" value={String(price) + " Euro"} />
        <BoxInfo label="Location" value={location} />
        <BoxInfo label="Categories" />
        <DisplayCategories categories={categories} />
        <BoxInfo label="Description" value={description} />
      </div>
    </div>
  );
};

export default OfferInfo;
