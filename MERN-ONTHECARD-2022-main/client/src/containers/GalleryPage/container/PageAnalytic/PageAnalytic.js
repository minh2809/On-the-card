import React from "react";
import Paragraph from "../../components/Typography/Paragraph";
import classes from "./PageAnalytic.module.css";

function PageAnalytic({ mobile, preview }) {
  const containerClass = mobile
    ? [classes.mobileAnalyticContainer]
    : [classes.analyticContainer];

  if (preview) {
    containerClass.push(classes.preview);
  }

  return (
    <div className={containerClass.join(" ")}>
      <Paragraph>
        <span style={{ fontWeight: "600" }}>32</span> {mobile && <br />} Posts
      </Paragraph>
      <Paragraph>
        <span style={{ fontWeight: "600" }}>185</span> {mobile && <br />} Page
        Views
      </Paragraph>
      <Paragraph>
        <span style={{ fontWeight: "600" }}>62</span> {mobile && <br />} Likes
      </Paragraph>
    </div>
  );
}

export default PageAnalytic;
