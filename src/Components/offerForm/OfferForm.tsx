import styles from "./offer-form.module.scss";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { useVerifyPermissions } from "../../hooks/useVerifyPermissions";
import FormField from "./FormField/FormField";
import LabelWrapper from "./LabelWrapper/LabelWrapper";
import Images from "./Images/Images";
import Categories from "./Categories/Categories";
import { toast } from "react-toastify";
import { Offer } from "../../types/types";
import { daysToDate } from "../../utils/daysToDate";
import { useHandleApiCall } from "../../hooks/useHandleApiCall";
import SelectField from "./Select/SelectField";
import ErrorAlert from "../errorAlert/ErrorAlert";
import RemoveOffer from "./RemoveOffer/RemoveOffer";

const fields = [
  { label: "Name", name: "name", type: "text", maxLength: 35 },
  { label: "Price", name: "price", type: "number", maxLength: 35 },
  { label: "Location", name: "location", type: "text", maxLength: 35 },
  {
    label: "Description",
    name: "description",
    maxLength: 500,
    type: "textarea",
  },
];

const arrayFileData: DataImage[] = [];

export interface DataImage {
  index: number;
  url: string | ArrayBuffer;
  fileName: string;
  file: File | null;
  wasRemoved?: boolean;
  isMainImage?: boolean;
}

for (let i = 1; i <= 7; i++) {
  if (i !== 7) {
    arrayFileData.push({
      index: i,
      url: "",
      fileName: "",
      file: null,
      isMainImage: false,
      wasRemoved: false,
    });
  }
}
interface Props {
  data: Offer;
  sendData: { value: string; method: "PUT" | "POST" };
  updating?: boolean;
}

const currentDate = new Date().getTime();

const OfferForm = ({ data, sendData, updating }: Props) => {
  const {
    state: { user },
  } = useContext(AuthContext);

  useVerifyPermissions(user?.seller);
  const { handleApiCall } = useHandleApiCall(sendData.method, true);
  const [fileImageReadData, setFileImageReadData] =
    useState<DataImage[]>(arrayFileData);
  const [offerInformations, setOfferInformations] = useState<Offer>(data);
  const [validationError, setValidationError] = useState<{
    [key: string]: string;
  }>({});

  const navigate = useNavigate();
  const isUpdatingAndExpired =
    updating && new Date(data.expirationDate).getTime() < currentDate;
  useEffect(() => {
    if (data) {
      if (isUpdatingAndExpired) {
        setOfferInformations({ ...data, expirationDate: daysToDate("1") });
      } else {
        setOfferInformations(data);
      }
    }
  }, [data]);
  console.log(offerInformations);

  const handleChangeInformations = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    e.preventDefault();
    setOfferInformations({
      ...offerInformations,
      [e.target.name]:
        e.target.name === "expirationDate"
          ? daysToDate(e.target.value)
          : e.target.value,
    });
    setValidationError({
      ...validationError,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    const removedImagesIndexes: number[] = [];
    fileImageReadData.filter(
      (item) => item.wasRemoved && removedImagesIndexes.push(item.index)
    );

    fileImageReadData
      .filter((item: DataImage) => item.file !== null)
      .forEach((item: DataImage) => {
        item.isMainImage
          ? formData.append("main-image-offer", item.file!)
          : formData.append("image-offer", item.file!);
        formData.append("indexes", String(item.index));
      });

    removedImagesIndexes.length > 0 &&
      formData.append("indexesRemoved", removedImagesIndexes.join(""));

    Object.keys(offerInformations).forEach((key) => {
      if (key in offerInformations) {
        const value = offerInformations[key];
        formData.append(key, value as string);
      }
    });

    handleApiCall(
      `/userOffers/${sendData.value}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
      (data, error) => {
        if (typeof data === "string") {
          toast.success(data);
          navigate("/user-offers-all");
        } else if (typeof error === "object") {
          setValidationError(error);
          toast.error(() => <ErrorAlert error={error} />);
        }
      }
    );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={styles.form}
        encType="multipart/form-data"
      >
        <LabelWrapper number="1" label="General Info" />
        {fields.map((field) => (
          <FormField
            key={field.label}
            handleOnChange={handleChangeInformations}
            field={field}
            data={offerInformations}
            validationError={validationError}
            size="big"
          />
        ))}
        <LabelWrapper number="2" label="Category" />
        <Categories
          validationError={validationError}
          offerInformations={offerInformations}
          setOfferInformations={setOfferInformations}
        />
        <LabelWrapper number="3" label="Images" />
        <Images
          fileImageReadData={fileImageReadData}
          setFileImageReadData={setFileImageReadData}
          data={data}
        />
        {isUpdatingAndExpired && (
          <SelectField handleChangeInformations={handleChangeInformations} />
        )}
        {!updating && (
          <SelectField handleChangeInformations={handleChangeInformations} />
        )}
        <button className={styles.button}>Submit</button>
      </form>
      {updating && (
        <RemoveOffer
          offerName={offerInformations.name}
          offerId={offerInformations._id}
        />
      )}
    </>
  );
};

export default OfferForm;
