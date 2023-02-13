import React, { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useHandleApiCall, CheckType } from "../../hooks/useHandleApiCall";
import { LoginData } from "../../types/types";
interface Props {
  setError: React.Dispatch<React.SetStateAction<string>>;
}
const GoogleLoginButton = ({ setError }: Props) => {
  const { handleApiCall } = useHandleApiCall("POST");
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const googleAuth = async (email: string, avatar: string) => {
    try {
      handleApiCall(
        "/auth/registerGoogle",
        { email, avatar },
        {},
        (data, error) => {
          const isData = CheckType<LoginData>(data);
          if (isData) {
            const { token, user } = data;
            localStorage.setItem("token", JSON.stringify(token));
            dispatch({ type: "LOGIN_SUCCESS", payload: user });
            if (token) {
              navigate("/");
            }
          } else if (typeof error === "string") {
            setError(error);
          }
        }
      );
    } catch (err: any) {
      setError(err.response.data.err);
    }
  };

  return (
    <GoogleLogin
      size={"large"}
      type="icon"
      theme="outline"
      shape="rectangular"
      onSuccess={(credentialResponse) => {
        if (credentialResponse.credential) {
          const decoded: { email: string; picture: string } = jwt_decode(
            credentialResponse.credential
          );
          googleAuth(decoded.email, decoded.picture);
        }
      }}
      onError={() => {
        setError("Internal error");
      }}
    />
  );
};

export default GoogleLoginButton;
