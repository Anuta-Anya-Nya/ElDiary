import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWeeklySheduleDB } from "../../db/weeklyScheduleDb";

// THUNK для записи недельного расписания из базы данных в стор
export const getWeeklySchedule = createAsyncThunk(
  "weeklySchedule/getWeeklySchedThunk",
  async ({ userId, currentYear }) => {
    try {
      console.log("загружаем расписание уроков на неделю...");
      const scheduleForWeek = await getWeeklySheduleDB(userId, currentYear);
      console.log(scheduleForWeek);
      // В firestore нельзя хранить массив с вложенными массивами, потому перед сохранением в firestore используется JSON.stringify(schedule), а после загрузки на клиенте используется метод parse()
      if (scheduleForWeek.schedule) {
        scheduleForWeek.schedule = JSON.parse(scheduleForWeek.schedule);
      }
      return { loading: false, error: null, scheduleForWeek };
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
      return (state = action.payload);
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
