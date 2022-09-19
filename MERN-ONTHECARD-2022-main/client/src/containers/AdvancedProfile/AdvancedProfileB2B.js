import React, { useState } from "react";
import classes from "./AdvancedProfile.module.css";
import CopyLinkArea from "../../components/CopyLink/CopyLink";
import { useSelector } from "react-redux";
import { Vietnamese, English } from "../../language/language";
import AnalyticB2B from "../../components/Analytic/AnalyticB2B";
import PreviewEnterprise from "../../components/DesktopPreview/PreviewEnterprise";
import PreviewStore from "../../components/DesktopPreview/PreviewStore";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Redirect } from "react-router";

const AdvancedProfileB2B = () => {
  const appState = useSelector((state) => state);
  const { appLanguage, authenticated: loggedIn } = appState;
  const { storePage, enterprisePage } = appState;
  const { storeAnalytic, companyAnalytic } = appState.tempData;

  const appLang = appLanguage === "VIETNAMESE" ? Vietnamese : English;
  const businessTab = appLang.b2bText.businessTab;
  const storeTab = appLang.b2bText.storeTab;

  const [checkedTabValue, setCheckedTabValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setCheckedTabValue(newValue);
  };

  if (loggedIn) {
    return (
      <div className={classes.EditProfile}>
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
                    <Tab className={classes.tabText} label={businessTab} />
                    <Tab
                      className={classes.tabText + " " + classes.middleTab}
                      label={storeTab}
                    />
                  </Tabs>
                </Paper>
              </div>
              {checkedTabValue === 0 && (
                <AnalyticB2B
                  name={businessTab}
                  analyticData={companyAnalytic}
                  pageData={enterprisePage}
                />
              )}
              {checkedTabValue === 1 && (
                <AnalyticB2B
                  name={storeTab}
                  analyticData={storeAnalytic}
                  pageData={storePage}
                />
              )}
            </div>
          </div>
          <div className={classes.profilePreviewArea}>
            {checkedTabValue === 0 && <PreviewEnterprise />}
            {checkedTabValue === 1 && <PreviewStore />}
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect from="/profile/advanced" to="/signin" />;
  }
};

export default AdvancedProfileB2B;
