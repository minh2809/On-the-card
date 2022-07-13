import React, {useState} from "react";
import classes from "./icon.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = () =>{
  const [visible, setVisiblity] = useState(false);
  const Icon = (
    <FontAwesomeIcon icon ={visible ? "eye-slash" : "eye"} className={classes.icon} onClick={() => setVisiblity(visiblity => !visiblity)}/>
  )
  const InputType = visible ? "text" : "password";

  return [InputType, Icon];
}

export default Icon;