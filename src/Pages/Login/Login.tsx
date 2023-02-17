import React, { useContext, useState } from "react";
import styles from "../../styles/authForm.module.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import GoogleLoginButton from "../../Components/GoogleLoginButton/GoogleLoginButton";
import ValidationError from "../../Components/ValidationError/ValidationError";
import { useHandleApiCall, CheckType } from "../../hooks/useHandleApiCall";
import { LoginData } from "../../types/types";
const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const { handleApiCall } = useHandleApiCall("POST");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch({ type: "LOADING_START" });
    try {
      handleApiCall(
        "/auth/login",
        {
          email,
          password,
        },
        {},
        (data, error) => {
          const isLoginData = CheckType<LoginData>(data);
          if (isLoginData) {
            const { token, user: userData } = data;
            let user = userData;
            localStorage.setItem("token", JSON.stringify(token));

            if (!userData.isAuthenticated) {
              localStorage.setItem("showModal", "showModal - verify email");
              const modal = localStorage.getItem("showModal");
              user = { ...userData, locals: { modalLocal: modal } };
            }
            dispatch({ type: "LOGIN_SUCCESS", payload: user });
          } else if (typeof error === "string") {
            setError(error);
            dispatch({ type: "LOADING_END" });
          }
        }
      );
    } catch (err: any) {
      dispatch({ type: "LOADING_END" });
      setError(err.response.data.err);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <ValidationError error={error} />
        <h3 className={styles.h3}>Login</h3>
        <p className={styles.p}>Use google</p>
        <GoogleLoginButton setError={setError} />
        <p className={styles.p}>Or via email</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            onChange={(e) => setEmail(e.currentTarget.value)}
            value={email}
            className={styles.input}
            type="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.currentTarget.value)}
            value={password}
            className={styles.input}
            type="password"
            placeholder="Password"
          />
          <button className={styles.btn}>Submit</button>
        </form>
        <div>
          <Link to="/forgot-password" className={styles.additional}>
            Forgot Password?
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
