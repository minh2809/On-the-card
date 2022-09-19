import React, { useState } from "react";
import classes from "./Options.module.css";
import { Colors } from "../../../utilities/colors";
import PWForm from "./PWForm";
import ErrorBadge from "../../../components/UI/ErrorBadge/ErrorBadge";
import SuccessBadge from "../../../components/UI/ErrorBadge/SuccessBadge";
import { useSelector } from "react-redux";

const ChangePW = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { appLang } = useSelector((state) => state);

  const toggleForm = () => {
    setOpen(!open);
    setError("");
    setMessage("");
  };

  return (
    <div>
      <div className={classes.option}>
        <p className={classes.optionTitle}>{appLang.settings.changePWTitle}</p>
        <div
          className={classes.optionButton}
          style={{
            backgroundColor: open ? Colors.red : Colors.black,
            color: Colors.white,
          }}
          onClick={toggleForm}
        >
          {open && <i className="fas fa-times"></i>}{" "}
          {open
            ? appLang.profile.button.close
            : appLang.settings.changePWButton}{" "}
          {open && <i className="fas fa-times"></i>}
        </div>
      </div>
      {(error || message) && (
        <div className={classes.badgeContainer}>
          {error && <ErrorBadge message={error} />}
          {message && <SuccessBadge message={message} />}
        </div>
      )}
      {open && <PWForm setError={setError} setMessage={setMessage} />}
    </div>
  );
};

export default ChangePW;
