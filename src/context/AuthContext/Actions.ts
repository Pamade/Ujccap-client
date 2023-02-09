import { User } from "../../types/types";

interface LoadingEnd {
    type: "LOADING_END";
  }
interface LOGIN_SUCCESS {
    type: "LOGIN_SUCCESS";
    payload: User | null;
}
interface LoadingStart {
    type: "LOADING_START";
  }

export  type Actions = LoadingEnd | LOGIN_SUCCESS | LoadingStart