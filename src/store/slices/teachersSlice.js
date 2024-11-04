import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTeachersDB } from "../../db/teachersDb";

export const getTeachersThunk = createAsyncThunk(
  "teachers/getTeachersThunk",
  async (userId) => {
    try {
      const teachersList = await getTeachersDB(userId);
      console.log(teachersList);
      return { teachersList, loading: false };
    } catch (er) {
      console.log(er.code, er.message);
      return { teachersList: {}, loading: false };
    }
  }
);

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    loading: true,
    teachersList: {
      // 1: {
      //   id: 1,
      //   name: "Иванова Мария Михайловна",
      //   tel: "(905)123-22-33",
      //   birthdate: null,
      //   teachingLessons: ["4Cn4xJFFJ2"],
      // },
      // 2: {
      //   id: 2,
      //   name: "Петрова Лилия Григорьевна",
      //   tel: "(905)111-22-33",
      //   birthdate: null,
      //   teachingLessons: ["4Cn4xJFFJ2"],
      // },
      // 3: {
      //   id: 3,
      //   name: "Сидорова Валентина Михайловна",
      //   tel: "(905)123-22-33",
      //   birthdate: null,
      //   teachingLessons: ["4Cn4xJFFJ2"],
      // },
      // 4: {
      //   id: 4,
      //   name: "Матвеева Валентина Михайловна",
      //   tel: "(905)123-22-33",
      //   birthdate: null,
      //   teachingLessons: ["4Cn4xJFFJ2"],
      // },
      // 5: {
      //   id: 5,
      //   name: "Валентинова Валентина Михайловна",
      //   tel: "(905)123-22-33",
      //   birthdate: null,
      //   teachingLessons: ["4Cn4xJFFJ2"],
      // },
      // 6: {
      //   id: 6,
      //   name: "Михайлова Валентина Михайловна",
      //   tel: "(905)123-22-33",
      //   birthdate: null,
      //   teachingLessons: ["4Cn4xJFFJ2"],
      // },
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
  extraReducers: (builder) => {
    builder.addCase(getTeachersThunk.fulfilled, (state, action) => {
      return (state = action.payload);
    });
  },
});
export const { addTeacher } = teachersSlice.actions;
export const teacherReducer = teachersSlice.reducer;
