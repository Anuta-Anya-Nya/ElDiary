import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { lessonsReducer } from "./slices/lessonsSlice";
import { homeworksReducer } from "./slices/homeworksSlice";
import { dailySchedulesReducer } from "./slices/dailySchedulesSlice";
import { noteReducer } from "./slices/noteSlice";

const reducer = combineReducers({
  lessons: lessonsReducer,
  homeworks: homeworksReducer,
  dailySchedules: dailySchedulesReducer,
  note: noteReducer,
});

const store = configureStore({ reducer });
// const store = configureStore({ settingReducer, sheduleReducer });

export default store;
