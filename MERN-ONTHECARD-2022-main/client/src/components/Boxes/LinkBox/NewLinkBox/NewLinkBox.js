import React from "react";
import classes from "./NewLinkBox.module.css";
import {
  loadDisplayIcon,
  loadBankIcon,
} from "../../../../utilities/helper_functions";
import { openLink, redirectLink } from "../../../../utilities/helper_functions";
import { isB2BLink } from "../../../../utilities/helper2";
import { useSelector } from "react-redux";
import YoutubeEmbedded from "./Embed/YoutubeEmbedded";
import DropDownBank from "./DropDown/DropDownBank";
import InstaPost from "./InstaPost/InstaPost";
import TiktokPost from "./TiktokPost/TiktokPost";
import LinkBoxB2B from "../LinkBoxB2B/LinkBoxB2B";

const NewLinkBox = (props) => {
  const { iconType, content, artistContent, url } = props;
  const { desktopPreview } = props;
  const condition = iconType !== "url";
  const iconBg = condition ? "#F6F6F6" : "";
  const LinkBoxStyle = [classes.LinkBox];
  const pStyle = [classes.p];
  const { userInfo, token, b2bActiveTab } = useSelector((state) => state);
  const { enterprisePage, storePage } = useSelector((state) => state);
  const { userName } = userInfo;
  let iconStyle = userInfo.iconStyle;

  if (b2bActiveTab === 2) {
    iconStyle = enterprisePage.iconStyle;
  }

  if (b2bActiveTab === 3) {
    iconStyle = storePage.iconStyle;
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

  const data = {
    indicator: userName,
    url: url,
    token: token,
    viewFrom: "personalPage",
  };

  const clickHandler = () => {
    b2bActiveTab === 1 && openLink(iconType, url, userName, token);
    b2bActiveTab === 2 &&
      redirectLink(iconType, url, { ...data, viewFrom: "companyPage" });
    b2bActiveTab === 3 && redirectLink(iconType, url);
  };

  let returnObject = (
    <div className={LinkBoxStyle.join(" ")} onClick={clickHandler}>
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
                onError={(event) => {
                  event.target.src = iconLoaded;
                }}
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
  );

  if (iconType === "embedyoutube") {
    returnObject = (
      <YoutubeEmbedded desktopPreview={desktopPreview} url={url} key={url} />
    );
  }

  if (iconType === "instagramembed") {
    returnObject = (
      <InstaPost previewDemo={desktopPreview} postLink={url} key={url} />
    );
  }

  if (iconType === "tiktokembed") {
    returnObject = <TiktokPost postLink={url} key={url} />;
  }

  if (bankLink) {
    returnObject = (
      <DropDownBank icon={iconLoaded} bankNumber={url} content={content} />
    );
  }

  if (isB2BLink(iconType)) {
    returnObject = (
      <LinkBoxB2B
        iconType={iconType}
        content={content}
        artistContent={artistContent}
        desktopPreview={false}
        url={url}
      />
    );
  }

  return returnObject;
};

export default NewLinkBox;
