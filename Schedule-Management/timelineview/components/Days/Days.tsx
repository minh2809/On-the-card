import React from "react";
import classes from "./Days.module.scss";

type TitleProps = {
  children: string | JSX.Element;
};

function Days({ children }: TitleProps) {
  return <h5 className={classes.days}>{children}</h5>;
}

export default Days;
