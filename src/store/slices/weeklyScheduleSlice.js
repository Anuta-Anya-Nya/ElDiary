import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWeeklySheduleDB } from "../../firebase/crud";

// THUNK для записи недельного расписания из базы данных в стор
export const getWeeklySchedule = createAsyncThunk(
  "weeklySchedule/getWeeklySchedThunk",
  async ({ userId, currentYear }) => {
    try {
      console.log("загружаем расписание уроков на неделю...");
      const weeklySched = await getWeeklySheduleDB(userId, currentYear);
      console.log(weeklySched);
      return { loading: false, error: null, weeklySched };
    } catch (er) {
      console.log(er.code, er.message);
      return { loading: false, error: er.message };
    }
  }
);

const weeklyScheduleSlice = createSlice({
  name: "weeklySchedule",
  initialState: {
    loading: true,
    error: null,
    scheduleForWeek: {
      // id: 123,
      // startPeriod: "2024-09-01",
      // endPeriod: "2025-06-01",
      // schedule: [
      //   [
      //     { lessonId: 1, cabinet: 23, teacherId: 1 },
      //     { lessonId: 2, cabinet: 23, teacherId: 2 },
      //     { lessonId: 1, cabinet: 15, teacherId: 1 },
      //     { lessonId: 2, cabinet: 23, teacherId: 2 },
      //   ],
      //   [
      //     { lessonId: 1, cabinet: 23, teacherId: 1 },
      //     { lessonId: 2, cabinet: 23, teacherId: 2 },
      //   ],
      //   [
      //     { lessonId: 1, cabinet: 23, teacherId: 1 },
      //     { lessonId: 2, cabinet: 23, teacherId: 2 },
      //     { lessonId: 2, cabinet: 23, teacherId: 2 },
      //   ],
      //   [
      //     { lessonId: 1, cabinet: 23, teacherId: 1 },
      //     { lessonId: 2, cabinet: 23, teacherId: 2 },
      //     { lessonId: 2, cabinet: 23, teacherId: 2 },
      //     { lessonId: 2, cabinet: 23, teacherId: 2 },
      //   ],
      //   [
      //     { lessonId: 1, cabinet: 23, teacherId: 1 },
      //     { lessonId: 2, cabinet: 23, teacherId: 2 },
      //   ],
      //   [{ lessonId: null, cabinet: null, teacherId: null }],
      // ],
    },
  },

  reducers: {
    addWeeklySchedule: (state, action) => {
      const key = action.payload.startPeriod.slice(0, 4);
      state.scheduleForWeek[key] = action.payload;
    },
    // updateDailySchedule: (state, action) => {
    // },
  },
  // редьюсеры для thunk функций
  extraReducers: (builder) => {
    builder.addCase(getWeeklySchedule.fulfilled, (state, action) => {
      return (state = action.payload);
    });
  },
});
export const { addWeeklySchedule } = weeklyScheduleSlice.actions;
export const weeklyScheduleReducer = weeklyScheduleSlice.reducer;
