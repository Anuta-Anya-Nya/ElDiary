import { db } from "../firebase/firebase";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";

export const getHomeworksDB = async (userId, currentYear) => {
  const resp = await getDoc(doc(db, `users/${userId}/homework/${currentYear}`));
  if (resp.exists()) {
    return resp.data();
  } else {
    console.log("домашние работы отсутствуют");
    return {};
  }
};

export const addHomeworkDB = async (userId, data, currentStudyYear) => {
  const resp = await getDoc(
    doc(db, `users/${userId}/homework/${currentStudyYear}`)
  );
  if (resp.exists()) {
    console.log("создан, надо обновить");
    updateDoc(doc(db, `users/${userId}/homework/${currentStudyYear}`), {
      [data.id]: data,
    });
  } else {
    console.log("не создан, надо создать");
    setDoc(doc(db, `users/${userId}/homework/${currentStudyYear}`), {
      [data.id]: data,
    });
  }
};