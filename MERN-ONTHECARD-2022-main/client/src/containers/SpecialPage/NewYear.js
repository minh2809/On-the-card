import React from "react";
import classes from "./SpecialPage.module.css";
import tet_video from "../../assets/video/tet.mp4";

export default function NewYear() {
  return (
    <div className={classes.videoContainer}>
      <video
        id="vid"
        width="325"
        height="625"
        controls
        autoPlay
        playsInline
        loop
        muted
        className={classes.video}
      >
        <source src={tet_video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
