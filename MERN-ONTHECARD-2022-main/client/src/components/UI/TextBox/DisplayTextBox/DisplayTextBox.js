import React from "react";
import classes from "./Display.module.css";

const DisplayTextBox = (props) => {
  const { content, copyClicked, copied, copiedText, copyText } = props;
  const { emailBox, phoneBox } = props;
  const containerStyle = [classes.copyLinkContainer];
  const copyClick = () => copyClicked(content);

  if (emailBox || phoneBox) {
    containerStyle.push(classes.infoBox);
  }

  return (
    <div className={containerStyle.join(" ")}>
      <p className={(emailBox || phoneBox) && classes.content}>{content}</p>
      <p onClick={emailBox || phoneBox ? copyClick : copyClicked}>
        {emailBox && <i className="far fa-paper-plane"></i>}{" "}
        {phoneBox && <i className="fas fa-mobile-alt"></i>}{" "}
        {copied ? copiedText : copyText}
      </p>
    </div>
  );
};

export default DisplayTextBox;
