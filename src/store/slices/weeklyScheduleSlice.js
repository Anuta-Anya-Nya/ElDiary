import { createSlice } from "@reduxjs/toolkit";

const weeklyScheduleSlice = createSlice({
  name: "weeklySchedule",
  initialState: {
    scheduleForWeek: {
      2024: {
        id: 123,
        startPeriod: "2024-09-01",
        endPeriod: "2025-06-01",
        schedule: [
          [
            { lessonId: 1, cabinet: 23, teacherId: 1 },
            { lessonId: 2, cabinet: 23, teacherId: 2 },
            { lessonId: null, cabinet: null, teacherId: null },
            { lessonId: 2, cabinet: 23, teacherId: 2 },
          ],
          [
            { lessonId: 1, cabinet: 23, teacherId: 1 },
            { lessonId: 2, cabinet: 23, teacherId: 2 },
          ],
          [
            { lessonId: 1, cabinet: 23, teacherId: 1 },
            { lessonId: 2, cabinet: 23, teacherId: 2 },
            { lessonId: 2, cabinet: 23, teacherId: 2 },
          ],
          [
            { lessonId: 1, cabinet: 23, teacherId: 1 },
            { lessonId: 2, cabinet: 23, teacherId: 2 },
            { lessonId: 2, cabinet: 23, teacherId: 2 },
            { lessonId: 2, cabinet: 23, teacherId: 2 },
          ],
          [
            { lessonId: 1, cabinet: 23, teacherId: 1 },
            { lessonId: 2, cabinet: 23, teacherId: 2 },
          ],
          [{ lessonId: null, cabinet: null, teacherId: null }],
        ],
      },
    },
  },

  reducers: {
    addWeeklySchedule: (state, action) => {
      const key = action.payload.startPeriod.slice(0, 4);
      state.scheduleForWeek[key] = action.payload;
    },
    // updateDailySchedule: (state, action) => {
    // },
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
export const { addWeeklySchedule } = weeklyScheduleSlice.actions;
export const weeklyScheduleReducer = weeklyScheduleSlice.reducer;
