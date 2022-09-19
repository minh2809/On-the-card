import React from "react";
import classes from "./Contact.module.css";

export default function SaveContact({ onClick }) {
  return (
    <div className={classes.saveContactBtn} onClick={onClick}>
      LƯU LIÊN LẠC
    </div>
  );
}
