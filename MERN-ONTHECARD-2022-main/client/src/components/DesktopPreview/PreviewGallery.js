import React from "react";
import GalleryHeader from "../../containers/GalleryPage/container/GalleryHeader/GalleryHeader";
import ImageGrid from "../../containers/GalleryPage/container/ImageGrid/ImageGrid";
import classes from "./DesktopPreview.module.css";
import Footer from "../../containers/Footer/Footer";

function PreviewGallery() {
  return (
    <div className={classes.SocialMediaList}>
      <div className={classes.desktopPreviewArea}>
        <div className={classes.previewPhoneArea}>
          <div id="desktop-preview" className={classes.desktopPreview}>
            <GalleryHeader preview />
            <ImageGrid preview />
            <div style={{ marginTop: "150px", marginLeft: "10px" }}>
              <Footer preview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewGallery;
