import { useHandleApiCall } from "./useHandleApiCall";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../types/types";

export const useFetchAnyUser = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const { handleApiCall, loading } = useHandleApiCall("GET", false, false);
  useEffect(() => {
    const fetch = () => {
      handleApiCall(
        `/offersNoAuth/userExist/${userId}`,
        {},
        {},
        (data, err, user) => {
          if (user) {
            setUser(user);
          } else setUser(null);
        }
      );
    };
    fetch();
  }, [userId]);

  return { user, loading };
};
