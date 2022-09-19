import React, { useState } from "react";
import classes from "./Modal.module.css";
import MainButton from "../../../UI/Button/MainButton/MainButton";
import TextField from "@material-ui/core/TextField";
import { Colors } from "../../../../utilities/colors";
import * as api from "../../../../api/api2";
import { useSelector } from "react-redux";
import { translate } from "../../../../language/backEndTranslate";
import Loader from "../../Spinner/Loading";

const PINModal = (props) => {
  const { token, appLanguage, appLang } = useSelector((state) => state);

  const [PIN, setPIN] = useState(0);
  const [error, setError] = useState("");
  const [confirmBtn, setConfirmBtn] = useState(appLang.settings.confirmPIN);

  const { close, confirm, title } = props;
  const validateError = appLang.settings.PINError;

  const onChange = (event) => {
    const enteredValue = event.target.value;
    setPIN(enteredValue.replace(/[^\d]/g, ""));
    if (error && enteredValue) {
      setError("");
    }
  };

  const confirmPIN = async () => {
    setConfirmBtn(<Loader />);
    if (PIN === 0 || PIN.length > 9 || PIN === "") {
      setError(validateError);
    } else {
      const result = await api.setPIN(PIN, token);
      result.error
        ? setError(translate(result.error, appLanguage))
        : confirm(PIN);
    }
    return setConfirmBtn(appLang.settings.confirmPIN);
  };

  return (
    <div className={classes.Modal}>
      <h3>{title}</h3>
      <div className={classes.textField}>
        <TextField
          fullWidth
          id="outlined-name-small"
          placeholder={appLang.settings.placeHolder}
          variant="outlined"
          size="small"
          onChange={onChange}
          value={PIN !== 0 ? PIN : ""}
        />
      </div>
      {error && (
        <p style={{ color: Colors.red, width: "70%", left: "15%" }}>{error}</p>
      )}
      <div className={classes.buttonContainer}>
        <MainButton red={false} msgModal onClick={confirmPIN}>
          {confirmBtn}
        </MainButton>
        <MainButton black msgModal onClick={close}>
          {appLang.profile.button.close}
        </MainButton>
      </div>
    </div>
  );
};

export default PINModal;
