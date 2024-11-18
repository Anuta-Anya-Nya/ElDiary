import { db } from "../firebase/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

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
