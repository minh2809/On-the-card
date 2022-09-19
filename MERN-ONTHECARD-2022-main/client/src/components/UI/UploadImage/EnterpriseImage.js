import React, { useState } from "react";
import classes from "./UploadImage.module.css";
import "../../UI/Button/Button.css";

import { useSelector, useDispatch } from "react-redux";
import * as actionTypes from "../../../store/actionTypes";

import ModalLoading from "../Modal/ModalLoading/ModalLoading";
import BackDrop from "../Backdrop/Backdrop";
import IconCamera from "../../../assets/icons/icon-camera.png";

import firebase from "../../../containers/firebase/firebase";

const EnterpriseImage = ({ uploadAvatar }) => {
  const { userInfo, enterprisePage } = useSelector((state) => state);
  const { email: userEmail } = userInfo;
  const { avatarImg: avatar, avatarURL } = enterprisePage;
  const dispatch = useDispatch();

  const [imgSrc, setImgSrc] = useState(avatar);
  const [modalOpen, setModalOpen] = useState(false);

  const updateImage = (imagePassed, imageUrl) => {
    dispatch({
      type: actionTypes.IMAGEUPDATEENTERPRISE,
      imageLoaded: imagePassed,
      imageURL: imageUrl,
    });
  };

  const showPreview = async (event) => {
    setModalOpen(true);
    try {
      const imagePure = event.target.files[0];
      let src = URL.createObjectURL(imagePure);
      setImgSrc(src);

      await firebase.updateImage(imagePure, imagePure.name, userEmail).on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          firebase.storage
            .ref("images/" + userEmail)
            .child(imagePure.name)
            .getDownloadURL()
            .then((url) => {
              updateImage(url, url);
              setTimeout(() => setModalOpen(false), 500);
            });
        }
      );
    } catch (error) {
      setModalOpen(false);
      alert(error.message);
      alert("Need to choose an image");
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.formInput}>
        <div className={classes.preview}>
          <label htmlFor="file-ip-3">
            <img
              src={avatarURL ? avatarURL : imgSrc}
              alt="avatarImg"
              id="file-ip-3-preview"
              className={classes.userAvatar}
              onError={(event) => {
                event.target.src = avatarURL ? avatarURL : imgSrc;
              }}
            />
          </label>
        </div>
        {uploadAvatar ? (
          <>
            <label htmlFor="file-ip-3" className={classes.imageUploadLabel}>
              <img src={IconCamera} className={classes.IconCamera} alt="" />
            </label>
            <input
              type="file"
              id="file-ip-3"
              accept="image/*"
              onChange={(event) => showPreview(event)}
            />
          </>
        ) : null}
        {uploadAvatar ? (
          <>
            <BackDrop show={modalOpen} />
            <ModalLoading show={modalOpen} />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default EnterpriseImage;
