import React, { useState, useEffect } from "react";
import classes from "./RedirectSwitch.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Vietnamese, English } from "../../../language/language";
import {
  setRedirectMode,
  setRedirectLink,
} from "../../../store/actionCreators";

const Redirect = () => {
  const { redirectMode, redirectLink, socialMediaList } = useSelector(
    (state) => state.userInfo
  );
  const [buttonOn, setButtonOn] = useState(redirectMode);
  const language = useSelector((state) => state.appLanguage);
  const languageObject = language === "VIETNAMESE" ? Vietnamese : English;
  const switchText = buttonOn
    ? languageObject.redirect.modeOn
    : languageObject.redirect.modeOff;
  const dispatch = useDispatch();

  let noEmailPhoneNumber = false;

  if (socialMediaList.length > 0) {
    noEmailPhoneNumber =
      socialMediaList[0].icon !== "mail" &&
      socialMediaList[0].icon !== "phoneNumber";
  }

  const toggleSwitch = () => {
    socialMediaList.length === 0 &&
      alert(languageObject.editPage.text.redirectMessage);

    socialMediaList.length > 0 &&
      dispatch(setRedirectMode(!buttonOn)) &&
      setButtonOn(!buttonOn);

    // If !redirectMode > toggle to turn on > perform these tasks
    !redirectMode &&
      redirectLink.length === 0 &&
      socialMediaList.length > 0 &&
      noEmailPhoneNumber &&
      dispatch(setRedirectLink(socialMediaList[0].url));
  };

  useEffect(() => {
    socialMediaList.length === 0 &&
      dispatch(setRedirectMode(false)) &&
      setButtonOn(false);

    !redirectMode && setButtonOn(false);

    redirectMode &&
      redirectLink.length === 0 &&
      socialMediaList.length > 0 &&
      noEmailPhoneNumber &&
      dispatch(setRedirectLink(socialMediaList[0].url));
  }, [
    socialMediaList,
    redirectLink.length,
    redirectMode,
    dispatch,
    noEmailPhoneNumber,
  ]);

  return (
    <div
      className={
        buttonOn ? classes.buttonContainerOn : classes.buttonContainerOff
      }
      onClick={toggleSwitch}
    >
      {switchText}
    </div>
  );
};

export default Redirect;
