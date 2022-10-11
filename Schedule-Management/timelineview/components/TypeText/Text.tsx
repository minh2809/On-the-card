import React from "react";
import classes from "./Text.module.scss";

type TitleProps = {
  children: string | JSX.Element;
};

function Text({ children }: TitleProps) {
  return <h5 className={classes.text}>{children}</h5>;
}

export default Text;
