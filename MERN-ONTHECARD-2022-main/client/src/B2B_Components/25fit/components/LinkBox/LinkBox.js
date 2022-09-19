import React from "react";
import classes from "./LinkBox.module.css";
import {
  loadDisplayIcon,
  loadBankIcon,
} from "../../../../utilities/helper_functions";
import { openLink, redirectLink } from "../../../../utilities/helper_functions";
import { isB2BLink } from "../../../../utilities/helper2";
import { useSelector } from "react-redux";
import YoutubeEmbedded from "../../../../components/Boxes/LinkBox/NewLinkBox/Embed/YoutubeEmbedded";
import DropDownBank from "../../../../components/Boxes/LinkBox/NewLinkBox/DropDown/DropDownBank";
import InstaPost from "../../../../components/Boxes/LinkBox/NewLinkBox/InstaPost/InstaPost";
import TiktokPost from "../../../../components/Boxes/LinkBox/NewLinkBox/TiktokPost/TiktokPost";
import LinkBoxB2B from "../../../../components/Boxes/LinkBox/LinkBoxB2B/LinkBoxB2B";

const NewLinkBox = (props) => {
  const { iconType, content, artistContent, url } = props;
  const { desktopPreview } = props;
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
      <h2 className={classes.content}>
        <p className={pStyle.join(" ")}>{content.toUpperCase()}</p>
        <p className={pStyle.join(" ")}>{artistContent}</p>
      </h2>
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
