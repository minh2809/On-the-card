import React from "react";
import classes from "./UserCard.module.css";
import userImg from "../../../../assets/header/user.svg";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as api from "../../../../api/api";
import { dispatchLoginInfo, setToken } from "../../../../store/actionCreators";
import { setStorePage } from "../../../../store/actionCreators";
import { setMessageData } from "../../../../store/actionCreators";

const UserCard = (props) => {
  const { content, index, isAdmin } = props;
  const { avatar, setLoading, isSuperAdmin } = props;
  const superAdminBadge = [classes.badge, classes.superAdminBadge];
  const adminBadge = [classes.badge, classes.adminBadge];
  const dispatch = useDispatch();
  const history = useHistory();
  const { appLang, token } = useSelector((state) => state);
  const pageLang = appLang.b2bText.b2bPages;

  const onClickHandler = async () => {
    setLoading(true);
    const data = await api.adminFetchDataSerialNo(content.serialNo, token);
    dispatch(dispatchLoginInfo(data.data.data, data.data.analyticData));
    dispatch(setStorePage(data.data.storePage));
    dispatch(setToken(data.data.token));
    dispatch(setMessageData(data.data.messageData));
    setLoading(false);
    history.push("/profile");
  };

  const adminClicked = () => {
    const adminText = pageLang.adminText;
    const superAdminText = pageLang.superAdminText;
    alert(content.isSuperAdmin ? superAdminText : adminText);
  };

  return (
    <div
      className={classes.container}
      onClick={content.isAdmin ? adminClicked : onClickHandler}
    >
      <p className={classes.index}>{index}.</p>
      <div className={classes.badgeContainer}>
        {isSuperAdmin && (
          <div className={superAdminBadge.join(" ")}>Super Admin</div>
        )}
        {isAdmin && !isSuperAdmin && (
          <div className={adminBadge.join(" ")}>Admin User</div>
        )}
      </div>
      <div className={classes.imageContainer}>
        <img
          src={avatar || userImg}
          alt=""
          onError={(event) => {
            event.target.src = avatar || userImg;
          }}
        />
      </div>
      <div className={classes.nameContainer}>
        <p className={classes.fullName}>{content.fullName}</p>
      </div>
      <div className={classes.userNameContainer}>
        <p>{pageLang.userName} </p>
        <p>{content.userName}</p>
      </div>
    </div>
  );
};

export default UserCard;
