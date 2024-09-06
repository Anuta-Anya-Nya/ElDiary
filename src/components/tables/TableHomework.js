import TableHomeworkRow from "./TableHomeworkRow";

const TableHomework = ({ displaySchedule, editIsDone }) => {
  return (
    <div className="table">
      <div className="table__cell table__cell-title"></div>
      <div className="table__cell table__cell-title">Предмет</div>
      <div className="table__cell table__cell-title">Домашнее задание</div>
      <div className="table__cell table__cell-title">Готово</div>
      {displaySchedule?.lessonsList.map((el, ind) => (
        <TableHomeworkRow currentNumber={ind} lessonItem={el} key={ind} />
      ))}
      <div className="table__cell table__notes">
        <span className="table__cell-notes">Заметки:</span>{" "}
        {displaySchedule?.notes}
      </div>
    </div>
  );
};
export default TableHomework;
