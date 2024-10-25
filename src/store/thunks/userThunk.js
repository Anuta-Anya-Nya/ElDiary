import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { addUserDb } from "../../firebase/crud";

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
      };
      addUserDb(userData);
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
      const userCredit = await signInWithEmailAndPassword(auth, email, pass);
      const userData = {
        email: userCredit.user.email,
        id: userCredit.user.uid,
      };
      console.log(userCredit.user);
      return userData;
    } catch (er) {
      console.log(er.code, er.message);
    }
  }
);
