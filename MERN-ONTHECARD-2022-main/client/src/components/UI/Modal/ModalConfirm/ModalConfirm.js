import React from "react";
import classes from "./ModalConfirm.module.css";
import LandingButton from "../../Button/MainButton/MainButton";
import ConfirmModalImage from "../../../../assets/landing/confirm-modal-image.png";
import { useHistory } from "react-router-dom";

const ModalConfirm = (props) => {
  const { show, confirm, subText, buttonText } = props;
  const { close, editPage, error, email } = props;

  const history = useHistory();
  const modalContent = error ? error : confirm;
  const cssClasses = [
    classes.Modal,
    show ? classes.ModalOpen : classes.ModalClosed,
  ];
  const contentStyle = [classes.modalTitle];
  if (error) {
    contentStyle.push(classes.errorText);
  }
  const handleClick = () => {
    if (editPage) {
      return close();
    } else {
      return history.push("/signin");
    }
  };
  return (
    <div className={cssClasses.join(" ")}>
      <div className={classes.modalImageWrapper}>
        {!error && (
          <img
            src={ConfirmModalImage}
            className={classes.confirmModalImage}
            alt=""
          />
        )}
      </div>
      <div className={contentStyle.join(" ")}>
        {modalContent} {email && <div className={classes.email}>{email}</div>}
      </div>
      <div className={classes.modalConfirm}>{subText}</div>
      <div className={classes.confirmModalButton}>
        <LandingButton type="button" text={buttonText} onClick={handleClick} />
      </div>
    </div>
  );
};

export default ModalConfirm;
