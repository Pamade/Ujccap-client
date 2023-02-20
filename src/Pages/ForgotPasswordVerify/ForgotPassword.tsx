import React, { useState, useContext } from "react";
import styles from "../../styles/authForm.module.scss";
import status from "../../styles/loginRegisterStatus.module.scss";
import ValidationError from "../../Components/validationError/ValidationError";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useHandleApiCall } from "../../hooks/useHandleApiCall";
const ForgotPassword = () => {
  const { handleApiCall } = useHandleApiCall("POST");
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      dispatch({ type: "LOADING_START" });
      handleApiCall("/auth/forgotPassword", { email }, {}, (data, error) => {
        if (typeof data === "string") {
          setSuccess(data);
          dispatch({ type: "LOADING_END" });
        } else if (typeof error === "string") {
          setError(error);
          dispatch({ type: "LOADING_END" });
        }
      });
    } catch (err: any) {
      setError(err.response.data.err);
      dispatch({ type: "LOADING_END" });
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <ValidationError error={error} />
        {success && (
          <div className={`${status.success} ${status.message_box}`}>
            <p>{success}</p>
          </div>
        )}
        <h3 className={styles.h3}>Provide Email</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            onChange={(e) => setEmail(e.currentTarget.value)}
            value={email}
            className={styles.input}
            type="email"
            placeholder="Email"
          />
          <button className={styles.btn}>Submit</button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
