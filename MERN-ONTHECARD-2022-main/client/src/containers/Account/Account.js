import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classes from "./Account.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";

import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import BProSignUp from "./SignUp/PartnerSignUp/BProSignUp";
import Fit25SignUp from "./SignUp/PartnerSignUp/25FitSignUp";
import RetrieveAccount from "./RetrieveAccount/RetrieveAccount";
import LanguageOptions from "./LanguageOptions";
import { useSelector } from "react-redux";

function Account() {
  const { appLang } = useSelector((state) => state);

  return (
    <div className={classes.container}>
      <LanguageOptions />
      <Switch>
        <Route
          path="/retrieve"
          render={() => <RetrieveAccount language={appLang} />}
        />
        <Route path="/signin" render={() => <SignIn language={appLang} />} />
        <Route path="/loading" component={Spinner} />
        <Route
          path="/bpro/signup"
          exact
          render={() => <BProSignUp language={appLang} />}
        />
        <Route
          path="/bpro/signup/:serialNumber"
          exact
          render={() => <BProSignUp language={appLang} />}
        />
        <Route
          path="/25fitVN/signup"
          exact
          render={() => <Fit25SignUp language={appLang} />}
        />
        <Route
          path="/25fitVN/signup/:serialNumber"
          exact
          render={() => <Fit25SignUp language={appLang} />}
        />
        <Route
          path="/signup/:serialNumber"
          render={() => <SignUp language={appLang} />}
        />
        <Route path="/" render={() => <SignUp language={appLang} />} />
      </Switch>
    </div>
  );
}

export default withRouter(Account);
