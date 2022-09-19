import React from "react";
import classes from "./PINPage.module.css";
import ConfirmPIN from "../../components/UI/Modal/ConfirmModal/ConfirmPIN";

const PINPage = () => {
  return (
    <div className={classes.container}>
      <ConfirmPIN />
    </div>
  );
};

export default PINPage;
