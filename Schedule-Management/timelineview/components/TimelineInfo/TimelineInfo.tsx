import React, { useState } from "react";
import classes from "./TimelineInfo.module.scss";
import TypeText from "../TypeText/Text";
import SubjectText from "../SubjectText/Text";
import Image from "next/image";
import avatar from "../../public/assets/Frame 7793.png";

type PropsType = {
  children?: string | JSX.Element;
  para1: string | JSX.Element;
  para2: string | JSX.Element;
  para3: string | JSX.Element;
  onClick?: () => void;
};

function TimelineContainerInfo(props: PropsType) {
  const [hourClass, setHourClass] = useState([classes.hour]);
  const [show, setShow] = useState(true);

  const activate = () => {
    if (hourClass.length === 1) {
      setHourClass([classes.hour, classes.hour_active]);
    } else if (hourClass.length > 1) {
      setHourClass([classes.hour]);
    }
  };

  const toggleActive = () => {
    activate();
    setShow(!show);
  };

  return (
    <div className={classes.infoContainer}>
      <h5 className={hourClass.join(" ")}>{props.para3}</h5>
      <div className={classes.container} onClick={toggleActive}>
        {show ? null : <div className={classes.verticalLine}></div>}
        <div className={classes.textContainer}>
          <div className={classes.text}>
            <div className={classes.subText}>Type</div>
            <TypeText>{props.para1}</TypeText>
          </div>
          <div className={classes.text}>
            <div className={classes.subText}>Subject</div>
            <SubjectText>{props.para2}</SubjectText>
          </div>
        </div>
        <div className={classes.avatar}>
          <Image src={avatar} alt="" />
        </div>
        <div className={classes.arrowContainer}>
          <i className={classes.arrowRight}></i>
        </div>
      </div>
    </div>
  );
}

export default TimelineContainerInfo;
