import React from "react";
import "./App.css";
import AppBar from "./containers/AppBar/AppBar";

export default function BGWrapper(props) {
  const { children, appBG, loggedIn, condition6, bgImg } = props;
  const { condition5, bg } = props;

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

      {children}
    </div>
  );
}
