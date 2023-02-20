import React, { useState, useContext, useEffect } from "react";
import styles from "../../styles/authForm.module.scss";
import { Navigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import VerifyBox from "../../Components/verifyBox/VerifyBox";
import ValidationError from "../../Components/validationError/ValidationError";
import { useHandleApiCall } from "../../hooks/useHandleApiCall";

const ForgotPasswordChange = () => {
  const { id: idLink, token: tokenLink } = useParams();
  const { dispatch } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const [changePasswordResponse, setChangePasswordResponse] = useState("");
  const { handleApiCall } = useHandleApiCall("POST");
  const { handleApiCall: verifyTokenCall } = useHandleApiCall("GET");

  useEffect(() => {
    if (idLink && tokenLink) {
      verifyTokenCall(
        `/auth/forgotPassword/${idLink}/verify/${tokenLink}`,
        {},
        {},
        (data, error) => {
          if (typeof error === "string") {
            setChangePasswordResponse(error);
          }
        }
      );
    }
  }, [idLink, tokenLink]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch({ type: "LOADING_START" });
    try {
      handleApiCall(
        `auth/resetForgotPassword/${idLink}/verify/${tokenLink}`,
        { password, repeatPassword },
        {},
        (data, error) => {
          console.log(data, error);
          if (typeof error === "string") {
            setValidationError(error);
            setError("");
          }
          if (typeof data === "string") {
            setChangePasswordResponse(data);
          }
          dispatch({ type: "LOADING_END" });
        }
      );
    } catch (err: any) {
      setValidationError(err.response.data.err);
      dispatch({ type: "LOADING_END" });
    }
  };

  if (error) return <VerifyBox msg={error} to="/" textColor="black" />;

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        {changePasswordResponse ? (
          <VerifyBox
            msg={changePasswordResponse}
            to="/login"
            textColor="white"
          />
        ) : (
          <>
            {validationError && <ValidationError error={validationError} />}
            <h3 className={styles.h3}>Provide new password</h3>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                onChange={(e) => setPassword(e.currentTarget.value)}
                value={password}
                className={styles.input}
                type="password"
                placeholder="Password"
              />
              <input
                onChange={(e) => setRepeatPassword(e.currentTarget.value)}
                value={repeatPassword}
                className={styles.input}
                type="password"
                placeholder="Repeat Password"
              />
              <button className={styles.btn}>Submit</button>
            </form>
          </>
        )}
      </div>
    </section>
  );
};
export default ForgotPasswordChange;
