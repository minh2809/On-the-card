import React, { useState, useEffect } from "react";
import classes from "../CustomizeBackground.module.css";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { useDispatch, useSelector } from "react-redux";
import { setBGColorStyleEnter } from "../../../store/actionCreators";
import { getCorrectColor } from "../../../utilities/helper_functions";

const StyleOptionEnterprise = ({ Vietnamese, English }) => {
  const { appLanguage, enterprisePage } = useSelector((state) => state);
  const { backgroundColorObject, backgroundColor } = enterprisePage;
  const [selectedColor, setSelectedColor] = useState(backgroundColor);
  const [selectedColorStyle, setSelectedColorStyle] = useState("Color");
  const colorStyleList = ["Light", "Color", "Dark"];
  const dispatch = useDispatch();
  const {
    backgroundColor: currentBgColor,
    backgroundColorStyle: currentBgStyle,
  } = enterprisePage;
  const appliedLanguage = appLanguage === "ENGLISH" ? English : Vietnamese;
  const { customizePage } = appliedLanguage;

  useEffect(() => {
    const bgColor = currentBgColor || "#fff";
    const bgStyle = currentBgStyle || "Color";
    if (currentBgColor && currentBgStyle) {
      dispatch(setBGColorStyleEnter(currentBgColor, currentBgStyle));
      setSelectedColorStyle(currentBgStyle);
    } else {
      dispatch(setBGColorStyleEnter(bgColor, bgStyle));
      setSelectedColorStyle(bgStyle);
    }
    setSelectedColor(backgroundColor);
  }, [dispatch, backgroundColor, currentBgColor, currentBgStyle]);

  const handleSelectColorStyle = (colorStyle) => () => {
    const correctColor = getCorrectColor(
      backgroundColorObject.default,
      colorStyle
    );
    setSelectedColorStyle(colorStyle);
    dispatch(setBGColorStyleEnter(correctColor, colorStyle));
  };

  return (
    <div className={classes.colorSection}>
      <div className={classes.optionBox}>
        <div className={classes.label}>{customizePage.style}</div>
        <GridList cellHeight={90} cols={3}>
          {colorStyleList.map((colorStyle, index) => (
            <GridListTile key={index} cols={1}>
              <div
                style={{
                  border:
                    selectedColorStyle === colorStyle
                      ? "3px solid #2960ED"
                      : null,
                }}
                className={classes.colorStyleOutline}
                onClick={handleSelectColorStyle(colorStyle)}
              >
                <div
                  style={{
                    border:
                      selectedColor === "#fff"
                        ? "1px solid #c7c7c7"
                        : selectedColor,
                  }}
                  className={classes.colorStyleInline}
                >
                  <div
                    style={{
                      backgroundColor: !backgroundColorObject
                        ? "#fff"
                        : index === 0
                        ? backgroundColorObject.light
                        : index === 1
                        ? backgroundColorObject.default
                        : index === 2
                        ? backgroundColorObject.dark
                        : "#fff",
                    }}
                    className={classes.styleTriangle}
                  ></div>
                </div>
              </div>
              <p
                style={
                  {
                    // color:
                    //   selectedColorStyle === colorStyle ? "#4aaee8" : "#000000",
                    //   fontWeight: selectedColorStyle === colorStyle && "900",
                  }
                }
                className={classes.styleText}
              >
                {index === 0
                  ? customizePage.light
                  : index === 1
                  ? customizePage.color
                  : index === 2
                  ? customizePage.dark
                  : "Color"}
              </p>
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
};

export default StyleOptionEnterprise;
