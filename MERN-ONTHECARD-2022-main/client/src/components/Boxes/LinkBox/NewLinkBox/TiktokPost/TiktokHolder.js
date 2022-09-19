import React from "react";
import classes from "./TiktokPost.module.css";

const TiktokHolder = () => {
  return (
    <div className={classes.holder}>
      <blockquote
        className={["tiktok-embed", classes.blockStyle].join(" ")}
        cite="https://www.tiktok.com/@blancobun/video/6997108424156646662"
        data-video-id=""
      >
        <section></section>
      </blockquote>{" "}
    </div>
  );
};

export default TiktokHolder;
