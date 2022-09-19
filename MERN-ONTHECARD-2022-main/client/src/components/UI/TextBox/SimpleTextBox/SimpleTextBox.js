import React, { useState, useEffect } from "react";
import classes from "./SimpleTextBox.module.css";

const SimpleTextBox = (props) => {
  const { title, textEntered, textHolder, modalShow } = props;
  const { defaultValue, url, number, value: val } = props;
  const [titleLong, setTitleLong] = useState(false);
  const [value, setValue] = useState(val || "");
  let noticeString = null;
  let cssClasses = [classes.input];

  if (title && titleLong) {
    noticeString = (
      <small className={classes.maxLengthReached}>
        Tên quá dài (quá 50 ký tự)
      </small>
    );
    cssClasses.push(classes.maxLengthReached);
  }

  useEffect(() => {
    if (modalShow === false) {
      setValue("");
    }
    if (defaultValue) {
      setValue(defaultValue);
    }
    if (val) {
      setValue(val);
    }
  }, [modalShow, defaultValue, val]);

  const updateInput = (event) => {
    textEntered(event.target.value);
  };

  return (
    <>
      <input
        type={number ? "number" : "text"}
        placeholder={textHolder}
        className={cssClasses.join(" ")}
        onChange={(event) => {
          const eventValue = event.target.value;
          title && eventValue.length > 50
            ? setTitleLong(true)
            : setTitleLong(false);
          setValue(eventValue);
          return updateInput(event);
        }}
        value={url ? value.replace(/\s/g, "") : value}
      ></input>
      {noticeString}
    </>
  );
};

export default SimpleTextBox;
