import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

// THUNK для создания пользователя при регистрации
export const createUserThunk = createAsyncThunk(
  "user/addUserThunk",
  async ({ email, pass }, { rejectWithValue }) => {
    try {
      const userCredit = await createUserWithEmailAndPassword(
        auth,
        email,
        pass
      );
      console.log(userCredit.user);
      // ответ от firebase при успешно выполненном запросе
      const userData = {
        email: userCredit.user.email,
        id: userCredit.user.uid,
        token: userCredit.user.accessToken,
      };
      return userData;
    } catch (er) {
      console.log(er.code, er.message);
      //   ошибку можно прокинуть в стейт и через dispatch и через rejectWithValue, обработав в [loginThunk.fulfilled]
      //   rejectWithValue(er.message)
    }
  }
);

// THUNK для входа если пользователь зарегистрирован
export const loginThunk = createAsyncThunk(
  "user/loginThunk",
  async ({ email, pass }) => {
    try {
      // всегда надо передавать можуль аутентификации с конфигами auth
      const userCredit = await signInWithEmailAndPassword(auth, email, pass);
      const userData = {
        email: userCredit.user.email,
        id: userCredit.user.uid,
        token: userCredit.user.accessToken,
      };
      return userData;
    } catch (er) {
      console.log(er.code, er.message);
    }
  }
);

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
