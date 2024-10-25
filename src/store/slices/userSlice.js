import { createSlice } from "@reduxjs/toolkit";
import { createUserThunk, loginThunk } from "../thunks/userThunk";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    token: null,
    id: null,
    // error: null
  },
  reducers: {
    addUser: (state, action) => {
      return (state = action.payload);
    },
    removeUser: (state) => {
      state.email = null;
      state.id = null;
      state.token = null;
    },
  },
  //   редьюсеры для thunk функций
  extraReducers: (builder) => {
    builder.addCase(createUserThunk.fulfilled, (state, action) => {
      return (state = action.payload);
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      return (state = action.payload);
    });
  },
  //   // можно еще обработать ошибки с pending и reject
  //   [createUserThunk.fulfilled]: (state, action) => {
  //     return (state = action.payload);
  //   },
  //   // [createUserThunk.rejected]: (state, action) => {
  //   //   state.error = action.payload;
  //   // },
  //   [loginThunk.fulfilled]: (state, action) => {
  //     return (state = action.payload);
  //   },

  // },
});

export const { addUser, removeUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
