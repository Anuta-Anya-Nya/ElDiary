import { createSlice } from "@reduxjs/toolkit";

const lessonsSlice = createSlice({
  name: "lessons",
  initialState: {
    lessons: {
      1: { lessonId: 1, title: "Русский", teachers: [1], class: [] },
      2: { lessonId: 2, title: "Математика", teachers: [2], class: [] },
      3: { lessonId: 3, title: "Литература", teachers: [1], class: [] },
      4: { lessonId: 4, title: "История", teachers: [], class: [] },
      5: { lessonId: 5, title: "География", teachers: [], class: [] },
      6: { lessonId: 6, title: "Биология", teachers: [], class: [] },
      7: { lessonId: 7, title: "Английский", teachers: [3, 4], class: [] },
    },
  },
  reducers: {
    addLesson: (state, action) => {
      const lesson = action.payload;
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
export const { addLesson, removeLesson, updateNote } = lessonsSlice.actions;
export const lessonsReducer = lessonsSlice.reducer;
