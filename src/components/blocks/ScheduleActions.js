import ScheduleTable from "../tables/ScheduleTable";
import { CustomModal } from "../customModal/CustomModal";
import { setCreate, saveModalData } from "../../store/slices/contentSlice";
import { useEffect, useState } from "react";
import useEffectAfterMount from "../../utils/useEffectAfterMount";
import { useDispatch, useSelector } from "react-redux";
import { addWeeklySchedule } from "../../store/slices/weeklyScheduleSlice";

const ScheduleActions = ({
  period,
  checkAvail,
  scheduleForEdit,
  setEditSchedule,
  editSchedule,
}) => {
  const [schedule, setSchedule] = useState([
    [{ lessonId: null, cabinet: null, teacherId: null }],
    [{ lessonId: null, cabinet: null, teacherId: null }],
    [{ lessonId: null, cabinet: null, teacherId: null }],
    [{ lessonId: null, cabinet: null, teacherId: null }],
    [{ lessonId: null, cabinet: null, teacherId: null }],
    [{ lessonId: null, cabinet: null, teacherId: null }],
  ]);

  const modalData = useSelector((state) => state.content.openModal.modalData);
  const dispatch = useDispatch();

  const addString = (day) => {
    const newSchedule = JSON.parse(JSON.stringify(schedule));
    newSchedule[day].push({
      lessonId: null,
      cabinet: null,
      teacherId: null,
    });
    setSchedule(newSchedule);
  };

  const saveWeeklySchedule = () => {
    const newWeeklySchedule = {
      id: Date.now(),
      startPeriod: `${period}-09-01`,
      endPeriod: `${period + 1}-06-01`,
      schedule: schedule,
    };
    dispatch(addWeeklySchedule(newWeeklySchedule));
    setSchedule([
      [{ lessonId: null, cabinet: null, teacherId: null }],
      [{ lessonId: null, cabinet: null, teacherId: null }],
      [{ lessonId: null, cabinet: null, teacherId: null }],
      [{ lessonId: null, cabinet: null, teacherId: null }],
      [{ lessonId: null, cabinet: null, teacherId: null }],
      [{ lessonId: null, cabinet: null, teacherId: null }],
    ]);
  };

  useEffectAfterMount(() => {
    const newSchedule = JSON.parse(JSON.stringify(schedule));
    newSchedule[modalData.day][modalData.number] = {
      lessonId: modalData.selectLessonId,
      cabinet: modalData.selectCabinet,
      teacherId: modalData.selectTeacher,
    };
    setSchedule(newSchedule);
  }, [modalData.selectLessonId]);

  useEffect(() => {
    return () => {
      dispatch(setCreate(false));
      dispatch(saveModalData({ day: null }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (scheduleForEdit) {
      setSchedule(scheduleForEdit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="diary__area">
        {schedule.map((day, ind) => (
          <ScheduleTable
            daySchedule={day}
            index={ind}
            key={ind}
            create={true}
            addString={addString}
            editSchedule={editSchedule}
          />
        ))}
      </div>

      <button
        className="modal-submit-button"
        disabled={checkAvail}
        onClick={() => {
          saveWeeklySchedule();
          if (setEditSchedule) {
            setEditSchedule(false);
          }
        }}
      >
        Сохранить расписание
      </button>

      <CustomModal />
    </>
  );
};
export default ScheduleActions;
