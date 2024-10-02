import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { lessonsReducer } from "./slices/lessonsSlice";
import { homeworksReducer } from "./slices/homeworksSlice";
import { dailySchedulesReducer } from "./slices/dailySchedulesSlice";
import { noteReducer } from "./slices/noteSlice";
import { contentReducer } from "./slices/contentSlice";
import { weeklyScheduleReducer } from "./slices/weeklyScheduleSlice";
import { teacherReducer } from "./slices/teachersSlice";

const reducer = combineReducers({
  lessons: lessonsReducer,
  homeworks: homeworksReducer,
  dailySchedules: dailySchedulesReducer,
  note: noteReducer,
  content: contentReducer,
  weeklySchedule: weeklyScheduleReducer,
  teachers: teacherReducer,
});

const store = configureStore({ reducer });
// const store = configureStore({ settingReducer, sheduleReducer });

export default store;
