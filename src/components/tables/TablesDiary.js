import moment from "moment/min/moment-with-locales.min";
import TableDayDiary from "./TableDayDiary";

const TablesDiary = ({ week, currentDate }) => {
  moment.locale("ru");
  console.log(week);

  const weekArr = (currentDate) => {
    const weekArr = [];
    const startWeek = currentDate.clone().startOf("week");
    const endWeek = currentDate.clone().endOf("week").subtract(1, "days");
    while (startWeek.isBefore(endWeek)) {
      weekArr.push(week[startWeek.format("YYYY-MM-DD")]);
    }
    return weekArr;
  };
  return (
    <div className="diary__area">
      {weekArr(currentDate).map((day, ind) => (
        <TableDayDiary day={day} key={ind} />
      ))}
    </div>
  );
};
export default TablesDiary;
