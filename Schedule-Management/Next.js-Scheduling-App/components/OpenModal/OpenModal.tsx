import React, { useState } from "react";
import classes from "./OpenModal.module.scss";

type TypesProp = {
  onSave: (title: string | number) => void;
  onClose: () => void;
};

const OpenModal = ({ onSave, onClose }: TypesProp) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);

  return (
    <div>
      <div className={classes.newEventModal}>
        <h2>New Event</h2>

        <input
          className={error ? "error" : ""}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id={classes["eventTitleInput"]}
          placeholder="Event Title"
        />

        <button
          onClick={() => {
            if (title) {
              setError(false);
              onSave(title);
            } else {
              setError(true);
            }
          }}
          className={classes.saveButton}
        >
          Save
        </button>

        <button onClick={onClose} className={classes.cancelButton}>
          Cancel
        </button>
      </div>

      <div className={classes.modalBackDrop}></div>
    </div>
  );
};

export default OpenModal;
