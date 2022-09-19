import React from "react";
import classes from "./Typography.module.css";

const Paragraph = (props) => {
  const { children, padding, fontSize, bold } = props;
  const { marginTop, marginBottom, marginRight, marginLeft } = props;
  const { cursorOn, onClick } = props;
  const { primary, danger, success } = props;

  const styleObject = {};
  const styleClass = [classes.paragraph];

  if (marginTop) styleObject.marginTop = marginTop;
  if (marginBottom) styleObject.marginBottom = marginBottom;
  if (marginRight) styleObject.marginRight = marginRight;
  if (marginLeft) styleObject.marginLeft = marginLeft;
  if (fontSize) styleObject.fontSize = fontSize;
  if (padding) styleObject.padding = padding;
  if (bold) styleObject.fontWeight = "600";
  if (cursorOn) styleObject.cursor = "pointer";

  if (primary) styleClass.push(classes.primary);
  if (danger) styleClass.push(classes.danger);
  if (success) styleClass.push(classes.success);

  return (
    <p style={styleObject} className={styleClass.join(" ")} onClick={onClick}>
      {children}
    </p>
  );
};

export default Paragraph;
