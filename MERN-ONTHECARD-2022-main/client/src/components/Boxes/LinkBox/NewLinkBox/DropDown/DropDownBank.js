import React, { useState } from "react";
import styles from "../NewLinkBox.module.css";
import classes from "./DropDownLink.module.css";
import { useSelector } from "react-redux";
import { Vietnamese, English } from "../../../../../language/language";
import { copyToClipboard } from "../../../../../utilities/helper_functions";
import * as api from "../../../../../api/api";
import { isCABank, bankIconSquare } from "../../../../../utilities/helper";

const DropDownBank = ({ icon, bankNumber, content }) => {
  const { appLanguage, userInfo, token } = useSelector((state) => state);
  const appLang = appLanguage === "ENGLISH" ? English : Vietnamese;
  const caBank = isCABank(content.toLowerCase().split(" ")[0]);
  const bankSquare = bankIconSquare(content.toLowerCase().split(" ")[0]);

  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const showDetail = async () => {
    const condition = !window.location.pathname.includes("/profile");
    condition && api.linkClicked(bankNumber, userInfo.userName, token);
    setOpen(true);
  };
  const hideDetail = () => {
    setOpen(false);
    setCopied(false);
  };

  const copyNumber = () => {
    setCopied(true);
    copyToClipboard(bankNumber);
  };

  const defaultLink = (
    <div className={styles.LinkBox} onClick={showDetail}>
      <img
        src={icon}
        alt=""
        className={
          caBank
            ? classes.caBank
            : bankSquare
            ? classes.caBankSquare
            : classes.bankIcon
        }
      />
      <div className={classes.directIconBank}>
        <i className="fas fa-angle-right"></i>
      </div>
    </div>
  );
  const openLink = (
    <div className={classes.LinkBox}>
      <img
        src={icon}
        alt=""
        className={
          caBank
            ? classes.caBank
            : bankSquare
            ? classes.caBankSquare
            : classes.bankIcon
        }
        onClick={hideDetail}
      />
      <div className={classes.directIconBankOpen} onClick={hideDetail}>
        <i className="fas fa-angle-right"></i>
      </div>
      <div className={classes.additionalInfo}>
        <h3>{appLang.editPage.text.bankingInfo}</h3>
        <div className={classes.numberLine}>
          <div className={classes.bankNumber}>{bankNumber}</div>
          <div className={classes.copyButton} onClick={copyNumber}>
            {copied ? (
              <div>
                <i className="fas fa-check"></i>{" "}
                {appLang.editPage.button.copied}
              </div>
            ) : (
              <div>
                <i className="far fa-clone"></i>{" "}
                {appLang.editPage.button.copyNo}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (open) {
    return openLink;
  } else {
    return defaultLink;
  }
};

export default DropDownBank;
