import React, { useState } from "react";
import classes from "./Message.module.css";
import SimpleTextBox from "../UI/TextBox/SimpleTextBox/SimpleTextBox";
import MainButton from "../UI/Button/MainButton/MainButton";

const SearchModal = (props) => {
  const { setTitle, close, appLang, search, value, order } = props;
  const { searchTitle, name, search2, close: closeText } = appLang.messageModal;
  const { searchTerms, searchOrderTitle } = appLang.messageModal;
  const modalStyle = [classes.Modal, classes.ModalSearch];
  const [textEntered, setTextEntered] = useState(false);

  const onChangeText = (eventValue) => {
    setTitle(eventValue);
    if (!textEntered) {
      setTextEntered(true);
    }
  };

  return (
    <div className={modalStyle.join(" ")}>
      <h3>{order ? searchOrderTitle : searchTitle}</h3>
      <div className={classes.textContainer}>
        <SimpleTextBox
          title
          textHolder={order ? searchTerms : name}
          textEntered={onChangeText}
          value={textEntered ? value : ""}
        />
      </div>
      <div className={classes.buttonContainer}>
        <MainButton msgModal onClick={search}>
          {search2}
        </MainButton>
        <MainButton black msgModal onClick={close}>
          {closeText}
        </MainButton>
      </div>
    </div>
  );
};

export default SearchModal;
