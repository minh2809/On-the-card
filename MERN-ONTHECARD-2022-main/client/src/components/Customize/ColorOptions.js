import React, { useState, useEffect } from "react";
import classes from "./CustomizeBackground.module.css";
import { ImageList } from "@material-ui/core";
import ImageListItem from "@material-ui/core/ImageListItem";
import { useDispatch, useSelector } from "react-redux";
import { setBackgroundColor } from "../../store/actionCreators";
import {
  getColorList,
  getCorrectColor,
  getColorObjectWithStyle,
} from "../../utilities/helper_functions";

const ColorOptions = ({ Vietnamese, English }) => {
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState("");
  const { userInfo, appLanguage } = useSelector((state) => state);
  const { backgroundColor: currentBgColor, backgroundColorStyle } = userInfo;
  const [styleBackground, setStyleBackground] = useState(backgroundColorStyle);

  const colorList = getColorList();

  const appliedLanguage = appLanguage === "ENGLISH" ? English : Vietnamese;
  const { customizePage } = appliedLanguage;

  useEffect(() => {
    const currentColorObj = getColorObjectWithStyle(
      currentBgColor,
      backgroundColorStyle
    );
    if (currentColorObj) {
      dispatch(setBackgroundColor(currentBgColor, currentColorObj));
      setSelectedColor(currentColorObj.default);
    }
    setStyleBackground(backgroundColorStyle);
  }, [dispatch, backgroundColorStyle, currentBgColor]);

  const handleSelectColor = (color) => () => {
    const correctColor = getCorrectColor(color.default, styleBackground);
    setSelectedColor(correctColor);
    dispatch(setBackgroundColor(correctColor, color));
  };

  return (
    <div className={classes.colorSection}>
      <div className={classes.label}>{customizePage.colorSection}</div>
      <div className={classes.optionBox}>
        <ImageList rowHeight={50} cols={8}>
          {colorList.map((color, index) => (
            <ImageListItem key={index} cols={1}>
              <div
                style={
                  selectedColor === color.default
                    ? { border: "3px solid #4aaee8" }
                    : { border: "3px solid #fff" }
                }
                className={classes.colorCircleArea}
              >
                <div
                  style={{ backgroundColor: color.default }}
                  className={classes.colorCircle}
                  onClick={handleSelectColor(color)}
                ></div>
              </div>
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
};

export default ColorOptions;
