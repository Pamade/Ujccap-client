import React, { useState, useContext } from "react";
import ProfileInputField from "../../ProfileInputField/ProfileInputField";
import ProfileSubmitButton from "../../ProfileSubmitButton/ProfileSubmitButton";
import { AuthContext } from "../../../../context/AuthContext/AuthContext";
import SuccessOrErrorBox from "../SuccessOrErrorBox/SuccessOrErrorBox";
import { useChangeCredentials } from "../../../../hooks/useChangeCredentials";

const UpdatePassword = () => {
  const [credentials, setCredentials] = useState({
    password: "",
    repeatPassword: "",
    newPassword: "",
  });
  const { success, loading, error, handleSubmit } = useChangeCredentials(
    credentials,
    "/auth/changePassword"
  );

  const {
    state: { user },
  } = useContext(AuthContext);

  const data = {
    data: credentials,
    updatedData: setCredentials,
  };

  if (user?.isGoogleUser)
    return (
      <>
        <p style={{ color: "rgb(209, 25, 25)" }}>
          Google user cannot change password
        </p>
      </>
    );

  return (
    <form onSubmit={handleSubmit}>
      {(error || success) && (
        <SuccessOrErrorBox success={success} error={error} />
      )}
      <ProfileInputField
        value={credentials.password}
        label="Password"
        name="password"
        data={data}
        type="password"
      />
      <ProfileInputField
        value={credentials.newPassword}
        label="New password"
        name="newPassword"
        data={data}
        type="password"
      />
      <ProfileInputField
        value={credentials.repeatPassword}
        label="Repeat Password"
        name="repeatPassword"
        data={data}
        type="password"
      />
      <ProfileSubmitButton loading={loading} />
    </form>
  );
};

export default UpdatePassword;
