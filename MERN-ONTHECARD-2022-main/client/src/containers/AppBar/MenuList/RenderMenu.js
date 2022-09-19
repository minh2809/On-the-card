import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import classes from "../AppBar.module.css";
import IconLogout from "../../../assets/header/icon-logout-grey.png";
import { countNewMessage } from "../../../utilities/analytic_helper";
import { countNewOrder } from "../../../utilities/analytic_helper";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { tabChange } from "../../../store/actionCreators";
import { verifyPremiumFunctions } from "../../../utilities/premiumUser";

function RenderMenu(props) {
  const { anchorEl, closeMenu } = props;
  const { storeOpened, openGallery } = props;
  const { openLanguageMenu, setModalStoreOpen } = props;
  const { logOutReset } = props;
  const { galleryOpened, galleryActivated } = props;

  const { messageData, appLanguage, userInfo } = useSelector((state) => state);
  const { appLang, storePage } = useSelector((state) => state);
  const { isAdmin, userName } = userInfo;
  const { storeActivated, company } = userInfo;
  const langBtn = appLang.profile.button;
  const premiumUser = verifyPremiumFunctions(userName);

  const menuId = "primary-search-account-menu";
  const history = useHistory();
  const dispatch = useDispatch();
  const isMenuOpen = Boolean(anchorEl);
  const newMessage = countNewMessage(messageData);
  const newOrder = countNewOrder(messageData);

  const condition1 =
    storeActivated || (isAdmin && company && storePage.company);

  const openFAQ = () => {
    if (appLanguage === "VIETNAMESE") {
      return window.open("https://onthecard.vn/pages/huongdansudung");
    }
    if (appLanguage === "ENGLISH") {
      return window.open("https://onthecard.ca/pages/faqs");
    }
  };

  const handleLogout = () => {
    const condition1 = window.location.href.includes("profile");
    const condition2 = window.location.href.includes("edit");
    condition1 && !condition2 && logOutReset();
    condition2 && logOutReset();
    closeMenu();
  };

  const goToSettings = () => {
    history.replace("/profile/settings");
    closeMenu();
  };

  const handleMessage = () => {
    const condition = window.location.href.includes("advanced");
    condition && history.replace("/profile/");
    condition
      ? setTimeout(() => {
          history.replace("/profile/advanced/1");
        }, 100)
      : history.replace("/profile/advanced/1");
    closeMenu();
  };

  const handleOrder = () => {
    history.replace("/profile/edit/2");
    dispatch(tabChange(3));
    closeMenu();
  };

  const openStore = () => {
    setModalStoreOpen(true);
    closeMenu();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      open={isMenuOpen}
      onClose={closeMenu}
      className={classes.renderMenu}
    >
      <MenuItem className={classes.menuItem} onClick={handleMessage}>
        <i className="far fa-comments fa-lg"></i>
        <span className={classes.optionText}>
          {appLang.profile.button.message}
          {newMessage > 0 && (
            <span className={classes.notiOption}>{newMessage}</span>
          )}
        </span>
      </MenuItem>
      {condition1 && (
        <MenuItem className={classes.menuItem} onClick={handleOrder}>
          <i className="fas fa-shopping-cart"></i>
          <span className={classes.optionText}>
            {appLang.b2bText.orderAppBar}
            {newOrder > 0 && (
              <span className={classes.notiOption}>{newOrder}</span>
            )}
          </span>
        </MenuItem>
      )}
      {premiumUser && !storeActivated && !storeOpened && !isAdmin && !company && (
        <MenuItem className={classes.menuItem} onClick={openStore}>
          <i className="fas fa-store"></i>
          <span className={classes.optionText}>
            {appLang.profile.button.openStore}
          </span>
        </MenuItem>
      )}
      {/* {!storeActivated && !storeOpened && !isAdmin && !company && (
        <MenuItem className={classes.menuItem} onClick={openStore}>
          <i className="fas fa-store"></i>
          <span className={classes.optionText}>
            {appLang.profile.button.openStore}
          </span>
        </MenuItem>
      )} */}
      {!galleryOpened && !galleryActivated && (
        <MenuItem className={classes.menuItem} onClick={openGallery}>
          <i className="fas fa-photo-video"></i>
          <span className={classes.optionText}>{langBtn.openGallery}</span>
        </MenuItem>
      )}
      <MenuItem className={classes.menuItem} onClick={goToSettings}>
        <i className="fas fa-cog"></i>
        <span className={classes.optionText}>
          {appLang.profile.button.settingNPrivacy}
        </span>
      </MenuItem>
      <MenuItem className={classes.menuItem} onClick={openFAQ}>
        <i className="fas fa-info-circle"></i>
        <span className={classes.optionText}>{appLang.profile.button.faq}</span>
      </MenuItem>
      <MenuItem className={classes.menuItem} onClick={openLanguageMenu}>
        <i className="fas fa-language"></i>
        <span className={classes.optionText}>
          {appLang.profile.button.languages}
        </span>
      </MenuItem>
      <MenuItem className={classes.menuItem} onClick={handleLogout}>
        <img src={IconLogout} className={classes.iconLogout} alt="" />
        <span className={classes.logoutText}>
          {appLang.profile.button.logout}
        </span>
      </MenuItem>
    </Menu>
  );
}

export default RenderMenu;
