import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLessonsDB } from "../../db/lessonsDb";

export const getLessonsThunk = createAsyncThunk(
  "lessons/getLessonsThunk",
  async (userId) => {
    try {
      const lessons = await getLessonsDB(userId);
      return { lessons, loading: false };
    } catch (er) {
      console.log(er.code, er.message);
      return { lessons: {}, loading: false };
    }
  }
);
const lessonsSlice = createSlice({
  name: "lessons",
  initialState: {
    loading: true,
    lessons: {
      // qwe: { lessonId: "qwe", title: "Русский", teachers: [1], cabinets: [15] },
    },
  },
  reducers: {
    addLesson: (state, action) => {
      const lesson = action.payload;
      console.log(lesson);
      console.log(lesson.lessonId);
      state.lessons[lesson.lessonId] = lesson;
    },
    removeLesson: (state, action) => {
      const { lessonId } = action.payload;
      delete state.lessons[lessonId];
    },
    updateNote(state, action) {
      const { lessonId, data } = action.payload;
      Object.assign(state.lessons[lessonId], data);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLessonsThunk.fulfilled, (state, action) => {
      return (state = action.payload);
    });
    // builder.addCase(loginThunk.fulfilled, (state, action) => {
    //   return (state = action.payload);
    // });
  },
});
export const { addLesson, removeLesson, updateNote } = lessonsSlice.actions;
export const lessonsReducer = lessonsSlice.reducer;
