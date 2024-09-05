import add from "../../assets/icons/circle-plus.svg";
import edit from "../../assets/icons/edit-pen.svg";
import moment from "moment/min/moment-with-locales.min";
import TableDayRow from "./TableDayRow";

const TableDayDiary = ({ day }) => {
  moment.locale("ru");
  console.log(day);

  return (
    <div className="diary__day">
      <h3 className="diary__date diary__title">
        {moment(day.date).format("dddd, DD MMMM")}
        <img className="diary__icons" src={edit} alt="редактировать" />
      </h3>
      <div className="diary__table">
        <div className="diary__cell table__cell-title"></div>
        <div className="diary__cell table__cell-title">Предмет</div>
        <div className="diary__cell table__cell-title">Домашнее задание</div>
        <div className="diary__cell table__cell-title">Оценка</div>
        {day.lessonsList.map((el, ind) => {
          return <TableDayRow currentNumber={ind} lessonItem={el} key={ind} />;
        })}

        {/* <div className="diary__cell">1.</div>
        <div className="diary__cell">day.lesson</div>
        <div className="diary__cell table__cell-task">
          упр.1 стр.23 решить все задачи
        </div>
        <div className="diary__cell">
          <img className="diary__icons" src={add} alt="добавить" />
        </div>

        <div className="diary__cell">2.</div>
        <div className="diary__cell ">
          <img className="diary__icons" src={add} alt="добавить" />
        </div>
        <div className="diary__cell">
          <img className="diary__icons" src={add} alt="добавить" />
        </div>
        <div className="diary__cell">
          <img className="diary__icons" src={add} alt="добавить" />
        </div>

        <div className="diary__cell">3.</div>
        <div className="diary__cell">Математика</div>
        <div className="diary__cell table__cell-task">
          упр.1 стр.23 решить все задачи
        </div>
        <div className="diary__cell">
          <img className="diary__icons" src={add} alt="добавить" />
        </div>

        <div className="diary__cell">4.</div>
        <div className="diary__cell">Математика</div>
        <div className="diary__cell table__cell-task">упр.1 стр.23</div>
        <div className="diary__cell">
          <img className="diary__icons" src={add} alt="добавить" />
        </div>

        <div className="diary__cell">5.</div>
        <div className="diary__cell">Математика</div>
        <div className="diary__cell table__cell-task">
          упр.1 стр.23 решить все задачи
        </div>
        <div className="diary__cell">
          <img className="diary__icons" src={add} alt="добавить" />
        </div>

        <div className="diary__cell">6.</div>
        <div className="diary__cell">Математика</div>
        <div className="diary__cell table__cell-task">упр.1 </div>
        <div className="diary__cell">
          <img className="diary__icons" src={add} alt="добавить" />
        </div> */}
        <div className="diary__cell diary__cell-long">
          Заметки
          <img className="diary__icons" src={add} alt="добавить" />
        </div>
      </div>
    </div>
  );
};
export default TableDayDiary;
