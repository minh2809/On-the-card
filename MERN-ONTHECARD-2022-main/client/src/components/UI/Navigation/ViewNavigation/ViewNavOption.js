import React from "react";
import classes from "./ViewNav.module.css";
import { useSelector, useDispatch } from "react-redux";
import { tabChange } from "../../../../store/actionCreators";
import { useHistory, useParams } from "react-router-dom";
import * as actionTypes from "../../../../store/actionTypes";
import * as api from "../../../../api/api";
import * as api2 from "../../../../api/api2";
import { is25FitUser } from "../../../../utilities/helper2";

const ViewNavOption = (props) => {
  const { title, icon, id, title2 } = props;
  const { b2bActiveTab, visitedPage } = useSelector((state) => state);
  const { token, userInfo } = useSelector((state) => state);
  const optionStyle = [classes.nav_link];
  const dispatch = useDispatch();
  let history = useHistory();
  const { id: userName } = useParams();

  const changeTab = () => {
    if (id === 1) {
      dispatch({ type: actionTypes.PERSONAL_PAGE_VISITED });
      if (!visitedPage.personal) {
        api.fetchDataByUserName(userName, false, `${id}`);
      }
      history.push("/" + userName);
    }

    if (id === 2) {
      if (is25FitUser(userInfo.company)) {
        return window.open("https://25fit.net/");
      }
      dispatch({ type: actionTypes.COMPANY_PAGE_VISITED });
      if (!visitedPage.company) {
        api2.b2BPageView("companyPage", token, userName);
      }
      history.push(`/${userName}/companyPage`);
    }

    if (id === 3) {
      if (is25FitUser(userInfo.company)) {
        return window.open(
          "https://readymag.com/25FITINFINITYAIRWAYS/Yearyendparty/"
        );
      }

      dispatch({ type: actionTypes.STORE_PAGE_VISITED });
      if (!visitedPage.store) {
        api2.b2BPageView("storePage", token, userName);
      }
      history.push(`/${userName}/storePage`);
    }

    return dispatch(tabChange(id));
  };

  if (b2bActiveTab === id) {
    optionStyle.push(classes.navActive);
  }

  return (
    <div className={optionStyle.join(" ")} onClick={changeTab}>
      {icon}
      <span className={classes.nav_text}>{title}</span>
      {title2 && (
        <span style={{ marginTop: "0px" }} className={classes.nav_text}>
          {title2}
        </span>
      )}
    </div>
  );
};

export default ViewNavOption;
