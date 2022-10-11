import React from "react";
import classes from "./DateContainer.module.scss";
import Date from "../../components/Date/Date";
import Days from "../../components/Days/Days";

function DateContainer() {
  return (
    <div className={classes.container}>
      <Date>Tuesday</Date>
      <Days> 24th</Days>
    </div>
  );
}

export default DateContainer;
