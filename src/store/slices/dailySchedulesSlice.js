import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDailySchedulesDB,
  getDailyShedulesDB,
} from "../../db/dailyShedulesDb";

export const getDailySchedules = createAsyncThunk(
  "dailySchedules/getDailySchedThunk",
  async ({ userId, currentYear }) => {
    try {
      console.log("загружаем ежедневные расписания...");
      const schedulesList = await getDailyShedulesDB(userId, currentYear);
      console.log(schedulesList);
      // В firestore нельзя хранить массив с вложенными массивами, потому перед сохранением в firestore используется JSON.stringify(schedule), а после загрузки на клиенте используется метод parse()
      // if (scheduleForWeek.schedule) {
      //   scheduleForWeek.schedule = JSON.parse(scheduleForWeek.schedule);
      // }
      return { loading: false, error: null, schedulesList };
    } catch (er) {
      console.log(er.code, er.message);
      return { loading: false, error: er.message };
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

const dailySchedulesSlice = createSlice({
  name: "dailySchedules",
  initialState: {
    loading: true,
    error: null,
    schedulesList: {
      // "2024-09-02": {
      //   id: 123123231,
      //   date: "2024-09-02",
      //   lessonsList: [
      //     {
      //       lessonId: 2,
      //       homeworkId: 1,
      //       grade: 5,
      //       teacherId: 2,
      //       cabinet: null,
      //     },
      //     {
      //       lessonId: 1,
      //       homeworkId: 2,
      //       grade: null,
      //       teacherId: 1,
      //       cabinet: null,
      //     },
      //     {
      //       lessonId: 1,
      //       homeworkId: null,
      //       grade: null,
      //       teacherId: 1,
      //       cabinet: null,
      //     },
      //   ],
      //   notes: "qwerty",
      //   vacation: false,
      //   holiday: false,
      // },
      // "2024-09-03": {
      //   id: 12312321113231,
      //   date: "2024-09-03",
      //   lessonsList: [
      //     {
      //       lessonId: 1,
      //       homeworkId: 4,
      //       grade: null,
      //       teacherId: 2,
      //       cabinet: null,
      //     },
      //     {
      //       lessonId: 4,
      //       homeworkId: 5,
      //       grade: null,
      //       teacherId: null,
      //       cabinet: null,
      //     },
      //     {
      //       lessonId: 6,
      //       homeworkId: 9,
      //       grade: null,
      //       teacherId: null,
      //       cabinet: null,
      //     },
      //     {
      //       lessonId: 7,
      //       homeworkId: 10,
      //       grade: null,
      //       teacherId: null,
      //       cabinet: null,
      //     },
      //   ],
      //   notes: "qwerty",
      //   vacation: false,
      //   holiday: false,
      // },
      // "2024-09-04": {
      //   id: 3122223,
      //   date: "2024-09-04",
      //   lessonsList: [
      //     {
      //       lessonId: null,
      //       homeworkId: null,
      //       grade: null,
      //       teacherId: null,
      //       cabinet: null,
      //     },
      //     {
      //       lessonId: 2,
      //       homeworkId: 6,
      //       grade: null,
      //       teacherId: 2,
      //       cabinet: null,
      //     },
      //     {
      //       lessonId: 2,
      //       homeworkId: 7,
      //       grade: null,
      //       teacherId: 2,
      //       cabinet: null,
      //     },
      //     {
      //       lessonId: 1,
      //       homeworkId: 8,
      //       grade: null,
      //       teacherId: 1,
      //       cabinet: null,
      //     },
      //   ],
      //   notes: null,
      //   vacation: false,
      //   holiday: false,
      // },
    },
  },
  reducers: {
    addSchedule: (state, action) => {
      // state.schedulesList[action.payload.date] = action.payload;
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
      console.log(action.payload);
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
