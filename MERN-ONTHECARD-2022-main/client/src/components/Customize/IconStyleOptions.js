import React, { useState, useEffect } from "react";
import classes from "./CustomizeBackground.module.css";
import { ImageList } from "@material-ui/core";
import { ImageListItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import LightItemBg from "../../assets/edit-profile/Rectangle 39.png";
import { setIconStyle } from "../../store/actionCreators";

const IconStyleOptions = ({ Vietnamese, English }) => {
  const { appLanguage } = useSelector((state) => state);
  const { iconStyle } = useSelector((state) => state.userInfo);
  const [selectedColorStyle, setSelectedColorStyle] = useState("Original");
  const colorStyleList = ["Original", "Black", "Blue"];
  const dispatch = useDispatch();
  const appliedLanguage = appLanguage === "ENGLISH" ? English : Vietnamese;
  const { customizePage } = appliedLanguage;

  useEffect(() => {
    setSelectedColorStyle(iconStyle || "Original");
  }, [iconStyle]);

  const handleSelectColorStyle = (iconStyle) => () => {
    setSelectedColorStyle(iconStyle);
    dispatch(setIconStyle(iconStyle || "Original"));
  };

  return (
    <div className={classes.colorSection}>
      <div className={classes.optionBox}>
        <div className={classes.label}>{customizePage.iconSection}</div>
        <ImageList rowHeight={90} cols={3}>
          {colorStyleList.map((colorStyle, index) => (
            <ImageListItem key={index} cols={1}>
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
                    border: "1px solid #c7c7c7",
                  }}
                  className={classes.colorStyleInline}
                >
                  <div
                    style={
                      index === 0
                        ? {
                            backgroundImage: "url(" + LightItemBg + ")",
                            width: 40,
                            height: 40,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain",
                          }
                        : index === 2
                        ? {
                            backgroundColor: "blue",
                          }
                        : { backgroundColor: "black" }
                    }
                    className={classes.styleTriangle}
                  ></div>
                </div>
              </div>
              <p
                style={{
                  fontWeight: selectedColorStyle === colorStyle && "700",
                }}
                className={classes.styleText}
              >
                {index === 0
                  ? customizePage.original
                  : index === 1
                  ? customizePage.black
                  : index === 2
                  ? customizePage.blue
                  : "Original"}
              </p>
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
};

export default IconStyleOptions;
