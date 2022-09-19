import React, { useState } from "react";
import classes from "./LinkBoxB2B.module.css";
import {
  loadDisplayIcon,
  loadBankIcon,
} from "../../../../utilities/helper_functions";
import { openLink, redirectLink } from "../../../../utilities/helper_functions";
import { useSelector } from "react-redux";
import YoutubeEmbedded from "../NewLinkBox/Embed/YoutubeEmbedded";
import DropDownBank from "../NewLinkBox/DropDown/DropDownBank";
import { Vietnamese, English } from "../../../../language/language";
import { copyToClipboard } from "../../../../utilities/helper_functions";
import * as api from "../../../../api/api";
import * as api2 from "../../../../api/api2";

const LinkBoxB2B = (props) => {
  const { iconType, content, artistContent, url } = props;
  const { desktopPreview } = props;
  const condition = iconType !== "url";
  const iconBg = condition ? "#F6F6F6" : "";
  const LinkBoxStyle = [classes.LinkBox];
  const pStyle = [classes.p];
  const { userInfo, token, b2bActiveTab } = useSelector((state) => state);
  const { enterprisePage, appLanguage } = useSelector((state) => state);
  const { userName } = userInfo;
  let iconStyle = userInfo.iconStyle;
  const appLang = appLanguage === "ENGLISH" ? English : Vietnamese;
  const [copied, setCopied] = useState(false);

  const data = {
    indicator: userName,
    url: url,
    token: token,
    viewFrom: "personalPage",
  };

  if (b2bActiveTab === 2) {
    iconStyle = enterprisePage.iconStyle;
    data.viewFrom = "companyPage";
  }

  const emailSmaller = iconStyle !== "Original" && iconType === "mail";
  const customImage = iconType.includes("http");
  const bankLink = iconType === "bank";
  const iconLoaded = bankLink
    ? loadBankIcon(iconStyle, content)
    : loadDisplayIcon(iconStyle, iconType);

  if (desktopPreview) {
    LinkBoxStyle.push(classes.LinkBoxPreview);
    pStyle.push(classes.pPreview);
  }

  const clickHandler = () => {
    b2bActiveTab === 1 && openLink(iconType, url, userName, token);
    b2bActiveTab === 2 && redirectLink(iconType, url, data);
  };

  const copyNumber = () => {
    const condition = !window.location.pathname.includes("/profile");
    condition && b2bActiveTab === 1 && api.linkClicked(url, userName, token);
    condition && b2bActiveTab === 2 && api2.b2bLinkClicked(data);
    copyToClipboard(url);
    setCopied(true);
  };

  let returnObject = (
    <div className={LinkBoxStyle.join(" ")}>
      <div className={classes.topperContainer} onClick={clickHandler}>
        <div className={classes.socialIconWrapper}>
          {customImage && (
            <div className={classes.customImage}>
              <img
                src={iconType}
                alt="url"
                onError={(event) => {
                  event.target.src = iconType;
                }}
              />
            </div>
          )}
          {!customImage && (
            <div
              className={classes.iconPlate}
              style={{ backgroundColor: iconBg }}
            >
              {condition && (
                <img
                  src={iconLoaded}
                  className={
                    emailSmaller ? classes.emailIcon : classes.socialIcon
                  }
                  alt="url"
                />
              )}
            </div>
          )}
        </div>
        <h2 className={classes.content}>
          <p className={pStyle.join(" ")}>{content}</p>
          <p className={pStyle.join(" ")}>{artistContent}</p>
        </h2>
        <div className={classes.directIcon}>
          <i className="fas fa-angle-right"></i>
        </div>
      </div>
      <div className={classes.additionalInfo}>
        <div className={classes.numberLine}>
          <div className={classes.bankNumber}>{url}</div>
          <div className={classes.copyButton} onClick={copyNumber}>
            {copied ? (
              <div>
                <i className="fas fa-check"></i>{" "}
                {appLang.editPage.button.copied}
              </div>
            ) : (
              <div>
                <i className="far fa-clone"></i>{" "}
                {appLang.editPage.button.copying}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (iconType === "embedyoutube") {
    returnObject = (
      <YoutubeEmbedded desktopPreview={desktopPreview} url={url} />
    );
  }

  if (bankLink) {
    returnObject = <DropDownBank icon={iconLoaded} bankNumber={url} />;
  }

  return returnObject;
};

export default LinkBoxB2B;
