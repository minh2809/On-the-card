import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import reducer from "./store/reducer";

import thunk from "redux-thunk";

import AuthContextProvider from "./context/auth-context";

const logger = (store) => {
  return (next) => {
    return (action) => {
      let result = null;
      try {
        result = next(action);
      } catch (error) {
        console.log(error);
      }
      return result;
    };
  };
};

// variable to set up redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// composeEnhancers(applyMiddleware(logger, thunk))

// Remove composeEnhancers in production
const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
