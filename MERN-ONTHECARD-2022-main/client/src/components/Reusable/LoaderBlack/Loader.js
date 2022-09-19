import React from "react";
import classes from "./Loader.module.css";

// Black Loader, White BackGround
const Loader = () => {
  return (
    <div className={classes.container}>
      <div className={classes.ldsSpinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
