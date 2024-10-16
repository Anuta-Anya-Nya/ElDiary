import { createSlice } from "@reduxjs/toolkit";

const lessonsSlice = createSlice({
  name: "lessons",
  initialState: {
    lessons: {
      1: { lessonId: 1, title: "Русский", teachers: [1], cabinets: [15] },
      2: { lessonId: 2, title: "Математика", teachers: [2], cabinets: [2] },
      3: { lessonId: 3, title: "Литература", teachers: [1], cabinets: [15] },
      4: { lessonId: 4, title: "История", teachers: [], cabinets: [] },
      5: { lessonId: 5, title: "География", teachers: [], cabinets: [] },
      6: { lessonId: 6, title: "Биология", teachers: [], cabinets: [] },
      7: {
        lessonId: 7,
        title: "Английский",
        teachers: [3, 4],
        cabinets: [23, 30],
      },
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
