import React from "react";
import classes from "./AdminCard.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dispatchLoginInfo } from "../../../../store/actionCreators";
import * as api from "../../../../api/api";

const AdminCard = (props) => {
  // const {description} = props;
  const { id, title, setLoad } = props;
  const history = useHistory();
  const dipatch = useDispatch();
  const { tempData } = useSelector((state) => state);

  const clicked = async () => {
    if (id === 1) {
      setLoad(true);
      const result = await api.fetchDataByUserName(
        tempData.userData.userName,
        true
      );
      dipatch(dispatchLoginInfo(result.data.data, result.data.analyticData));
      setLoad(false);
      history.push("/profile");
    }
    if (id === 2) {
      history.push("/profile/B2BAdmin");
    }
    if (id === 3) {
      history.push("/profile/AdminPermission");
    }
  };
  return (
    <div className={classes.cardContainer} onClick={clicked}>
      <p className={classes.title}>
        {id}. {title}
      </p>
      {/* <p className={classes.title}>{description}</p> */}
    </div>
  );
};

export default AdminCard;
