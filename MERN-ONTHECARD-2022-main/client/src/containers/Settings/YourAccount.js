import React from "react";
import classes from "./Setting.module.css";
import { useSelector } from "react-redux";
import ChangePW from "./SettingOptions/ChangePW";

const YourAccount = () => {
  const { appLang } = useSelector((state) => state);

  return (
    <div className={classes.yourAccountWrapper}>
      <h3 className={classes.yourPageAccountTitle}>
        <i className="fas fa-user"></i> {appLang.settings.yourAccount}
      </h3>
      <div className={classes.yourPageOptionsContainer}>
        <ChangePW />
      </div>
    </div>
  );
};

export default YourAccount;
