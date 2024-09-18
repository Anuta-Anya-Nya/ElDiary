import { createSlice } from "@reduxjs/toolkit";

const homeworksSlice = createSlice({
  name: "homeworks",
  initialState: {
    homeworksList: {
      1: {
        id: 1,
        homework: [
          {
            task: null,
            page: null,
            notes: "стих наизусть",
          },
          {
            task: "23",
            page: "23-34",
            notes: "qwerty",
          },
        ],
        isDone: false,
      },
      2: {
        id: 2,
        homework: [
          {
            task: "23",
            page: "23-34",
            notes: "qwerty",
          },
        ],
        isDone: false,
      },
      3: {
        id: 3,
        homework: [
          {
            task: "232",
            page: null,
            notes: null,
          },
        ],
        isDone: false,
      },
      4: {
        id: 4,
        homework: [
          {
            task: "232",
            page: null,
            notes: null,
          },
        ],
        isDone: false,
      },
      5: {
        id: 5,
        homework: [
          {
            task: "232",
            page: "12 - 23",
            notes: null,
          },
        ],
        isDone: true,
      },
      6: {
        id: 6,
        homework: [
          {
            task: "232",
            page: null,
            notes: null,
          },
        ],
        isDone: false,
      },
      7: {
        id: 7,
        homework: [
          {
            task: "232",
            page: "uiuiui",
            notes: null,
          },
        ],
        isDone: false,
      },
      8: {
        id: 8,
        homework: [
          {
            task: "232",
            page: "uiuiui",
            notes: null,
          },
        ],
        isDone: false,
      },
      9: {
        id: 9,
        homework: [
          {
            task: "232",
            page: "uiuiui",
            notes: null,
          },
        ],
        isDone: false,
      },
      10: {
        id: 10,
        homework: [
          {
            task: "232",
            page: "uiuiui",
            notes: null,
          },
        ],
        isDone: false,
      },
    },
  },
  reducers: {
    addHomework: (state, action) => {
      state.homeworksList[action.payload.id] = action.payload;
    },
    updateHomework: (state, action) => {
      Object.assign(state.homeworksList[action.payload.id], action.payload);
    },
    deleteHomework: (state, action) => {
      // console.log(
      //   Object.keys(state.homeworksList).filter(
      //     (key) => Number(key) !== action.payload
      //   )
      // );
      console.log(
        Object.keys(state.homeworksList)
          .filter((key) => Number(key) !== action.payload)
          .reduce((obj, key) => {
            obj[key] = state.homeworksList[key];
            return obj;
          }, {})
      );
      return Object.keys(state.homeworksList)
        .filter((key) => Number(key) !== action.payload)
        .reduce((obj, key) => {
          obj[key] = state.homeworksList[key];
          return obj;
        }, {});
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
export const { addHomework, updateHomework, deleteHomework } =
  homeworksSlice.actions;
export const homeworksReducer = homeworksSlice.reducer;
