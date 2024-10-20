import { firestore } from "./firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

// дока  get data with Cloud firestore - firebase

// функция добавления нового поста в коллекцию
export const addPost = async (data) => {
  const result = addDoc(collection(firestore, "posts"), data);
  console.log(result);
};

// функция для загрузки постов и возврата в виде промиса
export const getAllPosts = async () => {
  const response = await getDocs(collection(firestore, "posts"));
  console.log(response);
  const arr = response.docs.map((e) => e.data());
  return arr;
};
