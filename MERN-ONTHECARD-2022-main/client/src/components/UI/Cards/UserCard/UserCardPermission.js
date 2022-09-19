import React from "react";
import classes from "./UserCard.module.css";
import userImg from "../../../../assets/header/user.svg";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as api from "../../../../api/api2";
import { changeAdmin } from "../../../../utilities/helper";

const UserCard = (props) => {
  const { client, tempData, appLang } = useSelector((state) => state);
  const { content, index, setLoading } = props;
  const { isAdmin, isSuperAdmin, avatar } = content;
  const grantStyle = [classes.grantBtn];

  const superAdminBadge = [classes.badge, classes.superAdminBadge];
  const adminBadge = [classes.badge, classes.adminBadge];
  const history = useHistory();
  const pageLang = appLang.b2bText.b2bPages;
  const grantText = pageLang.grantText;
  const removeAdmin = pageLang.removeAdmin;

  const onClickHandler = async () => {
    setLoading(true);
    const serialNo = content.serialNo;
    const token = tempData.tempToken;
    await api.b2bIsAdmin(serialNo, !isAdmin, token);
    changeAdmin(client, content.serialNo, !isAdmin);
    history.push("/profile/AdminPermission");
    setLoading(false);
  };

  isAdmin ? grantStyle.push(classes.redBtn) : grantStyle.push(classes.blueBtn);
  isSuperAdmin && grantStyle.push(classes.superAdmin);

  return (
    <div className={classes.permitContainer}>
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
      {!isSuperAdmin && (
        <div className={grantStyle.join(" ")} onClick={onClickHandler}>
          {isAdmin ? removeAdmin : grantText}
        </div>
      )}
    </div>
  );
};

export default UserCard;
