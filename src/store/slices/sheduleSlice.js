import moment from "moment/min/moment-with-locales.min";
import { createSlice } from "@reduxjs/toolkit";

const sheduleSlice = createSlice({
  name: "shedule",
  initialState: {
    sheduleList: [
      {
        id: 1,
        date: "2024-09-02",
        lessonsList: [
          {
            lessonId: 2,
            hwId: [1, 2],
            isDone: false,
            mark: null,
            teacherId: 2,
          },
          {
            lessonId: 1,
            hwId: [3],
            isDone: false,
            mark: null,
            teacherId: 1,
          },
        ],
        notes: "qwerty",
        vacation: false,
        holiday: false,
      },
      {
        id: 2,
        date: "2024-09-03",
        lessonsList: [
          {
            lessonId: 1,
            hwId: [4],
            isDone: false,
            mark: null,
            teacherId: 2,
          },
          {
            lessonId: 4,
            hwId: [5, 6],
            isDone: false,
            mark: null,
            teacherId: null,
          },
          {
            lessonId: 1,
            hwId: [null],
            isDone: false,
            mark: null,
            teacherId: null,
          },
        ],
        notes: "notes",
        vacation: false,
        holiday: false,
      },
      {
        id: 3,
        date: "2024-09-04",
        lessonsList: [
          {
            lessonId: 2,
            hwId: [7],
            isDone: false,
            mark: null,
            teacherId: 2,
          },
          {
            lessonId: 1,
            hwId: [8],
            isDone: false,
            mark: null,
            teacherId: 1,
          },
        ],
        notes: null,
        vacation: false,
        holiday: false,
      },
    ],
    homeworks: [
      {
        id: 1,
        homework: [
          {
            task: null,
            page: null,
            notes: "стих наизусть",
          },
        ],
      },
      {
        id: 2,
        homework: [
          {
            task: "23",
            page: "23-34",
            notes: "qwerty",
          },
        ],
      },
      {
        id: 3,
        homework: [
          {
            task: "232",
            page: null,
            notes: null,
          },
        ],
      },
      {
        id: 4,
        homework: [
          {
            task: "232",
            page: null,
            notes: null,
          },
        ],
      },
      {
        id: 5,
        homework: [
          {
            task: "232",
            page: null,
            notes: null,
          },
        ],
      },
      {
        id: 6,
        homework: [
          {
            task: "232",
            page: null,
            notes: null,
          },
        ],
      },
      {
        id: 7,
        homework: [
          {
            task: "232",
            page: null,
            notes: null,
          },
        ],
      },
      {
        id: 8,
        homework: [
          {
            task: "232",
            page: "uiuiui",
            notes: null,
          },
        ],
      },
    ],
  },
  reducers: {
    addShedule: (state, action) => {
      return { ...state, sheduleList: state.sheduleList.push(action.payload) };
    },
    updateShedule: (state, action) => {
      const index = state.sheduleList.findIndex(
        (el) => el.id === action.payload.id
      );
      const newSheduleList = state.sheduleList.slice();
      newSheduleList[index] = action.payload;
      return { ...state, sheduleList: newSheduleList };
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
export const { addShedule, updateShedule } = sheduleSlice.actions;
export const sheduleReducer = sheduleSlice.reducer;
