import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDailySchedulesDB,
  getDailyShedulesDB,
  updateDailyScheduleDB,
} from "../../db/dailyShedulesDb";

export const getDailySchedules = createAsyncThunk(
  "dailySchedules/getDailySchedThunk",
  async ({ userId, currentYear }) => {
    try {
      const schedulesList = await getDailyShedulesDB(userId, currentYear);
      return { loading: false, error: null, schedulesList };
    } catch (er) {
      console.log(er.code, er.message);
      return { loading: false, error: er.message, schedulesList: {} };
    }
  }
);

export const addDailySchedulesThunk = createAsyncThunk(
  "dailySchedules/addDailySchedulesThunk",
  async ({ userId, schedulesList, currentStudyYear }, { rejectWithValue }) => {
    try {
      await addDailySchedulesDB(userId, schedulesList, currentStudyYear);
      return { schedulesList };
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

export const updateDailyScheduleLessonThunk = createAsyncThunk(
  "dailySchedules/updateDailyScheduleLessonThunk",
  async ({ userId, data, currentStudyYear }, { rejectWithValue }) => {
    try {
      await updateDailyScheduleDB(userId, data, currentStudyYear);
      return data;
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

const dailySchedulesSlice = createSlice({
  name: "dailySchedules",
  initialState: {
    loading: true,
    error: null,
    schedulesList: {
      // "2024-09-02": {
      //   id: 123123231,
      //   date: "2024-09-02",
      //   lessonsList: {
      //     0: {
      //       lessonId: 2,
      //       homework: 1,
      //       grade: 5,
      //       teacherId: 2,
      //       cabinet: null,
      //     },
      //     1: {
      //       lessonId: 1,
      //       homework: 2,
      //       grade: null,
      //       teacherId: 1,
      //       cabinet: null,
      //     },
      //     2: {
      //       lessonId: 1,
      //       homework: null,
      //       grade: null,
      //       teacherId: 1,
      //       cabinet: null,
      //     },
      //   },
      //   notes: "qwerty",
      //   vacation: false,
      //   holiday: false,
      // },
    },
  },
  reducers: {
    addSchedule: (state, action) => {
      return {
        ...state,
        schedulesList: { ...state.schedulesList, ...action.payload },
      };
    },
    updateDailyScheduleLesson: (state, action) => {
      state.schedulesList[action.payload.date].lessonsList[
        action.payload.number
      ] = action.payload.lesson;
    },
    addDailyScheduleLesson: (state, action) => {
      state.schedulesList[action.payload.date].lessonsList.push(
        action.payload.lesson
      );
    },
    updateDailyScheduleHomework: (state, action) => {
      state.schedulesList[action.payload.date].lessonsList[
        action.payload.number
      ].homeworkId = action.payload.homeworkId;
    },
    updateDailyScheduleGrade: (state, action) => {
      state.schedulesList[action.payload.date].lessonsList[
        action.payload.number
      ].grade = action.payload.grade;
    },
    updateDailyScheduleNote: (state, action) => {
      state.schedulesList[action.payload.date].notes = action.payload.notes;
    },
    updateDailyScheduleVacation: (state, action) => {
      state.schedulesList[action.payload.date].vacation =
        action.payload.vacation;
    },
    updateDailyScheduleHoliday: (state, action) => {
      state.schedulesList[action.payload.date].holiday = action.payload.holiday;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getDailySchedules.fulfilled, (state, action) => {
      return (state = action.payload);
    });
    builder.addCase(addDailySchedulesThunk.fulfilled, (state, action) => {
      return {
        ...state,
        schedulesList: {
          ...state.schedulesList,
          ...action.payload.schedulesList,
        },
      };
    });
    builder.addCase(addDailySchedulesThunk.rejected, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
    builder.addCase(
      updateDailyScheduleLessonThunk.fulfilled,
      (state, action) => {
        const { updateKey, date, number, updateValue } = action.payload;
        return {
          ...state,
          schedulesList: {
            ...state.schedulesList,
            [date]: {
              ...state.schedulesList[date],
              lessonsList: {
                ...state.schedulesList[date].lessonsList,
                [number]: {
                  ...state.schedulesList[date].lessonsList[number],
                  [updateKey]: updateValue,
                },
              },
            },
          },
        };
      }
    );
    builder.addCase(
      updateDailyScheduleLessonThunk.rejected,
      (state, action) => {
        return state;
      }
    );
  },
});
export const {
  addSchedule,
  updateDailyScheduleLesson,
  addDailyScheduleLesson,
  updateDailyScheduleHomework,
  updateDailyScheduleGrade,
  updateDailyScheduleNote,
  updateDailyScheduleVacation,
  updateDailyScheduleHoliday,
} = dailySchedulesSlice.actions;
export const dailySchedulesReducer = dailySchedulesSlice.reducer;
