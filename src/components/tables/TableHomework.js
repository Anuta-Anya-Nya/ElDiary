import TableHomeworkRow from "./TableHomeworkRow";

const TableHomework = ({ displayDayForHomework, editIsDone }) => {
  return (
    <div className="table">
      <div className="table__cell table__cell-title"></div>
      <div className="table__cell table__cell-title">Предмет</div>
      <div className="table__cell table__cell-title">Домашнее задание</div>
      <div className="table__cell table__cell-title">Готово</div>
      {displayDayForHomework?.lessonsList.map((el, ind) => (
        <TableHomeworkRow
          currentNumber={ind}
          lessonItem={el}
          key={ind}
          editIsDone={editIsDone}
        />
      ))}
    </div>
  );
};
export default TableHomework;
