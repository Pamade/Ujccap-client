import { useState, useLayoutEffect, useContext } from "react";
import {
  FilterCategory,
  SortWithTypes,
  State,
} from "../../context/FiltersContext/FiltersContext";
import { useHandleApiCall, CheckType } from "../../hooks/useHandleApiCall";
import { OffersWithCount } from "../../types/types";
import { FiltersContext } from "../../context/FiltersContext/FiltersContext";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { Offer } from "../../types/types";
import SingleOffer from "./SingleOffer/SingleOffer";
import PaginateButtons from "../PaginateButtons/PaginateButtons";
import Filters from "../Filters/Filters";
import SpinnerSmall from "../spinnerSmall/SpinnerSmall";
import styles from "./display-offers.module.scss";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";

export type RedirectSingleOffer = "offer" | "offerUpdate";
interface Props {
  apiCall: string;
  expired: boolean;
  showAdditional: boolean;
  showFilters: boolean;
  authorizedApiCall: boolean;
  showButtons: boolean;
  redirectTo: RedirectSingleOffer;
  profile?: boolean;
  emptyLabel?: boolean;
  param?: string;
}

const DisplayOffers = ({
  apiCall,
  expired,
  param,
  showAdditional,
  showFilters,
  authorizedApiCall,
  redirectTo,
  showButtons,
  profile,
  emptyLabel,
}: Props) => {
  const params = useParams();
  const [values, setValues] = useState<OffersWithCount>({} as OffersWithCount);

  const { handleApiCall, loading } = useHandleApiCall("GET", authorizedApiCall);

  const { state } = useContext(FiltersContext);
  const {
    state: { loading: userLoading },
  } = useContext(AuthContext);

  const buildQueryString = (state: State) => {
    const setCategoryOrSort = (type: FilterCategory[] | SortWithTypes[]) => {
      let value = "";
      if (typeof type !== "string" && type) {
        value = type.map((item) => item.value).join(",");
      }
      return value;
    };

    let query = "?";
    if (state.page) query += `page=${state.page}&`;
    if (state.name) query += `name=${state.name}&`;
    if (state.location) query += `location=${state.location}&`;
    if (state.priceFrom) query += `priceFrom=${state.priceFrom}&`;
    if (state.priceTo) query += `priceTo=${state.priceTo}&`;
    if (state.showExpired) query += `showExpired=${state.showExpired}&`;
    if (state.hasImage) query += `hasImage=${state.hasImage}&`;
    if (state.sort && typeof state.sort !== "string")
      query += `sort=${setCategoryOrSort(state.sort)}&`;
    if (
      param !== "categories" &&
      state.categories &&
      typeof state.categories !== "string"
    )
      query += `categories=${setCategoryOrSort(state.categories)}`;

    return query;
  };

  useLayoutEffect(() => {
    const paramValue = param && params[param] ? params[param] : "";

    const api = `${apiCall}${paramValue}${buildQueryString(state)}`;
    console.log(api);
    handleApiCall(api, {}, {}, (data, err) => {
      const isOffer = CheckType<OffersWithCount>(data);

      if (isOffer) {
        const { offers, count } = data;

        setValues({ offers, count });
      } else if (err) {
        setValues({} as OffersWithCount);
      }
    });
  }, [state]);

  const renderOffers = (offers: Offer[], count: number) => {
    return (
      <>
        <div className={styles.render_offers}>
          {offers.map((offer) => (
            <SingleOffer
              key={offer._id}
              offer={offer}
              user={offer.user}
              showAdditional={showAdditional}
              redirectTo={redirectTo}
              profile={profile}
            />
          ))}
        </div>
        {showButtons && <PaginateButtons offersCount={count} />}
      </>
    );
  };

  return (
    <>
      {loading && !userLoading ? (
        <SpinnerSmall />
      ) : (
        <section className={styles.main}>
          <div className={!profile ? styles.content : null}>
            {showFilters && <Filters showExpired={expired} param={param} />}

            <>
              {values.offers &&
                values.offers.length !== 0 &&
                renderOffers(values.offers, values.count)}
            </>
          </div>
        </section>
      )}
      {values.offers &&
        values.offers.length === 0 &&
        !loading &&
        (emptyLabel ? "" : <NotFound value="No offers" />)}
    </>
  );
};

export default DisplayOffers;
