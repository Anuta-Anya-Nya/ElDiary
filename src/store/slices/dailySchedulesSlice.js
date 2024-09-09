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
            grade: 5,
            teacherId: 2,
            class: null,
          },
          {
            lessonId: 1,
            homeworkId: 2,
            grade: null,
            teacherId: 1,
            class: null,
          },
          {
            lessonId: 1,
            homeworkId: null,
            grade: null,
            teacherId: 1,
            class: null,
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
            class: null,
          },
          {
            lessonId: 4,
            homeworkId: 5,
            grade: null,
            teacherId: null,
            class: null,
          },
          {
            lessonId: 6,
            homeworkId: 9,
            grade: null,
            teacherId: null,
            class: null,
          },
          {
            lessonId: 7,
            homeworkId: 10,
            grade: null,
            teacherId: null,
            class: null,
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
            class: null,
          },
          {
            lessonId: 2,
            homeworkId: 6,
            grade: null,
            teacherId: 2,
            class: null,
          },
          {
            lessonId: 2,
            homeworkId: 7,
            grade: null,
            teacherId: 2,
            class: null,
          },
          {
            lessonId: 1,
            homeworkId: 8,
            grade: null,
            teacherId: 1,
            class: null,
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
    updateDailyScheduleLesson: (state, action) => {
      state.schedulesList[action.payload.date].lessonsList[
        action.payload.number
      ] = action.payload.lesson;
    },
    updateDailyScheduleHomework: (state, action) => {
      state.schedulesList[action.payload.date].lessonsList[
        action.payload.number
      ].homeworkId = action.payload.homeworkId;
    },
    updateDailyScheduleGrade: (state, action) => {
      state.schedulesList[action.payload.date].lessonsList[
        action.payload.number
      ].grade = action.payload.grade;
    },
    updateDailyScheduleNote: (state, action) => {
      state.schedulesList[action.payload.date].notes = action.payload.notes;
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
export const {
  addSchedule,
  updateDailyScheduleLesson,
  updateDailyScheduleHomework,
  updateDailyScheduleGrade,
  updateDailyScheduleNote,
} = dailySchedulesSlice.actions;
export const dailySchedulesReducer = dailySchedulesSlice.reducer;
