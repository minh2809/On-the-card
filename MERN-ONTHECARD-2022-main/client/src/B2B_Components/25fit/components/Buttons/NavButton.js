import React from "react";
import classes from "./Buttons.module.css";

export default function NavButton(props) {
  return (
    <div className={classes.navButton} onClick={props.onClick}>
      {props.children}
    </div>
  );
}
