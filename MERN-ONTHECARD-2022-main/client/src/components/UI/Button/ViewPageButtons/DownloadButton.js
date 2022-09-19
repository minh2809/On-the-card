import React from "react";
import classes from "./DownloadButton.module.css";
import { saveContact } from "../../../../utilities/vCardHelper";
import { useSelector } from "react-redux";
import { Vietnamese, English } from "../../../../language/language";
import * as api from "../../../../api/api";
import { specialUsers } from "../../../../utilities/helper";

const DownLoadButton = () => {
  const { userInfo, appLanguage: appLang, token } = useSelector(
    (state) => state
  );
  const condition = specialUsers(userInfo.userName);
  const subIcon = <i class="fas fa-phone-alt"></i>;
  const icon = <i className="fas fa-download"></i>;
  const language = appLang === "VIETNAMESE" ? Vietnamese : English;
  const buttonClicked = async () => {
    const condition = !window.location.pathname.includes("/profile");
    condition && api.linkClicked("saveContact", userInfo.userName, token);
    saveContact(userInfo);
  };
  const contact = () => {
    window.location.href = "tel:0383236087";
  };
  const buttonStyle = [classes.downloadButton, classes.button];

  if (condition) {
    buttonStyle.push(classes.contactButton);
  }

  return (
    <div
      className={buttonStyle.join(" ")}
      onClick={condition ? contact : buttonClicked}
    >
      {condition ? subIcon : icon}
      <div className={classes.separate}></div>
      {condition ? "Liên Hệ" : language.viewPage.saveConact}
    </div>
  );
};

export default DownLoadButton;
