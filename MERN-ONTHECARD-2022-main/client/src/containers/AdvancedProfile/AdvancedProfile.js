import React, { useState } from "react";
import classes from "./AdvancedProfile.module.css";
import CopyLinkArea from "../../components/CopyLink/CopyLink";
import { useSelector } from "react-redux";
import { Vietnamese, English } from "../../language/language";
import Analytic from "../../components/Analytic/Analytic";
import Message from "../../components/Message/Message";
import DesktopPreviewMedia from "../../components/DesktopPreview/DesktopPreview";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Redirect } from "react-router";
import { useParams } from "react-router-dom";

const AdvancedProfile = () => {
  const appState = useSelector((state) => state);
  const { appLanguage, authenticated: loggedIn } = appState;
  const appLang = appLanguage === "VIETNAMESE" ? Vietnamese : English;
  const { id } = useParams();

  const [checkedTabValue, setCheckedTabValue] = useState(parseInt(id));

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
                    <Tab
                      className={classes.tabText}
                      label={appLang.editPage.button.analytic}
                    />
                    <Tab
                      className={classes.tabText + " " + classes.middleTab}
                      label={appLang.editPage.button.message}
                    />
                    {/* <Tab
                      className={classes.tabText}
                      label={appLang.editPage.button.comingSoon}
                    /> */}
                  </Tabs>
                </Paper>
              </div>
              {checkedTabValue === 0 && <Analytic />}
              {checkedTabValue === 1 && <Message />}
              {/* {checkedTabValue === 2 && <Analytic />} */}
            </div>
          </div>
          <div className={classes.profilePreviewArea}>
            <DesktopPreviewMedia />
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect from="/profile/advanced" to="/signin" />;
  }
};

export default AdvancedProfile;
