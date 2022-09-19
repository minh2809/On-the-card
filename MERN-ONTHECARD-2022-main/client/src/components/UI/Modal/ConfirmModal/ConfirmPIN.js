import React, { useState } from "react";
import classes from "./Modal.module.css";
import MainButton from "../../../UI/Button/MainButton/MainButton";
import TextField from "@material-ui/core/TextField";
import { Colors } from "../../../../utilities/colors";
import * as api from "../../../../api/api";
import { useParams } from "react-router-dom";
import Loader from "../../Spinner/Loading";
import { translate } from "../../../../language/backEndTranslate";

import { useDispatch, useSelector } from "react-redux";
import { setUserInfo, setToken } from "../../../../store/actionCreators";
import { setStorePage, setEnterprise } from "../../../../store/actionCreators";
import * as actionTypes from "../../../../store/actionTypes";
import { useHistory } from "react-router-dom";

import { saveContact } from "../../../../utilities/vCardHelper";

const ConfirmPIN = () => {
  let secureUserName = false;
  const { token, appLanguage, appLang } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [PIN, setPIN] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateError = appLang.settings.PINError;

  if (window.location.pathname.includes("/userName/")) {
    secureUserName = true;
  }

  const onChange = (event) => {
    const enteredValue = event.target.value;
    setPIN(enteredValue.replace(/[^\d]/g, ""));
    if (error && enteredValue) {
      setError("");
    }
  };

  const setFetchedUserName = (data) => {
    setFetchedData(data);
    return history.push(`/${id}`);
  };

  const confirmPIN = async () => {
    setLoading(true);
    if (PIN === 0 || PIN.length > 9 || PIN === "") {
      setError(validateError);
    } else {
      if (secureUserName) {
        const res = await api.fetchDataUserNamePIN(id, false, "1", PIN, token);
        res.data.error
          ? setError(translate(res.data.error, appLanguage))
          : setFetchedUserName(res.data);
      } else {
        const res = await api.fetchBySerialNoPIN(id, PIN, token);
        res.data.error
          ? setError(translate(res.data.error, appLanguage))
          : setFetchSerialNo(res.data);
      }
    }
    return setLoading(false);
  };

  const setFetchSerialNo = (data) => {
    if (data.data.redirectMode && data.data.redirectLink.includes("http")) {
      return window.location.replace(data.data.redirectLink);
    }

    setFetchedData(data);
    setTimeout(() => {
      data.data.redirectSaveContact && saveContact(data.data);
    }, 1500);
    return history.push(`/${data.data.userName}`);
  };

  const setFetchedData = (data) => {
    dispatch(setUserInfo(data.data, data.analyticData));
    dispatch(setStorePage(data.storePage));
    dispatch(setEnterprise(data.enterprisePage));
    dispatch(setToken(data.token));
    dispatch({ type: actionTypes.PERSONAL_PAGE_VISITED });
  };

  return (
    <div className={classes.Modal}>
      <h3>{appLang.settings.PINTitleViewPage}</h3>
      <div className={classes.textField}>
        <TextField
          fullWidth
          id="outlined-name-small"
          placeholder={appLang.settings.placeHolderViewPage}
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
        {loading && (
          <MainButton black msgModal onClick={confirmPIN}>
            <Loader />
          </MainButton>
        )}

        {!loading && (
          <MainButton black msgModal onClick={confirmPIN}>
            <i className="fas fa-sign-in-alt"></i>{" "}
            {appLang.settings.viewPagePINEnter}
          </MainButton>
        )}
      </div>
    </div>
  );
};

export default ConfirmPIN;
