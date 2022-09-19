import React from "react";
import classes from "./CloseModal.module.css";

const CloseModal = ({ closeModal, buttonText, imgModal }) => {
  const buttonClasses = [classes.dismissStyle];
  imgModal && buttonClasses.push(classes.imgModal);
  return (
    <div className={buttonClasses.join(" ")} onClick={closeModal}>
      {buttonText}
    </div>
  );
};

export default CloseModal;
