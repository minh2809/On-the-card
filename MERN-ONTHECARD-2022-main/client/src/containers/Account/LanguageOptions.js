import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import flagEngland from "../../assets/header/EnglishIcon.svg";
import flagVietnam from "../../assets/header/VietNamIcon.svg";
import classes from "./Account.module.css";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useDispatch, useSelector } from "react-redux";
import { changeToEN, changeToVN } from "../../store/actionCreators";

const LanguageOptions = () => {
  const { appLanguage } = useSelector((state) => state);
  const [anchorEl, setAnchorEl] = useState(false);
  const dispatch = useDispatch();

  const handleSelectLang = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleChangeFlag = (lang) => () => {
    setAnchorEl(null);
    if (lang === "en") {
      dispatch(changeToEN());
    } else if (lang === "vn") {
      dispatch(changeToVN());
    }
  };

  return (
    <div className={classes.languageOption}>
      <Button
        aria-controls="flag-menu"
        aria-haspopup="true"
        onClick={handleSelectLang}
      >
        {appLanguage === "ENGLISH" ? (
          <img
            className={classes.flagEnglandImage}
            src={flagEngland}
            alt="flagEngland"
          />
        ) : (
          <img
            className={classes.flagVietnameImage}
            src={flagVietnam}
            alt="flagVietnam"
          />
        )}
        <ArrowDropDownIcon />
      </Button>
      <Menu
        id="flag-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        style={{ marginTop: "45px" }}
      >
        <MenuItem onClick={handleChangeFlag("en")}>
          <img
            className={classes.flagEnglandImage}
            src={flagEngland}
            alt="flagEngland"
          />
        </MenuItem>
        <MenuItem onClick={handleChangeFlag("vn")}>
          <img
            className={classes.flagVietnameImage}
            src={flagVietnam}
            alt="flagVietnam"
          />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default LanguageOptions;
