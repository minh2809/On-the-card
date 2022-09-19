import React from "react";
import classes from "./DesktopPreview.module.css";
import NewLinkBox from "../../components/Boxes/LinkBox/NewLinkBox/NewLinkBox";
import LinkBoxB2b from "../../components/Boxes/LinkBox/LinkBoxB2B/LinkBoxB2B";

import Footer from "../../containers/Footer/Footer";
import { useSelector } from "react-redux";
import HeaderBox from "./HeaderBox/HeaderBox";
import DownloadButton from "../UI/Button/ViewPageButtons/DownloadButton";
import { ADDSOClient } from "../../utilities/helper2";
import CoverPhoto from "../Boxes/StoreHeader/CoverPhoto";

import { isBProUser } from "../../utilities/helper2";

const DesktopPreview = () => {
  const { userInfo } = useSelector((state) => state);
  const { socialMediaList, company } = userInfo;
  const { backgroundColor, backgroundImageUrl } = userInfo;
  const noImgBg = ADDSOClient(company);

  let listItems = null;

  if (socialMediaList) {
    listItems = socialMediaList.map((value, index) => {
      if (noImgBg) {
        return (
          <LinkBoxB2b
            iconType={value.icon}
            content={value.title}
            artistContent={value.artist ? value.artist : null}
            url={value.url}
            key={index}
            desktopPreview={true}
          />
        );
      } else {
        return (
          <NewLinkBox
            iconType={value.icon}
            content={value.title}
            artistContent={value.artist ? value.artist : null}
            url={value.url}
            key={index}
            desktopPreview={true}
          />
        );
      }
    });
  }

  return (
    <div className={classes.SocialMediaList}>
      <div className={classes.desktopPreviewArea}>
        <div className={classes.desktopPreviewOpacityBg}>
          {backgroundImageUrl && !noImgBg && (
            <img
              alt="previewImg"
              src={
                backgroundImageUrl
                  ? backgroundImageUrl
                  : userInfo.backgroundImageUrl
              }
              className={classes.imageResponsive}
              onError={(event) => {
                event.target.src = backgroundImageUrl
                  ? backgroundImageUrl
                  : userInfo.backgroundImageUrl;
              }}
            />
          )}
        </div>
        <div
          style={{
            background: noImgBg
              ? "#fff"
              : backgroundColor
              ? backgroundColor
              : userInfo.backgroundColor,
          }}
          className={classes.previewPhoneArea}
        >
          <div id="desktop-preview" className={classes.desktopPreview}>
            {noImgBg && (
              <CoverPhoto image={userInfo.backgroundImageUrl} preview />
            )}
            <HeaderBox
              mobilePreview={true}
              buttonShow={false}
              avatar={
                userInfo.avatarURL ? userInfo.avatarURL : userInfo.avatarImg
              }
              userFullName={userInfo.fullName}
              userBio={userInfo.bio}
              desktopPreview={true}
              userInfo={userInfo}
              noImgBg={noImgBg}
            />
            <div className={classes.downloadButtonWrapper}>
              <DownloadButton />
            </div>
            <div className={classes.socialLinkBoxWrapper}>{listItems}</div>
            <div className={classes.footer}>
              {!isBProUser(company) && <Footer preview />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopPreview;
