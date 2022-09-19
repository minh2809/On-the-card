import React, { useState, useEffect } from "react";
import classes from "./MainInput.module.css";
import IconWarning from "../../../../assets/icons/icon-warning-outline.png";

export default function MainInputAccount(props) {
  const {
    type,
    placeholder,
    value,
    onChange,
    label,
    hint,
    lowerCase,
    errorMessage,
  } = props;
  const [inputType, setInputType] = useState(type);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [openHint, setOpenHint] = useState(false);
  const [messageStyles, setMessageStyles] = useState([classes.message]);
  const [roofStyles, setRoofStyles] = useState([classes.roof]);
  const [inputClasses, setInputClasses] = useState([classes.input]);

  useEffect(() => {
    if (errorMessage) {
      setMessage(errorMessage);
      setShowMessage(true);
      setMessageStyles([classes.message, classes.errorMessage]);
      setRoofStyles([classes.roof, classes.errorMessage]);
      setInputClasses([classes.input, classes.inputError]);
    }
    !errorMessage && setInputClasses([classes.input]);
  }, [errorMessage]);

  const toggleHint = () => {
    setMessage(hint);
    setOpenHint(!openHint);
    setShowMessage(!showMessage);
    setMessageStyles([classes.message, classes.infoMessage]);
    setRoofStyles([classes.roof, classes.infoMessage]);
  };

  const showPassword = () => {
    setInputType(!isShowPassword ? "text" : "password");
    setIsShowPassword(!isShowPassword);
    setInputClasses([classes.input]);
  };

  const onChangeHandler = (event) => {
    lowerCase || type === "email"
      ? onChange(event.target.value.toLowerCase().replace(/\s/g, ""))
      : onChange(event.target.value);
    errorMessage && setShowMessage(false);
    errorMessage && setInputClasses([classes.input]);
  };

  return (
    <div className={classes.inputWrapper}>
      <div className={classes.labelRow}>
        <div className={classes.labelWrapper}>
          <label className={classes.label}>{label}</label>
          {hint && (
            <img
              src={IconWarning}
              className={classes.iconWarning}
              alt=""
              onClick={toggleHint}
            />
          )}
        </div>
      </div>
      <div className={classes.rootWrapper}>
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChangeHandler(e)}
          className={inputClasses.join(" ")}
          required
        />
        {type === "password" && !isShowPassword && (
          <div className={classes.eyeIcon} onClick={showPassword}>
            <i className="far fa-eye"></i>
            {showMessage && <div className={roofStyles.join(" ")}></div>}
          </div>
        )}
        {isShowPassword && (
          <div className={classes.eyeIcon} onClick={showPassword}>
            <i className="fas fa-eye-slash"></i>
            {showMessage && <div className={roofStyles.join(" ")}></div>}
          </div>
        )}
        {type !== "password" && showMessage && (
          <div
            className={classes.eyeIcon}
            onClick={() => setShowMessage(!showMessage)}
          >
            <i className="fas fa-exclamation-circle"></i>
            <div className={roofStyles.join(" ")}></div>
          </div>
        )}
      </div>
      {showMessage && (
        <div className={messageStyles.join(" ")}>
          <h3>{message}</h3>
        </div>
      )}
    </div>
  );
}
