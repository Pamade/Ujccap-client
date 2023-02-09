// import React from "react";
// import styles from "./offers-and-buttons-display.module.scss";
// // import styles from "./offers-and-buttons-display.module.scss";
// import SingleOffer from "./SingleOffer/SingleOffer";
// import PaginateButtons from "../PaginateButtons/PaginateButtons";
// import { StatusOffers } from "../../hooks/useFetchOffersWithFilter";
// import { RequiredOffer } from "../../types/types";
// import { PropsDisplayOffers } from "./DisplayOffers";

// type PickDisplayOffers = Pick<
//   PropsDisplayOffers,
//   "redirectTo" | "showAdditional"
// >;

// interface PropsOffersAndButtons extends PickDisplayOffers {
//   status: StatusOffers;
//   offers: RequiredOffer[];
//   refScroll?: React.MutableRefObject<HTMLHeadingElement | null>;
// }

// const OffersAndButtonsDisplay = ({
//   offers,
//   status,
//   redirectTo,
//   showAdditional,
//   refScroll,
// }: PropsOffersAndButtons) => {
//   return (
//     <>
//       <section className={styles.wrapper}>
//         {offers.map((offer) => (
//           <SingleOffer
//             offer={offer}
//             key={offer._id}
//             showAdditional={showAdditional}
//             redirectTo={redirectTo}
//           />
//         ))}
//       </section>
//       <PaginateButtons
//         refScroll={refScroll}
//         offersCount={status.currentFetch}
//       />
//     </>
//   );
// };

// export default OffersAndButtonsDisplay;
export {};
