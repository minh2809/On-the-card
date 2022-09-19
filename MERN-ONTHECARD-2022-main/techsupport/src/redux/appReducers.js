import { AUTHENTICATE, LOGOUT, BACK_UP_DATA, TOKENSET } from "./appConstants";
import { SETSUCCESS } from "./appConstants";

export const appReducer = (
  state = {
    loggedIn: false,
    username: "",
    dataBackedUp: false,
    token: "",
    successMessage: "",
  },
  action
) => {
  switch (action.type) {
    case AUTHENTICATE:
      return { ...state, loggedIn: true, username: action.payload };
    case LOGOUT:
      return { ...state, loggedIn: false, username: "" };
    case BACK_UP_DATA:
      return { ...state, dataBackedUp: true };
    case TOKENSET:
      return { ...state, token: action.payload };
    case SETSUCCESS:
      return { ...state, successMessage: action.payload };
    default:
      return state;
  }
};
