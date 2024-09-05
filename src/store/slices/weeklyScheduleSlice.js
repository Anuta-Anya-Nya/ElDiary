import { createSlice } from "@reduxjs/toolkit";

const weeklyScheduleSlice = createSlice({
  name: "weeklySchedule",
  initialState: {
    scheduleForWeek: [
      {
        id: 123,
        startPeriod: "2024-09-01",
        endPeriod: "2024-06-01",
        понедельник: [1, 2, 3, 4, 4, 5],
        вторник: [1, 2, 3, 4, 5, 6],
        среда: [2, 2, 3, 4, 4],
        четверг: [null, 5, 6, 4],
        пятница: [1, null, 2],
        суббота: [null],
      },
    ],
  },
  reducers: {
    addWeeklySchedule: (state, action) => {
      console.log(action.payload);
      state.scheduleForWeek.push(action.payload);
    },
    // updateDailySchedule: (state, action) => {
    //   const {date}
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
