import React from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import classes from "./PetroView.module.css";
import { saveContact } from "../../../utilities/vCardHelper.js";

import Footer from "../../../containers/Footer/Footer";
import CoverPhoto from "../components/CoverPhoto/CoverPhoto";
import HeaderBox from "../components/HeaderBox/HeaderBox";
import LinkBox from "../components/LinkBox/LinkBox";
import SaveContact from "../components/Buttons/SaveContact/SaveContact";
import ZaloViber from "../components/Buttons/ZaloViber/ZaloViber";
import FooterPetro from "../components/Footer/Footer";

import logo from "../../../assets/B2B/petrovn/petroicon.png";
import emailLogo from "../../../assets/B2B/petrovn/email.png";
import phoneLogo from "../../../assets/B2B/petrovn/phone.png";
import webLogo from "../../../assets/B2B/petrovn/website.png";
import mapLogo from "../../../assets/B2B/petrovn/map.png";

const KOLView = () => {
  const { userInfo, appLang } = useSelector((state) => state);
  const { avatarURL, avatarImg, socialMediaList } = userInfo;
  const { fullName, bio, backgroundImageUrl, inactive } = userInfo;
  const { backgroundColor } = userInfo;

  const avatarImage = avatarURL === "" ? avatarImg : avatarURL;
  const contactSave = () => saveContact(userInfo);

  if (inactive) {
    return (
      <div>
        <h3 className={classes.locked}>
          Trang của {fullName} đã được đặt ở chế độ Riêng Tư bởi chủ sở hữu
          trang. Vui lòng quay lại sau
        </h3>
        <div className={classes.footer}>
          <Footer />
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={
          !backgroundImageUrl
            ? {
                backgroundColor: backgroundColor,
              }
            : null
        }
        className={classes.MainPage}
      >
        <Helmet>
          <title>
            {fullName} | {appLang.tabTile}
          </title>
          <meta name="description" content={bio} />
        </Helmet>

        <CoverPhoto image={logo} />

        <HeaderBox
          buttonShow={true}
          avatar={avatarImage}
          userFullName={fullName}
          userBio={bio}
          userInfo={userInfo}
        />

        <div className={classes.linkContainer}>
          <LinkBox
            icon={phoneLogo}
            content={socialMediaList[0].url}
            onClick={() => window.open("tel:" + socialMediaList[0].url)}
          />

          <LinkBox
            icon={emailLogo}
            content={socialMediaList[1].url}
            onClick={() => window.open("mailto:" + socialMediaList[1].url)}
          />

          <LinkBox
            icon={webLogo}
            content="pvndb.vn"
            onClick={() => window.open("http://pvndb.vn/")}
          />

          <LinkBox
            icon={mapLogo}
            content="Tầng 3, 18 Láng Hạ, Ba Đình, Hà Nội"
            onClick={() => window.open("https://goo.gl/maps/53cBpV1tYMaJAW3K7")}
          />
        </div>

        <SaveContact onClick={contactSave} />
        <ZaloViber socialMediaList={socialMediaList} />

        <FooterPetro socialMediaList={socialMediaList} />
      </div>
    );
  }
};

export default KOLView;
