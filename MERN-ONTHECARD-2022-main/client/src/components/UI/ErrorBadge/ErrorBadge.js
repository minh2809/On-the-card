import React from "react";
import classes from "./ErrorBadge.module.css";

const ErrorBadge = ({ message }) => {
  return (
    message && (
      <div className={classes.messageContainer}>
        <h3>{message}</h3>
      </div>
    )
  );
};

export default ErrorBadge;
