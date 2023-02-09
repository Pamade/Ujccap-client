import moment from "moment";
export const dateDifference = (incomingDate: string) => {
    const currentDate = moment();
    const targetDate = moment(incomingDate);
  
    if (!targetDate.isValid()) {
      return "Invalid date";
    }
  
    const formattedDate = targetDate.format("MMMM D, YYYY");
    const difference = targetDate.diff(currentDate);
    let msg = "";
  
    if (difference > 0) {
      msg = `${moment.duration(difference).humanize()} left`;
    } else {
      msg = "Expired";
    }
  
    return `${formattedDate}: ${msg}`;
  };