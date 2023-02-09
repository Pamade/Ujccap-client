import { Offer } from "../types/types";
import { useHandleApiCall, CheckType } from "./useHandleApiCall";
import { useState, useLayoutEffect } from "react";
import { RequiredOffer } from "../types/types";

// export const useFetchFavourites = () => {
//     const { handleApiCall, loading } = useHandleApiCall("GET", true);
//     const [offers, setOffers] = useState<RequiredOffer[]>([]);
//     useLayoutEffect(() => {
//       handleApiCall("/favourites/fetch", {}, {}, (data, err) => {
//         const isOffer = CheckType<RequiredOffer[]>;
//         if (isOffer(data)) {
//           setOffers(data);
//         }
//         if (err) {
//           setOffers([]);
//         }
//       });
//     }, []);

//     return {loading, offers}
// }