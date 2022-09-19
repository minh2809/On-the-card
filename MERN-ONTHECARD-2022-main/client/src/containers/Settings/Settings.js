import React, { useState } from "react";
import classes from "./Setting.module.css";
import YourPage from "./YourPage";
import YourAccount from "./YourAccount";
import ModalExplain from "../../components/UI/Modal/ConfirmModal/ConfirmModal";
import BackDrop from "../../components/UI/Backdrop/BackDropClose";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router";

const Settings = () => {
  const [titleMessage, setTitleMessage] = useState("");
  const [explainMessage, setExplainMessage] = useState("");
  const { appLang, userInfo, authenticated } = useSelector((state) => state);

  const condtion = titleMessage !== "" && explainMessage !== "";
  const history = useHistory();

  const openModal = (title, message) => {
    setTitleMessage(title);
    setExplainMessage(message);
  };

  const closeModal = () => {
    setTitleMessage("");
    setExplainMessage("");
  };

  const returnToProfile = () => history.push("/profile");

  if (authenticated) {
    return (
      <div className={classes.wrapper}>
        <button className={classes.returnButton} onClick={returnToProfile}>
          <i className="fas fa-angle-double-left"></i>{" "}
          {appLang.settings.returnToProfile}
        </button>
        <div className={classes.settingContainer}>
          <h3 className={classes.title}>
            {" "}
            <i className="fas fa-user-cog"></i>{" "}
            {appLang.settings.settingTitle + userInfo.fullName}
          </h3>
          <hr className={classes.mainDivider} />
          <YourPage openExplain={openModal} />
          <hr className={classes.mainDivider} />
          <YourAccount openExplain={openModal} />
        </div>
        {condtion && (
          <ModalExplain
            title={titleMessage}
            subtext={explainMessage}
            closeText={appLang.profile.button.close}
            close={closeModal}
          />
        )}
        {condtion && <BackDrop show closeModal={closeModal} />}
      </div>
    );
  } else {
    return <Redirect from="/profile/settings" to="/signin" />;
  }
};

export default Settings;
