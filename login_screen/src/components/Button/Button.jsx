import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  const { children, blue, glow, black, warning, white } = props;
  const { onClick, red, borderWhite, green, borderGrey, height, width } = props;
  const { marginTop, marginBottom, marginRight, marginLeft, flex } = props;
  const { top, left, right , bottom, position } = props;

  const btnClasses = [classes.button];
  const styleObject = {};

  if (blue) btnClasses.push(classes.blue);
  if (white) btnClasses.push(classes.white);
  if (green) btnClasses.push(classes.green);
  if (red) btnClasses.push(classes.red);
  if (black) btnClasses.push(classes.black);
  if (warning) btnClasses.push(classes.warning);
  if (glow) btnClasses.push(classes.glow);

  if (marginTop) styleObject.marginTop = marginTop;
  if (marginBottom) styleObject.marginBottom = marginBottom;
  if (marginRight) styleObject.marginRight = marginRight;
  if (marginLeft) styleObject.marginLeft = marginLeft;
  if (marginRight) styleObject.marginRight = marginRight;
  if (flex) btnClasses.push(classes.flex);
  if (height) styleObject.height = height;
  if (width) styleObject.width = width;

  if (borderWhite) btnClasses.push(classes.borderWhite);
  if (borderGrey) btnClasses.push(classes.borderGrey);

  if (top) styleObject.top = top;
  if (right) styleObject.right = right;
  if (left) styleObject.left = left;
  if (bottom) styleObject.bottom = bottom;
  if (position) styleObject.position = position;

  return (
    <button
      style={styleObject}
      onClick={onClick}
      className={btnClasses.join(" ")}
    >
      {children}
    </button>
  );
};

export default Button;