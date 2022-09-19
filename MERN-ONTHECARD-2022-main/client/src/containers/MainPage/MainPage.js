import React, { Component } from "react";
import HeaderBox from "../../components/Boxes/HeaderBox/HeaderBox";
import classes from "./MainPage.module.css";
import NewLinkBox from "../../components/Boxes/LinkBox/NewLinkBox/NewLinkBox";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actionTypes";
import { Redirect } from "react-router";
import MainButton from "../../components/UI/Button/MainButton/MainButton";
import AdvancedButton from "../../components/UI/Button/AdvancedButton/Advanced";
import LinkBoxB2B from "../../components/Boxes/LinkBox/LinkBoxB2B/LinkBoxB2B";
import CoverPhoto from "../../components/Boxes/StoreHeader/CoverPhoto";
import { ADDSOClient } from "../../utilities/helper2";
import { Helmet } from "react-helmet";

class MainPage extends Component {
  advancedProfileHandler = () => {
    this.props.history.replace("/profile/advanced/0");
  };

  editProfileHandler = () => {
    this.props.history.replace("/profile/edit");
  };

  render() {
    const { userInformation, appLang } = this.props;
    const { backgroundColor, company } = userInformation;
    const noBgImg = ADDSOClient(company);

    let listItems = null;

    const avatarImage =
      userInformation.avatarURL === ""
        ? userInformation.avatarImg
        : userInformation.avatarURL;

    if (userInformation.socialMediaList) {
      listItems = userInformation.socialMediaList.map((value, index) => {
        if (ADDSOClient(company)) {
          return (
            <LinkBoxB2B
              iconType={value.icon}
              content={value.title}
              artistContent={value.artist ? value.artist : null}
              url={value.url}
              key={value.title}
            />
          );
        } else {
          return (
            <NewLinkBox
              iconType={value.icon}
              content={value.title}
              artistContent={value.artist ? value.artist : null}
              url={value.url}
              key={value.title}
            />
          );
        }
      });
    }

    if (this.props.loggedIn) {
      return (
        <div
          style={
            !userInformation.backgroundImageUrl
              ? {
                  backgroundColor: backgroundColor,
                }
              : null
          }
          className={classes.MainPage}
        >
          <Helmet>
            <title>
              {userInformation.fullName} | {appLang.tabTile}
            </title>
            <meta name="description" content={userInformation.bio} />
          </Helmet>
          {noBgImg && <CoverPhoto image={userInformation.backgroundImageUrl} />}
          <HeaderBox
            buttonShow={true}
            avatar={avatarImage}
            userFullName={userInformation.fullName}
            userBio={userInformation.bio}
            userInfo={userInformation}
          />
          <div className={classes.buttonContainer}>
            <MainButton
              text={appLang.profile.button.edit}
              onClick={this.editProfileHandler}
              editPage={true}
            >
              <i className="fas fa-pen"></i>
              {"  "}
            </MainButton>
            <div className={classes.divider}></div>
            <AdvancedButton onClick={this.advancedProfileHandler}>
              <i className="fas fa-chart-bar"></i>
              {"   " + appLang.profile.button.advanced}
            </AdvancedButton>
          </div>
          {listItems}
        </div>
      );
    } else {
      return <Redirect from="/profile" to="/signin" />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.authenticated,
    appLang: state.appLang,
    userInformation: state.userInfo,
    appLanguage: state.appLanguage,
    userName: state.userInfo.userName,
    backgroundColor: state.backgroundColor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // This is unused
    authenticateUser: () => dispatch({ type: actionTypes.AUTHENTICATE }),
    unauthenticateUser: () => dispatch({ type: actionTypes.UNAUTHENTICATE }),
    logOutResetStore: () => dispatch({ type: actionTypes.LOGOUT }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
