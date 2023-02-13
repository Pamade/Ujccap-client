import React, { useState, useContext } from "react";
import styles from "./sellerRegister.module.scss";
import person from "../../images/person.png";
import { useNavigate } from "react-router-dom";
import { useVerifyPermissions } from "../../hooks/useVerifyPermissions";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { toast } from "react-toastify";
import FormField from "../../Components/offerForm/FormField/FormField";
import { useHandleApiCall, CheckType } from "../../hooks/useHandleApiCall";
import { User } from "../../types/types";

const inputFields = [
  { label: "Name", name: "name", type: "text", maxLength: 35 },
  { label: "Surname", name: "surname", type: "text", maxLength: 35 },
  { label: "City", name: "city", type: "text", maxLength: 35 },
  { label: "Address", name: "address", type: "text", maxLength: 35 },
  { label: "Phone Number", name: "phoneNumber", type: "number", maxLength: 35 },
  { label: "Post Code", name: "postCode", type: "text", maxLength: 35 },
];

const initialSellerValue = {
  name: "",
  surname: "",
  city: "",
  address: "",
  postCode: "",
  phoneNumber: 0,
};

const SellerRegister = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);

  useVerifyPermissions(user?.isAuthenticated && !user?.seller);

  const { handleApiCall } = useHandleApiCall("POST", true);
  const navigate = useNavigate();
  const [seller, setSeller] = useState<{ [key: string]: string | number }>(
    initialSellerValue
  );
  const [validationError, setValidationError] = useState<{
    [key: string]: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleApiCall("/seller/createSeller", seller, {}, (data, err, user) => {
      if (typeof err === "object") {
        return setValidationError(err);
      }

      if (user && typeof data === "string") {
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
        toast.success(data);
        navigate("/put-auction");
      }
    });
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValidationError({
      ...validationError,
      [e.target.name]: "",
    });

    setSeller({
      ...seller,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className={styles.container}>
      <img alt="person" className={styles.img} src={person} />
      <h2 className={styles.heading}>Become Seller</h2>
      <div className={styles.validation_wrapper}></div>
      <form onSubmit={handleSubmit} className={styles.form}>
        {inputFields.map((field) => (
          <FormField
            key={field.label}
            handleOnChange={handleOnChange}
            field={field}
            data={seller}
            validationError={validationError}
            size="medium"
          />
        ))}
        <button className={styles.btn}>Submit</button>
      </form>
    </section>
  );
};

export default SellerRegister;
