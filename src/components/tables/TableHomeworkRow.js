// lessonItem =  {
//     lessonId: 1,
//     homework: [{ id: 2, task: "10", page: "15", notes: "qwerty" }],
//     isDone: false,
//     mark: null,
//     teacherId: 1,
//   },

import { findLessonTitle, buildTask } from "../../utils/services";

const TableHomeworkRow = ({ currentNumber, lessonItem }) => {
  return (
    <>
      <div className="table__cell">{currentNumber}</div>
      <div className="table__cell">{findLessonTitle(lessonItem.lessonId)}</div>
      <div className="table__cell table__cell-task">
        {buildTask(lessonItem.homework)}
      </div>
      <div className="table__cell">
        <input type="checkbox" />
      </div>
    </>
  );
};

export default TableHomeworkRow;
