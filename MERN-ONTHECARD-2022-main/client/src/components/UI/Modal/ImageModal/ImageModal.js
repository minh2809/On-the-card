import React, { useState } from "react";
import classes from "./Modal.module.css";
import SimpleTextBox from "../../TextBox/SimpleTextBox/SimpleTextBox";
import firebase from "../../../../containers/firebase/firebase";
import MainButton from "../../Button/MainButton/MainButton";
import { useSelector } from "react-redux";
import CloseModalButton from "../../Button/CloseModal/CloseModal";

const Modal = ({ show, closeModal, setLoad, addAccount }) => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [imageObject, setImageObject] = useState({ name: "" });
  const { userInfo, appLang } = useSelector((state) => state);
  const { email } = userInfo;

  const onChangeUrl = (value) => setUrl(value.replace(/\s/g, ""));
  const onChangeTitle = (value) => setTitle(value);
  const deleteImage = () => setIcon("");
  const resetModal = () => setLoad(false) && resetState();
  const resetState = () => {
    setUrl("");
    setTitle("");
    setIcon("");
    setImageObject({ name: "" });
  };

  const imageHandler = async (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setIcon(reader.result);
      }
    };
    try {
      const image = e.target.files[0];
      reader.readAsDataURL(image);
      setImageObject(image);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addLink = async () => {
    url.length === 0 || title.length === 0
      ? alert(appLang.editPage.text.imgModalAlert)
      : uploadImageWork();
  };

  const uploadImageWork = async () => {
    const condition = imageObject.name.length === 0;
    setLoad(true);
    closeModal();
    condition ? addAccount("url", title, url) : await saveImgFirebase();
    condition && setLoad(false) && resetState();
  };

  const saveImgFirebase = async () => {
    try {
      firebase.updateImage(imageObject, imageObject.name, email).on(
        "state_changed",
        (snapshot) => {
          //nothing going on
        },
        (error) => {
          console.log(appLang.editPage.text.errorsHappened + " " + error);
          resetModal();
        },
        () => {
          firebase.storage
            .ref("images/" + email)
            .child(imageObject.name)
            .getDownloadURL()
            .then((imgUrl) => {
              resetModal();
              addAccount(imgUrl, title, url);
            });
        }
      );
    } catch (error) {
      alert(appLang.editPage.text.errorsHappened + " " + error.message);
      resetModal();
    }
  };

  /*  ************************************************************************************  */

  return (
    <div className={show ? classes.Modal : classes.ModalClosed}>
      <div
        className={classes.closeButton}
        onClick={() => {
          closeModal();
          resetState();
        }}
      >
        <i className="fas fa-times"></i>
      </div>

      <div className={classes.container}>
        <div className={classes.input}>
          <SimpleTextBox
            textHolder={appLang.editPage.modal.enter.namePlaceHolder}
            textEntered={onChangeTitle}
            title
            modalShow={show}
          />
          <SimpleTextBox
            textHolder={appLang.editPage.modal.enter.link}
            textEntered={onChangeUrl}
            modalShow={show}
            url
          />

          <div className={classes.thumbnailContainer}>
            <h5>{appLang.editPage.text.thumbnail}</h5>
            <div className={classes.btnContainer}>
              {icon && <img src={icon} alt="" />}
              <label htmlFor="input">
                <i className="fas fa-folder-plus"></i>{" "}
                {appLang.editPage.uploadImageTexts.addImage}
              </label>
              <div onClick={deleteImage}>
                <i className="fas fa-trash"></i>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.output}>
          <h3>{appLang.editPage.modal.demo}</h3>
          <div className={classes.LinkBox}>
            <div>{icon && <img src={icon} alt="" />}</div>
            <div>
              <p>{title}</p>
            </div>
            <div>
              <i className="fas fa-angle-right"></i>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.buttonContainer}>
        <MainButton imageModal onClick={addLink}>
          {appLang.editPage.button.addLink}
        </MainButton>
        <CloseModalButton
          buttonText={appLang.retrieve.dismiss}
          imgModal
          closeModal={() => {
            resetState();
            closeModal();
          }}
        />
      </div>

      <input
        type="file"
        accept="image/*"
        name="image-upload1"
        id="input"
        onChange={imageHandler}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default Modal;
