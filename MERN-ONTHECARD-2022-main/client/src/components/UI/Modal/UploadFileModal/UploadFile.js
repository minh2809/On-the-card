import React, { useState } from "react";
import classes from "./Modal.module.css";
import SimpleTextBox from "../../TextBox/SimpleTextBox/SimpleTextBox";
import MainButton from "../../Button/MainButton/MainButton";
import CloseModalButton from "../../Button/CloseModal/CloseModal";

import firebase from "../../../../containers/firebase/firebase";
import { useSelector } from "react-redux";
import { loadImage, removeExt, validExt } from "../../../../utilities/helper2";

const UploadFile = (props) => {
  const [title, setTitle] = useState("");
  const [extension, setExtension] = useState("");
  const [icon, setIcon] = useState("");
  const [fileObject, setfileObject] = useState({ name: "" });
  const { userInfo, appLang } = useSelector((state) => state);
  const { email } = userInfo;

  const onChangeTitle = (value) => {
    setTitle(value);
  };

  const deleteImage = () => {
    setfileObject({ name: "" });
    setIcon("");
  };

  const closeModal = () => {
    setTitle("");
    setIcon("");
    setfileObject({ name: "" });
    props.close();
  };

  const fileHandler = async (e) => {
    const reader = new FileReader();
    try {
      const file = e.target.files[0];

      const extension = file.name.substring(
        file.name.length - 5,
        file.name.length
      );

      setExtension(extension);
      setIcon(loadImage(extension));
      reader.readAsDataURL(file);
      setfileObject(file);
      setTitle(removeExt(file.name));
    } catch (error) {
      console.log(error.message);
    }
  };

  const uploadSubmit = async () => {
    const condition = title === "" || fileObject.name === "";
    if (condition) {
      return alert(appLang.editPage.text.errorUploadFile);
    }
    if (!validExt(extension)) {
      setTitle("");
      setIcon("");
      setfileObject({ name: "" });
      return alert(appLang.editPage.text.invalidExt);
    }
    closeModal();
    props.setLoad(true);
    await saveFileFirebase();
  };

  const saveFileFirebase = async () => {
    try {
      firebase.updateFiles(fileObject, fileObject.name, email).on(
        "state_changed",
        (snapshot) => {
          //nothing going on
        },
        (error) => {
          console.log(error);
        },
        () => {
          firebase.storage
            .ref("files/" + email)
            .child(fileObject.name)
            .getDownloadURL()
            .then((url) => {
              props.addAccount(fileObject.name, url, title);
              props.setLoad(false);
            });
        }
      );
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={classes.Modal}>
      <div className={classes.closeButton} onClick={closeModal}>
        <i className="fas fa-times"></i>
      </div>

      <div className={classes.container}>
        <div className={classes.input}>
          <SimpleTextBox
            value={title}
            textHolder={appLang.editPage.text.enterFileName}
            textEntered={onChangeTitle}
            title
            modalShow
          />
          <div className={classes.btnContainer}>
            <label
              className={
                !fileObject.name ? classes.glowingEffect : classes.noEffect
              }
              htmlFor="input"
            >
              <i className="fas fa-folder-plus"></i>{" "}
              {appLang.editPage.text.uploadFile}
            </label>
            <div onClick={deleteImage}>
              <i className="fas fa-trash"></i>
            </div>
          </div>

          {fileObject.name && (
            <div className={classes.demoFile}>
              <img className={classes.icon} src={icon} alt="" />
              <p className={classes.fileName}>{fileObject.name}</p>
            </div>
          )}
        </div>

        <div className={classes.output}>
          <h3>{appLang.editPage.text.previewLink}</h3>
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
        <div
          style={{ borderRadius: "40px" }}
          className={fileObject.name ? classes.glowingEffect : classes.noEffect}
        >
          <MainButton onClick={uploadSubmit} imageModal>
            {appLang.editPage.button.addLink}
          </MainButton>
        </div>
        <CloseModalButton
          buttonText={appLang.retrieve.dismiss}
          imgModal
          closeModal={closeModal}
        />
      </div>

      <input
        type="file"
        id="input"
        onChange={fileHandler}
        style={{ display: "none" }}
        accept=".xlsx,.xls,.doc,.docx,.ppt,.pptx,.pdf"
      />
    </div>
  );
};

export default UploadFile;
