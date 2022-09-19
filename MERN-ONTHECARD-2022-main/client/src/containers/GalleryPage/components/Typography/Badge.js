import React from "react";
import classes from "./Typography.module.css";

const Badge = (props) => {
  const { children, padding, fontSize } = props;
  const { marginTop, marginBottom, marginRight, marginLeft } = props;
  const { bgSuccess, bgDanger, bgInfo } = props;

  const styleObject = {};
  const styleClass = [classes.badge];

  if (marginTop) styleObject.marginTop = marginTop;
  if (marginBottom) styleObject.marginBottom = marginBottom;
  if (marginRight) styleObject.marginRight = marginRight;
  if (marginLeft) styleObject.marginLeft = marginLeft;
  if (fontSize) styleObject.fontSize = fontSize;
  if (padding) styleObject.padding = padding;

  if (bgSuccess) styleClass.push(classes.bgSuccess);
  if (bgDanger) styleClass.push(classes.bgDanger);
  if (bgInfo) styleClass.push(classes.bgInfo);

  return (
    <p style={styleObject} className={styleClass.join(" ")}>
      {children}
    </p>
  );
};

export default Badge;
