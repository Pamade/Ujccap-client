import React, { useEffect } from "react";
import styles from "./images.module.scss";
import FileImageRead from "../FileImageRead/FileImageRead";
import { DataImage } from "../OfferForm";
import { Offer } from "../../../types/types";

interface Props {
  fileImageReadData: DataImage[];
  setFileImageReadData: React.Dispatch<React.SetStateAction<DataImage[]>>;
  data: Offer;
}

const PICTURES_LIMIT = 6;

const Images = ({ data, fileImageReadData, setFileImageReadData }: Props) => {
  useEffect(() => {
    if (data.images && (data.mainImage || data.images.length !== 0)) {
      const currentValues = [data.mainImage, ...data.images];
      const currentOfferImages = currentValues.map((item, index) => {
        return { index, url: item, fileName: "", file: null };
      });
      const defaultImages = [];
      for (let i = 0; i < PICTURES_LIMIT - currentOfferImages.length; i++) {
        defaultImages.push({
          index: currentOfferImages.length + i,
          url: "",
          fileName: "",
          file: null,
        });
      }

      const vals = [...currentOfferImages, ...defaultImages];
      setFileImageReadData(vals);
    }
  }, [data]);

  const removeImage = (index: number) => {
    const imagesCopy = [...fileImageReadData];
    const imagesAfterRemove = imagesCopy.map((item) => {
      if (item.index === index) {
        return { ...item, url: "", file: null, wasRemoved: true };
      }
      return item;
    });

    setFileImageReadData(imagesAfterRemove);
  };

  return (
    <div className={styles.images_wrapper}>
      <div className={styles.main_image_wrapper}>
        <p className={styles.main_image_p}>Main picture</p>
        <FileImageRead
          dataImage={fileImageReadData}
          item={fileImageReadData[0]}
          setData={setFileImageReadData}
          isMainImage={true}
        />
      </div>
      <div className={styles.images_gallery}>
        {fileImageReadData.slice(1).map((item) => (
          <FileImageRead
            isMainImage={false}
            key={item.index}
            dataImage={fileImageReadData}
            item={item}
            setData={setFileImageReadData}
            removeImage={removeImage}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Images);
