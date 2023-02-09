import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import stylesWrapper from "../account-details.module.scss";
import { Seller } from "../../../types/types";
import { useHandleApiCall } from "../../../hooks/useHandleApiCall";
import { toast } from "react-toastify";
import ErrorAlert from "../../../Components/errorAlert/ErrorAlert";
import ProfileInputField from "../ProfileInputField/ProfileInputField";
import ProfileSubmitButton from "../ProfileSubmitButton/ProfileSubmitButton";

const SellerDetails = () => {
  const {
    state: { user },
  } = useContext(AuthContext);

  const [userUpdatedData, setUserUpdatedData] = useState<Seller | null>(null);
  const [loading, setLoading] = useState(false);
  const { handleApiCall } = useHandleApiCall("PUT", true);

  useEffect(() => {
    if (user?.seller) {
      setUserUpdatedData(user.seller);
    }
  }, [user]);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userUpdatedData) {
      setLoading(true);
      handleApiCall(
        "/seller/updateSeller",
        userUpdatedData,
        {},
        (data, error, user) => {
          if (typeof data === "string" && data !== "" && user) {
            toast.success(data);
            setLoading(false);
          } else {
            if (typeof error === "string") {
              setLoading(false);
              return toast.error(error);
            }
            toast.error(() => <ErrorAlert error={error} />);
            setLoading(false);
          }
        }
      );
    }
  };

  const data = {
    data: userUpdatedData,
    updatedData: setUserUpdatedData,
  };

  return (
    <div className={stylesWrapper.wrapper}>
      {user && (
        <>
          {userUpdatedData ? (
            <>
              <h2>Seller Details</h2>
              <form onSubmit={handleSubmit}>
                <ProfileInputField
                  name="name"
                  label="Name"
                  value={userUpdatedData.name}
                  data={data}
                  type="text"
                />
                <ProfileInputField
                  name="surname"
                  label="Surname"
                  value={userUpdatedData.surname}
                  data={data}
                  type="text"
                />
                <ProfileInputField
                  name="phoneNumber"
                  label="Phone Number"
                  value={String(userUpdatedData.phoneNumber)}
                  data={data}
                  type="number"
                />
                <ProfileInputField
                  name="city"
                  label="City"
                  value={userUpdatedData.city}
                  data={data}
                  type="text"
                />
                <ProfileInputField
                  name="address"
                  label="Address"
                  value={userUpdatedData.address}
                  data={data}
                  type="text"
                />
                <ProfileInputField
                  name="postCode"
                  label="Post Code"
                  value={userUpdatedData.postCode}
                  data={data}
                  type="text"
                />
                <ProfileSubmitButton loading={loading} />
              </form>
            </>
          ) : (
            <h2>You are not seller</h2>
          )}
        </>
      )}
    </div>
  );
};

export default SellerDetails;
