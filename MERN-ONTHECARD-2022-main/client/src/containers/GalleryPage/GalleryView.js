import React from "react";
import GalleryHeader from "./container/GalleryHeader/GalleryHeader";
import ImageGrid from "./container/ImageGrid/ImageGrid";
import classes from "./GalleryView.module.css";

function GalleryView() {
  return (
    <div className={classes.viewContainer}>
      <GalleryHeader />
      <ImageGrid />
    </div>
  );
}

export default GalleryView;
