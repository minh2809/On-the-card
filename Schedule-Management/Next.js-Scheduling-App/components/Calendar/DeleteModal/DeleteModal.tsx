import React from "react";
import classes from "./DeleteModal.module.scss";

type TypesProp = {
  onDelete: () => void;
  onClose: () => void;
  eventText: string | number;
};

const DeleteModal = ({ onDelete, eventText, onClose }: TypesProp) => {
  return (
    <div>
      <div className={classes.deleteEventModal}>
        <h2>Event</h2>

        <p className={classes.eventText}>{eventText}</p>

        <button onClick={onDelete} className={classes.deleteButton}>
          Delete
        </button>
        <button onClick={onClose} className={classes.closeButton}>
          Close
        </button>
      </div>

      <div className={classes.modalBackDrop}></div>
    </div>
  );
};

export default DeleteModal;
