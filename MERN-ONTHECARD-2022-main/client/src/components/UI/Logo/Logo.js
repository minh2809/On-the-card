import React from "react";
import classes from "./Logo.module.css";
import {
  detectNoBlackTextColor,
  detectNoWhiteTextDark,
} from "../../../utilities/helper_functions";
import stickerVerified from "../../../assets/other/verified.png";
import { useSelector } from "react-redux";

const Logo = (props) => {
  const { userInformation, content, noBgImg } = props;
  const { backgroundColorStyle, backgroundColorObject } = userInformation;
  const noBlackTextColorStyle = detectNoBlackTextColor(backgroundColorObject);
  const noWhiteTextDarkStyle = detectNoWhiteTextDark(backgroundColorObject);
  const { isVerified } = useSelector((state) => state.userInfo);

  return (
    <div className={classes.logo}>
      <p
        style={{
          color: noBgImg
            ? "#000"
            : backgroundColorStyle === "Dark" && !noWhiteTextDarkStyle
            ? "#fff"
            : backgroundColorStyle === "Color" && noBlackTextColorStyle
            ? "#fff"
            : "#000",
        }}
        className={classes.username}
      >
        {content}
        <img src={(isVerified && stickerVerified) || ""} alt="" />
      </p>
    </div>
  );
};

export default Logo;
