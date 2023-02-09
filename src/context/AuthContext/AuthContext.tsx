import React, { createContext, useEffect, useReducer } from "react";
import { User, Error } from "../../types/types";
import { useHandleApiCall, CheckType } from "../../hooks/useHandleApiCall";
import { Actions } from "./Actions";
import { AuthReducer } from "./AuthReducer";

export interface INITIAL_STATE {
  loading: boolean;
  user: User | null;
}

interface AuthContext {
  state: INITIAL_STATE;
  dispatch: React.Dispatch<Actions>;
}

interface AuthContextProvider {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContext>({
  state: {
    loading: false,
    user: null,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
});

const INITIAL_STATE = {
  loading: true,
  user: null,
};

export const AuthContextProvider = ({ children }: AuthContextProvider) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const { handleApiCall } = useHandleApiCall("GET", true);

  const getUser = async () => {
    dispatch({ type: "LOADING_START" });
    const modal = localStorage.getItem("showModal");
    await handleApiCall("/auth/getUser", {}, {}, (data, err: Error) => {
      const isUser = CheckType<User>(data);

      if (isUser) {
        const user = { ...data, locals: { modalLocal: modal || null } };
        console.log(user);

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: user,
        });
      } else if (err || !isUser) {
        dispatch({ type: "LOADING_END" });
      }
    });
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
