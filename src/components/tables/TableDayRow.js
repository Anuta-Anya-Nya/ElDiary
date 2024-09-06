import { buildTask } from "../../utils/services";
import { useDispatch, useSelector } from "react-redux";
import add from "../../assets/icons/circle-plus.svg";

const TableDayRow = ({ currentNumber, lessonItem }) => {
  const { lessons } = useSelector((state) => state.lessons);
  const homework = useSelector(
    (state) => state.homeworks.homeworksList[lessonItem.homeworkId]
  );

  const dispatch = useDispatch();

  const addLesson = () => {};

  return (
    <>
      <div className="diary__cell">{currentNumber + 1}.</div>
      <div className="diary__cell">
        {!lessonItem.lessonId ? (
          <img className="diary__icons" src={add} alt="добавить" />
        ) : (
          lessons[lessonItem.lessonId]?.title
        )}
      </div>
      <div className="diary__cell table__cell-task">
        {!lessonItem.lessonId ? (
          ""
        ) : !lessonItem.homeworkId ? (
          <img className="diary__icons" src={add} alt="добавить" />
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
