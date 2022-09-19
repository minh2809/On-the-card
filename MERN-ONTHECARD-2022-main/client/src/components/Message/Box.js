import React from "react";
import classes from "./Message.module.css";
import otc from "../../assets/otc.jpeg";
import { getVNTime, getCATime } from "../../utilities/analytic_helper";
import { useSelector } from "react-redux";

const Box = ({ messageData, appLang, onClick, image, order }) => {
  const { appLanguage } = useSelector((state) => state);
  const { dayInWeek } = appLang;
  const { createdAt, isRead } = messageData;
  const dateObject =
    appLanguage === "VIETNAMESE"
      ? getVNTime(createdAt, dayInWeek)
      : getCATime(createdAt, dayInWeek);
  const { date, weekDay, timeInDay } = dateObject;

  let boxStyle;
  let msgContainer;
  const titleOrder = `${appLang.b2bText.titleOrder}${messageData.orderData.orderNumber}`;
  const orderDesc = `${appLang.b2bText.orderDesc} ${messageData.fullName}`;

  if (isRead) {
    boxStyle = [classes.box];
    msgContainer = [classes.messageContainer];
  } else {
    boxStyle = [classes.box, classes.isNotRead];
    msgContainer = [classes.messageContainer, classes.isNotReadMessage];
  }

  return (
    <div className={boxStyle.join(" ")} onClick={() => onClick(messageData)}>
      <img
        className={classes.icon}
        src={image ? image : otc}
        alt=""
        onError={(event) => {
          event.target.src = image ? image : otc;
        }}
      />
      <div className={msgContainer.join(" ")}>
        <h3>{order ? titleOrder : messageData.fullName}</h3>
        <p className={classes.date}>
          {weekDay}, {date}, {timeInDay}
        </p>
        <p className={classes.messageText}>
          {order ? orderDesc : messageData.message}
        </p>
      </div>
    </div>
  );
};

export default Box;
