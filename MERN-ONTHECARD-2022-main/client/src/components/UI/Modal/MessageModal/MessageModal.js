import React, { useState } from "react";
import classes from "./MessageModal.module.css";
import SimpleTextBox from "../../TextBox/SimpleTextBox/SimpleTextBox";
import MainButton from "../../Button/MainButton/MainButton";
import { useSelector } from "react-redux";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Checkbox from "@material-ui/core/Checkbox";
import { Validator } from "../../../../utilities/validation";
import * as api from "../../../../api/api";
import { specialUsers } from "../../../../utilities/helper";

const MessageModal = ({ closeModal, openLoading, closeLoading, setResult }) => {
  const { appLanguage, userInfo, token, appLang } = useSelector(
    (state) => state
  );
  const messageInfo = appLang.viewPage.messageForm;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [checked, setChecked] = useState(true);
  const condition = specialUsers(userInfo.userName);

  const onChangeFN = (value) => setFullName(value);
  const onChangeEmail = (value) => {
    const sanitized = value.toLowerCase().split(" ").join("");
    setEmail(sanitized);
  };
  const onChangeNumber = (value) => setNumber(value);
  const handleChange = () => setChecked(!checked);

  const validate = () => {
    openLoading();
    const errorExist = Validator.messageValidation(
      fullName,
      email,
      number,
      message,
      appLang.errors.validation
    );

    errorExist ? alert(errorExist) : sendMessage();
    errorExist && closeLoading();
    !errorExist && closeModal();
  };

  const sendMessage = async () => {
    const res = await api.sendMessage(
      fullName,
      email,
      number,
      message,
      checked,
      token
    );
    setResult(res);
    closeLoading();
  };

  return (
    <div className={classes.Modal}>
      <div className={classes.closeButton} onClick={closeModal}>
        <i className="fas fa-times"></i>
      </div>
      <h3 className={classes.title}>
        {messageInfo.leaveMessage}
        <br /> <span> {condition ? "ONTHECARD" : userInfo.fullName} </span>
      </h3>

      <div className={classes.input}>
        <SimpleTextBox
          textHolder={messageInfo.fullName}
          textEntered={onChangeFN}
          modalShow
          title
        />
        <SimpleTextBox
          textHolder={messageInfo.email}
          textEntered={onChangeEmail}
          modalShow
        />
        <SimpleTextBox
          textHolder={messageInfo.phoneNumber}
          textEntered={onChangeNumber}
          modalShow
        />
        <TextareaAutosize
          aria-label="maximum height"
          placeholder={messageInfo.message}
          className={classes.textArea}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>
      {email ? (
        <div className={classes.checkBoxArea} onClick={handleChange}>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "primary checkbox" }}
            style={checked ? { color: "#0275d8" } : { color: "black" }}
          />
          {messageInfo.emailMe}{" "}
          {appLanguage === "VIETNAMESE" ? userInfo.fullName : null}
        </div>
      ) : (
        <div className={classes.divide}></div>
      )}
      <div className={classes.buttonContainer}>
        <MainButton black imageModal onClick={validate}>
          <i className="fas fa-paper-plane"></i> {messageInfo.sendMessage}
        </MainButton>
      </div>
    </div>
  );
};

export default MessageModal;
