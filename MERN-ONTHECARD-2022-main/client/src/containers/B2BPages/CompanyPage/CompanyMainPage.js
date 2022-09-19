import React from "react";
import classes from "./Company.module.css";
import HeaderBox from "../../../components/Boxes/HeaderBox/HeaderBox";
import { Vietnamese, English } from "../../../language/language";
import MainButton from "../../../components/UI/Button/MainButton/MainButton";
import AdvancedButton from "../../../components/UI/Button/AdvancedButton/Advanced";
import LinkBoxB2B from "../../../components/Boxes/LinkBox/LinkBoxB2B/LinkBoxB2B";
import CoverPhoto from "../../../components/Boxes/StoreHeader/CoverPhoto";
import { ADDSOClient, isPandora } from "../../../utilities/helper2";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import NewLinkBox from "../../../components/Boxes/LinkBox/NewLinkBox/NewLinkBox";
import PandoraDropDown from "../../../B2B_Components/Pandora/LinkBox/DropDown/DropDown";

const CompanyMainPage = () => {
  const { enterprisePage } = useSelector((state) => state);
  const { appLanguage } = useSelector((state) => state);
  const { avatarImg, avatarURL, company } = enterprisePage;
  const avatarImage = avatarURL ? avatarURL : avatarImg;
  const languageChosen = appLanguage === "VIETNAMESE" ? Vietnamese : English;
  const history = useHistory();

  if (!company) {
    history.push("/signin");
  }

  const noBgImg = ADDSOClient(company);

  const editProfileHandler = () => {
    history.replace("/profile/edit");
  };

  const advancedProfileHandler = () => {
    history.replace("/profile/b2b/advanced");
  };

  let listItems;
  if (enterprisePage.info && !isPandora(company)) {
    listItems = enterprisePage.info.map((value, index) => {
      return (
        <LinkBoxB2B
          iconType={value.icon}
          content={value.title}
          artistContent={value.artist ? value.artist : null}
          url={value.url}
          key={value.title}
        />
      );
    });
  }

  if (isPandora(company) && enterprisePage.info) {
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
    <div className={classes.MainPage}>
      {noBgImg && <CoverPhoto image={enterprisePage.backgroundImageUrl} />}
      <HeaderBox
        buttonShow={true}
        avatar={avatarImage}
        userFullName={enterprisePage.name}
        userBio={enterprisePage.bio}
        userInfo={enterprisePage}
      />
      <div className={classes.buttonContainer}>
        <MainButton
          text={languageChosen.profile.button.edit}
          onClick={editProfileHandler}
          editPage={true}
        >
          <i className="fas fa-pen"></i>
          {"  "}
        </MainButton>
        <div className={classes.divider}></div>
        <AdvancedButton onClick={advancedProfileHandler}>
          <i className="fas fa-chart-bar"></i>
          {"   " + languageChosen.profile.button.advanced}
        </AdvancedButton>
      </div>
      {isPandora(company) && (
        <NewLinkBox
          iconType={
            "https://firebasestorage.googleapis.com/v0/b/onthecardimage.appspot.com/o/images%2Fmai.pham%40norbreeze.com%2Fnor.png?alt=media&token=3ce24918-431e-4017-ae1b-7fb6625fb2fd"
          }
          content={"Về Tập Đoàn Norbreeze"}
          url={"https://pandora.norbreeze.vn/pages/ve-tap-doan-norbreeze"}
          key={"Về Tập Đoàn Norbreeze"}
        />
      )}
      {isPandora(company) && <PandoraDropDown />}
      {listItems}
    </div>
  );
};

export default CompanyMainPage;
