import { createContext, useReducer } from "react";

type Actions = { type: "LOADING_START" } | { type: "LOADING_END" };
interface INITIAL_STATE {
  loading: boolean;
}

interface LoadingContext {
  state: INITIAL_STATE;
  dispatch: React.Dispatch<Actions>;
}

export const PageLoading = createContext<LoadingContext>({
  state: {
    loading: false,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
});

const LoadingReducer = (loading: INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case "LOADING_START":
      return { loading: true };
    case "LOADING_END":
      return { loading: false };
    default:
      return loading;
  }
};

export const PageLoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(LoadingReducer, { loading: false });

  return (
    <PageLoading.Provider value={{ state, dispatch }}>
      {children}
    </PageLoading.Provider>
  );
};
