import React from "react";
import classes from "./Analytic.module.css";
import { useSelector } from "react-redux";
import Box from "./Box";
import { Vietnamese, English } from "../../language/language";
import {
  getAnalyticLinks,
  getClickCount,
} from "../../utilities/analytic_helper";
import LinkBox from "./LinkBox";

const AnalyticB2B = ({ name, analyticData, pageData }) => {
  const { appLanguage } = useSelector((state) => state);

  const { name: pageName, info, products } = pageData;
  const appLang = appLanguage === "VIETNAMESE" ? Vietnamese : English;
  const { visit, clickCount, title3 } = appLang.analytic;
  const { titleB2B, title2 } = appLang.analytic;
  const { pageView, links } = analyticData;
  let socialMediaList;

  if (info) {
    socialMediaList = info;
  }

  if (products) {
    socialMediaList = products;
  }

  const analyticLinks = getAnalyticLinks(socialMediaList, links);
  const totalClickCount = getClickCount(analyticLinks);
  const listItem = [];

  analyticLinks.forEach((value, index) =>
    listItem.push(<LinkBox data={value} key={index} />)
  );

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>
        {titleB2B} {name}
        <br /> {title2} <span>{pageName}</span>{" "}
      </h3>
      <div className={classes.infoContainer}>
        <Box title={visit} count={pageView} />
        <Box title={clickCount} count={totalClickCount} />
      </div>
      <div className={classes.linksContainer}>
        <h3 className={classes.title}>{title3}</h3>
        {listItem}
      </div>
    </div>
  );
};

export default AnalyticB2B;
