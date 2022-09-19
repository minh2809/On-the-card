import React from "react";
import classes from "./Message.module.css";

const Button = (props) => {
  const { children, black, onClick } = props;
  const buttonStyle = [classes.buttonStyle];

  black && buttonStyle.push(classes.buttonBlack);

  return (
    <div className={buttonStyle.join(" ")} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
