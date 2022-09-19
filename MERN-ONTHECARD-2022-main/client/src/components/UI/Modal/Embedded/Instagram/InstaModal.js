import React, { useState, useEffect } from "react";
import classes from "./InstaModal.module.css";
import SimpleTextBox from "../../../TextBox/SimpleTextBox/SimpleTextBox";
import MainButton from "../../../Button/MainButton/MainButton";
import { useSelector } from "react-redux";
import { Vietnamese, English } from "../../../../../language/language";
import CloseModalButton from "../../../Button/CloseModal/CloseModal";
import InstaPost from "../../../../Boxes/LinkBox/NewLinkBox/InstaPost/InstaPost";
import HolderPost from "../../../../Boxes/LinkBox/NewLinkBox/InstaPost/HolderPost";
import { validateInstaPost } from "../../../../../utilities/helper";

const Modal = ({ closeModal, addAccount }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const { appLanguage } = useSelector((state) => state);
  const appLang = appLanguage === "VIETNAMESE" ? Vietnamese : English;
  const title = appLang.editPage.dropDown.instaEmbed;

  const onChangeName = (value) => setName(value);
  const onChangeUrl = (value) => setUrl(value.replace(/\s/g, ""));

  const resetState = () => {
    setName("");
    setUrl("");
  };

  const addLink = async () => {
    const validateUrl = validateInstaPost(url);
    if (validateUrl) {
      const addTitle = name ? name : title;
      addAccount(url, addTitle);
      closeModal();
    } else {
      alert(appLang.editPage.text.embedModalAlert);
    }
  };

  useEffect(() => {
    if (url.includes("onthecard.ca")) {
      setUrl(url.replace("/onthecard.ca", ""));
    }
  }, [url]);

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
            textHolder={appLang.editPage.modal.enter.instaPost}
            textEntered={onChangeUrl}
            modalShow={true}
            url
            value={url}
          />
        </div>

        <div className={classes.output}>
          <h3>{appLang.editPage.modal.demoPost}</h3>
          {validateInstaPost(url) ? (
            <InstaPost demo postLink={url} />
          ) : (
            <HolderPost />
          )}
        </div>
      </div>

      <div className={classes.buttonContainer}>
        <MainButton imageModal onClick={addLink}>
          {appLang.editPage.button.embedPost}
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
