import * as actionTypes from "./actionTypes";
import firebase from "../containers/firebase/firebase";

export const saveInfo = (currentPage, firebaseInfo) => {
  try {
    return {
      type: actionTypes.PULLINFO,
      fullName: firebaseInfo.fullName,
      userName: firebaseInfo.userName,
      email: firebaseInfo.email,
      bio: firebaseInfo.bio,
      viewPage: currentPage + "/" + firebaseInfo.userURL,
      socialMediaList: firebaseInfo.socialMediaList,
      avatarURL: firebaseInfo.avatarURL,
      userURL: firebaseInfo.userURL,
      phoneNumber: firebaseInfo.phoneNumber,
      backgroundColor: firebaseInfo.backgroundColor,
      backgroundColorObject: firebaseInfo.backgroundColorObject,
      backgroundColorStyle: firebaseInfo.backgroundColorStyle,
      backgroundImageUrl: firebaseInfo.backgroundImageUrl,
      redirectMode: firebaseInfo.redirectMode,
    };
  } catch (error) {
    alert(
      "Đường link không tồn tại, vui lòng thử lại đường link khác ! \n \n The Link Is Not Existing, Please Try A Different Link !"
    );
  }
};

export const setSerialArray = (serialArray, name) => {
  return {
    type: actionTypes.DISPATCH_SERIALARRAY,
    payload: { clientName: name, serialArray: serialArray },
  };
};

export const setRedirectSaveContact = (status) => {
  return {
    type: actionTypes.REDIRECT_SAVE_CONTACT,
    payload: status,
  };
};

export const setRedirectLink = (link) => {
  return {
    type: actionTypes.DISPATCH_REDIRECT_LINK,
    payload: link,
  };
};

export const dispatchLoginInfo = (data, analyticData) => {
  return {
    type: actionTypes.DISPATCH_LOGIN_INFO,
    payload: data,
    analytic: analyticData,
  };
};

export const pullInfo = (currentPage, userKey) => {
  return (dispatch) => {
    let firebaseInfo = null;
    firebase.getRealtimeInfo(userKey).on("value", (snap) => {
      firebaseInfo = snap.val();
      dispatch(saveInfo(currentPage, firebaseInfo));
    });
  };
};

export const saveInfoView = (firebaseInfo) => {
  if (!firebaseInfo) {
    return alert(
      "Đường link không tồn tại, vui lòng thử lại đường link khác ! \n \n The Link Is Not Existing, Please Try A Different Link !"
    );
  }
  try {
    return {
      type: actionTypes.PULLINFOVIEW,
      fullName: firebaseInfo.fullName,
      userName: firebaseInfo.userName,
      bio: firebaseInfo.bio,
      socialMediaList: firebaseInfo.socialMediaList,
      avatarURL: firebaseInfo.avatarURL,
      userURL: firebaseInfo.userURL,
      phoneNumber: firebaseInfo.phoneNumber,
      backgroundColor: firebaseInfo.backgroundColor,
      backgroundColorStyle: firebaseInfo.backgroundColorStyle,
      backgroundColorObject: firebaseInfo.backgroundColorObject,
      backgroundImageUrl: firebaseInfo.backgroundImageUrl,
      redirectMode: firebaseInfo.redirectMode,
    };
  } catch (error) {
    alert(
      "Đường link không tồn tại, vui lòng thử lại đường link khác ! \n \n The Link Is Not Existing, Please Try A Different Link !"
    );
  }
};

export const pullInfoView = (userKey) => {
  return (dispatch) => {
    let firebaseInfo = null;
    firebase.getRealtimeInfo(userKey).on("value", (snap) => {
      firebaseInfo = snap.val();
      dispatch(saveInfoView(firebaseInfo));
    });
  };
};

export const setBackgroundColor = (backgroundColor, backgroundColorObject) => {
  return {
    type: actionTypes.SET_BACKGROUND_COLOR,
    backgroundColor: backgroundColor,
    backgroundColorObject: backgroundColorObject,
  };
};

export const setBgColorEnterprise = (
  backgroundColor,
  backgroundColorObject
) => {
  return {
    type: actionTypes.SET_BG_COLOR_ENTERPRISE,
    backgroundColor: backgroundColor,
    backgroundColorObject: backgroundColorObject,
  };
};

export const setBgColorStore = (backgroundColor, backgroundColorObject) => {
  return {
    type: actionTypes.SET_BG_COLOR_STORE,
    backgroundColor: backgroundColor,
    backgroundColorObject: backgroundColorObject,
  };
};

export const setBackgroundColorStyle = (
  backgroundColor,
  backgroundColorStyle
) => ({
  type: actionTypes.SET_BACKGROUND_COLOR_STYLE,
  backgroundColor: backgroundColor,
  backgroundColorStyle: backgroundColorStyle,
});

export const setBGColorStyleEnter = (
  backgroundColor,
  backgroundColorStyle
) => ({
  type: actionTypes.SET_BG_COLOR_STYLE_ENTER,
  backgroundColor: backgroundColor,
  backgroundColorStyle: backgroundColorStyle,
});

export const setBGColorStyleStore = (
  backgroundColor,
  backgroundColorStyle
) => ({
  type: actionTypes.SET_BG_COLOR_STYLE_STORE,
  backgroundColor: backgroundColor,
  backgroundColorStyle: backgroundColorStyle,
});

export const setBackgroundImage = (backgroundImageUrl) => ({
  type: actionTypes.SET_BACKGROUND_IMAGE,
  backgroundImageUrl: backgroundImageUrl,
});

export const setBgImgEnterprise = (backgroundImageUrl) => ({
  type: actionTypes.SET_BGIMG_ENTERPRISE,
  backgroundImageUrl: backgroundImageUrl,
});

export const setBgImgStore = (backgroundImageUrl) => ({
  type: actionTypes.SET_BGIMG_STORE,
  backgroundImageUrl: backgroundImageUrl,
});

export const setRedirectMode = (redirectMode) => ({
  type: actionTypes.SET_REDIRECT_MODE,
  payload: redirectMode,
});

export const changeToEN = () => ({
  type: actionTypes.CHANGETOEN,
});

export const changeToVN = () => ({
  type: actionTypes.CHANGETOVN,
});

export const setUserInfo = (userInfo, analyticData) => ({
  type: actionTypes.DISPATCH_USER_INFO,
  payload: userInfo,
  analytic: analyticData,
});

export const setIconStyle = (iconStyle) => ({
  type: actionTypes.DISPATCH_ICON_STYLE,
  payload: iconStyle,
});

export const setIconEnterprise = (iconStyle) => ({
  type: actionTypes.SET_ICON_ENTERPRISE,
  payload: iconStyle,
});

export const setIconStore = (iconStyle) => ({
  type: actionTypes.SET_ICON_STORE,
  payload: iconStyle,
});

export const setToken = (token) => ({
  type: actionTypes.DISPATCH_TOKEN,
  payload: token,
});

export const setAnalytic = (analyticData) => ({
  type: actionTypes.DISPATCH_ANALYTIC_DATA,
  payload: analyticData,
});

export const setMessageData = (messageData) => ({
  type: actionTypes.DISPATCH_MESSAGE_DATA,
  payload: messageData,
});

export const setEnterprise = (enterprisePage) => ({
  type: actionTypes.SET_ENTERPRISEPAGE,
  payload: enterprisePage,
});

export const setStorePage = (storePage) => ({
  type: actionTypes.SET_STOREPAGE,
  payload: storePage,
});

export const setGalleryPage = (galleryPage) => ({
  type: actionTypes.SET_GALLERYPAGE,
  payload: galleryPage,
});

export const setTempData = (tempData) => ({
  type: actionTypes.SET_TEMPDATA,
  payload: tempData,
});

export const tabChange = (tabId) => ({
  type: actionTypes.CHANGE_B2B_TAB,
  payload: tabId,
});

export const setPINRedux = (PINCode) => ({
  type: actionTypes.SET_PIN,
  payload: PINCode,
});
