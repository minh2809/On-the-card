import React, { useState } from "react";
import classes from "./RetrieveAccount.module.css";
import ModalLoad from "../../../components/UI/Modal/ModalLoad/ModalLoad";
import ModalConfirm from "../../../components/UI/Modal/ModalConfirm/ModalConfirm";
import Backdrop from "../../../components/UI/Backdrop/Backdrop";
import MainInput from "../../../components/UI/TextBox/MainInput/MainInput";
import LandingButton from "../../../components/UI/Button/MainButton/MainButton";
import { useSelector } from "react-redux";
import HoverText from "../../../components/UI/HoverText/HoverText";
import ErrorBadge from "../../../components/UI/ErrorBadge/ErrorBadge";
import { Validator } from "../../../utilities/validation";
import * as api from "../../../api/api";
import { safeTranslate } from "../../../language/backEndTranslate";

const RetrieveAccount = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { appLang, appLanguage } = useSelector((state) => state);
  const language = appLang.retrieve;
  const errorText = appLang.errors.validation;
  const { placeHolder } = language;
  const [errors, setErrors] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const errorExist = Validator.validateEmail(email, errorText);
    setLoading(true);
    errorExist
      ? setErrors(safeTranslate(errorExist, appLanguage))
      : databaseWork();
    errorExist ? setLoading(false) : setErrors("");
  };

  const databaseWork = async () => {
    const res = await api.retrievePassword(email);
    setLoading(false);
    setErrors(safeTranslate(res.error, appLanguage));
    setSuccess(res.success);
  };

  return (
    <div className={classes.loginContent}>
      <div className={classes.pageTitle}>{language.title}</div>
      <h3 className={classes.subText}>{language.explain}</h3>
      <ErrorBadge message={errors} />
      <form onSubmit={onSubmitHandler}>
        <MainInput
          type="email"
          value={email}
          onChange={setEmail}
          placeholder={placeHolder.email}
          label={language.email}
        />
        <div className={classes.signInButtonWrapper}>
          <LandingButton
            type="submit"
            onClick={() => {}}
            text={language.button}
          />
        </div>
        <HoverText innerText={language.signin} path="/signin" />
      </form>
      <ModalConfirm
        show={success}
        confirm={language.h3text}
        subText={language.h3text2}
        buttonText={language.signin}
        email={email}
      />
      <ModalLoad h5text={appLang.modal.pleaseWait} show={loading} />
      <Backdrop show={loading || success} />
    </div>
  );
};

export default RetrieveAccount;
