import moment from "moment/min/moment-with-locales.min";
import { createSlice } from "@reduxjs/toolkit";

const sheduleSlice = createSlice({
  name: "shedule",
  initialState: {
    sheduleList: [
      {
        id: 1,
        date: moment("2024-09-02"),
        lessonsList: [
          {
            lessonId: 2,
            homework: [
              {
                id: 1,
                task: null,
                page: null,
                notes: "qwerty",
              },
            ],
            isDone: false,
            mark: null,
            teacherId: 2,
          },
          {
            lessonId: 1,
            homework: [
              {
                id: 2,
                task: "10",
                page: "15",
                notes: "qwerty",
              },
            ],
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
        date: moment("2024-09-03"), //date.getDay() возвращает день недели от 0 - вс до 6 - сб
        lessonsList: [
          {
            lessonId: null,
            homework: null,
            teacherId: null,
            isDone: false,
            mark: null,
          },
          {
            lessonId: 1,
            homework: [{ id: 2, task: "10", page: "15", notes: "qwerty" }],
            isDone: false,
            mark: null,
            teacherId: 1,
          },
        ],
        notes: "asdfg",
        vacation: false,
        holiday: false,
      },
      {
        id: 3,
        date: moment("2024-09-04"), //date.getDay() возвращает день недели от 0 - вс до 6 - сб
        lessonsList: [
          {
            lessonId: 1,
            homework: null,
            teacherId: 1,
          },
          {
            lessonId: 1,
            homework: [
              {
                id: 2,
                task: "10",
                page: "15",
                notes: "qwerty",
              },
            ],
            teacherId: 1,
            isDone: false,
            mark: null,
          },
        ],
        notes: "asdfg",
        vacation: false,
        holiday: false,
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
