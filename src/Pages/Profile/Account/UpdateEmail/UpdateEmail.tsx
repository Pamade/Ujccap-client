import React, { useState, useContext, useEffect } from "react";
import ProfileInputField from "../../ProfileInputField/ProfileInputField";
import ProfileSubmitButton from "../../ProfileSubmitButton/ProfileSubmitButton";
import { AuthContext } from "../../../../context/AuthContext/AuthContext";
import { useChangeCredentials } from "../../../../hooks/useChangeCredentials";
import SuccessOrErrorBox from "../SuccessOrErrorBox/SuccessOrErrorBox";
const UpdateEmail = () => {
  const {
    state: { user },
  } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    email: user?.email,
    newEmail: user?.email,
    password: "",
  });

  useEffect(() => {
    if (user) {
      setCredentials({
        ...credentials,
        email: user.email,
        newEmail: user.email,
      });
    }
  }, [user]);

  const { success, loading, error, handleSubmit } = useChangeCredentials(
    credentials,
    "/auth/changeEmail"
  );

  const data = {
    data: credentials,
    updatedData: setCredentials,
  };

  if (user?.isGoogleUser)
    return (
      <>
        <p style={{ color: "rgb(209, 25, 25)" }}>
          Google user cannot change email
        </p>
        <ProfileInputField
          value={user.email}
          label="Email"
          name="email"
          disabled={true}
          type="email"
          data={data}
        />
      </>
    );

  return (
    <form onSubmit={handleSubmit}>
      {(error || success) && (
        <SuccessOrErrorBox success={success} error={error} />
      )}
      <ProfileInputField
        value={credentials.email ? credentials.email : ""}
        label="Email"
        name="email"
        type="email"
        data={data}
        disabled={true}
      />
      <ProfileInputField
        value={credentials.newEmail ? credentials.newEmail : ""}
        label="New email"
        name="newEmail"
        type="email"
        data={data}
      />
      <ProfileInputField
        value={credentials.password}
        label="Password"
        name="password"
        type="password"
        data={data}
      />
      <ProfileSubmitButton loading={loading} />
    </form>
  );
};

export default UpdateEmail;
