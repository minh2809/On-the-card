import React from "react";
import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={classes.body}>
      <div className={classes.circleLoad}>
        <div className={classes.innerLoad}></div>
      </div>
      <h1>N</h1>
    </div>
  );
};

export default Loader;
