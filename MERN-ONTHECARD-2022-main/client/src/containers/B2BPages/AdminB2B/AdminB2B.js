import React, { useState } from "react";
import classes from "./AdminB2B.module.css";
import { useSelector } from "react-redux";
import ModalLoad from "../../../components/UI/Modal/ModalLoad/ModalLoad";
import Backdrop from "../../../components/UI/Backdrop/Backdrop";
import { useHistory } from "react-router-dom";
import AdminCard from "../../../components/UI/Cards/AdminCard/AdminCard";
import Cookies from "universal-cookie";

const AdminB2B = () => {
  const { homeScreenStyle, brandStyle } = classes;
  const { client, appLang, tempData } = useSelector((state) => state);
  const { serialArray, clientName } = client;
  const { userData } = tempData;
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const logoutHandler = () => {
    window.location.replace(window.location.origin + "/signin");
    const cookies = new Cookies();
    return cookies.remove("loginToken");
  };

  const pageLang = appLang.b2bText.b2bPages;

  if (serialArray.length < 3) {
    history.push("/signin");
    return <div></div>;
  } else {
    const title = userData.isSuperAdmin
      ? pageLang.managePageSuper
      : pageLang.managePage;
    return (
      <div className={homeScreenStyle}>
        <h3>
          {title} <br /> {pageLang.for}{" "}
          <span className={brandStyle}> {clientName} </span>
        </h3>
        <h4>{pageLang.adminActivity}</h4>
        <div className={classes.cardContainer}>
          <AdminCard id={1} title={pageLang.editAdmin} setLoad={setLoading} />
          <AdminCard id={2} title={pageLang.manageUser} />
          {userData.isSuperAdmin && (
            <AdminCard id={3} title={pageLang.grantAccess} />
          )}
        </div>
        <div className={classes.logout} onClick={logoutHandler}>
          {pageLang.logout}
        </div>
        <ModalLoad show={loading} h5text={appLang.modal.pleaseWait} />
        <Backdrop show={loading} />
      </div>
    );
  }
};

export default AdminB2B;
