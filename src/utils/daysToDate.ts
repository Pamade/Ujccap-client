
import moment from "moment";
export const daysToDate = (value: string) => {
    return moment().add(value, "days").toDate();
  };