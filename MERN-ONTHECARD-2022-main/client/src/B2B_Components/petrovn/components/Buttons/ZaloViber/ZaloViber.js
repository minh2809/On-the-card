import React from "react";
import classes from "./ZaloViber.module.css";
import viberLogo from "../../../../../assets/B2B/petrovn/viber.svg";
import zaloLogo from "../../../../../assets/B2B/petrovn/zalo.svg";

export default function ZaloViber({ socialMediaList }) {
  return (
    <div className={classes.zaloViber}>
      <img
        src={viberLogo}
        alt=""
        onClick={() => window.open(socialMediaList[3].url)}
      />
      <img
        src={zaloLogo}
        alt=""
        onClick={() => window.open(socialMediaList[2].url)}
      />
    </div>
  );
}
