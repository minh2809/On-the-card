import React, { useState } from "react";
import classes from "./Permission.module.css";

import UserCardPermission from "../../../components/UI/Cards/UserCard/UserCardPermission";
import { useSelector } from "react-redux";
import ModalLoad from "../../../components/UI/Modal/ModalLoad/ModalLoad";
import Backdrop from "../../../components/UI/Backdrop/Backdrop";
import { useHistory } from "react-router-dom";

const AdminPermission = () => {
  const { homeScreenStyle, linkContainer, brandStyle } = classes;
  const { client, appLang, tempData } = useSelector((state) => state);
  const { serialArray, clientName } = client;
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  let returnAdminCondition = false;
  const pageLang = appLang.b2bText.b2bPages;

  if (tempData.userData) {
    returnAdminCondition = true;
  }

  const linkList = serialArray.map((value, index) => (
    <UserCardPermission
      content={value}
      index={index + 1}
      setLoading={setLoading}
      key={index}
    />
  ));

  const returnAdmin = () => {
    history.push("/profile/AdminB2B");
  };

  if (serialArray.length < 3) {
    history.push("/signin");
    return <div></div>;
  } else {
    return (
      <div className={homeScreenStyle}>
        {returnAdminCondition && (
          <div className={classes.returnBtn} onClick={returnAdmin}>
            {pageLang.returnAdmin}
          </div>
        )}
        <h3>
          {pageLang.managePermission}
          <br /> {pageLang.for}{" "}
          <span className={brandStyle}> {clientName} </span>
        </h3>
        <h4>{pageLang.permissionText}</h4>
        <div className={linkContainer}>{linkList}</div>
        <ModalLoad show={loading} h5text={appLang.modal.pleaseWait} />
        <Backdrop show={loading} />
      </div>
    );
  }
};

export default AdminPermission;
