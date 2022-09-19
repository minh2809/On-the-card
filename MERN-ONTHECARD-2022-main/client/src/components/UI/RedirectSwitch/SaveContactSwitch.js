import React, { useState, useEffect } from "react";
import classes from "./RedirectSwitch.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Vietnamese, English } from "../../../language/language";
import { setRedirectSaveContact } from "../../../store/actionCreators";

const SaveContactSwitch = () => {
  const { redirectSaveContact } = useSelector((state) => state.userInfo);
  const [buttonOn, setButtonOn] = useState(redirectSaveContact);
  const language = useSelector((state) => state.appLanguage);
  const languageObject = language === "VIETNAMESE" ? Vietnamese : English;
  const switchText = buttonOn
    ? languageObject.redirect.saveContactOn
    : languageObject.redirect.saveContactOff;
  const dispatch = useDispatch();

  const toggleSwitch = () => {
    dispatch(setRedirectSaveContact(!buttonOn));
    setButtonOn(!buttonOn);
  };

  useEffect(() => {
    redirectSaveContact ? setButtonOn(true) : setButtonOn(false);
  }, [redirectSaveContact]);

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

export default SaveContactSwitch;
