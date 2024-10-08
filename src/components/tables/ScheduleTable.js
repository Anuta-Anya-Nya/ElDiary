import ScheduleRow from "./ScheduleRow";

const ScheduleTable = ({ daySchedule, index, create, setDaySchedule }) => {
  const dayOfWeek = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  const title = dayOfWeek[index];

  return (
    <div className="diary__day">
      <h3 className="diary__title diary__title-box">{title}</h3>
      <div className="schedule__table">
        <div className="diary__cell table__cell-title"></div>
        <div className="diary__cell table__cell-title">Предмет</div>
        <div className="diary__cell table__cell-title">Кабинет</div>
        <div className="diary__cell table__cell-title">Преподаватель</div>
        {daySchedule.map((lesson, ind) => (
          <ScheduleRow
            lessonInfo={lesson}
            index={ind}
            key={ind}
            create={create}
            weekDay={index}
          />
        ))}
      </div>
      {create && <button className="modal-submit-button">Добавить урок</button>}
    </div>
  );
};
export default ScheduleTable;
