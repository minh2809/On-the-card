import React from "react";
import classes from "./Modal.module.css";
import MainButton from "../../../UI/Button/MainButton/MainButton";

const PurchaseConfirm = (props) => {
  const { title, subtext, error, closeText } = props;
  const { close, subtext2 } = props;

  return (
    <div className={classes.Modal}>
      {!error && <h3 className={classes.confirmPurchase}>{title}</h3>}
      <p className={error ? classes.errorPurchase : null}>{subtext}</p>
      {!error && <p>{subtext2}</p>}
      <div className={classes.buttonContainer}>
        <MainButton black msgModal onClick={close}>
          {closeText}
        </MainButton>
      </div>
    </div>
  );
};

export default PurchaseConfirm;
