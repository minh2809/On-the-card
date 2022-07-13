import React from "react";
import classes from "./link.module.css";

const Link = (props) => {
  const { content, lineHeight, fontSize, fontWeight } = props
  const {  blue, black,  white, grey } = props;
  const {  red,  green,  height, width, textDecoration} = props;
  const { marginTop, marginBottom, marginRight, marginLeft} = props;
  const { top, right, left , bottom, position} = props;

  const linkClasses = [classes.link];
  const styleObject = {};

  if (blue) linkClasses.push(classes.blue);
  if (white) linkClasses.push(classes.white);
  if (green) linkClasses.push(classes.green);
  if (red) linkClasses.push(classes.red);
  if (black) linkClasses.push(classes.black);
  if (grey) linkClasses.push(classes.grey);

 

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
  if (textDecoration) styleObject.textDecoration = textDecoration;
  
  if (top) styleObject.top = top;
  if (right) styleObject.right = right;
  if (left) styleObject.left = left;
  if (bottom) styleObject.bottom = bottom;
  if (position) styleObject.position = position;




  return (
    <div >
      <a href="website" style={styleObject} className={linkClasses.join(" ")}>{content}</a>
    </div>
  );
};

export default Link;