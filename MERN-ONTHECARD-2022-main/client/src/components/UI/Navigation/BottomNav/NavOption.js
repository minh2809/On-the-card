import React from "react";
import classes from "./BottomNav.module.css";
import { useSelector, useDispatch } from "react-redux";
import { tabChange } from "../../../../store/actionCreators";
import { useHistory } from "react-router-dom";
import { is25FitUser } from "../../../../utilities/helper2";

const NavOption = (props) => {
  const { title, icon, id, title2 } = props;
  const { b2bActiveTab, userInfo } = useSelector((state) => state);
  const optionStyle = [classes.nav_link];
  const dispatch = useDispatch();
  let history = useHistory();

  const changeTab = () => {
    if (is25FitUser(userInfo.company) && id === 2) {
      return window.open("https://25fit.net/");
    }

    if (is25FitUser(userInfo.company) && id === 3) {
      return window.open(
        "https://readymag.com/25FITINFINITYAIRWAYS/Yearyendparty/"
      );
    }
    switch (window.location.pathname) {
      case "/profile/edit":
        history.push("/profile/edit");
        break;
      default:
        id === 1 && history.push("/profile");
        id === 2 && history.push("/profile/companyPage");
        id === 3 && history.push("/profile/storePage");
        id === 4 && history.push("/profile/galleryPage");
        break;
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

export default NavOption;
