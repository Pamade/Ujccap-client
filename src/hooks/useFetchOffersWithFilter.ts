// import { useState } from "react";
// import { useHandleApiCall, CheckType } from "./useHandleApiCall";
// import { RequiredOffer } from "../types/types";
// import { User } from "../types/types";

// export interface StatusOffers {
//   offersAll:number
//   current:number,
//   expired:number,
//   currentFetch:number
// }

// export interface OffersWithCount extends StatusOffers {
//   offers:RequiredOffer[],
// }

// export const useFetchOffersWithFilter = (authRequired = true) => {
  
//   const [offers, setOffers] = useState<RequiredOffer[]>([]);
//   const [status, setStatus] = useState<StatusOffers>({} as StatusOffers);
//   const [user, setUser] = useState<User>({} as User)
//   const { handleApiCall, loading } = useHandleApiCall("GET", authRequired, false);
  
//   const fetchOffers = (query?:string) => {  
//     setOffers([])
//     const URL = authRequired ? `/userOffers/fetch-offers${query !== "?" && query ? query : ''}` : `/offersNoAuth/fetch-offers${query !== "?" && query ? query : ''}`
//     console.log(URL)
//     handleApiCall(URL,{}, {}, (data, error, user) => {
//       const isOffer = CheckType<OffersWithCount>(data);

//       if (user) {
//         setUser(user)
//       }

//       if (isOffer) {
//         setOffers(data.offers);
//         setStatus({
//           current: data.current,
//           currentFetch: data.currentFetch,
//           expired: data.expired,
//           offersAll: data.offersAll,
//         });
//       } else if(error) {
//         setOffers([]);
//       }
//     });
//   }
  
//   return { offers, loading, status, fetchOffers, user };
// };
export {}