import React from "react";
import classes from "./ErrorBadge.module.css";

const SuccessBadge = ({ message }) => {
  return (
    message && (
      <div className={classes.messageContainerSuccess}>
        <h3>{message}</h3>
      </div>
    )
  );
};

export default SuccessBadge;
