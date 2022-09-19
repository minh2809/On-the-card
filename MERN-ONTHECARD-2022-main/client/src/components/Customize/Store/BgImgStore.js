import React, { useState, useEffect } from "react";
import classes from "../CustomizeBackground.module.css";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { setBgImgStore } from "../../../store/actionCreators";
import firebase from "../../../containers/firebase/firebase";
import ModalLoading from "../../UI/Modal/ModalLoading/ModalLoading";
import BackDrop from "../../UI/Backdrop/Backdrop";

import IconPlus from "../../../assets/icons/icon-plus_circle_outline.png";
import IconTrash from "../../../assets/icons/icon-trash_grey.png";

const BgImgStore = ({ Vietnamese, English }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isClickUploadButton, setIsClickUploadButton] = useState(true);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userInfo);
  const {
    backgroundColor: currentBgColor,
    backgroundImageUrl: currentBgImg,
  } = useSelector((state) => state.storePage);
  const { appLanguage } = useSelector((state) => state);
  const customizePage =
    appLanguage === "ENGLISH"
      ? English.customizePage
      : Vietnamese.customizePage;

  useEffect(() => {
    setSelectedColor(currentBgColor);
    if (currentBgImg) {
      setUploadedImageUrl(currentBgImg);
      dispatch(setBgImgStore(currentBgImg));
    }
  }, [dispatch, currentBgColor, currentBgImg]);

  const handleUploadBackgroundImage = async (e) => {
    setShowModal(true);
    try {
      const imagePure = e.target.files[0];
      await firebase
        .updateImage(imagePure, imagePure.name, currentUser.email)
        .on(
          "state_changed",
          (snapshot) => {
            // const progress = Math.round(
            //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            // );
          },
          (error) => {
            console.log(error);
          },
          () => {
            firebase.storage
              .ref("images/" + currentUser.email)
              .child(imagePure.name)
              .getDownloadURL()
              .then((url) => {
                setUploadedImageUrl(url);
                dispatch(setBgImgStore(url));
                setTimeout(() => setShowModal(false), 1500);
              });
          }
        );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClickImageButton = (type) => () => {
    if (type === "upload") {
      setIsClickUploadButton(false);
    } else {
      setUploadedImageUrl("");
      dispatch(setBgImgStore(""));
    }
  };

  return (
    <div className={classes.colorSection}>
      <div className={classes.optionBox}>
        <div className={classes.label}>{customizePage.background}</div>
        <Grid container spacing={3} justify="center">
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className={classes.mobileView}>
              <div
                className={classes.mobileViewOpacityBackground}
                style={{
                  background: selectedColor,
                }}
              ></div>
              <div
                style={
                  !uploadedImageUrl ? { backgroundColor: selectedColor } : null
                }
                className={classes.mobileViewBackground}
              >
                {uploadedImageUrl ? (
                  <img
                    alt="upload preview"
                    src={uploadedImageUrl}
                    className={classes.ImageResponsive}
                    onError={(event) => {
                      event.target.src = uploadedImageUrl;
                    }}
                  />
                ) : null}
              </div>
            </div>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className={classes.mobileViewButtonWrapper}>
              <div className={classes.mobileViewButtonArea}>
                <label
                  htmlFor="file-ip-1"
                  className={classes.btnAddImage}
                  onClick={handleClickImageButton("upload")}
                >
                  <img src={IconPlus} className={classes.IconPlus} alt="" />
                  {isClickUploadButton
                    ? customizePage.addImage
                    : customizePage.replaceImage}
                </label>
                <input
                  type="file"
                  id="file-ip-1"
                  accept="image/*"
                  onChange={handleUploadBackgroundImage}
                  className={classes.uploadedImageInput}
                />
              </div>
              <div className={classes.mobileViewButtonArea}>
                <label
                  className={classes.btnReplaceImage}
                  onClick={handleClickImageButton("remove")}
                >
                  <img src={IconTrash} className={classes.IconTrash} alt="" />
                  {/* {customizePage.deleteImage} */}
                </label>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <BackDrop show={showModal} />
      <ModalLoading show={showModal} />
    </div>
  );
};

export default BgImgStore;
