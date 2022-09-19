import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import classes from "./Options.module.css";
import { Colors } from "../../../utilities/colors";
import { Validator } from "../../../utilities/validation";
import { useSelector } from "react-redux";
import * as api from "../../../api/api2";
import Loader from "../../../components/UI/Spinner/Loading";
import { safeTranslate } from "../../../language/backEndTranslate";

const PWForm = ({ setError, setMessage }) => {
  const { appLang, token, appLanguage } = useSelector((state) => state);

  const [current, setCurrent] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [seeCurrent, setSeeCurrent] = useState(false);
  const [seeNew, setSeeNew] = useState(false);
  const [seeConfirm, setSeeConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleSeeCurrent = () => setSeeCurrent(!seeCurrent);
  const toggleSeeNew = () => setSeeNew(!seeNew);
  const toggleSeeConfirm = () => setSeeConfirm(!seeConfirm);
  const setSuccess = () => {
    setMessage(appLang.settings.PWUpdateSuccess);
    setCurrent("");
    setNewPassword("");
    setConfirmPW("");
  };

  const updateChanges = async (e) => {
    e.preventDefault();
    setLoading(true);
    const errorText = appLang.errors.validation;
    const errorExist = Validator.passwordChangeValidation(
      current,
      newPassword,
      confirmPW,
      errorText
    );

    setError(errorExist);
    if (!errorExist) {
      const res = await api.updatePW(current, newPassword, token);
      res.success
        ? setSuccess()
        : setError(safeTranslate(res.error, appLanguage));
    }
    return setLoading(false);
  };

  const forgotPw = () => {
    return window.open(window.origin + "/retrieve");
  };

  const iconStyle = {
    position: "absolute",
    right: "10px",
    cursor: "pointer",
    margin: "auto 5px",
    paddingTop: "12px",
    paddingRight: "2.5px",
  };

  const buttonStyle = {
    backgroundColor: Colors.black,
    color: Colors.white,
    border: `1px solid ${Colors.black}`,
  };

  return (
    <form className={classes.changePWContainer} onSubmit={updateChanges}>
      <div className={classes.TextField}>
        <p className={classes.textTitle}>{appLang.settings.currentPassword}</p>
        <TextField
          required
          fullWidth
          placeholder={appLang.settings.currentPassword}
          variant="outlined"
          size="small"
          type={seeCurrent ? "text" : "password"}
          onChange={(e) => {
            setCurrent(e.target.value);
            setError("");
            setMessage("");
          }}
          value={current}
        />
        <i
          style={iconStyle}
          onClick={toggleSeeCurrent}
          className={seeCurrent ? "fas fa-eye-slash" : "fas fa-eye"}
        ></i>
      </div>
      <div className={classes.TextField}>
        <p className={classes.textTitle}>{appLang.settings.newPW}</p>
        <TextField
          required
          fullWidth
          placeholder={appLang.settings.newPW}
          variant="outlined"
          size="small"
          type={seeNew ? "text" : "password"}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setError("");
            setMessage("");
          }}
          value={newPassword}
        />
        <i
          style={iconStyle}
          onClick={toggleSeeNew}
          className={seeNew ? "fas fa-eye-slash" : "fas fa-eye"}
        ></i>
      </div>
      <div className={classes.TextField}>
        <p className={classes.textTitle}>{appLang.settings.confirmPW}</p>
        <TextField
          required
          fullWidth
          placeholder={appLang.settings.confirmPW}
          variant="outlined"
          size="small"
          type={seeConfirm ? "text" : "password"}
          onChange={(e) => {
            setConfirmPW(e.target.value);
            setError("");
            setMessage("");
          }}
          value={confirmPW}
        />
        <i
          style={iconStyle}
          onClick={toggleSeeConfirm}
          className={seeConfirm ? "fas fa-eye-slash" : "fas fa-eye"}
        ></i>
        <p
          style={{ color: Colors.blue }}
          className={classes.forgot}
          onClick={forgotPw}
        >
          {appLang.settings.forgotYourPw}
        </p>
        <button type="submit" className={classes.updateBtn} style={buttonStyle}>
          {loading ? <Loader /> : appLang.settings.updateBtn}
        </button>
      </div>
    </form>
  );
};

export default PWForm;
