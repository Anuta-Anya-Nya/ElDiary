import moment from "moment/min/moment-with-locales.min";

const QuartersTable = ({ quarters }) => {
  moment.locale("ru");
  return (
    <div className="quarters__table">
      <div className="quarters__cell table__cell-title">Четверть</div>
      <div className="quarters__cell table__cell-title">Начало</div>
      <div className="quarters__cell table__cell-title">Конец</div>

      {Object.keys(quarters)
        .sort()
        .map((key, ind) => (
          <>
            <div className="quarters__cell">{key}.</div>
            <div className="quarters__cell">
              {moment(quarters[key].start).format("DD MMMM YYYY")}
            </div>
            <div className="quarters__cell">
              {moment(quarters[key].end).format("DD MMMM YYYY")}
            </div>
          </>
        ))}
    </div>
  );
};
export default QuartersTable;
