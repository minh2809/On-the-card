import React, { useState } from "react";
import classes from "./TiktokModal.module.css";
import SimpleTextBox from "../../../TextBox/SimpleTextBox/SimpleTextBox";
import MainButton from "../../../Button/MainButton/MainButton";
import { useSelector } from "react-redux";
import { Vietnamese, English } from "../../../../../language/language";
import CloseModalButton from "../../../Button/CloseModal/CloseModal";
import TiktokPost from "../../../../Boxes/LinkBox/NewLinkBox/TiktokPost/TiktokPost";
import TiktokHolder from "../../../../Boxes/LinkBox/NewLinkBox/TiktokPost/TiktokHolder";

import { validateTiktokVideo } from "../../../../../utilities/helper";

const Modal = ({ closeModal, addAccount }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const { appLanguage } = useSelector((state) => state);
  const appLang = appLanguage === "VIETNAMESE" ? Vietnamese : English;
  const title = appLang.editPage.dropDown.tikTokEmbed;
  const loading = appLang.editPage.modal.loading;

  const onChangeName = (value) => setName(value);
  const onChangeUrl = (value) => setUrl(value.replace(/\s/g, ""));

  const resetState = () => {
    setName("");
    setUrl("");
  };

  const addLink = async () => {
    const validateUrl = validateTiktokVideo(url);
    if (validateUrl) {
      const addTitle = name ? name : title;
      addAccount(url, addTitle);
      closeModal();
    } else {
      alert(appLang.editPage.text.embedTiktokAlert);
      closeModal();
    }
  };

  return (
    <div className={classes.Modal}>
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
            textEntered={onChangeName}
            title
            modalShow={true}
            value={name}
          />
          <SimpleTextBox
            textHolder={appLang.editPage.modal.enter.tiktokVideo}
            textEntered={onChangeUrl}
            modalShow={true}
            url
            value={url}
          />
        </div>

        <div className={classes.output}>
          <h3>{appLang.editPage.modal.demoTiktok}</h3>
          {validateTiktokVideo(url) ? (
            <TiktokPost demo postLink={url} loading={loading} />
          ) : (
            <TiktokHolder demo />
          )}
        </div>
      </div>

      <div className={classes.buttonContainer}>
        <MainButton imageModal onClick={addLink}>
          {appLang.editPage.button.embedTiktok}
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
    </div>
  );
};

export default Modal;
