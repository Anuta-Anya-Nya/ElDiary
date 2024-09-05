import { buildTask } from "../../utils/services";
import { useDispatch, useSelector } from "react-redux";

const TableDayRow = ({ currentNumber, lessonItem }) => {
  const { lessons } = useSelector((state) => state.lessons);
  const homework = useSelector(
    (state) => state.homeworks.homeworksList[lessonItem.homeworkId]
  );
  const dispatch = useDispatch();

  return (
    <>
      <div className="diary__cell">{currentNumber + 1}.</div>
      <div className="diary__cell">
        {!lessonItem.lessonId
          ? "Урока нет"
          : lessons[lessonItem.lessonId]?.title}
      </div>
      <div className="diary__cell table__cell-task">
        {!lessonItem.lessonId ? "" : buildTask(homework.homework)}
      </div>
      <div className="diary__cell">{lessonItem.lessonId.grade}</div>
    </>
  );
};

export default TableDayRow;
