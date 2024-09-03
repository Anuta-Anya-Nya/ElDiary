import { createSlice } from "@reduxjs/toolkit";

const dailySchedulesSlice = createSlice({
  name: "dailySchedules",
  initialState: {
    schedulesList: {
      "2024-09-02": {
        id: 123123231,
        date: "2024-09-02",
        lessonsList: [
          {
            lessonId: 2,
            hwId: 1,
            mark: null,
            teacherId: 2,
          },
          {
            lessonId: 1,
            hwId: 2,
            mark: null,
            teacherId: 1,
          },
          {
            lessonId: 1,
            hwId: 3,
            mark: null,
            teacherId: 1,
          },
        ],
        notes: "qwerty",
        vacation: false,
        holiday: false,
      },
      "2024-09-03": {
        id: 12312321113231,
        date: "2024-09-03",
        lessonsList: [
          {
            lessonId: 1,
            hwId: 4,
            mark: null,
            teacherId: 2,
          },
          {
            lessonId: 4,
            hwId: 5,
            mark: null,
            teacherId: null,
          },
        ],
        notes: "qwerty",
        vacation: false,
        holiday: false,
      },
      "2024-09-04": {
        id: 3122223,
        date: "2024-09-04",
        lessonsList: [
          null,
          {
            lessonId: 2,
            hwId: 6,
            mark: null,
            teacherId: 2,
          },
          {
            lessonId: 2,
            hwId: 7,
            mark: null,
            teacherId: 2,
          },
          {
            lessonId: 1,
            hwId: 8,
            mark: null,
            teacherId: 1,
          },
        ],
        notes: null,
        vacation: false,
        holiday: false,
      },
    },
  },
  reducers: {
    addSchedule: (state, action) => {
      state.schedulesList[action.payload.date] = action.payload;
    },
    // updateDailySchedule: (state, action) => {
    //   const {date}
    // },
  },
  //   редьюсеры для thunk функций
  //   extraReducers: (builder) => {
  //     builder.addCase(createUserThunk.fulfilled, (state, action) => {
  //       return (state = action.payload);
  //     });
  //     builder.addCase(loginThunk.fulfilled, (state, action) => {
  //       return (state = action.payload);
  //     });
  //   },
});
export const { addSchedule } = dailySchedulesSlice.actions;
export const dayliScheduleReducer = dailySchedulesSlice.reducer;
