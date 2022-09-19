import React from "react";
import { loadIcons, loadBank } from "../../utilities/load_icons";
import classes from "./Analytic.module.css";
import { useSelector } from "react-redux";
import { Vietnamese, English } from "../../language/language";

const LinkBox = ({ data }) => {
  const { icon, title, clickCount } = data;
  const condition = icon.includes("bank");
  const condition1 = icon.includes("https");
  const condition2 = icon === "url";
  const { appLanguage } = useSelector((state) => state);
  const appLang = appLanguage === "VIETNAMESE" ? Vietnamese : English;

  return (
    <div className={classes.LinkBox}>
      {condition ? (
        <img className={classes.imgBank} src={loadBank(title)} alt="" />
      ) : condition1 ? (
        <img
          className={classes.imgRound}
          src={icon}
          alt=""
          onError={(event) => {
            event.target.src = icon;
          }}
        />
      ) : condition2 ? null : (
        <img className={classes.imgOther} src={loadIcons(icon)} alt="" />
      )}
      <p>{title}</p>
      <p className={classes.count}>
        {clickCount} {appLang.analytic.click}
      </p>
    </div>
  );
};

export default LinkBox;
