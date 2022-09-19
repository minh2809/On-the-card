import React from "react";
import classes from "./Setting.module.css";
import DeactivatePage from "./SettingOptions/DeactivatePage";
import PINCode from "./SettingOptions/PINCode";
import { useSelector } from "react-redux";

const YourPage = ({ openExplain }) => {
  const { appLang } = useSelector((state) => state);

  return (
    <div className={classes.yourPageWrapper}>
      <h3 className={classes.yourPageAccountTitle}>
        <i className="fas fa-cog"></i> {appLang.settings.yourPage}
      </h3>
      <div className={classes.yourPageOptionsContainer}>
        <DeactivatePage openExplain={openExplain} />
        <hr className={classes.optionDivider} />
        <PINCode openExplain={openExplain} />
      </div>
    </div>
  );
};

export default YourPage;
