import React from "react";
import classes from "../ModalRetrieve/ModalRetrieve.module.css";
import Spinner from "../../Spinner/Spinner";

const ModalLoad = (props) => {
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
        {props.h5text}
      </h5>
    </div>
  );
};

export default ModalLoad;
