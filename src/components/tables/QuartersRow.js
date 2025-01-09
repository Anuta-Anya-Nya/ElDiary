import moment from "moment/min/moment-with-locales.min";

const QuartersRow = ({ quarterDate, number }) => {
  moment.locale("ru");
  return (
    <>
      <div className="quarters__cell">{number}.</div>
      <div className="quarters__cell">
        {moment(quarterDate.start).format("DD MMMM YYYY")}
      </div>
      <div className="quarters__cell">
        {moment(quarterDate.end).format("DD MMMM YYYY")}
      </div>
    </>
  );
};
export default QuartersRow;
