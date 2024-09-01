// lessonItem =  {
//     lessonId: 1,
//     homework: [{ id: 2, task: "10", page: "15", notes: "qwerty" }],
//     isDone: false,
//     mark: null,
//     teacherId: 1,
//   },

import { buildTask } from "../../utils/services";
import { useSelector } from "react-redux";

const TableHomeworkRow = ({ currentNumber, lessonItem, editIsDone }) => {
  const { lessons } = useSelector((state) => state.setting);
  const isAttenshion = () => {
    if (!lessonItem.lessonId) return "";
    if (lessonItem.isDone) return "";
    else {
      return "table__cell-attent";
    }
  };

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
        {buildTask(lessonItem.homework)}
      </div>
      <div className={`table__cell ${isAttenshion()}`}>
        <input
          type="checkbox"
          checked={lessonItem.isDone}
          onChange={() => {
            editIsDone(currentNumber);
          }}
          disabled={!lessonItem.lessonId}
        />
      </div>
    </>
  );
};

export default TableHomeworkRow;
