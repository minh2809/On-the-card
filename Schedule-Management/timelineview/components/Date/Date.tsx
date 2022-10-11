import React from "react";
import classes from "./Date.module.scss";

type TitleProps = {
  children: string;
};

function Date({ children }: TitleProps) {
  return <h1 className={classes.Date}>{children}</h1>;
}

export default Date;
