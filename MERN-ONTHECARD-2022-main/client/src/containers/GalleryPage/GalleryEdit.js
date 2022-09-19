import React from "react";
import GalleryHeader from "./container/GalleryHeader/GalleryHeader";
import ImageGrid from "./container/ImageGrid/ImageGrid";
import classes from "./GalleryView.module.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import MainButton from "../../components/UI/Button/MainButton/MainButton";

function GalleryEdit() {
  const history = useHistory();
  const { authenticated } = useSelector((state) => state);
  const visitEdit = () => history.push("/profile/edit");

  if (authenticated) {
    return (
      <div className={classes.viewContainer}>
        <GalleryHeader />

        <div className={classes.buttonContainer}>
          <MainButton
            text="Edit Page"
            onClick={visitEdit}
            editPage={true}
            black
          >
            <i className="fas fa-pen"></i>{" "}
          </MainButton>
        </div>

        <ImageGrid />
      </div>
    );
  } else {
    history.push("/signin");
    return <div></div>;
  }
}

export default GalleryEdit;
