import shortid from "shortid";
import { db } from "../firebase/firebase";
import { setDoc, doc, getDocs, collection } from "firebase/firestore";

export const getTeachersDB = async (userId) => {
  const resp = await getDocs(collection(db, `users/${userId}/teachers/`));
  const arr = resp.docs.reduce((obj, el) => {
    obj[el.data().id] = el.data();
    return obj;
  }, {});
  console.log(arr);

  return arr;
};

export const addTeacherDb = async ({ userId, teacher }) => {
  const teacherId = shortid.generate();
  setDoc(doc(db, `users/${userId}/teachers/${teacherId}`), {
    ...teacher,
    id: teacherId,
  });
};
