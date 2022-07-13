import React from "react";
import classes from "./text.module.css";

const Text = (props) => {
  const { content, lineHeight, fontSize, fontWeight } = props
  const {  blue, black,  white, grey } = props;
  const {  red,  green,  height, width } = props;
  const { marginTop, marginBottom, marginRight, marginLeft} = props;
  const { top, right, left , bottom, position} = props;

  const textClasses = [classes.text];
  const styleObject = {};

  if (blue) textClasses.push(classes.blue);
  if (white) textClasses.push(classes.white);
  if (green) textClasses.push(classes.green);
  if (red) textClasses.push(classes.red);
  if (black) textClasses.push(classes.black);
  if (grey) textClasses.push(classes.grey);

 

  if (marginTop) styleObject.marginTop = marginTop;
  if (marginBottom) styleObject.marginBottom = marginBottom;
  if (marginRight) styleObject.marginRight = marginRight;
  if (marginLeft) styleObject.marginLeft = marginLeft;
  if (marginRight) styleObject.marginRight = marginRight;
  
  if (height) styleObject.height = height;
  if (width) styleObject.width = width;
  if (lineHeight) styleObject.lineHeight = lineHeight;
  if (fontSize) styleObject.fontSize = fontSize;
  if (fontWeight) styleObject.fontWeight = fontWeight;

  if (top) styleObject.top = top;
  if (right) styleObject.right = right;
  if (left) styleObject.left = left;
  if (bottom) styleObject.bottom = bottom;
  if (position) styleObject.position = position;




  return (
    <div style={styleObject} className={textClasses.join(" ")}>
      {content}
    </div>
  );
};

export default Text;