import React, { useState, useEffect } from "react";
import classes from "../CustomizeBackground.module.css";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { useDispatch, useSelector } from "react-redux";
import { setBgColorStore } from "../../../store/actionCreators";
import {
  getColorList,
  getCorrectColor,
  getColorObjectWithStyle,
} from "../../../utilities/helper_functions";

const ColorOptionsStore = ({ Vietnamese, English }) => {
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState("");
  const { storePage, appLanguage } = useSelector((state) => state);
  const { backgroundColor: currentBgColor, backgroundColorStyle } = storePage;

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
      dispatch(setBgColorStore(currentBgColor, currentColorObj));
      setSelectedColor(currentColorObj.default);
    }
    setStyleBackground(backgroundColorStyle);
  }, [dispatch, backgroundColorStyle, currentBgColor]);

  const handleSelectColor = (color) => () => {
    const correctColor = getCorrectColor(color.default, styleBackground);
    setSelectedColor(correctColor);
    dispatch(setBgColorStore(correctColor, color));
  };

  return (
    <div className={classes.colorSection}>
      <div className={classes.label}>{customizePage.colorSection}</div>
      <div className={classes.optionBox}>
        <GridList cellHeight={50} cols={8}>
          {colorList.map((color, index) => (
            <GridListTile key={index} cols={1}>
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
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
};

export default ColorOptionsStore;
