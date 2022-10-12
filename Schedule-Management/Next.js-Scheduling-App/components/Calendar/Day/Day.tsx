import React from "react";
import classes from "./Day.module.scss";

type PropsType = {
  onClick: () => void;
  day: any;
};

const Day = ({ day, onClick }: PropsType) => {
  const className = `day ${day.value === "padding" ? "padding" : ""} ${
    day.isCurrentDay ? "currentDay" : ""
  }`;
  return (
    <div onClick={onClick} className={classes.a}>
      {day.value === "padding" ? "" : day.value}

      {day.event && <div className={classes.event}>{day.event.title}</div>}
    </div>
  );
};

export default Day;
