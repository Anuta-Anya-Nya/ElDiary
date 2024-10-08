import MenuCardBox from "./cards/MenuCardBox";
import PageTitle from "./blocks/PageTitle";
import ScheduleTable from "./tables/ScheduleTable";
import { CustomModal } from "./customModal/CustomModal";
import moment from "moment/min/moment-with-locales.min";
import { setCreate, saveModalData } from "../store/slices/contentSlice";
import { useEffect, useState } from "react";
import useEffectAfterMount from "../utils/useEffectAfterMount";
import { useDispatch, useSelector } from "react-redux";

const ScheduleCreate = () => {
  const titleCardId = 7;

  const currentDate = moment();
  const currentStudyYear = currentDate.isBefore(
    moment(`${currentDate.format("YYYY")}-09-01`)
  )
    ? Number(currentDate.format("YYYY")) - 1
    : Number(currentDate.format("YYYY"));

  const [period, setPeriod] = useState(currentStudyYear);
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

  const handleChange = (e) => {
    setPeriod(Number(e.target.value));
  };

  // при создании расписания, надо проверять чтобы оно не было создано. если созднано - то вывести сообщение что надо изменить
  useEffectAfterMount(() => {
    console.log("кастомный хук");
    const newSchedule = [...schedule];
    newSchedule[modalData.day][modalData.number] = {
      lessonId: modalData.selectLessonId,
      cabinet: modalData.selectClass,
      teacherId: modalData.selectTeacher,
    };
    setSchedule(newSchedule);
  }, [modalData.selectLessonId]);
  useEffect(() => {
    return () => {
      dispatch(setCreate(false));
      dispatch(saveModalData({}));
    };
  }, []);

  return (
    <main>
      <PageTitle titleCardId={titleCardId} />
      <section className="schedule">
        <div className="container diary-container">
          <div className="schedule__header">
            <h2 className="diary__title">Создать новое учебное расписание</h2>
            <div>
              <label htmlFor="periodSchedule">Период: </label>
              <select
                value={period}
                onChange={(ev) => {
                  handleChange(ev);
                }}
                name="selectPeriod"
                id="periodSchedule"
              >
                <option
                  value={currentStudyYear - 1}
                  selected={period === currentStudyYear - 1}
                >
                  {currentStudyYear - 1}
                </option>
                <option
                  value={currentStudyYear}
                  selected={period === currentStudyYear}
                >
                  {currentStudyYear}
                </option>
                <option
                  value={currentStudyYear + 1}
                  selected={period === currentStudyYear + 1}
                >
                  {currentStudyYear + 1}
                </option>
              </select>
              <span>- {period + 1}</span>
            </div>
          </div>

          <div className="diary__area">
            {schedule.map((day, ind) => (
              <ScheduleTable
                daySchedule={day}
                index={ind}
                key={ind}
                create={true}
              />
            ))}
          </div>
        </div>
        <CustomModal />
      </section>

      <MenuCardBox titleCardId={titleCardId} />
    </main>
  );
};

export default ScheduleCreate;
