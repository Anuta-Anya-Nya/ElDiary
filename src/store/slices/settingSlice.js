import { createSlice } from "@reduxjs/toolkit";

const settingSlice = createSlice({
  name: "settings",
  initialState: {
    // отображение домашний работы: 0-текущий день, 1 - завтрашний день
    displayHomeWork: 1,
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
    changeDisplayHW: (state, action) => {
      return { ...state, displayHomeWork: action.payload };
    },
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
export const { changeDisplayHW, addLesson, removeLesson } =
  settingSlice.actions;
export const settingsReducer = settingSlice.reducer;
