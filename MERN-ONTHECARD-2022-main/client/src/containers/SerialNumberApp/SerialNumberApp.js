import React, { useState, useContext } from "react";
import classes from "./SerialNumberApp.module.css";
import TextBox from "../../components/UI/TextBox/TextBox";
import BlackButton from "../../components/UI/Button/BlackButton/BlackButton";
import { AuthContext } from "../../context/auth-context";
import * as api from "../../api/api2";
import { setToken } from "../../store/actionCreators";
import { useDispatch } from "react-redux";

const SerialNoApp = React.memo((props) => {
  const [passCode, setPassCode] = useState("");
  const [showError, setShowError] = useState(false);
  const authContext = useContext(AuthContext);
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const buttonClicked = async () => {
    const result = await api.loginGetSerial(passCode);
    dispatch(setToken(result.token));
    if (result.success) {
      setShowError(false);
      authContext.loginSerialNo();
      props.history.replace("/admin/serialnumber/mainactivity");
    } else {
      setShowError(true);
    }
  };

  return (
    <div className={classes.pageStyling}>
      <h1>Serial Number App</h1>
      <div className={classes.TextBox}>
        <form onSubmit={submitHandler}>
          <TextBox
            iconClasses="fas fa-qrcode"
            textboxName="Nhập Mã Đăng Nhập....."
            changed={(event) => setPassCode(event.target.value)}
            className={classes.inputStyle}
          />
          <p
            className={
              showError ? classes.errorTextShow : classes.errorTextHide
            }
          >
            *Sai Mã Đăng Nhập / Wrong Passcode
          </p>
          <BlackButton
            content="Đăng Nhập"
            iconClass="fa fa-arrow-right"
            clicked={buttonClicked}
          />
          <br />
        </form>
      </div>
    </div>
  );
});

export default SerialNoApp;
