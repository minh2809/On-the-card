import React from "react";
import { useSelector } from "react-redux";
import classes from "./KOLView.module.css";
import HeaderBox from "../components/HeaderBox/HeaderBox";
import LinkBox from "../components/LinkBox/LinkBox";
import Footer from "../../../containers/Footer/Footer";
import { Helmet } from "react-helmet";
import logo from "../../../assets/B2B/25fit/logo.png";
import slogan from "../../../assets/B2B/25fit/slogan.png";
import NavButton from "../components/Buttons/NavButton";

const KOLView = () => {
  const { userInfo, appLang } = useSelector((state) => state);
  const { avatarURL, avatarImg, socialMediaList } = userInfo;
  const { fullName, bio, backgroundImageUrl, inactive } = userInfo;
  const { backgroundColor } = userInfo;

  let listItems = null;
  const avatarImage = avatarURL === "" ? avatarImg : avatarURL;

  const open25Fit = () => window.open("https://25fit.net/");

  if (socialMediaList) {
    listItems = socialMediaList.map((value, index) => {
      return (
        <LinkBox
          iconType={value.icon}
          content={value.title}
          artistContent={value.artist ? value.artist : null}
          url={value.url}
          key={value.title}
        />
      );
    });
  }

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

        <div className={classes.logoContainer}>
          <img src={logo} alt="" className={classes.logo} />
        </div>

        <div className={classes.navBtnContainer}>
          <NavButton onClick={open25Fit}>25 FIT</NavButton>
          <NavButton onClick={() => console.log("")}>CÁ NHÂN</NavButton>
        </div>

        <div className={classes.sloganContainer}>
          <img src={slogan} alt="" className={classes.slogan} />
        </div>

        <HeaderBox
          buttonShow={true}
          avatar={avatarImage}
          userFullName={fullName}
          userBio={bio}
          userInfo={userInfo}
        />

        {listItems}
      </div>
    );
  }
};

export default KOLView;
