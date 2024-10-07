import MenuCardBox from "../cards/MenuCardBox";
import PageTitle from "../blocks/PageTitle";
import ScheduleTable from "../tables/ScheduleTable";
import { CustomModal } from "../customModal/CustomModal";
import moment from "moment/min/moment-with-locales.min";
import { openCloseModal, saveModalData } from "../../store/slices/contentSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const ScheduleCreate = () => {
  const titleCardId = 7;
  const dispatch = useDispatch();
  const currentDate = moment();
  const currentStudyYear = currentDate.isBefore(
    moment(`${currentDate.format("YYYY")}-09-01`)
  )
    ? Number(currentDate.format("YYYY")) - 1
    : Number(currentDate.format("YYYY"));

  const [period, setPeriod] = useState(currentStudyYear);
  const [schedule, setSchedule] = useState([
    // [{ lessonId: null, cabinet: null, teacherId: null }],
    // [{ lessonId: null, cabinet: null, teacherId: null }],
    // [{ lessonId: null, cabinet: null, teacherId: null }],
    // [{ lessonId: null, cabinet: null, teacherId: null }],
    // [{ lessonId: null, cabinet: null, teacherId: null }],
    // [{ lessonId: null, cabinet: null, teacherId: null }],
  ]);
  const [day, setDay] = useState(0);
  const handleChange = (e) => {
    setPeriod(Number(e.target.value));
  };
  const handleChangeDay = (e) => {
    setDay(Number(e.target.value));
  };
  // при создании расписания, надо проверять чтобы оно не было создано. если созднано - то вывести сообщение что надо изменить
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
            <div>
              <label htmlFor="daySchedule"></label>
              <select
                value={day}
                onChange={(ev) => {
                  handleChangeDay(ev);
                }}
                name="selectDay"
                id="daySchedule"
              >
                <option value="0">Понедельник</option>
                <option value="1">Вторник</option>
                <option value="2">Среда</option>
                <option value="3">Четверг</option>
                <option value="4">Пятница</option>
                <option value="5">Суббота</option>
              </select>
              <button
                className="modal-submit-button"
                onClick={() => {
                  dispatch(openCloseModal({ scheduleAddLesson: true }));
                }}
              >
                Добавить уроки
              </button>
            </div>
          </div>

          <div className="diary__area">
            {schedule.map((day, ind) => (
              <ScheduleTable daySchedule={day} index={ind} key={ind} />
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
