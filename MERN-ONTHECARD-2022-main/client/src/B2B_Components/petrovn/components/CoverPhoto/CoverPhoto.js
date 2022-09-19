import React from "react";
import classes from "./CoverPhoto.module.css";
import bg from "../../../../assets/test/bg3.jpg";

const CoverPhoto = (props) => {
  const { image, preview } = props;
  const appliedImage = image || bg;

  return (
    <div className={preview ? classes.preview : classes.coverPhotoContainer}>
      <img
        src={appliedImage}
        alt=""
        className={classes.coverPhoto}
        onError={(event) => {
          event.target.src = appliedImage;
        }}
      />
    </div>
  );
};

export default CoverPhoto;
