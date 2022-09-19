import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import classes from "../AppBar.module.css";

import { useDispatch } from "react-redux";
import * as actionTypes from "../../../store/actionTypes";

import flagEngland from "../../../assets/header/EnglishIcon.svg";
import flagVietnam from "../../../assets/header/VietNamIcon.svg";

function LanguageMenu(props) {
  const { anchorEl, closeMenu } = props;

  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";
  const dispatch = useDispatch();

  const handleVietNam = () => {
    dispatch({ type: actionTypes.CHANGETOVN });
    closeMenu();
  };

  const handleEnglish = () => {
    dispatch({ type: actionTypes.CHANGETOEN });
    closeMenu();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top" }}
      id={menuId}
      transformOrigin={{ vertical: "top" }}
      open={isMenuOpen}
      className={classes.renderMenu}
      onClose={closeMenu}
    >
      <MenuItem className={classes.menuItem} onClick={handleVietNam}>
        <img
          className={classes.flagVietnam}
          src={flagVietnam}
          alt="flagVietnam"
        ></img>
      </MenuItem>
      <MenuItem className={classes.menuItem} onClick={handleEnglish}>
        <img
          className={classes.flagEngland}
          src={flagEngland}
          alt="flagEngland"
        ></img>
      </MenuItem>
    </Menu>
  );
}

export default LanguageMenu;
