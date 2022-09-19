import React from "react";
import classes from "./ImageGrid.module.css";
import ImageItem from "../../components/ImageItem/ImageItem";

import image2 from "../../assets/image2.jpeg";
import image3 from "../../assets/image3.jpeg";
import image4 from "../../assets/image4.jpeg";

import image5 from "../../assets/image5.jpeg";
import image6 from "../../assets/image6.jpeg";
import image7 from "../../assets/image7.jpeg";

import image8 from "../../assets/image8.jpeg";
import image9 from "../../assets/image9.jpeg";
import image10 from "../../assets/image10.jpeg";

const imgArray = [
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,

  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
];

const processedArray = [];
let tempArray = [];

// console log the processedArray to see what this loop does
for (let i = 0; i < imgArray.length; i++) {
  tempArray.push(imgArray[i]);

  if ((i + 1) % 3 === 0) {
    processedArray.push(tempArray);
    tempArray = [];
  }
}

function ImageGrid({ preview }) {
  const imgGridContainer = [classes.imageGridContainer];

  const imageList = processedArray.map((lineArray, index) => {
    const imageLine = lineArray.map((imageItem, index) => {
      const condition = index === 1;
      return (
        <ImageItem
          src={imageItem}
          middleItem={condition}
          key={index}
          preview={preview}
        />
      );
    });

    return (
      <div key={index} className={classes.imageGridLine}>
        {imageLine}
      </div>
    );
  });

  if (preview) imgGridContainer.push(classes.preview);

  return (
    <div className={imgGridContainer.join(" ")}>
      {!preview && <hr className={classes.line} />}
      {imageList}
    </div>
  );
}

export default ImageGrid;
