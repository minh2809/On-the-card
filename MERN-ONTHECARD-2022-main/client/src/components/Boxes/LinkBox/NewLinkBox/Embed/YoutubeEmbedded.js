import React from "react";
import classes from "./Embed.module.css";
import ReactPlayer from "react-player/lazy";

const YoutubeEmbedded = ({ url, desktopPreview }) => {
  const container = [classes.output];
  desktopPreview && container.push(classes.LinkBoxPreview);
  return (
    <div className={container.join(" ")}>
      <ReactPlayer
        url={url || " "}
        controls={true}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default YoutubeEmbedded;
