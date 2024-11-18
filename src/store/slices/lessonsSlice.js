import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addLessonDB, getLessonsDB } from "../../db/lessonsDb";

export const getLessonsThunk = createAsyncThunk(
  "lessons/getLessonsThunk",
  async (userId) => {
    try {
      const lessons = await getLessonsDB(userId);
      return { lessons, loading: false, error: null };
    } catch (er) {
      console.log(er.code, er.message);
      return { lessons: {}, loading: false, error: er.message };
    }
  }
);
export const addLessonThunk = createAsyncThunk(
  "lessons/addLessonThunk",
  async ({ userId, lesson }, { rejectWithValue }) => {
    try {
      await addLessonDB(userId, lesson);
      return { [lesson.lessonId]: lesson };
    } catch (error) {
      if (error.code === "permission-denied") {
        console.error("У вас нет разрешения на добавление документа.");
      } else if (error.code === "not-found") {
        console.error("Коллекция не найдена.");
      } else {
        console.error("Произошла неизвестная ошибка: ", error.message);
      }
      return rejectWithValue({ error: error.message });
    }
  }
);
const lessonsSlice = createSlice({
  name: "lessons",
  initialState: {
    loading: true,
    error: null,
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
    builder.addCase(addLessonThunk.fulfilled, (state, action) => {
      return {
        ...state,
        lessons: { ...state.lessons, ...action.payload },
      };
    });
    builder.addCase(addLessonThunk.rejected, (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        ...action.payload,
      };
    });
  },
});
export const { addLesson, removeLesson, updateNote } = lessonsSlice.actions;
export const lessonsReducer = lessonsSlice.reducer;
