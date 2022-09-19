import React, { useState } from "react";
import classes from "./Analytic.module.css";
import { useSelector, useDispatch } from "react-redux";
import Box from "./Box";
import { Vietnamese, English } from "../../language/language";
import {
  getAnalyticLinks,
  getClickCount,
} from "../../utilities/analytic_helper";
import LinkBox from "./LinkBox";
import * as api from "../../api/api";
import { setAnalytic } from "../../store/actionCreators";
import ModalLoad from "../UI/Modal/ModalLoad/ModalLoad";
import BackDrop from "../UI/Backdrop/Backdrop";

const Analytic = () => {
  const [showModal, setShowModal] = useState(false);
  const { userInfo, appLanguage } = useSelector((state) => state);
  const { analyticData, token } = useSelector((state) => state);
  const { fullName, socialMediaList } = userInfo;
  const appLang = appLanguage === "VIETNAMESE" ? Vietnamese : English;
  const { visit, redirect, clickCount, title3 } = appLang.analytic;
  const { title1, title2, saveContact: saveContactTitle } = appLang.analytic;
  const { pageView, redirectView, saveContact, links } = analyticData;

  const analyticLinks = getAnalyticLinks(socialMediaList, links);
  const totalClickCount = getClickCount(analyticLinks);
  const listItem = [];
  const dispatch = useDispatch();

  const updateData = async () => {
    setShowModal(true);
    const res = await api.getAnalyticData(token);
    if (res.success) {
      dispatch(setAnalytic(res.analyticData));
    }
    setTimeout(() => {
      setShowModal(false);
    }, 100);
  };

  analyticLinks.forEach((value, index) =>
    listItem.push(<LinkBox data={value} key={index} />)
  );

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>
        {title1} <br /> {title2} <span>{fullName}</span>{" "}
      </h3>
      <div className={classes.infoContainer}>
        <Box title={visit} count={pageView} />
        <Box title={redirect} count={redirectView} />
        <Box title={saveContactTitle} count={saveContact || 0} />
        <Box title={clickCount} count={totalClickCount} />
      </div>
      <div className={classes.reloadButton} onClick={updateData}>
        <i className="fas fa-sync-alt"></i> {appLang.analytic.update}
      </div>
      <div className={classes.linksContainer}>
        <h3 className={classes.title}>{title3}</h3>
        {listItem}
      </div>
      <ModalLoad h5text={appLang.modal.pleaseWait} show={showModal} />
      <BackDrop show={showModal} />
    </div>
  );
};

export default Analytic;
