import React from "react";
import classes from "./BottomNav.module.css";
import NavOption from "./NavOption";
import { useSelector } from "react-redux";
import {
  businessTabTitle,
  businessTabIcon,
  storeTabTitle,
  storeTabIcon,
  storeTabTitle2,
} from "../../../../utilities/helper3";

const BottomNav = () => {
  const { appLang, storePage } = useSelector((state) => state);
  const { enterprisePage, galleryPage } = useSelector((state) => state);
  const b2bText = appLang.b2bText;
  const { company } = useSelector((state) => state.userInfo);

  const businessTab = businessTabTitle(company, b2bText.businessTab);
  const businessIcon = businessTabIcon(company);

  const storeTab = storeTabTitle(company, b2bText.storeTab);
  const storeIcon = storeTabIcon(company);

  return (
    <div>
      <div className={classes.nav}>
        <NavOption
          title={b2bText.personalTab}
          id={1}
          icon={<i className="fas fa-user fa-lg"></i>}
        />
        {enterprisePage.company && (
          <NavOption title={businessTab} id={2} icon={businessIcon} />
        )}
        {storePage.company && (
          <NavOption
            title={storeTab}
            id={3}
            icon={storeIcon}
            title2={storeTabTitle2(company)}
          />
        )}
        {galleryPage.userName && (
          <NavOption
            title={b2bText.galleryTab}
            id={4}
            icon={<i className="fas fa-camera-retro fa-lg"></i>}
          />
        )}
      </div>
    </div>
  );
};

export default BottomNav;
