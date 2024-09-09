import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import moment from "moment/min/moment-with-locales.min";
import MenuCardBox from "./cards/MenuCardBox";
import TablesDiary from "./tables/TablesDiary";
import { checkWeeklySchedule, getWeekDaysInStore } from "../utils/services";
import { useDispatch } from "react-redux";
import { addSchedule } from "../store/slices/dailySchedulesSlice";
import arrowLeft from "../assets/icons/arrow-left.svg";
import arrowRight from "../assets/icons/arrow-right.svg";
import { toChangeDate } from "../utils/services";
import { ModalAddLesson } from "../components/customModal/ModalAddLesson";
import { ModalAddHomework } from "./customModal/ModalAddHomework";
import { ModalAddGrade } from "./customModal/ModalAddGrade";
import { ModalAddNotes } from "./customModal/ModalAddNotes";

const Diary = () => {
  moment.locale("ru");
  const titleCardId = 1;
  const titleCard = useSelector((state) =>
    state.content.menuButtons.find((el) => el.id === titleCardId)
  );

  const [currentDate, setCurrentDate] = useState(moment("2024-09-02"));
  const [diaryWeek, setDiaryWeek] = useState({});
  const [modalAddLessonIsOpen, setModalAddLessonIsOpen] = useState(false);
  const [addLessonData, setAddLessonData] = useState({
    date: "",
    number: null,
  });
  const [modalAddHomeworkIsOpen, setModalAddHomeworkIsOpen] = useState(false);
  const [modalAddGradeIsOpen, setModalAddGradeIsOpen] = useState(false);
  const [modalAddNotesIsOpen, setModalAddNotesIsOpen] = useState(false);

  const schedules = useSelector((state) => state.dailySchedules.schedulesList);

  const dispatch = useDispatch();

  const findDiaryWeek = (currentDate, schedules) => {
    const selectedDates = getWeekDaysInStore(currentDate, schedules);
    const filteredSchedules = Object.keys(schedules)
      .filter((key) => selectedDates.includes(key))
      .reduce((obj, key) => {
        obj[key] = schedules[key];
        return obj;
      }, {});
    setDiaryWeek(filteredSchedules);
  };

  const renderDiaryTitle = (currentDate) => {
    return `Неделя с ${currentDate
      .clone()
      .startOf("week")
      .format("DD MMMM")} по ${currentDate
      .clone()
      .endOf("week")
      .format("DD MMMM YYYY")} года`;
  };

  useEffect(() => {
    checkWeeklySchedule(currentDate, schedules, dispatch, addSchedule);
  }, [currentDate]);

  useEffect(() => {
    findDiaryWeek(currentDate, schedules);
  }, [schedules, currentDate]);

  return (
    <main>
      <section className="title">
        <div className="container title-container">
          <div className="card card-title">
            <div className="card__pic">
              <img
                className="card__img"
                src={titleCard.icon.path}
                alt={titleCard.icon.alt}
              />
            </div>
            <div className="card__title cart-title__title">
              {titleCard.title}
            </div>
          </div>
          <h2>Дневник</h2>
        </div>
      </section>
      <section className="diary">
        <div className="container diary-container">
          <div className="diary__header">
            <div className="homework__icons">
              <img
                className="icons"
                src={arrowLeft}
                alt="left"
                onClick={() => {
                  toChangeDate(-1, setCurrentDate, 7, currentDate);
                }}
              />
            </div>
            <h2 className="diary__title">{renderDiaryTitle(currentDate)}</h2>
            <div className="homework__icons">
              <img
                className="icons"
                src={arrowRight}
                alt="right"
                onClick={() => {
                  toChangeDate(1, setCurrentDate, 7, currentDate);
                }}
              />
            </div>
          </div>
          {Object.keys(diaryWeek).length > 0 && (
            <TablesDiary
              week={diaryWeek}
              currentDate={currentDate}
              setModalAddLessonIsOpen={setModalAddLessonIsOpen}
              setAddLessonData={setAddLessonData}
              setModalAddHomeworkIsOpen={setModalAddHomeworkIsOpen}
              setModalAddGradeIsOpen={setModalAddGradeIsOpen}
              setModalAddNotesIsOpen={setModalAddNotesIsOpen}
            />
          )}
        </div>
        <ModalAddLesson
          isOpen={modalAddLessonIsOpen}
          onClose={() => {
            setModalAddLessonIsOpen(false);
          }}
          addLessonData={addLessonData}
        />
        <ModalAddHomework
          isOpen={modalAddHomeworkIsOpen}
          onClose={() => {
            setModalAddHomeworkIsOpen(false);
          }}
          addLessonData={addLessonData}
        />
        <ModalAddGrade
          isOpen={modalAddGradeIsOpen}
          onClose={() => {
            setModalAddGradeIsOpen(false);
          }}
          addLessonData={addLessonData}
        />
        <ModalAddNotes
          isOpen={modalAddNotesIsOpen}
          onClose={() => {
            setModalAddNotesIsOpen(false);
          }}
          addLessonData={addLessonData}
        />
      </section>
      <MenuCardBox titleCardId={titleCardId} />
    </main>
  );
};

export default Diary;
