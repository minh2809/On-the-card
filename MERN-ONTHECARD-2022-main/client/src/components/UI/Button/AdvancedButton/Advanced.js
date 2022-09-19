import React from "react";
import classes from "./Advanced.module.css";

const Advanced = ({ children, onClick }) => {
  return (
    <div onClick={onClick} className={classes.buttonContainer}>
      {children}
    </div>
  );
};

export default Advanced;
