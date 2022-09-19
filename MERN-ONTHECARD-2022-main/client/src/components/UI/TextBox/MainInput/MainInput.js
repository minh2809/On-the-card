import React, { useState } from "react";
import classes from "./MainInput.module.css";
import IconWarning from "../../../../assets/icons/icon-warning-outline.png";

export default function MainInput(props) {
  const { type, placeholder, value, onChange, label, hint, lowerCase } = props;
  const [inputType, setInputType] = useState(type);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [openHint, setOpenHint] = useState(false);
  const hintLength = hint ? hint.length : 1;

  const hintClass =
    hintLength > 45 ? classes.fullNameLabelRight : classes.fullNameLabelShort;

  const showPassword = () => {
    setInputType(!isShowPassword ? "text" : "password");
    setIsShowPassword(!isShowPassword);
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
              onClick={() => setOpenHint(!openHint)}
            />
          )}
        </div>
        {hint && openHint && <div className={hintClass}>{hint}</div>}
      </div>
      <div className={classes.rootWrapper}>
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            lowerCase || type === "email"
              ? onChange(e.target.value.toLowerCase().replace(/\s/g, ""))
              : onChange(e.target.value);
          }}
          className={classes.input}
          required
        />
        {type === "password" && !isShowPassword && (
          <div className={classes.eyeIcon} onClick={showPassword}>
            <i className="far fa-eye"></i>
          </div>
        )}
        {isShowPassword && (
          <div className={classes.eyeIcon} onClick={showPassword}>
            <i className="fas fa-eye-slash"></i>
          </div>
        )}
      </div>
    </div>
  );
}
