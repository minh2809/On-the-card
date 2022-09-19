import React from "react";
import line from "../../../../assets/B2B/petrovn/LINE.svg";
import classes from "./Footer.module.css";

export default function Footer({ socialMediaList }) {
  return (
    <img
      className={classes.footer}
      src={line}
      alt=""
      onClick={() => window.open(socialMediaList[3].url)}
    />
  );
}
