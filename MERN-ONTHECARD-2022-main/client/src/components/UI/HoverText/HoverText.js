import React from "react";
import classes from "./HoverText.module.css";

const hoverText = (props) => {
  const cssClasses = [classes.a];
  props.path === "/retrieve" && cssClasses.push(classes.forgotPass);
  return (
    <a href={props.path} className={cssClasses.join(" ")}>
      {props.innerText}
    </a>
  );
};

export default hoverText;
