import React, { useState, useEffect } from "react";
import classes from "./ModalEdit.module.css";
import { loadIcons } from "../../../../utilities/load_icons";

const AccountChosen = ({ data, otherLink }) => {
  let icon = loadIcons(data.icon);
  let title = data.title;
  const [imgIcon, setImgIcon] = useState(false);

  useEffect(() => {
    if (data.icon) {
      data.icon.includes("http") || data.icon.includes("bank")
        ? setImgIcon(true)
        : setImgIcon(false);
    }
  }, [data.icon]);

  if (data.icon === "url") {
    icon = loadIcons("website");
    title = otherLink;
  }

  return (
    <div className={classes.AccountChosen}>
      {imgIcon ? (
        <div className={classes.spaceHolder} />
      ) : (
        <img src={icon} alt="" />
      )}
      <p>{title}</p>
    </div>
  );
};

export default AccountChosen;
