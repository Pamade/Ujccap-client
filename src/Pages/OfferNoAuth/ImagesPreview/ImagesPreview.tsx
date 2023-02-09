import React, { useState } from "react";
import styles from "./images-preview.module.scss";
import "slick-carousel/slick/slick.css";
import shortid from "shortid";

interface Props {
  imagesOffer: string[];
}

const ImagesPreview = ({ imagesOffer }: Props) => {
  const [photo, setPhoto] = useState<number>(0);

  const getId = () => {
    const id = shortid.generate();
    // To apply animations for every change, we need to tell react that this is a new component. This can be done by providing a key to the element with your animation class. And key can be randomly generated using any random number generator
    return id;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.img_wrapper}>
        <img
          key={getId()}
          className={styles.main}
          src={imagesOffer[photo]}
          alt="main"
        />
      </div>

      <div className={styles.images_below_wrapper}>
        {imagesOffer.length > 1 &&
          imagesOffer.map((image, index) => (
            <img
              onClick={() => setPhoto(index)}
              key={image}
              className={`${styles.other} ${index === photo && styles.active}`}
              src={image}
              alt="other"
            />
          ))}
      </div>
    </div>
  );
};
//use react memo, to avoid displaying animation when user clicks heart
export default React.memo(ImagesPreview);
