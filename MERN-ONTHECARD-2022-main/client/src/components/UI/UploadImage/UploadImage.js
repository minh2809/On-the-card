import React, { useState, useEffect } from "react";
import classes from "./UploadImage.module.css";
import "../../UI/Button/Button.css";

import { useSelector, useDispatch } from "react-redux";
import * as actionTypes from "../../../store/actionTypes";

import ModalLoading from "../Modal/ModalLoading/ModalLoading";
import BackDrop from "../Backdrop/Backdrop";
import IconCamera from "../../../assets/icons/icon-camera.png";

import firebase from "../../../containers/firebase/firebase";
import user from "../../../assets/header/user.svg";

const UploadImage = ({ uploadAvatar }) => {
  const { userInfo, enterprisePage, storePage } = useSelector((state) => state);
  const { b2bActiveTab } = useSelector((state) => state);
  const [avatarURL, setAvatarURL] = useState("");
  const [actionType, setActionType] = useState("");

  const { email: userEmail } = userInfo;
  const { avatarURL: userAvaURL } = userInfo;
  const { avatarURL: avatarURLEnterprise } = enterprisePage;
  const { avatarURL: avatarURLStore } = storePage;

  useEffect(() => {
    switch (b2bActiveTab) {
      case 1:
        setAvatarURL(userAvaURL);
        setActionType(actionTypes.IMAGEUPDATE);
        break;
      case 2:
        setAvatarURL(avatarURLEnterprise);
        setActionType(actionTypes.IMAGEUPDATEENTERPRISE);
        break;
      case 3:
        setAvatarURL(avatarURLStore);
        setActionType(actionTypes.IMAGEUPDATESTORE);
        break;
      default:
        break;
    }
  }, [b2bActiveTab, avatarURLEnterprise, avatarURLStore, userAvaURL]);

  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const showPreview = async (event) => {
    setModalOpen(true);
    try {
      const imagePure = event.target.files[0];
      // let src = URL.createObjectURL(imagePure);

      firebase.updateImage(imagePure, imagePure.name, userEmail).on(
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
              dispatch({
                type: actionType,
                imageLoaded: url,
                imageURL: url,
              });
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
          <label htmlFor="file-ip-1">
            <img
              src={avatarURL ? avatarURL : user}
              alt="avatarImg"
              id="file-ip-1-preview"
              className={classes.userAvatar}
              onError={(event) => {
                event.target.src = avatarURL ? avatarURL : user;
              }}
            />
          </label>
        </div>
        {uploadAvatar ? (
          <>
            <label htmlFor="file-ip-1" className={classes.imageUploadLabel}>
              <img src={IconCamera} className={classes.IconCamera} alt="" />
            </label>
            <input
              type="file"
              id="file-ip-1"
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

export default UploadImage;
