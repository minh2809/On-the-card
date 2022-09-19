import React from "react";
import classes from "./DesktopPreview.module.css";
import LinkBoxB2b from "../../components/Boxes/LinkBox/LinkBoxB2B/LinkBoxB2B";
import Footer from "../../containers/Footer/Footer";
import { useSelector } from "react-redux";
import HeaderBox from "./HeaderBox/HeaderBox";
import DownloadButton from "../UI/Button/ViewPageButtons/DownloadButton";
import { ADDSOClient, isPandora } from "../../utilities/helper2";
import CoverPhoto from "../Boxes/StoreHeader/CoverPhoto";
import NewLinkBox from "../../components/Boxes/LinkBox/NewLinkBox/NewLinkBox";
import PandoraDropDown from "../../B2B_Components/Pandora/LinkBox/DropDown/DropDown";
import { isBProUser } from "../../utilities/helper2";

const PreviewEnterprise = () => {
  const { enterprisePage } = useSelector((state) => state);
  const { info, company } = enterprisePage;
  const { backgroundColor, backgroundImageUrl } = enterprisePage;
  const noImgBg = ADDSOClient(company);

  let listItems = null;

  if (info && !isPandora(company)) {
    listItems = info.map((value, index) => {
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
    });
  }

  if (isPandora(company) && info) {
    listItems = enterprisePage.info.map((value, index) => {
      return (
        <NewLinkBox
          iconType={value.icon}
          content={value.title}
          artistContent={value.artist ? value.artist : null}
          url={value.url}
          key={value.title}
        />
      );
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
                  : enterprisePage.backgroundImageUrl
              }
              className={classes.imageResponsive}
              onError={(event) => {
                event.target.src = backgroundImageUrl
                  ? backgroundImageUrl
                  : enterprisePage.backgroundImageUrl;
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
              : enterprisePage.backgroundColor,
          }}
          className={classes.previewPhoneArea}
        >
          <div id="desktop-preview" className={classes.desktopPreview}>
            {noImgBg && (
              <CoverPhoto image={enterprisePage.backgroundImageUrl} preview />
            )}
            <HeaderBox
              mobilePreview={true}
              buttonShow={false}
              avatar={enterprisePage.avatarURL || enterprisePage.avatarImg}
              userFullName={enterprisePage.name}
              userBio={enterprisePage.bio}
              desktopPreview={true}
              userInfo={enterprisePage}
              noImgBg={noImgBg}
            />
            <div className={classes.downloadButtonWrapper}>
              <DownloadButton />
            </div>
            <div className={classes.socialLinkBoxWrapper}>
              {isPandora(company) && (
                <NewLinkBox
                  iconType={
                    "https://firebasestorage.googleapis.com/v0/b/onthecardimage.appspot.com/o/images%2Fmai.pham%40norbreeze.com%2Fnor.png?alt=media&token=3ce24918-431e-4017-ae1b-7fb6625fb2fd"
                  }
                  content={"Về Tập Đoàn Norbreeze"}
                  url={
                    "https://pandora.norbreeze.vn/pages/ve-tap-doan-norbreeze"
                  }
                  key={"Về Tập Đoàn Norbreeze"}
                />
              )}
              {isPandora(company) && <PandoraDropDown />}
              {listItems}
            </div>
            <div className={classes.footer}>
              {!isBProUser(company) && (
                <Footer preview b2bInfo={enterprisePage} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewEnterprise;
