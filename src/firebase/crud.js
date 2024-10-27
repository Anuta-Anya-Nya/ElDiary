import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";

// функция добавления нового поста в коллекцию
export const addPost = async (data) => {
  const result = addDoc(collection(db, "posts"), data);
  console.log(result);
};

export const getAllPosts = async () => {
  const response = await getDocs(collection(db, "posts"));
  console.log(response);
  const arr = response.docs.map((e) => e.data());
  return arr;
};

export const addUserDb = async (user) => {
  setDoc(doc(db, "users", user.id), user);
};

export const getWeeklySheduleDB = async (userId, currentYear) => {
  const resp = await getDoc(
    doc(db, `users/${userId}/weeklyShedule/${currentYear}`)
  );
  if (resp.exists()) {
    return resp.data();
  } else {
    console.log("не создан");
    return {};
  }
};
export const isCreateWeeklySheduleDB = async (userId, currentYear) => {
  const resp = await getDoc(
    doc(db, `users/${userId}/weeklyShedule/${currentYear}`)
  );
  if (resp.exists()) {
    return true;
  } else {
    return false;
  }
};

export const addWeeklyScheduleDB = async (userId, data) => {
  const result = setDoc(
    doc(db, `users/${userId}/weeklyShedule/${data.year}`),
    data
  );
  console.log(result);
};
