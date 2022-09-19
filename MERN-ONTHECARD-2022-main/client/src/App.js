import React, { Component, lazy, Suspense } from "react";
import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import bg from "./assets/test/bg.jpg";
import Loader from "./components/Reusable/LoaderBlack/Loader";
import BGWrapper from "./BGWrapper";
import { condition1Result } from "./utilities/appHelper";
import { condition2Result } from "./utilities/appHelper";
import { condition3Result } from "./utilities/appHelper";
import { condition4Result } from "./utilities/appHelper";
import { condition5Result } from "./utilities/appHelper";
import { condition6Result } from "./utilities/appHelper";
import { condition7Result } from "./utilities/appHelper";
import { bgData } from "./utilities/appHelper";
import { is25fitKOL, isPetroVn } from "./utilities/helper3";

const MainPage = lazy(() => import("./containers/MainPage/MainPage"));
const ViewPage = lazy(() => import("./containers/ViewPage/ViewPage"));
const FetchPage = lazy(() => import("./containers/FetchPage/FetchPage"));
const EditProfile = lazy(() => import("./containers/EditProfile/EditProfile"));
const B2BAdmin = lazy(() => import("./containers/B2BPages/B2BAdmin/B2BAdmin"));
const AdminB2B = lazy(() => import("./containers/B2BPages/AdminB2B/AdminB2B"));
const AdminPermission = lazy(() =>
  import("./containers/B2BPages/AdminPermission/AdminPermission")
);
const SerialNumberApp = lazy(() =>
  import("./containers/SerialNumberApp/SerialNumberApp")
);
const AdvancedProfile = lazy(() =>
  import("./containers/AdvancedProfile/AdvancedProfile")
);
const AdvancedB2B = lazy(() =>
  import("./containers/AdvancedProfile/AdvancedProfileB2B")
);
const Footer = lazy(() => import("./containers/Footer/Footer"));
const FullFooter = lazy(() => import("./containers/Footer/FullFooter"));
const StoreMainPage = lazy(() =>
  import("./containers/B2BPages/StorePage/StoreMainPage")
);
const CompanyMainPage = lazy(() =>
  import("./containers/B2BPages/CompanyPage/CompanyMainPage")
);
const StoreViewPage = lazy(() =>
  import("./containers/B2BPages/StorePage/StoreViewPage")
);
const CompanyViewPage = lazy(() =>
  import("./containers/B2BPages/CompanyPage/CompanyViewPage")
);
const MainActivity = lazy(() =>
  import("./containers/SerialNumberApp/MainActivity/MainActivity")
);
const PINPage = lazy(() => import("./containers/PINPage/PINPage"));
const Settings = lazy(() => import("./containers/Settings/Settings"));
const Account = lazy(() => import("./containers/Account/Account"));
const NewYear = lazy(() => import("./containers/SpecialPage/NewYear"));
// const GalleryView = lazy(() => import("./templates/GalleryPage/GalleryView"));
const GalleryEdit = lazy(() => import("./containers/GalleryPage/GalleryEdit"));

class App extends Component {
  render() {
    const { loggedIn, socialMediaList, userInfo, clientName } = this.props;
    const { enterprisePage, storePage, b2bActiveTab } = this.props;
    const { galleryPage } = this.props;
    const { inactive, company } = userInfo;

    const listCheck = socialMediaList ? socialMediaList : [];
    const appBG = !loggedIn && listCheck.length > 0 ? "App greyBG" : "App";
    const pathName = window.location.pathname;
    let bgImg = userInfo.backgroundImageUrl;
    let bgStyle;

    const condition1 = condition1Result(pathName);
    const condition2 = condition2Result(pathName);
    const condition3 = condition3Result(pathName);
    const condition4 = condition4Result(pathName, inactive);
    const condition5 = condition5Result(pathName, inactive);
    const condition6 = condition6Result(pathName, bgImg, condition5, company);
    const condition7 = condition7Result(company, b2bActiveTab);
    const condition8 =
      is25fitKOL(company) || isPetroVn(company) || pathName === "/gallery";

    const bgDataObj = bgData(this.props, condition1, condition2);
    bgImg = bgDataObj.bgImg;
    bgStyle = bgDataObj.bgStyle;

    let fallBack = <div></div>;
    if (loggedIn || clientName) fallBack = <Loader />;

    return (
      <Suspense fallback={fallBack}>
        <BGWrapper
          appBG={appBG}
          loggedIn={loggedIn}
          condition6={condition6}
          condition5={condition5}
          bgImg={bgImg}
          bg={bg}
        >
          <div style={bgStyle}>
            <Switch>
              <Route path="/profile/advanced/:id" component={AdvancedProfile} />
              <Route path="/profile/b2b/advanced" component={AdvancedB2B} />
              <Route path="/profile/edit/:id" component={EditProfile} />
              <Route path="/profile/edit" component={EditProfile} />
              <Route path="/profile/B2BAdmin" component={B2BAdmin} />
              <Route path="/profile/AdminB2B" component={AdminB2B} />
              <Route
                path="/profile/AdminPermission"
                component={AdminPermission}
              />
              <Route path="/profile/settings" component={Settings} />
              <Route path="/profile/storePage" component={StoreMainPage} />
              <Route path="/profile/companyPage" component={CompanyMainPage} />
              <Route path="/profile/galleryPage" component={GalleryEdit} />
              <Route path="/profile/" component={MainPage} />
              <Route path="/fetch/:id" component={FetchPage} />
              <Route path="/secure/userName/:id" component={PINPage} />
              <Route path="/secure/serialNo/:id" component={PINPage} />
              <Route path="/signin" exact component={Account} />
              <Route path="/retrieve" exact component={Account} />
              <Route path="/happynewyear" exact component={NewYear} />
              <Route
                path="/admin/serialnumber"
                exact
                component={SerialNumberApp}
              />
              <Route
                path="/admin/serialnumber/mainactivity"
                exact
                component={MainActivity}
              />
              <Route path="/signup" component={Account} />
              <Route path="/bpro/signup" component={Account} />
              <Route path="/25fitVN/signup" component={Account} />
              <Route path="/" exact component={Account} />
              <Route path="/:id/companyPage" component={CompanyViewPage} />
              <Route path="/:id/storePage" component={StoreViewPage} />
              <Route path="/:id" component={ViewPage} />
            </Switch>
          </div>
          {condition7 || condition8 ? null : condition3 ? (
            <FullFooter />
          ) : condition4 ? (
            <Footer
              b2bInfo={
                b2bActiveTab === 2
                  ? enterprisePage
                  : b2bActiveTab === 3
                  ? storePage
                  : b2bActiveTab === 4
                  ? galleryPage
                  : userInfo
              }
            />
          ) : null}
        </BGWrapper>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.authenticated,
    socialMediaList: state.userInfo.socialMediaList,
    userInfo: state.userInfo,
    enterprisePage: state.enterprisePage,
    storePage: state.storePage,
    galleryPage: state.galleryPage,
    b2bActiveTab: state.b2bActiveTab,
    appLanguage: state.appLanguage,
    clientName: state.client.clientName,
  };
};

export default connect(mapStateToProps)(withRouter(App));
