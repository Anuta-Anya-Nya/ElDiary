import React, { useEffect, useState } from "react";
import { openCloseModal } from "../../store/slices/contentSlice";
import { useSelector, useDispatch } from "react-redux";
import { updateDailyScheduleLesson } from "../../store/slices/dailySchedulesSlice";
import ScheduleTable from "../tables/ScheduleTable";

export const ModalScheduleAddLesson = ({ data }) => {
  const [daySchedule, setDaySchedule] = useState([
    { lessonId: null, cabinet: null, teacherId: null },
    { lessonId: null, cabinet: null, teacherId: null },
    { lessonId: null, cabinet: null, teacherId: null },
    { lessonId: null, cabinet: null, teacherId: null },
    { lessonId: null, cabinet: null, teacherId: null },
    { lessonId: null, cabinet: null, teacherId: null },
  ]);

  return (
    <>
      <ScheduleTable
        daySchedule={daySchedule}
        index={data}
        create={true}
        setDaySchedule={setDaySchedule}
      />
      <button className="modal-submit-button">Записать изменения</button>
    </>
  );
};
