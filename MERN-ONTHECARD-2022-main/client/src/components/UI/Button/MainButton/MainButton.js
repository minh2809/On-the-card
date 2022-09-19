import React from "react";
import classes from "./MainButton.module.css";

export default function MainInput(props) {
  const { type, text, onClick, editPage, imageModal, msgModal } = props;
  const { black, red } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      style={
        black
          ? { backgroundColor: "#282828" }
          : red
          ? { backgroundColor: "#d4423d" }
          : null
      }
      className={
        editPage
          ? classes.editPageButton
          : imageModal
          ? classes.imgModal
          : msgModal
          ? classes.msgModal
          : classes.button
      }
    >
      {props.children}
      {text}
    </button>
  );
}
