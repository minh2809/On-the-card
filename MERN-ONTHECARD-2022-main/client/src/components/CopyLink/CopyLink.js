import React, { useState } from "react";
import { Vietnamese, English } from "../../language/language";
import { useSelector } from "react-redux";
import classes from "./CopyLink.module.css";
import IconCopy from "../../assets/icons/icon-copy.png";
import { copyToClipboard } from "../../utilities/helper_functions";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const CopyLink = () => {
  const { b2bActiveTab } = useSelector((state) => state);
  const language = useSelector((state) => state.appLanguage);
  const userName = useSelector((state) => state.userInfo.userName);
  const appLang = language === "VIETNAMESE" ? Vietnamese : English;
  const [linkCopied, setLinkCopied] = useState(false);
  const history = useHistory();
  const btnContent = linkCopied
    ? appLang.editPage.button.copied
    : appLang.editPage.button.copy;
  const link = `${window.location.origin}/${userName}`;

  const copyLinkHandler = () => {
    setLinkCopied(true);
    copyToClipboard(link);
  };

  const seePage = () => {
    b2bActiveTab === 1 && history.replace("/profile");
    b2bActiveTab === 2 && history.replace("/profile/companyPage");
    b2bActiveTab === 3 && history.replace("/profile/storePage");
  };

  return (
    <div className={classes.copyLinkContainer}>
      <h3 className={classes.copyLinkTitle}>{appLang.editPage.text.myPage}</h3>
      <h3 className={classes.accountUrl}>{link}</h3>
      <div className={classes.buttonContainer}>
        <div className={classes.copyLinkButton} onClick={copyLinkHandler}>
          <img src={IconCopy} alt="" className={classes.IconCopy} />
          {btnContent}
        </div>
        <Button
          className={classes.seePageButton}
          variant="contained"
          color="primary"
          onClick={seePage}
        >
          <i className="far fa-eye"></i> {appLang.editPage.button.preview}
        </Button>
      </div>
    </div>
  );
};

export default CopyLink;
