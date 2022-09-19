import React from "react";
import classes from "./Analytic.module.css";
import { useSelector } from "react-redux";
import { Vietnamese, English } from "../../language/language";

const Box = ({ title, count }) => {
  const { appLanguage } = useSelector((state) => state);
  const appLang = appLanguage === "VIETNAMESE" ? Vietnamese : English;
  return (
    <div className={classes.box}>
      <p>
        <i className="fas fa-chart-bar"></i> {title}:
      </p>
      <p>
        {count} {appLang.analytic.count}
      </p>
    </div>
  );
};

export default Box;
