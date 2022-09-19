import React, { useState, useEffect } from "react";
import classes from "./TiktokPost.module.css";
import { getVideoIDByLink } from "../../../../../utilities/helper";
import Spinner from "../../../../UI/Spinner/SpinnerEmbed";

const TiktokPost = (props) => {
  const [tiktok, setTiktok] = useState(false);
  const { demo, postLink } = props;
  const videoId = getVideoIDByLink(postLink);

  useEffect(() => {
    if (tiktok === false) {
      const s = document.createElement("script");
      s.async = s.defer = true;
      s.src = `https://www.tiktok.com/embed.js`;
      s.id = "react-tiktok-embed-script";

      const body = document.body;
      if (body) {
        body.appendChild(s);
      }

      setTiktok(true);
    }
  }, [tiktok]);

  return (
    <div className={demo ? classes.demo : classes.container}>
      <blockquote
        className={["tiktok-embed", classes.blockStyle].join(" ")}
        data-video-id={videoId}
        style={{
          maxWidth: "605px",
        }}
      >
        <section>
          <div className={demo ? classes.loadingDemo : classes.loading}>
            <Spinner small />
          </div>
        </section>
      </blockquote>
    </div>
  );
};

export default TiktokPost;
