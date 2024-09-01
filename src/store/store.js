import { configureStore } from "@reduxjs/toolkit";
import { settingReducer } from "../store/slices/settingSlice";
import { sheduleReducer } from "../store/slices/sheduleSlice";
import { combineReducers } from "redux";

const reducer = combineReducers({
  setting: settingReducer,
  shedule: sheduleReducer,
});

const store = configureStore({ reducer });

export default store;
