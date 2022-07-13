import React from "react";
import classes from "./CheckBox.module.css";

function CheckBox() {
  return (
    <div className={classes.checkbox}>
        <label className={classes.main}>
            <input  type="checkbox" />
            <span ></span>
        </label>
        <span className={classes.rememberme}>Ghi nhớ tôi</span>
        
    </div>
  );
}

export default CheckBox;