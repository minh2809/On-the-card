import React, { useState, useEffect } from "react";
import classes from "./Modal.module.css";
import DropDownList from "../DropDownList/DropDownList";
import SimpleTextBox from "../TextBox/SimpleTextBox/SimpleTextBox";
import MainButton from "../Button/MainButton/MainButton";
import {
  returnPlaceholder,
  returnUrl,
  namePlaceholder,
  artistPlaceHolder,
  bankingPlaceHolder,
} from "../../../utilities/text_suggestions";
import { useSelector } from "react-redux";

const Modal = (props) => {
  const { appLang, appLanguage } = useSelector((state) => state);
  const renderlanguage = appLang;
  const dropDown = renderlanguage.editPage.dropDown;

  const [accountType, setAccountType] = useState(null);
  const [musicAccount, setMusicAccount] = useState(false);
  const [musicLinkName, setMusicLinkName] = useState(null);
  const [artistName, setArtistName] = useState(null);
  const [url, setUrl] = useState(null);
  const [urlSuggested, setUrlSuggested] = useState(null);
  const [customLink, setCustomLink] = useState(false);
  const [listBank, setListBank] = useState(false);

  let enterText = returnPlaceholder(appLanguage, accountType);
  const enterTextName = namePlaceholder(appLanguage, musicAccount);
  const artistPlaceholder = artistPlaceHolder(appLanguage);
  const { show, buttonName } = props;
  const linkCss = [classes.linkDiv, urlSuggested && classes.gridDiv];
  const urlStyles = [classes.textStyle, !urlSuggested && classes.hide];

  const cssClasses = [
    classes.Modal,
    show ? classes.ModalOpen : classes.ModalClosed,
  ];

  const resetState = () => {
    setAccountType(null);
    setMusicAccount(false);
    setMusicLinkName(null);
    setArtistName(null);
    setUrl(null);
    setUrlSuggested(null);
    setCustomLink(false);
    setListBank(false);
  };

  const closeModal = () => {
    resetState();
    return props.closed();
  };

  const accountTypeChosen = (dataFromChild) => {
    const condition1 = dataFromChild === dropDown.otherLink;
    const condition2 = dataFromChild === dropDown.otherLinkAdvanced;
    const condition3 = dataFromChild === dropDown.embedYoutube;
    const condition4 =
      dataFromChild === "Spotify" || dataFromChild === "Soundcloud";
    const condition5 = dataFromChild === dropDown.banking;
    const condition6 = dataFromChild === dropDown.instaEmbed;
    const condition7 = dataFromChild === dropDown.tikTokEmbed;
    const condition8 = dataFromChild === dropDown.uploadFile;

    if (condition1) {
      setCustomLink(true);
      setMusicAccount(false);
    } else if (condition2) {
      closeModal();
      props.openImgModal();
    } else if (condition3) {
      closeModal();
      props.openEmbedYouTube();
    } else if (condition4) {
      setAccountType(dataFromChild);
      setCustomLink(true);
      setMusicAccount(true);
    } else if (condition5) {
      setListBank(true);
    } else if (condition6) {
      closeModal();
      props.openEmbedInsta();
    } else if (condition7) {
      closeModal();
      props.openTiktok();
    } else if (condition8) {
      closeModal();
      props.openUploadFile();
    } else {
      setAccountType(dataFromChild);
      setCustomLink(false);
      setMusicAccount(false);
    }
    setUrlSuggested(returnUrl(dataFromChild));
  };

  const getLinkName = (dataFromChild) => {
    if (musicAccount) {
      setMusicLinkName(dataFromChild);
    } else {
      setAccountType(dataFromChild);
    }
  };

  const getArtistName = (artistName) => {
    setArtistName(artistName);
  };

  const getUrl = (dataFromChild) => {
    urlSuggested ? setUrl(urlSuggested + dataFromChild) : setUrl(dataFromChild);
  };

  const handleClick = () => {
    if (!accountType) {
      alert(appLang.editPage.modal.alert2);
    } else if (!url) {
      alert(appLang.editPage.modal.alert);
    } else {
      if (musicAccount && !musicLinkName)
        return alert(appLang.editPage.modal.alert);

      musicAccount
        ? props.clicked(accountType, url, musicLinkName, artistName)
        : props.clicked(accountType, url, musicLinkName);
    }
  };

  if (listBank) {
    enterText = bankingPlaceHolder(appLanguage);
  }

  useEffect(() => {
    if (!show) {
      resetState();
    }
  }, [show]);

  return (
    <div className={cssClasses.join(" ")}>
      <div className={classes.modalHeader}>
        <div className={classes.modalTitle}>
          {renderlanguage.editPage.dropDown.selectAccount}
        </div>
        <div className={classes.closeModalWrapper} onClick={() => closeModal()}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </div>
      </div>
      <DropDownList
        modalShow={show}
        optionChosen={accountTypeChosen}
        bankList={listBank}
      />
      <div className={classes.modalInputWrapper}>
        <div className={customLink ? classes.show : classes.hide}>
          <SimpleTextBox
            title
            textEntered={getLinkName}
            textHolder={enterTextName}
            modalShow={show}
          />
        </div>
        <div className={musicAccount ? classes.show : classes.hide}>
          <SimpleTextBox
            title
            textEntered={getArtistName}
            textHolder={artistPlaceholder}
            modalShow={show}
          />
        </div>
        <div className={linkCss.join(" ")}>
          <p className={urlStyles.join(" ")}>{urlSuggested}</p>
          <SimpleTextBox
            textEntered={getUrl}
            textHolder={enterText}
            title={false}
            modalShow={show}
          />
        </div>
      </div>
      <div className={classes.buttonWrapper}>
        <MainButton type="button" onClick={handleClick} text={buttonName} />
      </div>
    </div>
  );
};

export default Modal;
