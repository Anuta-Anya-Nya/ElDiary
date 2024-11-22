import { useSelector } from "react-redux";
import TableHomeworkRow from "./TableHomeworkRow";
import Loading from "../blocks/Loading";

const TableHomework = ({ displaySchedule, editIsDone }) => {
  const loadingDailySchedules = useSelector(
    (state) => state.dailySchedules.loading
  );

  return (
    <div className="table">
      <div className="table__cell table__cell-title"></div>
      <div className="table__cell table__cell-title">Предмет</div>
      <div className="table__cell table__cell-title">Домашнее задание</div>
      <div className="table__cell table__cell-title">Готово</div>
      {loadingDailySchedules ? (
        <Loading />
      ) : (
        Object.keys(displaySchedule.lessonsList)
          .sort()
          .map((key) => (
            <TableHomeworkRow
              currentNumber={+key}
              lessonItem={displaySchedule.lessonsList[key]}
              key={key}
            />
          ))
      )}
      <div className="table__cell table__notes">
        <span className="table__cell-notes">Заметки:</span>{" "}
        {displaySchedule?.notes}
      </div>
    </div>
  );
};
export default TableHomework;
