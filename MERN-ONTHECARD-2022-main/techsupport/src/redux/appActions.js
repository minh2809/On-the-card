import { AUTHENTICATE, LOGOUT, BACK_UP_DATA, TOKENSET } from "./appConstants";
import { SETSUCCESS } from "./appConstants";

export const authenticate = (password) => async (dispatch) => {
  return dispatch({ type: AUTHENTICATE, payload: password });
};

export const logout = () => async (dispatch) => {
  return dispatch({ type: LOGOUT });
};

export const backUpData = () => async (dispatch) => {
  return dispatch({ type: BACK_UP_DATA });
};

export const setToken = (token) => async (dispatch) => {
  return dispatch({ type: TOKENSET, payload: token });
};

export const setSuccessMessage = (message) => async (dispatch) => {
  return dispatch({ type: SETSUCCESS, payload: message });
};
