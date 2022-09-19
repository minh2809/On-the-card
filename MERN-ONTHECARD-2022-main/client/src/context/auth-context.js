import React, { useState } from "react";

// State for the application
export const AuthContext = React.createContext({
  language: "VIETNAMESE",
  authApp: false,
  changeToEn: () => {},
  changeToVn: () => {},
  loginSerialNo: () => {},
});

// Component that exported as default contain JSX and function to modify app state
const AuthContextProvider = (props) => {
  const [appLang, setAppLang] = useState("VIETNAMESE");
  const [authAppSerial, setAuthAppSerial] = useState(false);

  const changeToEnHandler = () => {
    setAppLang("ENGLISH");
  };

  const changeToVnHandler = () => {
    setAppLang("VIETNAMESE");
  };

  const authenticateSerialApp = () => {
    setAuthAppSerial(true);
  };

  return (
    <AuthContext.Provider
      value={{
        language: appLang,
        authApp: authAppSerial,
        changeToEn: changeToEnHandler,
        changeToVn: changeToVnHandler,
        loginSerialNo: authenticateSerialApp,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
