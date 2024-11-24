import { db } from "../firebase/firebase";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";

export const dailySchedInit = async (userId, currentYear) => {
  setDoc(doc(db, `users/${userId}/dailyShedules/${currentYear}`), {});
};

export const getDailyShedulesDB = async (userId, currentYear) => {
  const resp = await getDoc(
    doc(db, `users/${userId}/dailyShedules/${currentYear}`)
  );
  if (resp.exists()) {
    return resp.data();
  } else {
    console.log("ежедневные расписания отсутствуют");
    return {};
  }
};

export const addDailySchedulesDB = async (userId, data, currentStudyYear) => {
  const resp = await getDoc(
    doc(db, `users/${userId}/dailyShedules/${currentStudyYear}`)
  );
  if (resp.exists()) {
    updateDoc(
      doc(db, `users/${userId}/dailyShedules/${currentStudyYear}`),
      data
    );
  } else {
    setDoc(doc(db, `users/${userId}/dailyShedules/${currentStudyYear}`), data);
  }
};

export const updateDailyScheduleDB = async (userId, data, currentStudyYear) => {
  const updateKey = `${data.date}.lessonsList.${data.number}.${data.updateKey}`;
  console.log(updateKey);
  updateDoc(doc(db, `users/${userId}/dailyShedules/${currentStudyYear}`), {
    [updateKey]: data.updateValue,
  });
};
