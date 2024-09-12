import add from "../../assets/icons/circle-plus.svg";
import edit from "../../assets/icons/edit-pen.svg";
import moment from "moment/min/moment-with-locales.min";
import TableDayRow from "./TableDayRow";
import { useSelector } from "react-redux";

const TableDayDiary = ({
  day,
  position,
  setModalAddLessonIsOpen,
  setAddLessonData,
  setModalAddHomeworkIsOpen,
  setModalAddGradeIsOpen,
  setModalAddNotesIsOpen,
}) => {
  const gridColumn = () => {
    if (position === 1) {
      return "diary__day diary__day-tuesday";
    }
    if (position === 2) {
      return "diary__day diary__day-wednesday";
    } else {
      return "diary__day";
    }
  };

  return (
    <div className={gridColumn()}>
      <div className="diary__title-box">
        <h3 className="diary__title">
          {moment(day.date).format("dddd, DD MMMM")}
        </h3>
        <img className="diary__icons" src={edit} alt="редактировать" />
      </div>

      <div className="diary__table">
        <div className="diary__cell table__cell-title"></div>
        <div className="diary__cell table__cell-title">Предмет</div>
        <div className="diary__cell table__cell-title">Домашнее задание</div>
        <div className="diary__cell table__cell-title">Оценка</div>
        {day.lessonsList.map((el, ind) => {
          return (
            <TableDayRow
              currentNumber={ind}
              lessonItem={el}
              key={ind}
              setModalAddLessonIsOpen={setModalAddLessonIsOpen}
              setAddLessonData={setAddLessonData}
              sheduleDate={day.date}
              setModalAddHomeworkIsOpen={setModalAddHomeworkIsOpen}
              setModalAddGradeIsOpen={setModalAddGradeIsOpen}
            />
          );
        })}
        <div className="diary__cell diary__cell-long">
          <div className="diary__notes">Заметки: </div>

          {day.notes ? (
            <p>{day.notes}</p>
          ) : (
            <img
              className="diary__icons"
              src={add}
              alt="добавить"
              onClick={() => {
                setModalAddNotesIsOpen(true);
                setAddLessonData({ date: day.date, number: null });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default TableDayDiary;
