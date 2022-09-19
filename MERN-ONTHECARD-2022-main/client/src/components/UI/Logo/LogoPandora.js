import React from "react";
import classes from "./Logo.module.css";
import stickerVerified from "../../../assets/other/verified.png";
import pandoraLogo from "../../../assets/B2B/Pandora/logo.png";

const LogoPandora = () => {
  return (
    <div className={classes.pandoraContainer}>
      <img className={classes.pandoraLogo} src={pandoraLogo} alt="" />
      <img src={stickerVerified} className={classes.verifiedPandora} alt="" />
    </div>
  );
};

export default LogoPandora;
