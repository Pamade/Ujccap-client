import { Actions } from "./Actions"
import { INITIAL_STATE } from "./AuthContext";

export const AuthReducer = (state: INITIAL_STATE, action: Actions) => {
    switch (action.type) {
      case "LOADING_START":
        return {
          loading: true,
          user: state.user,
        };
      case "LOGIN_SUCCESS":
        return {
          loading: false,
          user: action.payload,
        };
      case "LOADING_END":
        return {
          loading: false,
          user: null,
        };
      default:
        return state;
    }
  };