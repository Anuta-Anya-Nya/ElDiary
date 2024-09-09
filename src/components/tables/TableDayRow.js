import { buildTask } from "../../utils/services";
import { useSelector } from "react-redux";
import add from "../../assets/icons/circle-plus.svg";

const TableDayRow = ({
  currentNumber,
  lessonItem,
  setModalAddLessonIsOpen,
  setAddLessonData,
  sheduleDate,
  setModalAddHomeworkIsOpen,
}) => {
  const { lessons } = useSelector((state) => state.lessons);
  const homework = useSelector(
    (state) => state.homeworks.homeworksList[lessonItem.homeworkId]
  );

  return (
    <>
      <div className="diary__cell">{currentNumber + 1}.</div>
      <div className="diary__cell">
        {!lessonItem.lessonId ? (
          <img
            className="diary__icons"
            src={add}
            alt="добавить"
            onClick={() => {
              setModalAddLessonIsOpen(true);
              setAddLessonData({ date: sheduleDate, number: currentNumber });
            }}
          />
        ) : (
          lessons[lessonItem.lessonId]?.title
        )}
      </div>
      <div className="diary__cell table__cell-task">
        {!lessonItem.lessonId ? (
          ""
        ) : !lessonItem.homeworkId ? (
          <img
            className="diary__icons"
            src={add}
            alt="добавить"
            onClick={() => {
              setModalAddHomeworkIsOpen(true);
              setAddLessonData({ date: sheduleDate, number: currentNumber });
            }}
          />
        ) : (
          buildTask(homework.homework)
        )}
      </div>
      <div className="diary__cell">
        {!lessonItem.lessonId ? (
          ""
        ) : !lessonItem.lessonId.grade ? (
          <img className="diary__icons" src={add} alt="добавить" />
        ) : (
          lessonItem.lessonId.grade
        )}
      </div>
    </>
  );
};

export default TableDayRow;
