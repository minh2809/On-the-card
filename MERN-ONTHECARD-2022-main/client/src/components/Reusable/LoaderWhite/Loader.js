import React from "react";
import classes from "./Loader.module.css";

// White Loader, Black Background
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
