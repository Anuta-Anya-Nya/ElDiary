import { createSlice } from "@reduxjs/toolkit";

const settingSlice = createSlice({
  name: "setting",
  initialState: {
    lessons: {
      1: { title: "Русский", teachers: [null] },
      2: { title: "Математика", teachers: [null] },
      3: { title: "Литература", teachers: [null] },
      4: { title: "История", teachers: [null] },
    },

    teachers: [
      {
        id: 1,
        name: "Иванова Мария Михайловна",
        tel: "(905)123-22-33",
        teachingLessons: [1, 3],
      },
      {
        id: 2,
        name: "Петрова Лилия Григорьевна",
        tel: "(905)111-22-33",
        teachingLessons: [2],
      },
    ],
    shedule: {
      1: [1, 3, 2, 2, 4], //понедельник и массив id уроков
      2: [3, 3, 2, 1],
      3: [],
      4: [],
      5: [1, 2, 4],
      6: [],
    },
    rings: [
      null,
      "8.00 - 8.40",
      "8.45 - 9.25",
      "9.30 - 10.10",
      "10.25 - 11.05",
      "11.15 - 11.55",
      "12.00 - 12.35",
      "12.40 - 13.15",
    ],
  },
  reducers: {
    addLesson: (state, action) => {
      state.lessons.push(action.payload);
      return state;
    },
    removeLesson: (state, action) => {
      state.lessons.delete(action.payload);
      return state;
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
export const { addLesson, removeLesson } = settingSlice.actions;
export const settingReducer = settingSlice.reducer;
