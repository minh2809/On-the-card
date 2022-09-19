import React from "react";
import classes from "./DownloadButton.module.css";
import { useSelector } from "react-redux";
import { Vietnamese, English } from "../../../../language/language";
import { specialUsers } from "../../../../utilities/helper";

const MessageButton = ({ onClick }) => {
  const { appLanguage: appLang, userInfo } = useSelector((state) => state);
  const language = appLang === "VIETNAMESE" ? Vietnamese : English;
  const condition = specialUsers(userInfo.userName, userInfo.company);

  return (
    <div
      className={[classes.messageButton, classes.button].join(" ")}
      onClick={onClick}
    >
      <i className="fas fa-comments"></i>
      <div className={classes.separate}></div>
      {condition ? "Gửi Tin Nhắn" : language.viewPage.connect}
    </div>
  );
};

export default MessageButton;
