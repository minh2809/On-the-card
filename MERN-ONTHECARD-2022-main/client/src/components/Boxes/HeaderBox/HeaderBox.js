import React, { useState } from "react";
import classes from "./HeaderBox.module.css";
import Logo from "../../UI/Logo/Logo";
import LogoPandora from "../../UI/Logo/LogoPandora";
import {
  detectNoBlackTextColor,
  detectNoWhiteTextDark,
} from "../../../utilities/helper_functions";
import ModalQR from "../../UI/Modal/ModalQR/ModalQR";
import BackDrop from "../../UI/Backdrop/Backdrop";
import { findNewLine } from "../../../utilities/string_manipulation";
import { ADDSOClient, isPandora } from "../../../utilities/helper2";
import { useSelector } from "react-redux";

const HeaderBox = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { currentBackground, avatar, mobilePreview } = props;
  const { buttonShow, viewPage, userInfo } = props;
  const { userFullName, userBio } = props;

  const { backgroundColorStyle, backgroundColorObject } = userInfo;
  const { b2bActiveTab, appLang } = useSelector((state) => state);

  let buttonClasses = [classes.ButtonBar, classes.hideBtn];
  let imgClass = [classes.HeaderBoxImg];
  let bioClass = [classes.bio];
  const noBlackTextColorStyle = detectNoBlackTextColor(backgroundColorObject);
  const noWhiteTextDarkStyle = detectNoWhiteTextDark(backgroundColorObject);
  const condition1 = backgroundColorStyle === "Dark" && !noWhiteTextDarkStyle;
  const condition2 = backgroundColorStyle === "Color" && noBlackTextColorStyle;
  const renderBio = [];

  const noBgImg = ADDSOClient(userInfo.company);
  const pandoraUser = isPandora(userInfo.company);
  const showPandoraLogo = pandoraUser && b2bActiveTab === 2;

  if (pandoraUser) {
    imgClass.push(classes.bgColorWhite);
  }

  const stringArray = findNewLine(userBio);

  stringArray.forEach((value, index) => {
    if (value === "") {
      renderBio.push(<br key={index} />);
    } else {
      renderBio.push(
        <p
          key={index}
          style={{
            color: noBgImg
              ? "#42444A"
              : condition1
              ? "#fff"
              : condition2
              ? "#fff"
              : "#42444A",
          }}
          className={bioClass.join(" ")}
        >
          {value === appLang.profile.text.yourInfo ? "" : value}
        </p>
      );
    }
  });

  const closeModal = () => {
    setShowModal(false);
  };

  if (buttonShow) {
    buttonClasses.pop();
  }

  if (noBgImg) {
    imgClass = [classes.HeaderBoxImgNoBgImg];
  }

  if (viewPage) {
    imgClass.push(classes.viewPageHeaderImg);
  }

  return (
    <div className={noBgImg ? classes.HeaderBoxNoBgImg : classes.HeaderBox}>
      <div
        className={
          noBgImg
            ? classes.sharePageWhiteNoBgImg
            : condition1 || condition2
            ? classes.sharePageWhite
            : classes.sharePageBlack
        }
        onClick={() => setShowModal(true)}
      >
        <i className="fas fa-share-alt"></i>
      </div>
      {mobilePreview ? null : (
        <img
          src={avatar}
          alt="avatar"
          className={imgClass.join(" ")}
          onError={(event) => {
            event.target.src = avatar;
          }}
        />
      )}

      {showPandoraLogo && <LogoPandora />}
      {!showPandoraLogo && (
        <Logo
          content={userFullName}
          userInformation={userInfo}
          backgroundColorStyle={backgroundColorStyle}
          currentBackground={currentBackground}
          noBgImg={noBgImg}
        />
      )}

      <div className={classes.bioContainer}>{renderBio}</div>
      <ModalQR show={showModal} closeModal={closeModal} />
      <BackDrop show={showModal} />
    </div>
  );
};

export default HeaderBox;
