import { configureStore } from "@reduxjs/toolkit";
import { settingReducer } from "../store/slices/settingSlice";
import { combineReducers } from "redux";

const reducer = combineReducers({ setting: settingReducer });

const store = configureStore({ reducer });

export default store;
