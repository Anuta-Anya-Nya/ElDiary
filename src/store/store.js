import { configureStore } from "@reduxjs/toolkit";
import { settingReducer } from "../store/slices/settingSlice";
import { sheduleReducer } from "../store/slices/sheduleSlice";
import { noteReducer } from "./slices/noteSlice";
import { combineReducers } from "redux";

const reducer = combineReducers({
  setting: settingReducer,
  shedule: sheduleReducer,
  note: noteReducer,
});

const store = configureStore({ reducer });
// const store = configureStore({ settingReducer, sheduleReducer });

export default store;
