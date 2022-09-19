import React from "react";
import classes from "./StoreHeader.module.css";
import { useSelector } from "react-redux";
import { isPandora } from "../../../../utilities/helper2";
import { findNewLine } from "../../../../utilities/string_manipulation";

const StoreHearder = (props) => {
  const { avatar, userInfo } = props;
  const { company } = useSelector((state) => state.userInfo);
  const imgStyle = [classes.imageStyle];
  // const { buttonShow, viewPage, mobilePreview } = props;
  // const {currentBackground} = props;
  const renderBio = [];

  const bioArray = findNewLine(userInfo.bio);

  bioArray.forEach((value, index) => {
    const pStyle = { marginTop: "3px", marginBottom: "3px" };
    renderBio.push(
      <p style={pStyle} key={index}>
        {value}
      </p>
    );
  });

  if (isPandora(company)) {
    imgStyle.push(classes.noOpacity);
  }

  return (
    <div className={classes.container}>
      <img
        src={avatar}
        alt=""
        className={imgStyle.join(" ")}
        onError={(event) => {
          event.target.src = avatar;
        }}
      />
      <div className={classes.textContainer}>
        <h2>{userInfo.name}</h2>
        {renderBio}
      </div>
    </div>
  );
};

export default StoreHearder;
