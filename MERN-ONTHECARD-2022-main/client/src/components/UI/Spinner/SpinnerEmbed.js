import React from "react";
import classes from "./SpinnerEmbed.module.css";

const SpinnerEmbed = ({ small }) => {
  return <div className={small ? classes.small : classes.loader}></div>;
};

export default SpinnerEmbed;
