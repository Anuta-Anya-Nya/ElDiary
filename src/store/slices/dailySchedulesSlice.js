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
            homeworkId: 1,
            grade: null,
            teacherId: 2,
          },
          {
            lessonId: 1,
            homeworkId: 2,
            grade: null,
            teacherId: 1,
          },
          {
            lessonId: 1,
            homeworkId: null,
            grade: null,
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
            homeworkId: 4,
            grade: null,
            teacherId: 2,
          },
          {
            lessonId: 4,
            homeworkId: 5,
            grade: null,
            teacherId: null,
          },
          {
            lessonId: 6,
            homeworkId: 9,
            grade: null,
            teacherId: null,
          },
          {
            lessonId: 7,
            homeworkId: 10,
            grade: null,
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
          {
            lessonId: null,
            homeworkId: null,
            grade: null,
            teacherId: null,
          },
          {
            lessonId: 2,
            homeworkId: 6,
            grade: null,
            teacherId: 2,
          },
          {
            lessonId: 2,
            homeworkId: 7,
            grade: null,
            teacherId: 2,
          },
          {
            lessonId: 1,
            homeworkId: 8,
            grade: null,
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
      // state.schedulesList[action.payload.date] = action.payload;
      return {
        ...state,
        schedulesList: { ...state.schedulesList, ...action.payload },
      };
    },
    updateDailySchedule: (state, action) => {
      state.schedulesList[action.payload.date].lessonsList[
        action.payload.number
      ].lessonId = action.payload.lessonId;
    },
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
export const { addSchedule, updateDailySchedule } = dailySchedulesSlice.actions;
export const dailySchedulesReducer = dailySchedulesSlice.reducer;
