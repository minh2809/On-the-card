import React, { useState } from "react";
import Cookies from "universal-cookie";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import classes from "./AppBar.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actionTypes from "../../store/actionTypes";
import { setToken, setStorePage, tabChange } from "../../store/actionCreators";
import { setGalleryPage } from "../../store/actionCreators";
import * as api from "../../api/api2";
import { useHistory } from "react-router-dom";
import { countNewMessage } from "../../utilities/analytic_helper";
import { countNewOrder } from "../../utilities/analytic_helper";
import ConfirmModal from "../../components/UI/Modal/ConfirmModal/ConfirmModal";
import BackDrop from "../../components/UI/Backdrop/BackDropClose";
import ModalConfirm from "../../components/UI/Modal/ModalConfirm/ModalConfirm";
import BottomNav from "../../components/UI/Navigation/BottomNav/BottomNav";

import RenderMenu from "./MenuList/RenderMenu";
import LanguageMenu from "./MenuList/LanguageMenu";

const AppBarNav = (props) => {
  const { userInfo, client, token } = useSelector((state) => state);
  const { messageData, tempData, appLang } = useSelector((state) => state);
  const { fullName, avatarURL, avatarImg, isAdmin } = userInfo;
  const { inactive, userName, storeActivated } = userInfo;
  // const { galleryActivated } = userInfo;

  const { serialArray } = client;
  const { viewPage } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [storeOpened, setStoreOpened] = useState(false);
  const [galleryOpened, setGalleryOpened] = useState(false);
  const [modalStoreOpen, setModalStoreOpen] = useState(false);
  const [modalGalleryOpen, setModalGalleryOpen] = useState(false);
  const [errorOpenStore, setErrorOpenStore] = useState("");
  const [errorOpenGallery, setErrorOpenGallery] = useState("");
  const [loading, setLoading] = useState(false);

  const langModal = appLang.profile.modal;
  const langBtn = appLang.profile.button;

  // const condition =
  //   storeOpened || storeActivated || galleryOpened || galleryActivated;

  const condition = storeOpened || storeActivated || galleryOpened;

  const closeMenu = () => {
    setAnchorEl(false);
    setLangMenuOpen(false);
  };

  const activateStore = async () => {
    setLoading(true);
    const result = await api.enableStore(token, userName);
    if (result.success) {
      dispatch({ type: actionTypes.STORE_PAGE_ACTIVATE });
      dispatch(setStorePage(result.storeData));
      setStoreOpened(true);
      setModalStoreOpen(false);
    } else {
      setErrorOpenStore(result.error);
      setModalStoreOpen(false);
    }
    setLoading(false);
  };

  const activateGallery = async () => {
    setLoading(true);
    const result = await api.enableGallery(token, userName);

    if (result.success) {
      dispatch({ type: actionTypes.GALLERY_PAGE_ACTIVATE });
      dispatch(setGalleryPage(result.galleryData));
      setGalleryOpened(true);
      setModalGalleryOpen(false);
    } else {
      setErrorOpenGallery(result.error);
      setModalGalleryOpen(false);
    }
    setLoading(false);
  };

  const closeGalleryConfirm = () => {
    if (errorOpenGallery) {
      setErrorOpenGallery("");
    } else {
      setGalleryOpened(false);
      dispatch(tabChange(4));
      history.push(`/profile/galleryPage`);
    }
  };

  const closeStoreConfirm = () => {
    if (errorOpenStore) {
      setErrorOpenStore("");
    } else {
      setStoreOpened(false);
      dispatch(tabChange(3));
      history.push(`/profile/storePage`);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openLanguageMenu = () => {
    setLangMenuOpen(true);
  };

  const closeModalStore = () => {
    setModalStoreOpen(false);
  };

  const openGallery = () => {
    setModalGalleryOpen(true);
    closeMenu();
  };

  const closeModalGallery = () => {
    setModalGalleryOpen(false);
  };

  const avatarImage = avatarURL === "" ? avatarImg : avatarURL;
  const newNoti = countNewMessage(messageData) + countNewOrder(messageData);

  const logOutReset = () => {
    dispatch({ type: actionTypes.LOGOUT });
    dispatch({ type: actionTypes.UNAUTHENTICATE });
    dispatch(setToken(tempData.tempToken));
    const cookies = new Cookies();
    return cookies.remove("loginToken");
  };

  const logoOnClick = () => {
    const condition = serialArray.length >= 3 && !isAdmin;
    condition
      ? history.push("/profile/B2BAdmin")
      : isAdmin
      ? history.push("/profile/AdminB2B")
      : history.push("/profile");
    condition && logOutReset();
    isAdmin && logOutReset();
    dispatch(tabChange(1));
  };

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.menuButton} onClick={logoOnClick}>
            <h3 className={classes.logoText}>ONTHECARD</h3>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Typography
              className={classes.accountIconArea}
              onClick={openMenu}
              noWrap
            >
              <img
                src={avatarImage}
                alt="avatar"
                className={classes.userAvatar}
                onError={(event) => {
                  event.target.src = avatarImage;
                }}
              />
              <span className={classes.accountIconLabel}>
                {!viewPage ? fullName : null}
              </span>
              {newNoti > 0 && !inactive && (
                <span className={classes.notiNumber}>{newNoti}</span>
              )}
              {inactive && (
                <span className={[classes.notiNumber, classes.lock].join(" ")}>
                  <i className="fas fa-lock"></i>
                </span>
              )}
              <i
                style={{ marginLeft: "8px" }}
                className="fas fa-caret-down"
              ></i>
            </Typography>
          </div>
        </Toolbar>
        {(userInfo.isAdmin || condition) && <BottomNav />}
      </AppBar>

      {langMenuOpen && (
        <LanguageMenu anchorEl={anchorEl} closeMenu={closeMenu} />
      )}

      {!langMenuOpen && (
        <RenderMenu
          anchorEl={anchorEl}
          closeMenu={closeMenu}
          storeOpened={storeOpened}
          openGallery={openGallery}
          openLanguageMenu={openLanguageMenu}
          logOutReset={logOutReset}
          setModalStoreOpen={setModalStoreOpen}
          galleryOpened={true}
          galleryActivated={false}
        />
      )}

      {modalStoreOpen && (
        <ConfirmModal
          title={langModal.openStore}
          subtext={langModal.storeSubText}
          confirmText={langBtn.openStoreBtn}
          closeText={langBtn.close}
          close={closeModalStore}
          confirm={activateStore}
          inactive={true}
          loading={loading}
        />
      )}

      {modalGalleryOpen && (
        <ConfirmModal
          title={langModal.openGallery}
          subtext={langModal.gallerySubText}
          confirmText={langBtn.openGalleryBtn}
          closeText={langBtn.close}
          close={closeModalGallery}
          confirm={activateGallery}
          inactive={true}
          loading={loading}
        />
      )}

      {(storeOpened || errorOpenStore) && (
        <ModalConfirm
          show
          editPage={true}
          confirm={errorOpenStore ? "" : langModal.storeSuccess}
          buttonText={errorOpenStore ? langBtn.close : langBtn.visitStore}
          close={closeStoreConfirm}
          error={errorOpenStore || ""}
        />
      )}

      {(galleryOpened || errorOpenGallery) && (
        <ModalConfirm
          show
          editPage={true}
          confirm={errorOpenGallery ? "" : langModal.gallerySuccess}
          buttonText={errorOpenGallery ? langBtn.close : langBtn.visitStore}
          close={closeGalleryConfirm}
          error={errorOpenGallery || ""}
        />
      )}

      {(modalOpen ||
        modalStoreOpen ||
        storeOpened ||
        errorOpenStore ||
        modalGalleryOpen ||
        galleryOpened ||
        errorOpenGallery) && <BackDrop show closeModal={closeModal} />}
    </div>
  );
};

export default AppBarNav;
