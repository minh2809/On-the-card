import React, { useState } from "react";
import classes from "./Message.module.css";
import DisplayTextBox from "../UI/TextBox/DisplayTextBox/DisplayTextBox";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { getVNTime, getCATime } from "../../utilities/analytic_helper";
import MainButton from "../UI/Button/MainButton/MainButton";
import NoteOrder from "./NoteOrder";
import { useSelector } from "react-redux";

const Modal = ({ data, appLang, close, deleteProp, order }) => {
  const { appLanguage, client, userInfo } = useSelector((state) => state);
  const messageInfo = appLang.viewPage.messageForm;
  const { dayInWeek } = appLang;
  const dateObject =
    appLanguage === "VIETNAMESE"
      ? getVNTime(data.createdAt, dayInWeek)
      : getCATime(data.createdAt, dayInWeek);
  const { date, weekDay, timeInDay } = dateObject;
  const [deleteMsg, setDeleteMsg] = useState(false);
  const [deletedConfirm, setDeletedConfirm] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);

  const closeNote = () => setNoteOpen(false);

  const text = appLang.messageModal;
  const { orderDesc, shippingAddress, sellerName } = appLang.b2bText;

  const { orderNumber, productName, price, quantity, address } = data.orderData;
  var nf = new Intl.NumberFormat();
  const formattedPrice = nf.format(price);
  const sellerData = client.serialArray.filter((item) => {
    if (item.serialNo === data.serialNo) {
      return true;
    }
    return false;
  });

  let returnObject;

  const messageTitle = `${messageInfo.messageFrom} ${data.fullName}`;
  const orderTitle = `${appLang.b2bText.titleOrder}${orderNumber} - ${data.fullName}`;
  let orderInfo = `${appLang.b2bText.orderInfo} \n\n${orderDesc} ${data.fullName}\n${appLang.b2bText.product}: ${productName} \n${appLang.b2bText.price} ${formattedPrice} ${appLang.b2bText.currency}  \n${appLang.b2bText.purchasedQuantity}: ${quantity} \n\n-------------------------\n${shippingAddress}: \n\n${address}`;
  if (userInfo.isAdmin && userInfo.company && sellerData.length > 0) {
    orderInfo = `${appLang.b2bText.orderInfo} \n\n${sellerName} ${sellerData[0].fullName} (${sellerData[0].userName}) \n\n${orderDesc} ${data.fullName}\n${appLang.b2bText.product}: ${productName} \n${appLang.b2bText.price} ${formattedPrice} ${appLang.b2bText.currency}  \n${appLang.b2bText.purchasedQuantity}: ${quantity} \n\n-------------------------\n${shippingAddress}: \n\n${address}`;
  }
  const fullOrderInfo = orderInfo + data.message;

  const sendEmail = (email) => {
    window.open("mailto:" + email);
  };
  const call = (number) => {
    window.location.href = "tel:" + number;
  };
  const openDelete = () => setDeleteMsg(true);
  const closeDelete = () => setDeleteMsg(false);

  const deleteMessage = () => {
    setDeleteMsg(false);
    setDeletedConfirm(true);
    deleteProp(data);
  };

  const noteForOrder = () => {
    setNoteOpen(true);
  };

  if (deleteMsg && !deletedConfirm) {
    const modalStyle = [classes.Modal];
    const titleStyle = [classes.title, classes.titleConfirm];
    returnObject = (
      <div className={modalStyle.join(" ")}>
        <h3 className={titleStyle.join(" ")}>{text.deleteConfirm}</h3>
        <div className={classes.buttonContainer}>
          <MainButton red msgModal onClick={deleteMessage}>
            {text.deleteMessage}
          </MainButton>
          <MainButton black msgModal onClick={closeDelete}>
            {text.return}
          </MainButton>
        </div>
      </div>
    );
  } else if (!deleteMsg && deletedConfirm) {
    const modalStyle = [classes.Modal, classes.ModalConfirm];
    const titleStyle = [classes.title];

    returnObject = (
      <div className={modalStyle.join(" ")}>
        <h3 className={titleStyle.join(" ")}>{text.messageDeleted}</h3>

        <div className={classes.buttonContainer}>
          <MainButton black msgModal onClick={close}>
            {text.close}
          </MainButton>
        </div>
      </div>
    );
  } else {
    returnObject = (
      <div>
        <div
          style={{ display: noteOpen ? "none" : "block" }}
          className={classes.Modal}
        >
          <h3 className={classes.title}>
            {order ? orderTitle : messageTitle} <br />
            <span>
              {weekDay}, {date}, {timeInDay} 
            </span>
          </h3>

          <DisplayTextBox
            emailBox
            content={data.email}
            copyText={text.sendEmail}
            copyClicked={sendEmail}
          />

          <DisplayTextBox
            phoneBox
            content={data.phoneNumber}
            copyText={text.call}
            copyClicked={call}
          />

          <TextareaAutosize
            rows={8}
            aria-label="maximum height"
            className={classes.textArea}
            value={order ? fullOrderInfo : data.message}
          />

          <div className={classes.buttonContainer}>
            {!order && (
              <MainButton red msgModal onClick={openDelete}>
                {text.deleteMessage}
              </MainButton>
            )}
            {order && (
              <MainButton blue msgModal onClick={noteForOrder}>
                {text.note}
              </MainButton>
            )}
            <MainButton black msgModal onClick={close}>
              {text.close}
            </MainButton>
          </div>
        </div>
        {noteOpen && (
          <NoteOrder appLang={appLang} data={data} closeNote={closeNote} />
        )}
      </div>
    );
  }

  return returnObject;
};

export default Modal;
