import React from "react";
import classes from "./Modal.module.css";
import MainButton from "../../../UI/Button/MainButton/MainButton";
import Loading from "../../Spinner/Loading";

const ConfirmModal = (props) => {
  const { title, subtext, confirmText, closeText } = props;
  const { close, confirm, inactive, loading } = props;

  return (
    <div className={classes.Modal}>
      <h3>{title}</h3>
      <p>{subtext}</p>
      <div className={classes.buttonContainer}>
        {confirmText && (
          <MainButton
            black={loading}
            red={!inactive}
            msgModal
            onClick={confirm}
          >
            {loading && <Loading />}
            {!loading && confirmText}
          </MainButton>
        )}
        <MainButton black msgModal onClick={close}>
          {closeText}
        </MainButton>
      </div>
    </div>
  );
};

export default ConfirmModal;
