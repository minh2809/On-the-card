import classes from "./EditProfile.module.css";
import React, { useState } from "react";
import CopyLinkArea from "../../components/CopyLink/CopyLink";
import { useSelector } from "react-redux";
import { Vietnamese, English } from "../../language/language";

import BasicInfo from "../../components/BasicInfo/BasicInfo";
import BasicInfoEnterprise from "../../components/BasicInfo/BasicInfoEnterprise";
import BasicInfoStore from "../../components/BasicInfo/BasicInfoStore";
import BasicInfoGallery from "../../components/BasicInfo/BasicInfoGallery";

import SocialMediaList from "../../components/SocialMediaList/SocialMediaList";
import EnterpriseInfo from "../../components/SocialMediaList/EnterpriseInfo";
import StoreProducts from "../../components/SocialMediaList/StoreProducts";

import CustomizeBackground from "../../components/Customize/CustomizeBackground";
import Orders from "../../components/Message/Orders";

import DesktopPreview from "../../components/DesktopPreview/DesktopPreview";
import PreviewEnterprise from "../../components/DesktopPreview/PreviewEnterprise";
import PreviewStore from "../../components/DesktopPreview/PreviewStore";
import PreviewGallery from "../../components/DesktopPreview/PreviewGallery";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Redirect } from "react-router";
import { useParams } from "react-router-dom";
import { getWindowDimensions } from "../../utilities/helper2";

import { Helmet } from "react-helmet";

const AdvancedProfile = () => {
  const windowDimensions = getWindowDimensions();
  const renderPreview = windowDimensions.width >= 900;

  const appState = useSelector((state) => state);
  const { appLanguage, authenticated: loggedIn } = appState;
  const { b2bActiveTab, userInfo } = appState;
  const appLang = appLanguage === "VIETNAMESE" ? Vietnamese : English;
  const firstTabText =
    b2bActiveTab === 3
      ? appLang.editPage.button.landing
      : appLang.editPage.button.editProfile;
  const secondTabText =
    b2bActiveTab === 3
      ? appLang.editPage.button.manageProducts
      : appLang.editPage.button.manageLink;
  const { id } = useParams();
  const tabDefault = id ? parseInt(id) : 0;
  const [checkedTabValue, setCheckedTabValue] = useState(tabDefault);

  const handleChangeTab = (event, newValue) => {
    setCheckedTabValue(newValue);
  };

  let tab1 = <BasicInfo />;
  let tab2 = <SocialMediaList />;
  let tab3 = <CustomizeBackground />;

  if (b2bActiveTab === 2) {
    tab1 = <BasicInfoEnterprise />;
    tab2 = <EnterpriseInfo />;
  }

  if (b2bActiveTab === 3) {
    tab1 = <BasicInfoStore />;
    tab2 = <StoreProducts />;
    tab3 = <Orders />;
  }

  if (b2bActiveTab === 4) {
    tab1 = <BasicInfoGallery />;
  }

  if (loggedIn) {
    return (
      <div className={classes.EditProfile}>
        <Helmet>
          <title>
            {userInfo.fullName} | {appLang.tabTile}
          </title>
          <meta name="description" content={userInfo.bio} />
        </Helmet>
        <div className={classes.editProfileContainer}>
          <div className={classes.profileEditContainer}>
            <CopyLinkArea languageChosen={appLang} dataObject={appState} />
            <div className={classes.profileEditArea}>
              <div className={classes.profileTab}>
                <Paper square className={classes.tabPaper}>
                  <Tabs
                    variant="fullWidth"
                    value={checkedTabValue}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChangeTab}
                  >
                    <Tab className={classes.tabText} label={firstTabText} />
                    <Tab
                      className={classes.tabText + " " + classes.middleTab}
                      label={secondTabText}
                    />
                    {b2bActiveTab !== 3 && (
                      <Tab
                        className={classes.tabText}
                        label={appLang.customizePage.title}
                      />
                    )}
                    {b2bActiveTab === 3 && (
                      <Tab
                        className={classes.tabText}
                        label={appLang.customizePage.orders}
                      />
                    )}
                  </Tabs>
                </Paper>
              </div>
              {checkedTabValue === 0 && tab1}
              {checkedTabValue === 1 && tab2}
              {checkedTabValue === 2 && tab3}
            </div>
          </div>
          <div className={classes.profilePreviewArea}>
            {b2bActiveTab === 1 && renderPreview && <DesktopPreview />}
            {b2bActiveTab === 2 && renderPreview && <PreviewEnterprise />}
            {b2bActiveTab === 3 && renderPreview && <PreviewStore />}
            {b2bActiveTab === 4 && renderPreview && <PreviewGallery />}
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect from="/profile/advanced" to="/signin" />;
  }
};

export default AdvancedProfile;
