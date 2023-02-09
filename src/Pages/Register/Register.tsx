import React, { useState, useContext, useRef, useEffect } from "react";
import styles from "../../styles/authForm.module.scss";
import register from "./register.module.scss";
import { Link } from "react-router-dom";
import status from "../../styles/loginRegisterStatus.module.scss";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import avatar from "../../images/default.png";
import { useFileRead } from "../../hooks/useFileRead";
import GoogleLoginButton from "../../Components/googleLoginButton/GoogleLoginButton";
import ValidationError from "../../Components/validationError/ValidationError";
import { useHandleApiCall } from "../../hooks/useHandleApiCall";
import { useResendVerificationToken } from "../../hooks/useResendVerificationToken";
const Register = () => {
  const { dispatch } = useContext(AuthContext);
  const { sendToken, loading } = useResendVerificationToken();
  const { handleApiCall } = useHandleApiCall("POST");
  const [credentials, setCredentials] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [emailToResend, setEmailToResend] = useState("");
  const [isResend, setisResend] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);
  const { fileDataURL, setFileDataURL, file, handleChange } = useFileRead();
  const formRef = useRef<HTMLFormElement>(null);

  const handleChangeCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      dispatch({ type: "LOADING_START" });
      handleApiCall(
        "/auth/register",
        { ...credentials, avatar: file },
        { headers: { "Content-Type": "multipart/form-data" } },
        (data, error) => {
          if (!error && typeof data === "string") {
            setError("");
            setCredentials({});
            formRef.current?.reset();
            setSuccess(data);
            setFileDataURL(null);
            setEmailToResend(credentials.email);
          } else if (typeof error === "string") {
            setError(error);
            setSuccess("");
          }
          dispatch({ type: "LOADING_END" });
        }
      );
    } catch (err: any) {
      dispatch({ type: "LOADING_END" });
      setError(err.response.data.err);
    }
  };

  const handleResendToken = async () => {
    try {
      setSuccess("");
      sendToken();
      setSuccess("Token sent");
      setisResend(true);
    } catch (err: any) {
      setError(err.response.data.err);
    }
  };

  const handleClickImg = () => {
    avatarRef.current?.click();
  };

  const inputFields = [
    {
      type: "email",
      name: "email",
      placeholder: "Email",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
    },
    {
      name: "repeatPassword",
      type: "password",
      placeholder: "Repeat Password",
    },
  ];

  const inputFieldsRepeat = {
    onChange: handleChangeCredentials,
    className: styles.input,
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSuccess("");
    }, 20000);
    return () => clearTimeout(timeout);
  }, [success]);

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        {success && (
          <div className={`${status.success} ${status.message_box}`}>
            {!loading && <p>{success}</p>}
            {isResend ? (
              <p>Email sent</p>
            ) : (
              <p onClick={handleResendToken} className={styles.resend}>
                {loading
                  ? "Loading..."
                  : `Did not get an email? - Resend ${emailToResend}`}
              </p>
            )}
          </div>
        )}
        <ValidationError error={error} />
        <h3 className={styles.h3}>Register</h3>
        <p className={styles.p}>Use google</p>
        <GoogleLoginButton setError={setError} />
        <p className={styles.p}>Or create account</p>
        <form
          ref={formRef}
          onSubmit={(e) => handleSubmit(e)}
          className={styles.form}
          encType="multipart/form-data"
        >
          {inputFields.map((field) => (
            <input
              key={field.name}
              {...inputFieldsRepeat}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
            />
          ))}
          <input
            type="file"
            onChange={handleChange}
            ref={avatarRef}
            className={register.file}
            name="avatar"
          />
          <img
            onClick={handleClickImg}
            src={fileDataURL || avatar}
            className={register.avatar}
            alt="avatar"
          />
          <button className={styles.btn}>Submit</button>
        </form>
        <p>Already have an account?</p>
        <div>
          <Link className={styles.additional} to="/login">
            Log in
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
