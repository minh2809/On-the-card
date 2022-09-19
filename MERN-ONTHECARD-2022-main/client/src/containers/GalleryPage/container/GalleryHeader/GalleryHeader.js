import React from "react";
import classes from "./GalleryHeader.module.css";
import Paragraph from "../../components/Typography/Paragraph";
import Title from "../../components/Typography/Title";
import PageAnalytic from "../PageAnalytic/PageAnalytic";
import headerAvatar from "../../../../assets/header/user.svg";

import { useSelector } from "react-redux";

function GalleryHeader(props) {
  const { preview } = props;
  const { galleryPage } = useSelector((state) => state);
  const { fullName, avatarURL, bio, bioLink } = galleryPage;

  const containerStyles = [classes.galleryContainer];
  const bioContainer = [classes.bioContainer];

  if (preview) {
    containerStyles.push(classes.galleryContainerPreview);
    bioContainer.push(classes.bioContainerPreview);
  }

  return (
    <div>
      <div className={containerStyles.join(" ")}>
        <img src={avatarURL || headerAvatar} alt="" />

        <div className={classes.profileContainer}>
          <Title fontSize="1.25rem" textAlign="start">
            {fullName}
          </Title>

          {!preview && <PageAnalytic />}

          <div className={bioContainer.join(" ")}>
            <Paragraph>{bio}</Paragraph>

            <Paragraph
              fontSize="0.95rem"
              marginTop="15px"
              primary
              cursorOn
              bold
            >
              {bioLink}
            </Paragraph>
          </div>
        </div>
      </div>
      <PageAnalytic preview={preview} mobile />
    </div>
  );
}

export default GalleryHeader;
