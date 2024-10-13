import { createSlice } from "@reduxjs/toolkit";

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    teachersList: {
      1: {
        id: 1,
        name: "Иванова Мария Михайловна",
        tel: "(905)123-22-33",
        birthdate: null,
        teachingLessons: [1, 3],
      },
      2: {
        id: 2,
        name: "Петрова Лилия Григорьевна",
        tel: "(905)111-22-33",
        birthdate: null,
        teachingLessons: [2],
      },
      3: {
        id: 3,
        name: "Сидорова Валентина Михайловна",
        tel: "(905)123-22-33",
        birthdate: null,
        teachingLessons: [7],
      },
      4: {
        id: 4,
        name: "Матвеева Валентина Михайловна",
        tel: "(905)123-22-33",
        birthdate: null,
        teachingLessons: [7],
      },
      5: {
        id: 5,
        name: "Валентинова Валентина Михайловна",
        tel: "(905)123-22-33",
        birthdate: null,
        teachingLessons: [5],
      },
      6: {
        id: 6,
        name: "Михайлова Валентина Михайловна",
        tel: "(905)123-22-33",
        birthdate: null,
        teachingLessons: [5],
      },
    },
  },
  reducers: {
    addTeacher: (state, action) => {
      return {
        ...state,
        teachersList: {
          ...state.teachersList,
          [action.payload.id]: action.payload,
        },
      };
      // state.lessons[action.payload.id] = action.payload;
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
export const { addTeacher } = teachersSlice.actions;
export const teacherReducer = teachersSlice.reducer;
