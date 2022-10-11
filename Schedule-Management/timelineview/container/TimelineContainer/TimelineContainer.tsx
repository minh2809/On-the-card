import React, { useState } from "react";
import classes from "./TimelineContainer.module.scss";
import DateContainer from "../DateContainer/DateContainer";
import TimelineContainerInfo from "../../components/TimelineInfo/TimelineInfo";

function TimelineContainer() {
  const [hour1Class, setHour1Class] = useState([classes.dot]);
  const [hour2Class, setHour2Class] = useState([classes.dot]);

  const activate1 = () => {
    if (hour1Class.length === 1) {
      setHour1Class([classes.dot, classes.dot_active]);
    } else if (hour1Class.length > 1) {
      setHour1Class([classes.dot]);
    }
  };
  const activate2 = () => {
    if (hour2Class.length === 1) {
      setHour2Class([classes.dot, classes.dot_active]);
    } else if (hour2Class.length > 1) {
      setHour2Class([classes.dot]);
    }
  };

  return (
    <div className={classes.container}>
      <DateContainer />
      <TimelineContainerInfo
        para1={"Primary task"}
        para2={"Accounts and tax"}
        para3={"09:23 ●"}
      />
      <TimelineContainerInfo
        para1={"Secondary task"}
        para2={"Bussiness plans"}
        para3={"10:20 ●"}
      />
      <TimelineContainerInfo
        para1={"Additional task"}
        para2={"Risk analysis"}
        para3={"11:35 ●"}
      />
    </div>
  );
}

export default TimelineContainer;
