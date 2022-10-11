import { combineReducers } from "redux";
// eslint-disable-next-line import/no-cycle
import loadingReducer from "./loadingReducer";

const reducer = combineReducers({
  loading: loadingReducer,
});

export default reducer;
export type State = ReturnType<typeof reducer>;
