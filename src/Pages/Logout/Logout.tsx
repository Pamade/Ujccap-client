import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import VerifyBox from "../../Components/VerifyBox/VerifyBox";
const Logout = () => {
  const { dispatch } = useContext(AuthContext);
  useEffect(() => {
    dispatch({ type: "LOADING_END" });
    localStorage.removeItem("token");
  }, []);
  return <VerifyBox msg="You are logged out" textColor="black" to="/login" />;
};

export default Logout;
