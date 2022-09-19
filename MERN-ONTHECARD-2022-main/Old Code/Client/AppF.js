/*
ISSUE WITH THIS CODE: 

Footer and Background update issue

*/

import React from "react";
import "./App.css";
import Account from "./containers/Account/Account";
import { Route, Switch } from "react-router-dom";
import MainPage from "./containers/MainPage/MainPage";
import ViewPage from "./containers/ViewPage/ViewPage";

import FetchPage from "./containers/FetchPage/FetchPage";
import EditProfile from "./containers/EditProfile/EditProfile";
import B2BAdmin from "./containers/B2BPages/B2BAdmin/B2BAdmin";
import AdminB2B from "./containers/B2BPages/AdminB2B/AdminB2B";
import AdminPermission from "./containers/B2BPages/AdminPermission/AdminPermission";
import SerialNumberApp from "./containers/SerialNumberApp/SerialNumberApp";
import AdvancedProfile from "./containers/AdvancedProfile/AdvancedProfile";
import AdvancedB2B from "./containers/AdvancedProfile/AdvancedProfileB2B";
import Footer from "./containers/Footer/Footer";
import FullFooter from "./containers/Footer/FullFooter";
import StoreMainPage from "./containers/B2BPages/StorePage/StoreMainPage";
import CompanyMainPage from "./containers/B2BPages/CompanyPage/CompanyMainPage";
import StoreViewPage from "./containers/B2BPages/StorePage/StoreViewPage";
import CompanyViewPage from "./containers/B2BPages/CompanyPage/CompanyViewPage";

import AppBar from "./containers/AppBar/AppBar";
import MainActivity from "./containers/SerialNumberApp/MainActivity/MainActivity";

import bg from "./assets/test/bg.jpg";
import { ADDSOClient } from "./utilities/helper2";

import { useSelector } from "react-redux";

const App = () => {
  const { authenticated: loggedIn, userInfo } = useSelector((state) => state);
  const { enterprisePage, storePage, b2bActiveTab } = useSelector(
    (state) => state
  );

  const { socialMediaList } = userInfo;
  const { inactive, company } = userInfo;

  const listCheck = socialMediaList ? socialMediaList : [];
  const appBG = !loggedIn && listCheck.length > 0 ? "App greyBG" : "App";
  const pathName = window.location.pathname;
  const condition1 = pathName === "/profile/edit";
  const condition2 = pathName === "/profile/B2BAdmin";
  let bgImg = userInfo.backgroundImageUrl;
  let bgStyle;
  let bgColor = userInfo.backgroundColor;

  let condition3 =
    pathName.includes("/profile/edit") ||
    pathName.includes("/profile/b2b/advanced") ||
    pathName.includes("/profile/B2BAdmin") ||
    pathName.includes("/profile/AdminPermission") ||
    pathName.includes("/profile/advanced") ||
    pathName.includes("/signin") ||
    pathName.includes("/signup") ||
    pathName.includes("/retrieve") ||
    pathName.includes("serialnumber") ||
    pathName === "/";

  const condition4 = pathName === "/profile" || !inactive;
  const condition5 = !pathName.includes("profile") && inactive;
  const condition6 =
    bgImg &&
    !condition5 &&
    pathName !== "/profile/edit" &&
    !ADDSOClient(company);

  if (b2bActiveTab === 2) {
    bgColor = enterprisePage.backgroundColor;
    bgImg = enterprisePage.backgroundImageUrl;
  }
  if (b2bActiveTab === 3) {
    bgColor = storePage.backgroundColor;
    bgImg = storePage.backgroundImageUrl;
  }

  if (bgColor && condition1) {
    bgStyle = {
      backgroundColor: bgColor,
    };
  } else if (bgColor && !condition1) {
    bgStyle = {
      backgroundColor: bgColor,
      minHeight: "100vh",
    };
  } else if (condition2) {
    bgStyle = {
      backgroundColor: "white",
    };
  }

  if (ADDSOClient(company)) {
    bgStyle = {
      backgroundColor: "white",
    };
  }

  return (
    <div className={appBG}>
      {loggedIn ? (
        <>
          <AppBar viewPage={false}></AppBar>
        </>
      ) : null}
      <div className="appOpacityBackground">
        {condition6 && bgImg ? (
          <img
            alt=""
            src={bgImg}
            className="imageResponsive"
            onError={(event) => {
              event.target.src = bgImg;
            }}
          />
        ) : null}
        {condition5 && bg && <img alt="" src={bg} className="locked" />}
      </div>
      <div style={bgStyle}>
        <Switch>
          <Route path="/profile/advanced/:id" component={AdvancedProfile} />
          <Route path="/profile/b2b/advanced" component={AdvancedB2B} />
          <Route path="/profile/edit/:id" component={EditProfile} />
          <Route path="/profile/edit" component={EditProfile} />
          <Route path="/profile/B2BAdmin" component={B2BAdmin} />
          <Route path="/profile/AdminB2B" component={AdminB2B} />
          <Route path="/profile/AdminPermission" component={AdminPermission} />
          <Route path="/profile/storePage" component={StoreMainPage} />
          <Route path="/profile/companyPage" component={CompanyMainPage} />
          <Route path="/profile/" component={MainPage} />
          <Route path="/fetch/:id" component={FetchPage} />
          <Route path="/signin" exact component={Account} />
          <Route path="/retrieve" exact component={Account} />
          <Route path="/admin/serialnumber" exact component={SerialNumberApp} />
          <Route
            path="/admin/serialnumber/mainactivity"
            exact
            component={MainActivity}
          />
          <Route path="/signup" component={Account} />
          <Route path="/" exact component={Account} />
          <Route path="/:id/companyPage" component={CompanyViewPage} />
          <Route path="/:id/storePage" component={StoreViewPage} />
          <Route path="/:id" component={ViewPage} />
        </Switch>
      </div>
      {condition3 ? (
        <FullFooter />
      ) : condition4 ? (
        <Footer
          b2bInfo={
            b2bActiveTab === 2
              ? enterprisePage
              : b2bActiveTab === 3
              ? storePage
              : userInfo
          }
        />
      ) : null}
    </div>
  );
};

export default App;
