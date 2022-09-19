import React, { useState } from "react";
import classes from "./Embedded.module.css";
import ReactPlayer from "react-player/lazy";
import SimpleTextBox from "../../TextBox/SimpleTextBox/SimpleTextBox";
import MainButton from "../../Button/MainButton/MainButton";
import CloseModalButton from "../../Button/CloseModal/CloseModal";
import { useSelector } from "react-redux";
import { Vietnamese, English } from "../../../../language/language";
import Spinner from "../../Spinner/SpinnerEmbed";

const EmbeddedModal = ({ closeModal, addAccount }) => {
  const { appLanguage } = useSelector((state) => state);
  const appLang = appLanguage === "VIETNAMESE" ? Vietnamese : English;
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  const onChangeTitle = (value) => setTitle(value);
  const onChangeUrl = (value) => setUrl(value);

  const modalClose = () => {
    closeModal();
    setUrl("");
  };

  const addLink = () => {
    const correctTitle = title || appLang.editPage.text.embedYoutube;
    const condition =
      url.includes("https://") &&
      (url.includes("youtube.com") || url.includes("youtu.be"));

    condition
      ? addAccount(url, correctTitle)
      : alert(appLang.editPage.text.embedModalAlert);
    condition && modalClose();
  };

  return (
    <div className={classes.Modal}>
      <div className={classes.closeButton} onClick={modalClose}>
        <i className="fas fa-times"></i>
      </div>
      <h3 className={classes.title}>
        {appLang.editPage.modal.embed} <span>Youtube</span> Video
      </h3>
      <div className={classes.output}>
        <ReactPlayer
          url={url || " "}
          controls={true}
          width="100%"
          height="100%"
        />
      </div>
      <div className={classes.SpinnerContainer}>
        <Spinner />
      </div>
      <div className={classes.input}>
        <SimpleTextBox
          textHolder={appLang.editPage.modal.enter.enterYoutube}
          textEntered={onChangeUrl}
          modalShow
        />
        <SimpleTextBox
          textHolder={appLang.editPage.modal.enter.namePlaceHolder}
          textEntered={onChangeTitle}
          title
          modalShow
        />
      </div>
      <div className={classes.buttonContainer}>
        <MainButton imageModal onClick={addLink}>
          {appLang.editPage.button.addLink}
        </MainButton>
        <CloseModalButton
          buttonText={appLang.retrieve.dismiss}
          imgModal
          closeModal={modalClose}
        />
      </div>
    </div>
  );
};

export default EmbeddedModal;
