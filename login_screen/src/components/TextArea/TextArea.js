import React from "react";
import classes from "./TextArea.module.css";

const Textarea = (props) => {
  const { value, title, rows, cols, setValue, editOff, type} = props;
  const { marginTop, marginBottom, marginRight, marginLeft } = props;
  const { placeHolder, isNumber,  fontSize, bold, lowerCase,width } = props;
  const { top, left, bottom ,right, position } = props;

  const styleObjectContainer = {};
  const styleObjectTextArea = {};
  const containerClass = [classes.container];
  const textAreaClass = [classes.textArea];

  if (marginTop) styleObjectContainer.marginTop = marginTop;
  if (marginBottom) styleObjectContainer.marginBottom = marginBottom;
  if (marginRight) styleObjectContainer.marginRight = marginRight;
  if (marginLeft) styleObjectContainer.marginLeft = marginLeft;
  if (width) styleObjectContainer.width = width;



  if (top) styleObjectContainer.top = top;
  if (right) styleObjectContainer.right = right;
  if (left) styleObjectContainer.left = left;
  if (bottom) styleObjectContainer.bottom = bottom;
  if (position) styleObjectContainer.position = position;

  if (fontSize) styleObjectTextArea.fontSize = fontSize;
  if (bold) styleObjectTextArea.fontWeight = "600";

  const onChangeText = (event) => {
    let val = event.target.value;

    if (isNumber) {
      const invalidChars = /[^0-9.]/;
      if (invalidChars.test(val)) val = val.replace(invalidChars, "");
    }

    if (lowerCase) val = event.target.value.toLowerCase();

    setValue(val);
  };
  
  return (
    <div style={styleObjectContainer} className={containerClass.join(" ")}>
      <label>{title}</label>
      <input
        rows={rows}
        cols={cols}
        style={styleObjectTextArea}
        onChange={onChangeText}
        className={textAreaClass.join(" ")}
        value={value || ""}
        placeholder={placeHolder}
        type={type}
        readOnly={editOff}
        
      />
      
    </div>
  );
};

export default Textarea;