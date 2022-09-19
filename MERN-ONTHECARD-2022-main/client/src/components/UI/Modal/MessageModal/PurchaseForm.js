import React, { useState } from "react";
import classes from "./MessageModal.module.css";
import SimpleTextBox from "../../TextBox/SimpleTextBox/SimpleTextBox";
import MainButton from "../../Button/MainButton/MainButton";
import { useSelector } from "react-redux";
import { Vietnamese, English } from "../../../../language/language";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { Validator } from "../../../../utilities/validation";
import * as api2 from "../../../../api/api2";

const PurchaseForm = (props) => {
  const { closeModal, openLoading } = props;
  const { closeLoading, setResult, productData } = props;

  const { appLanguage, token, userInfo } = useSelector((state) => state);
  const appLang = appLanguage === "VIETNAMESE" ? Vietnamese : English;
  const messageInfo = appLang.viewPage.messageForm;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState("");

  const onChangeFN = (value) => setFullName(value);
  const onChangeEmail = (value) => {
    const sanitized = value.toLowerCase().split(" ").join("");
    setEmail(sanitized);
  };
  const onChangeNumber = (value) => setNumber(value);
  const onChangeQuantity = (value) => setQuantity(value);

  const validate = () => {
    openLoading();
    const errorExist = Validator.orderValidation(
      fullName,
      email,
      number,
      quantity,
      address,
      appLang.errors.validation
    );

    errorExist ? alert(errorExist) : sendMessage();
    errorExist && closeLoading();
    !errorExist && closeModal();
  };

  const sendMessage = async () => {
    const orderData = { fullName, email, number, quantity, address };
    orderData.userName = userInfo.userName;
    orderData.serialNo = userInfo.serialNo;
    orderData.company = userInfo.company;
    orderData.userEmail = userInfo.email;
    orderData.userFullName = userInfo.fullName;
    const res = await api2.sendOrder(orderData, productData, token);
    setResult(res);
    closeLoading();
  };

  return (
    <div className={[classes.Modal, classes.PurchaseForm].join(" ")}>
      <div className={classes.closeButton} onClick={closeModal}>
        <i className="fas fa-times"></i>
      </div>
      <h3 className={classes.title}>
        {messageInfo.orderInfo}
        <br /> <span> {productData.title} </span>
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
        <SimpleTextBox
          textHolder={messageInfo.quantity}
          textEntered={onChangeQuantity}
          modalShow
          number
        />
        <TextareaAutosize
          aria-label="maximum height"
          placeholder={messageInfo.shippingAddress}
          className={classes.textArea}
          onChange={(event) => setAddress(event.target.value)}
        />
      </div>
      <div className={classes.divide}></div>
      <div className={classes.buttonContainer}>
        <MainButton black imageModal onClick={validate}>
          <i className="fas fa-shopping-cart"></i> {messageInfo.sendOrder}
        </MainButton>
      </div>
    </div>
  );
};

export default PurchaseForm;
