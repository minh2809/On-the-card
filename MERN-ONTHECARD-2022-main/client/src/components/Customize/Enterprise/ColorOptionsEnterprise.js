import React, { useState, useEffect } from "react";
import classes from "../CustomizeBackground.module.css";
import GridList from "@material-ui/core/GridList";
import ImageListItem from "@material-ui/core/ImageListItem";
import { useDispatch, useSelector } from "react-redux";
import { setBgColorEnterprise } from "../../../store/actionCreators";
import {
  getColorList,
  getCorrectColor,
  getColorObjectWithStyle,
} from "../../../utilities/helper_functions";

const ColorOptionsEnterprise = ({ Vietnamese, English }) => {
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState("");
  const { enterprisePage, appLanguage } = useSelector((state) => state);
  const {
    backgroundColor: currentBgColor,
    backgroundColorStyle,
  } = enterprisePage;
  const [styleBackground, setStyleBackground] = useState(backgroundColorStyle);
  const colorList = getColorList();

  const appliedLanguage = appLanguage === "ENGLISH" ? English : Vietnamese;
  const { customizePage } = appliedLanguage;

  useEffect(() => {
    const currentColorObj = getColorObjectWithStyle(
      currentBgColor,
      backgroundColorStyle
    );
    console.log(currentColorObj);
    if (currentColorObj) {
      dispatch(setBgColorEnterprise(currentBgColor, currentColorObj));
      setSelectedColor(currentColorObj.default);
    }
    setStyleBackground(backgroundColorStyle);
  }, [dispatch, backgroundColorStyle, currentBgColor]);

  const handleSelectColor = (color) => () => {
    const correctColor = getCorrectColor(color.default, styleBackground);
    setSelectedColor(correctColor);
    dispatch(setBgColorEnterprise(correctColor, color));
  };

  return (
    <div className={classes.colorSection}>
      <div className={classes.label}>{customizePage.colorSection}</div>
      <div className={classes.optionBox}>
        <GridList cellHeight={50} cols={8}>
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
        </GridList>
      </div>
    </div>
  );
};

export default ColorOptionsEnterprise;
