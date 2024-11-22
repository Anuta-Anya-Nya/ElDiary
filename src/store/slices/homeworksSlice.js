import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addHomeworkDB, getHomeworksDB } from "../../db/homeworkDb";
import { updateDailyScheduleDB } from "../../db/dailyShedulesDb";

export const getHomeworksThunk = createAsyncThunk(
  "homeworks/getHomeworksThunk",
  async ({ userId, currentYear }) => {
    try {
      console.log("загружаем ежедневные расписания...");
      const homeworksList = await getHomeworksDB(userId, currentYear);
      console.log(homeworksList);
      return { loading: false, error: null, homeworksList };
    } catch (er) {
      console.log(er.code, er.message);
      return { loading: false, error: er.message };
    }
  }
);

export const addHomeworkThunk = createAsyncThunk(
  "homeworks/addHomeworkThunk",
  async ({ userId, homework, currentStudyYear, data }, { rejectWithValue }) => {
    try {
      await addHomeworkDB(userId, homework, currentStudyYear).then(
        updateDailyScheduleDB(userId, data, currentStudyYear)
      );
      return { homework };
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

const homeworksSlice = createSlice({
  name: "homeworks",
  initialState: {
    loading: true,
    error: null,
    homeworksList: {
      // 1: {
      //   id: 1,
      //   homework: [
      //     {
      //       task: null,
      //       page: null,
      //       notes: "стих наизусть",
      //     },
      //     {
      //       task: "23",
      //       page: "23-34",
      //       notes: "qwerty",
      //     },
      //   ],
      //   isDone: false,
      // },
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
  extraReducers: (builder) => {
    builder.addCase(getHomeworksThunk.fulfilled, (state, action) => {
      return (state = action.payload);
    });
    builder.addCase(addHomeworkThunk.fulfilled, (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        homeworksList: {
          ...state.homeworksList,
          ...action.payload.homeworksList,
        },
      };
    });
    builder.addCase(addHomeworkThunk.rejected, (state, action) => {
      return state;
    });
  },
});
export const { addHomework, updateHomework, deleteHomework } =
  homeworksSlice.actions;
export const homeworksReducer = homeworksSlice.reducer;
