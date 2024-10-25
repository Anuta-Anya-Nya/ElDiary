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

// функция для загрузки постов и возврата в виде промиса
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
  console.log(`users/${userId}/weeklyShedule/${currentYear}`);
  const resp = await getDoc(
    doc(db, `users/${userId}/weeklyShedule/${currentYear}`)
  );
  if (resp.exists()) {
    console.log(resp.data());
    return resp.data();
  } else {
    console.log("не создан");
    return {};
  }
};
