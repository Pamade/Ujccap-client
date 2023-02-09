import React, { useEffect, useRef } from "react";
import { useFileRead } from "../../../hooks/useFileRead";
import placeholder from "../../../images/placeholder.png";
import { DataImage } from "../OfferForm";
import { toast } from "react-toastify";
import styles from "./file-image-read.module.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";
interface Props {
  dataImage: DataImage[];
  item: DataImage;
  setData: React.Dispatch<React.SetStateAction<DataImage[]>>;
  isMainImage: boolean;
  removeImage?: (index: number) => void;
}

const FileImageRead = ({
  dataImage,
  setData,
  item,
  isMainImage,
  removeImage,
}: Props) => {
  const { fileDataURL, file, handleChange } = useFileRead();
  const inputRef = useRef<null | HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    if (fileDataURL) {
      const fileNames = dataImage
        .map((obj) => obj.fileName)
        .filter((name) => name !== "");

      const exist = fileNames.some((item) => item === file?.name);
      if (!exist) {
        const updateData = dataImage.map((dataValue: DataImage) => {
          if (dataValue.index === item.index) {
            return {
              ...dataValue,
              url: fileDataURL,
              fileName: file?.name,
              file,
              isMainImage,
            };
          }
          return dataValue;
        });
        setData(updateData as DataImage[]);
      } else toast.error("File with that name exist");
    }
  }, [fileDataURL]);

  return (
    <>
      <input
        onChange={handleChange}
        ref={inputRef}
        className={styles.input}
        type="file"
      />
      <div className={styles.container}>
        <img
          className={styles.img}
          onClick={handleClick}
          src={item.url || placeholder}
          alt="offer"
        />
        {!isMainImage && removeImage && item.url && (
          <div
            onClick={() => removeImage(item.index)}
            className={styles.delete_icon}
          >
            <AiOutlineCloseCircle />
          </div>
        )}
      </div>
    </>
  );
};

export default FileImageRead;
