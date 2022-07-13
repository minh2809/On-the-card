import React from "react";
import classes from "./ImageSection.module.css";

const Image = (props) => {
  const { height, width, absolute, relative } = props;
  const { top, right, left, bottom } = props;

  const imgClasses = [classes.image_sec];
  const styleObject = {};


  if (top) styleObject.top = top;
  if (left) styleObject.left = left;
  if (right) styleObject.right = right;
  if (bottom) styleObject.bottom = bottom;
  if (height) styleObject.height = height;
  if (width) styleObject.width = width;

  if (absolute) imgClasses.push(classes.absolute)
  if (relative) imgClasses.push(classes.relative)

  return (
    <img src={props.image} alt="#" style={styleObject} className={imgClasses.join(" ")}></img>
  );
};

export default Image;