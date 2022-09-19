import React, { useState } from "react";
import classes from "./HeaderBox.module.css";
import Logo from "../../UI/Logo/Logo";
import {
  detectNoBlackTextColor,
  detectNoWhiteTextDark,
} from "../../../utilities/helper_functions";
import ModalQR from "../../UI/Modal/ModalQR/ModalQR";
import BackDrop from "../../UI/Backdrop/Backdrop";
import { isPandora } from "../../../utilities/helper2";
import { useSelector } from "react-redux";
import LogoPandora from "../../UI/Logo/LogoPandora";

const HeaderBox = (props) => {
  const [showModal, setShowModal] = useState(false);

  const { viewPage, userFullName, userBio, userInfo, noImgBg } = props;
  const { currentBackground, avatar, mobilePreview, buttonShow } = props;
  const { backgroundColorStyle, backgroundColorObject, company } = userInfo;
  const { b2bActiveTab } = useSelector((state) => state);

  let buttonClasses = [classes.ButtonBar, classes.hideBtn];
  let imgClass = [classes.HeaderBoxImg];
  let bioClass = [classes.bio];

  const noBlackTextColorStyle = detectNoBlackTextColor(backgroundColorObject);
  const noWhiteTextDarkStyle = detectNoWhiteTextDark(backgroundColorObject);
  const condition1 = backgroundColorStyle === "Dark" && !noWhiteTextDarkStyle;
  const condition2 = backgroundColorStyle === "Color" && noBlackTextColorStyle;
  const renderBio = [];

  const pandoraUser = isPandora(company);
  const showPandoraLogo = pandoraUser && b2bActiveTab === 2;

  if (pandoraUser) {
    imgClass.push(classes.bgColorWhite);
  }

  const stringArray = userBio.split("\n");

  stringArray.forEach((value, index) => {
    if (value === "") {
      renderBio.push(<br key={index} />);
    } else {
      renderBio.push(
        <p
          key={index}
          style={{
            color: noImgBg
              ? "#42444A"
              : condition1
              ? "#fff"
              : condition2
              ? "#fff"
              : "#42444A",
          }}
          className={bioClass.join(" ")}
        >
          {value === "Thông tin của bạn" ? "" : value}
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

  if (noImgBg) {
    imgClass = [classes.HeaderBoxImgNoBgImg];
  }

  if (viewPage) {
    imgClass.push(classes.viewPageHeaderImg);
  }

  return (
    <div className={classes.HeaderBox}>
      <div
        className={
          noImgBg
            ? classes.sharePageWhiteNoBgImg
            : condition1 || condition2
            ? classes.sharePageWhite
            : classes.sharePageBlack
        }
        onClick={() => setShowModal(true)}
      >
        <i className="fas fa-share-alt"></i>
      </div>
      {mobilePreview ? (
        <img
          src={avatar}
          alt=""
          className={imgClass.join(" ")}
          onError={(event) => {
            event.target.src = avatar;
          }}
        />
      ) : null}

      {showPandoraLogo && <LogoPandora />}
      {!showPandoraLogo && (
        <Logo
          content={userFullName}
          userInformation={userInfo}
          backgroundColorStyle={backgroundColorStyle}
          currentBackground={currentBackground}
          noBgImg={noImgBg}
        />
      )}
      <div className={classes.bioContainer}>{renderBio}</div>

      <ModalQR show={showModal} closeModal={closeModal} />
      <BackDrop show={showModal} />
    </div>
  );
};

export default HeaderBox;
