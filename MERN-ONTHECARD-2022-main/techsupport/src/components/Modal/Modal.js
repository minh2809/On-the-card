import React from "react";
import classes from "./Modal.module.css";
import Spinner from "../Spinner/Spinner";

const Modal = (props) => {
  const cssClasses = [
    classes.Modal,
    props.show ? classes.ModalOpen : classes.ModalClosed,
  ];
  return (
    <div className={cssClasses.join(" ")}>
      <Spinner />
      <h5
        style={{
          position: "relative",
          alignItems: "center",
          fontSize: "1.5rem",
        }}
      >
        Đang Tải...
      </h5>
    </div>
  );
};

export default Modal;
