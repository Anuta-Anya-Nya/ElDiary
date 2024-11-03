import shortid from "shortid";
import { db } from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";

export const addTeacherDb = async ({ userId, teacher }) => {
  const teacherId = shortid.generate();
  setDoc(doc(db, `users/${userId}/teachers/${teacherId}`), {
    ...teacher,
    id: teacherId,
  });
};
