import { useSelector } from "react-redux";
import GradesRow from "./GradesRow";

const GradesTable = ({ grades }) => {
  const lessons = useSelector((state) => state.lessons.lessons);

  return Object.keys(grades).length ? (
    <div className="schedule__table">
      <div className="diary__cell table__cell-title"></div>
      <div className="diary__cell table__cell-title">Предмет</div>
      <div className="diary__cell table__cell-title">Оценки в четверти</div>
      <div className="diary__cell table__cell-title">Итоговая оценка</div>
      {Object.keys(grades).map((lessonId, ind) => (
        <GradesRow
          key={lessonId}
          lessonTitle={lessons[lessonId].title}
          grades={grades[lessonId]}
          number={ind + 1}
        />
      ))}
    </div>
  ) : (
    <div>Оценок в этой четверти еще нет</div>
  );
};
export default GradesTable;
