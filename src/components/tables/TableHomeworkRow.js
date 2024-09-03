import { useEffect } from "react";
import { updateHomework } from "../../store/slices/homeworksSlice";
import { buildTask } from "../../utils/services";
import { useDispatch, useSelector } from "react-redux";

const TableHomeworkRow = ({ currentNumber, lessonItem }) => {
  const { lessons } = useSelector((state) => state.lessons);
  const homework = useSelector(
    (state) => state.homeworks.homeworksList[lessonItem.homeworkId]
  );
  const dispatch = useDispatch();

  const isAttenshion = () => {
    if (!lessonItem.lessonId) return "";
    if (homework.isDone) return "";
    else {
      return "table__cell-attent";
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className={`table__cell ${isAttenshion()}`}>
        {currentNumber + 1}.
      </div>
      <div className={`table__cell ${isAttenshion()}`}>
        {!lessonItem.lessonId
          ? "Урока нет"
          : lessons[lessonItem.lessonId]?.title}
      </div>
      <div className={`table__cell table__cell-task ${isAttenshion()}`}>
        {!lessonItem.lessonId ? "" : buildTask(homework.homework)}
      </div>
      <div className={`table__cell ${isAttenshion()}`}>
        <input
          type="checkbox"
          checked={!lessonItem.lessonId ? false : homework.isDone}
          onChange={() => {
            dispatch(updateHomework({ ...homework, isDone: !homework.isDone }));
          }}
          disabled={!lessonItem.lessonId}
        />
      </div>
    </>
  );
};

export default TableHomeworkRow;
