import React from "react";
import classes from "./Footer.module.css";
import logo from "../../assets/footer/footer.png";
import logoWhite from "../../assets/footer/footerwhite.png";
import logoca from "../../assets/footer/calogowhite.png";
import logocablack from "../../assets/footer/calogoblack.png";
import { useSelector } from "react-redux";
import {
  detectNoBlackTextColor,
  detectNoWhiteTextDark,
} from "../../utilities/helper_functions";
import { ADDSOClient } from "../../utilities/helper2";

const Footer = ({ preview, b2bInfo }) => {
  let userInfo;
  const { appLanguage, b2bActiveTab } = useSelector((state) => state);
  const userData = useSelector((state) => state.userInfo);
  if (b2bInfo) {
    userInfo = b2bInfo;
  } else {
    userInfo = userData;
  }
  // const openWeb = () => window.open("https://onthecard.vn");
  const openWeb = () => window.open("https://onthecard.ca");
  const container = [classes.footerContainer];

  if (preview) {
    container.push(classes.preview);
  }

  const {
    backgroundColor,
    backgroundColorObject: userBgColorObj,
    backgroundColorStyle: userBgColorStyle,
  } = userInfo;

  const noBlackTextColorStyle = detectNoBlackTextColor(userBgColorObj);
  const noWhiteTextDarkStyle = detectNoWhiteTextDark(userBgColorObj);

  let logoApplied, colorStyle;
  let userBgColor = backgroundColor;

  if (userBgColorStyle === "Dark" && !noWhiteTextDarkStyle) {
    logoApplied = appLanguage === "VIETNAMESE" ? logoWhite : logoca;
    colorStyle = "#fff";
  } else if (userBgColorStyle === "Color" && noBlackTextColorStyle) {
    logoApplied = appLanguage === "VIETNAMESE" ? logoWhite : logoca;
    colorStyle = "#fff";
  } else {
    logoApplied = appLanguage === "VIETNAMESE" ? logo : logocablack;
    colorStyle = "#000";
  }

  if (ADDSOClient(userData.company)) {
    logoApplied = appLanguage === "VIETNAMESE" ? logo : logocablack;
    userBgColor = "#fff";
    colorStyle = "#000";
  }

  if (window.location.pathname.includes("/secure/")) {
    logoApplied = appLanguage === "VIETNAMESE" ? logoWhite : logoca;
    userBgColor = "#000";
    colorStyle = "#fff";
  }

  if (b2bActiveTab === 4 && preview) {
    logoApplied = appLanguage === "VIETNAMESE" ? logo : logocablack;
    userBgColor = "#fff";
    colorStyle = "#000";
  }

  return (
    <div
      className={container.join(" ")}
      style={{
        backgroundColor: userBgColor,
        color: colorStyle,
        padding: "10px 0px",
      }}
    >
      <div className={classes.logoContainer} onClick={openWeb}>
        <img src={logoApplied} alt="" className={classes.logo} />
      </div>
    </div>
  );
};

export default Footer;
