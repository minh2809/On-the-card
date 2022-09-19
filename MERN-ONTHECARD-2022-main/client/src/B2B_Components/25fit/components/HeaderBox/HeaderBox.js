import React from "react";
import classes from "./HeaderBox.module.css";
import {
  detectNoBlackTextColor,
  detectNoWhiteTextDark,
} from "../../../../utilities/helper_functions";
import { findNewLine } from "../../../../utilities/string_manipulation";
import { useSelector } from "react-redux";

const HeaderBox = (props) => {
  const { avatar } = props;
  const { userInfo } = props;
  const { userFullName, userBio } = props;

  const { backgroundColorStyle, backgroundColorObject } = userInfo;
  const { appLang } = useSelector((state) => state);

  let bioClass = [classes.bio];
  const noBlackTextColorStyle = detectNoBlackTextColor(backgroundColorObject);
  const noWhiteTextDarkStyle = detectNoWhiteTextDark(backgroundColorObject);
  const condition1 = backgroundColorStyle === "Dark" && !noWhiteTextDarkStyle;
  const condition2 = backgroundColorStyle === "Color" && noBlackTextColorStyle;
  const renderBio = [];

  const stringArray = findNewLine(userBio);

  stringArray.forEach((value, index) => {
    if (value === "") {
      renderBio.push(<br key={index} />);
    } else {
      renderBio.push(
        <p
          key={index}
          style={{
            color: condition1 ? "#fff" : condition2 ? "#fff" : "#42444A",
          }}
          className={bioClass.join(" ")}
        >
          {value === appLang.profile.text.yourInfo ? "" : value}
        </p>
      );
    }
  });

  return (
    <div className={classes.HeaderBox}>
      <img
        src={avatar}
        alt="avatar"
        className={classes.HeaderBoxImg}
        onError={(event) => {
          event.target.src = avatar;
        }}
      />

      <div className={classes.fullNameContainer}>
        <p>{userFullName.toUpperCase()}</p>
      </div>

      <div className={classes.bioContainer}>{renderBio}</div>
    </div>
  );
};

export default HeaderBox;
