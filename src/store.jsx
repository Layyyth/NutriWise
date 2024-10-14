import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";

import accountReducer from "./features/accountSlice";

const rootReducer = combineReducers({
  account: accountReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
