import React, { useState, useEffect } from "react";
import classes from "./ModalEdit.module.css";
import { useSelector } from "react-redux";
import { Vietnamese, English } from "../../../../language/language";
import SimpleTextBox from "../../TextBox/SimpleTextBox/SimpleTextBox";
import AccountChosen from "./AccountChosen";
import MainButton from "../../Button/MainButton/MainButton";
import { load_label } from "../../../../utilities/load_icons";

const ModalEdit = ({ show, data, closed, onUpdate }) => {
  const cssClasses = [
    classes.Modal,
    show ? classes.ModalOpen : classes.ModalClosed,
  ];
  const { appLanguage } = useSelector((state) => state);
  const appLang = appLanguage === "VIETNAMESE" ? Vietnamese : English;
  let customLink = false;
  let musicAccount = false;
  const linkCss = [classes.linkDiv, classes.gridDiv];
  const enterTextName = appLang.editPage.modal.enter.namePlaceHolder;
  const artistPlaceholder = appLang.editPage.modal.enter.artistPlaceHolder;
  const enterText = appLang.editPage.modal.enter.link;

  const [url, setUrl] = useState("");
  const [box1, setBox1] = useState("");
  const [artist, setArtist] = useState("");

  if (data.icon === "spotify" || data.icon === "soundcloud") {
    customLink = true;
    musicAccount = true;
  }

  if (data.icon === "url") {
    customLink = true;
  }

  useEffect(() => {
    if (!show) {
      setUrl("");
    }
  }, [show]);

  const handleClick = () => {
    let newData;
    switch (data.icon) {
      case "spotify":
        newData = {
          ...data,
          url: url ? url : data.url,
          title: box1 ? box1 : data.title,
          artist: artist ? artist : data.artist,
        };
        break;
      case "soundcloud":
        newData = {
          ...data,
          url: url ? url : data.url,
          title: box1 ? box1 : data.title,
          artist: artist ? artist : data.artist,
        };
        break;
      case "url":
        newData = {
          ...data,
          url: url ? url : data.url,
          title: box1 ? box1 : data.title,
        };
        break;
      default:
        newData = { ...data, url: url ? url : data.url };
    }
    onUpdate(newData);
  };

  const onChangeUrl = (value) => {
    setUrl(value);
  };

  const onChangeBox1 = (value) => {
    setBox1(value);
  };

  const onChangeArtist = (value) => {
    setArtist(value);
  };

  return (
    <div className={cssClasses.join(" ")}>
      <div className={classes.modalHeader}>
        <div className={classes.modalTitle}>
          {appLang.editPage.dropDown.editLink}
        </div>
        <div
          className={classes.closeModalWrapper}
          onClick={() => {
            closed();
          }}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </div>
      </div>
      <AccountChosen
        data={data}
        otherLink={appLang.editPage.dropDown.otherLink}
      />
      <div className={classes.modalInputWrapper}>
        <div className={customLink ? classes.show : classes.hide}>
          <label>{load_label(data.icon, 0, appLang)}</label>
          <SimpleTextBox
            title
            textHolder={enterTextName}
            modalShow={show}
            textEntered={onChangeBox1}
            defaultValue={data.title || ""}
          />
        </div>
        <div className={musicAccount ? classes.show : classes.hide}>
          <label>{load_label(data.icon, 1, appLang)}</label>
          <SimpleTextBox
            title
            textHolder={artistPlaceholder}
            modalShow={show}
            textEntered={onChangeArtist}
            defaultValue={data.artist || ""}
          />
        </div>
        <div className={linkCss.join(" ")}>
          <label>{load_label(data.icon, 2, appLang)}</label>
          <SimpleTextBox
            textHolder={enterText}
            title={false}
            modalShow={show}
            defaultValue={data.url}
            textEntered={onChangeUrl}
          />
        </div>
      </div>
      {(url || box1 || artist) && (
        <div className={classes.buttonWrapper}>
          <MainButton
            type="button"
            onClick={handleClick}
            text={appLang.editPage.button.updateInfo}
          />
        </div>
      )}
    </div>
  );
};

export default ModalEdit;
