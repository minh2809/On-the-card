import React, { useState, useEffect, useCallback, useMemo } from "react";
import Cookies from "universal-cookie";

import classes from "./SignIn.module.css";
import HoverText from "../../../components/UI/HoverText/HoverText";
import ModalLoad from "../../../components/UI/Modal/ModalLoad/ModalLoad";
import Backdrop from "../../../components/UI/Backdrop/Backdrop";
import MainInputAccount from "../../../components/UI/TextBox/MainInput/MainInputAccount";
import LandingButton from "../../../components/UI/Button/MainButton/MainButton";
import { useSelector } from "react-redux";
import { Validator } from "../../../utilities/validation";
import * as api from "../../../api/api";
import { useDispatch } from "react-redux";
import { dispatchLoginInfo, setToken } from "../../../store/actionCreators";
import { setEnterprise, setStorePage } from "../../../store/actionCreators";
import { setGalleryPage } from "../../../store/actionCreators";
import { setMessageData, setSerialArray } from "../../../store/actionCreators";
import { setTempData } from "../../../store/actionCreators";
import { useHistory } from "react-router-dom";
import { getErrorObjectSignIn } from "../../../utilities/helper_functions";
import ErrorBadge from "../../../components/UI/ErrorBadge/ErrorBadge";
import { safeTranslate } from "../../../language/backEndTranslate";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorObject, setErrorObject] = useState({
    email: "",
    password: "",
    other: "",
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const { appLang, appLanguage } = useSelector((state) => state);
  const language = appLang.signIn;

  const { placeHolder } = language;
  const errorText = appLang.errors.validation;

  const cookies = useMemo(() => new Cookies(), []);
  let loginToken = cookies.get("loginToken");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setErrorObject({
      email: "",
      password: "",
      other: "",
    });
    email.includes("@") && email.includes(".") ? loginEmail() : loginUserName();
  };

  const loginUserName = async () => {
    const errorExist = Validator.signInValidationUserName(
      email,
      password,
      errorText
    );
    setLoading(true);
    errorExist ? setErrors(errorExist) : getEmailWithUserName();
    errorExist ? setLoading(false) : setErrors("");
  };

  const getEmailWithUserName = async () => {
    const userName = email;
    const res = await api.getEmail(userName);
    res.success ? databaseWork(res.email, false) : setErrors(res.error);
    !res.success && setLoading(false);
  };

  const loginEmail = async () => {
    const errorExist = Validator.signInValidation(email, password, errorText);
    setLoading(true);
    errorExist ? setErrors(errorExist) : databaseWork(email, false);
    errorExist ? setLoading(false) : setErrors("");
  };

  const authenticate = useCallback(
    async (data, analyticData, tempData) => {
      const condition = tempData.userData.isAdmin;
      condition && dispatch(setTempData(tempData));
      dispatch(dispatchLoginInfo(data, analyticData));
      setLoading(false);
      return history.push("/profile");
    },
    [dispatch, history]
  );

  const authenticateB2B = useCallback(
    async (serialArray, clientName, tempData) => {
      const condition = tempData.userData.isAdmin;
      dispatch(setSerialArray(serialArray, clientName));
      dispatch(setTempData(tempData));
      setLoading(false);
      condition
        ? history.push("/profile/AdminB2B")
        : history.push("/profile/B2BAdmin");
      return;
    },
    [dispatch, history]
  );

  const databaseWork = useCallback(
    async (emailLogin, loginWithToken) => {
      let res;

      if (loginWithToken) {
        res = await api.login("", "", loginToken);
      } else {
        res = await api.login(emailLogin, password, "");
      }

      const { data, error, serialArray, token } = res;
      const { messageData, analyticData } = res;
      const { enterprisePage, storePage } = res;
      const { galleryData } = res;
      const { storeAnalytic, companyAnalytic } = res;
      const { loginToken: newLoginToken } = res;
      const clientName = enterprisePage.name || data.fullName || "";

      const tempData = {
        userData: data,
        analyticData: analyticData,
        tempToken: token,
        storeAnalytic: storeAnalytic ? storeAnalytic : {},
        companyAnalytic: companyAnalytic ? companyAnalytic : {},
      };

      if (!error) {
        dispatch(setEnterprise(enterprisePage));
        dispatch(setStorePage(storePage));
        dispatch(setGalleryPage(galleryData));
        dispatch(setToken(token));
        dispatch(setMessageData(messageData));

        // Setting Cookie:
        // maxAge is in seconds, set for 180 days to expire
        cookies.remove("loginToken");
        cookies.set("loginToken", newLoginToken, {
          path: "/",
          maxAge: 180 * 60 * 60 * 24,
        });
      }

      if (serialArray.length === 0 || serialArray.length < 3) {
        error ? setErrors(error) : authenticate(data, analyticData, tempData);
        error ? setLoading(false) : setErrors("");
      }
      if (serialArray.length >= 3) {
        error
          ? setErrors(error)
          : authenticateB2B(serialArray, clientName, tempData);
        error ? setLoading(false) : setErrors("");
      }
      return;
    },
    [authenticate, authenticateB2B, dispatch, password, loginToken, cookies]
  );

  useEffect(() => {
    const errorObject = getErrorObjectSignIn(
      safeTranslate(errors, appLanguage)
    );
    setErrorObject(errorObject);

    if (loginToken) {
      setLoading(true);
      databaseWork(loginToken, true);
    }
  }, [errors, appLanguage, loginToken, databaseWork]);

  return (
    <div className={classes.loginContent}>
      <div className={classes.pageTitle}>
        {language.title} <br className={classes.breakLine} /> {language.title2}
      </div>
      <ErrorBadge message={errorObject.other} />
      <form onSubmit={onSubmitHandler}>
        <MainInputAccount
          type="text"
          value={email}
          onChange={setEmail}
          placeholder={placeHolder.email}
          label={language.email}
          lowerCase={true}
          errorMessage={errorObject.email}
        />
        <MainInputAccount
          type="password"
          value={password}
          onChange={setPassword}
          placeholder={placeHolder.password}
          label={language.password}
          errorMessage={errorObject.password}
        />
        <div className={classes.hoverTextArea}>
          <HoverText innerText={language.button.forgot} path="/retrieve" />
        </div>
        <div className={classes.signInButtonWrapper}>
          <LandingButton type="submit" text={language.button.signin} />
        </div>
        <div className={classes.hoverTextArea}>
          <span className={classes.hoverDescriptionSignUp}>
            {language.signUpTitle}
            <HoverText innerText={language.button.signup} path="/" />
          </span>
        </div>

        <ModalLoad show={loading} h5text={appLang.modal.pleaseWait} />
        <Backdrop show={loading} />
      </form>
    </div>
  );
};

export default SignIn;
