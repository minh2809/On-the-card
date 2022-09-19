import React, { useState } from "react";
import classes from "./Message.module.css";
import SimpleTextBox from "../UI/TextBox/SimpleTextBox/SimpleTextBox";
import MainButton from "../UI/Button/MainButton/MainButton";
import { getVNTime, getCATime } from "../../utilities/analytic_helper";
import { getOrderNote, getNewMsgArray } from "../../utilities/helper";
import { useSelector } from "react-redux";
import * as api2 from "../../api/api2";

const NoteOrder = (props) => {
  const { appLanguage } = useSelector((state) => state);
  const { appLang, data, closeNote } = props;
  const { messageData, token } = useSelector((state) => state);
  const { dayInWeek, messageModal } = appLang;
  const { noteTitle, noteHolder, returnNote } = messageModal;
  const { orderNote, noteWrittenOrder, noteWrittenConfirm } = messageModal;
  const { addNote, errorSent } = messageModal;
  const { returnToOrder } = messageModal;
  const dateObject =
    appLanguage === "VIETNAMESE"
      ? getVNTime(Date.now(), dayInWeek)
      : getCATime(Date.now(), dayInWeek);

  const modalStyle = [classes.Modal, classes.ModalSearch];
  const [textEntered, setTextEntered] = useState("");
  const [noteWritten, setNoteWritten] = useState(false);
  const [errorWriteNote, setErrorWriteNote] = useState("");
  let returnObject;

  const onChangeText = (eventValue) => {
    setTextEntered(eventValue);
  };

  const addNoteFunction = async () => {
    if (textEntered.length === 0) {
      return;
    }
    const newNote = getOrderNote(data, dateObject, textEntered, orderNote);
    getNewMsgArray(data._id, newNote, messageData);
    setNoteWritten(true);
    const res = await api2.sendOrderNotes(data._id, newNote, token);
    if (!res.success) {
      setErrorWriteNote(res.error);
    }
  };

  if (noteWritten || errorWriteNote) {
    modalStyle.push(classes.NoteOrderConfirm);
    returnObject = (
      <div className={modalStyle.join(" ")}>
        <h3
          style={{
            padding: errorWriteNote && "0px 10%",
            color: errorWriteNote ? "#d9534f" : "#2bb02b",
          }}
        >
          {errorWriteNote
            ? errorWriteNote
            : `${noteWrittenOrder} #${data.orderData.orderNumber}`}
        </h3>
        <p className={classes.confirmDes}>
          {errorWriteNote ? errorSent : noteWrittenConfirm}
        </p>

        <div className={classes.buttonContainer}>
          <MainButton black msgModal onClick={closeNote}>
            {returnToOrder}
          </MainButton>
        </div>
      </div>
    );
  } else {
    returnObject = (
      <div className={modalStyle.join(" ")}>
        <h3>{`${noteTitle} #${data.orderData.orderNumber}`}</h3>
        <div className={classes.textContainer}>
          <SimpleTextBox
            textHolder={noteHolder}
            textEntered={onChangeText}
            value={textEntered ? textEntered : ""}
          />
        </div>
        <div className={classes.buttonContainer}>
          <MainButton msgModal onClick={addNoteFunction}>
            {addNote}
          </MainButton>
          <MainButton black msgModal onClick={closeNote}>
            {returnNote}
          </MainButton>
        </div>
      </div>
    );
  }

  return returnObject;
};

export default NoteOrder;
