import React, { useState, useEffect } from "react";
import classes from "../SignUp.module.css";
import HoverText from "../../../../components/UI/HoverText/HoverText";
import Backdrop from "../../../../components/UI/Backdrop/Backdrop";
import ModalLoad from "../../../../components/UI/Modal/ModalLoad/ModalLoad";
import MainInputAccount from "../../../../components/UI/TextBox/MainInput/MainInputAccount";
import LandingButton from "../../../../components/UI/Button/MainButton/MainButton";
import { useSelector } from "react-redux";
import { Validator } from "../../../../utilities/validation";
import { getErrorObjectSignUp } from "../../../../utilities/helper_functions";
import * as api from "../../../../api/api";
import ModalConfirm from "../../../../components/UI/Modal/ModalConfirm/ModalConfirm";
import ErrorBadge from "../../../../components/UI/ErrorBadge/ErrorBadge";
import { useParams } from "react-router-dom";
import { safeTranslate } from "../../../../language/backEndTranslate";
import Checkbox from "@material-ui/core/Checkbox";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";

const SignUp = () => {
  const { serialNumber } = useParams();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [serialNo, setSerialNo] = useState(serialNumber || "");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [checked, setChecked] = useState(false);
  const [errorObject, setErrorObject] = useState({
    email: "",
    fullName: "",
    userName: "",
    serialNo: "",
    password: "",
    other: "",
  });

  const handleChange = () => setChecked(!checked);

  // Privacy Policy Viet Nam
  const termOfUse = () =>
    window.open("https://onthecard.vn/pages/chinh-sach-giao-hang");
  const privacyPolicy = () =>
    window.open("https://onthecard.vn/pages/chinh-sach-bao-mat");

  // Privacy Policy Canada
  // const termOfUse = () =>
  //   window.open(
  //     "https://docs.google.com/document/d/1h0j2cVjXQ_WG3Kuz90FNCwURKCYam-F1WAMPsSaK4YY/edit?usp=sharing"
  //   );
  // const privacyPolicy = () =>
  //   window.open(
  //     "https://docs.google.com/document/d/1e2BMHSDsPoFt7gaaAC64YwnFuZlmgqjfqfHaQ1PThoY/edit?usp=sharing"
  //   );

  const { appLang, appLanguage } = useSelector((state) => state);
  const language = appLang.signUp;
  const agreementText = language.agreement;
  const { placeHolder } = language;
  const errorText = appLang.errors.validation;

  const history = useHistory();
  const cookies = new Cookies();
  let loginToken = cookies.get("loginToken");
  const pathName = window.location.pathname;

  useEffect(() => {
    const errorObjectWorked = getErrorObjectSignUp(
      safeTranslate(errors, appLanguage)
    );
    setErrorObject(errorObjectWorked);

    if (!pathName.includes("signup") && loginToken) {
      return history.push("/signin");
    }
  }, [errors, appLanguage, history, loginToken, pathName]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorObject({
      email: "",
      fullName: "",
      userName: "",
      serialNo: "",
      password: "",
      other: "",
    });
    const errorExist = Validator.signUpValidation(
      email,
      fullName,
      userName,
      serialNo,
      password,
      checked,
      errorText
    );
    errorExist ? setErrors(errorExist) : databaseWork();
    errorExist && setLoading(false);
  };

  const databaseWork = async () => {
    const validate = await api.validateSignUp(
      serialNo,
      userName,
      "bpro_vietnam"
    );
    const error = validate.data.error;
    const token = validate.data.token;

    if (error) {
      setErrors(error);
      setLoading(false);
    } else {
      const res = await api.registerUser(
        email,
        fullName,
        userName,
        serialNo,
        password,
        token,
        "bpro_vn"
      );
      setErrors(res.error);
      setSuccess(res.registered);
      setLoading(false);
    }
  };

  return (
    <div className={classes.loginContent}>
      <Helmet>
        <title>BPRO x ONTHECARD</title>
      </Helmet>
      <div className={classes.pageTitle}>
        {language.title} <br className={classes.breakLine} /> {language.title2}
      </div>
      <ErrorBadge message={errorObject.other} />
      <form onSubmit={onSubmitHandler}>
        <MainInputAccount
          type="email"
          value={email}
          onChange={setEmail}
          placeholder={placeHolder.email}
          label={language.email}
          lowerCase={true}
          errorMessage={errorObject.email}
        />
        <MainInputAccount
          type="text"
          value={fullName}
          onChange={setFullName}
          placeholder={placeHolder.fullname}
          label={language.fullname}
          hint={language.fullnamehint}
          errorMessage={errorObject.fullName}
        />
        <MainInputAccount
          type="text"
          value={userName}
          onChange={setUserName}
          placeholder={placeHolder.username}
          label={language.username}
          hint={language.usernamehint}
          lowerCase={true}
          errorMessage={errorObject.userName}
        />
        <MainInputAccount
          type="number"
          value={serialNo}
          onChange={setSerialNo}
          placeholder={placeHolder.serialNo}
          label={language.serialCode}
          hint={language.serialNoHint}
          errorMessage={errorObject.serialNo}
        />
        <MainInputAccount
          type="password"
          value={password}
          onChange={setPassword}
          placeholder={placeHolder.password}
          label={language.password}
          errorMessage={errorObject.password}
        />
        <div className={classes.checkBox}>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "primary checkbox" }}
            style={checked ? { color: "#0275d8" } : { color: "black" }}
          />{" "}
          <p onClick={handleChange}>
            {agreementText.IAgree}{" "}
            <span onClick={termOfUse}>{agreementText.termOfUse}</span>{" "}
            {agreementText.and}{" "}
            <span onClick={privacyPolicy}>{agreementText.privacyPolicy}</span>{" "}
            {agreementText.forMyAccount}
          </p>
        </div>
        <div className={classes.signUpButton}>
          <LandingButton type="submit" text={language.button.signup} />
        </div>
        <div className={classes.hoverTextArea}>
          <span className={classes.hoverDescription}>{language.already}</span>
          <HoverText innerText={language.button.signin} path="/signin" />
        </div>
      </form>
      <ModalConfirm
        show={success}
        confirm={language.modal.confirm1}
        subText={language.modal.confirm2}
        buttonText={language.button.signin}
      />
      <ModalLoad h5text={language.modal.wait} show={loading} />
      <Backdrop show={loading || success} />
    </div>
  );
};

export default SignUp;
