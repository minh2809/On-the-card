import React from "react";
import classes from "./LinkBox.module.css";

const NewLinkBox = (props) => {
  const { icon, content } = props;
  const { onClick } = props;

  return (
    <div className={classes.LinkBox} onClick={onClick}>
      <img className={classes.iconImg} src={icon} alt="" />
      <p className={classes.content}>{content}</p>
    </div>
  );
};

export default NewLinkBox;
