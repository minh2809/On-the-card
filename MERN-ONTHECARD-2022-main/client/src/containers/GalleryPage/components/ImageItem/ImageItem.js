import React from "react";
import classes from "./ImageItem.module.css";

function ImageItem({ src, onClick, middleItem, preview }) {
  let imageClass = preview ? [classes.preview] : [classes.image];

  if (middleItem) imageClass.push(classes.middleImage);
  if (preview) imageClass.push(classes.preview);

  return (
    <img className={imageClass.join(" ")} src={src} alt="" onClick={onClick} />
  );
}

export default ImageItem;
