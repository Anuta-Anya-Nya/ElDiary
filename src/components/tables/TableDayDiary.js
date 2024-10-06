import add from "../../assets/icons/circle-plus.svg";
import edit from "../../assets/icons/edit-pen.svg";
import del from "../../assets/icons/delete.svg";
import moment from "moment/min/moment-with-locales.min";
import TableDayRow from "./TableDayRow";
import TableDayRowEdit from "./TableDayRowEdit";
import { useDispatch } from "react-redux";
import { openCloseModal, saveModalData } from "../../store/slices/contentSlice";
import {
  updateDailyScheduleNote,
  addDailyScheduleLesson,
  updateDailyScheduleVacation,
  updateDailyScheduleHoliday,
} from "../../store/slices/dailySchedulesSlice";

const TableDayDiary = ({ day, position, modify }) => {
  const dispatch = useDispatch();

  const gridColumn = () => {
    if (position === 1) {
      return "diary__day diary__day-tuesday";
    }
    if (position === 2) {
      return "diary__day diary__day-wednesday";
    } else {
      return "diary__day";
    }
  };

  const delNote = () => {
    dispatch(
      updateDailyScheduleNote({
        date: day.date,
        notes: null,
      })
    );
  };
  const addNewLessonArea = () => {
    dispatch(
      addDailyScheduleLesson({
        date: day.date,
        lesson: {
          lessonId: null,
          homeworkId: null,
          grade: null,
          teacherId: null,
          class: null,
        },
      })
    );
  };

  return (
    <div className={gridColumn()}>
      <div className="diary__title-box">
        <h3 className="diary__title">
          {moment(day?.date).format("dddd, DD MMMM")}
        </h3>
        {!modify && (
          <img
            className="diary__icons"
            src={edit}
            alt="редактировать"
            onClick={() => {
              dispatch(openCloseModal({ editDayModal: true }));
              dispatch(saveModalData({ date: day.date, number: null }));
            }}
          />
        )}
      </div>

      <div className="diary__table">
        <div className="diary__cell table__cell-title"></div>
        <div className="diary__cell table__cell-title">Предмет</div>
        <div className="diary__cell table__cell-title">Домашнее задание</div>
        <div className="diary__cell table__cell-title">Оценка</div>
        {day?.lessonsList.map((el, ind) => {
          return modify ? (
            <TableDayRowEdit
              currentNumber={ind}
              lessonItem={el}
              key={ind}
              sheduleDate={day.date}
            />
          ) : (
            <TableDayRow
              currentNumber={ind}
              lessonItem={el}
              key={ind}
              sheduleDate={day.date}
            />
          );
        })}

        <div className="diary__cell-long">
          <div className="diary__notes">Заметки: </div>

          {day?.notes ? (
            <div className="modal-content__edit-cell-notes">
              <p>{day.notes}</p>
              {modify && (
                <div className="modal-content__edit-cell-icons">
                  <img
                    className="diary__icons edit-icon"
                    src={edit}
                    alt="редактировать"
                    onClick={() => {
                      dispatch(
                        openCloseModal({
                          editDayModal: false,
                          notesModal: true,
                        })
                      );
                      dispatch(
                        saveModalData({
                          date: day.date,
                          number: null,
                          note: day.notes,
                        })
                      );
                    }}
                  />
                  <img
                    className="diary__icons"
                    src={del}
                    alt="удалить"
                    onClick={() => {
                      delNote();
                    }}
                  />
                </div>
              )}
            </div>
          ) : (
            <img
              className="diary__icons"
              src={add}
              alt="добавить"
              onClick={() => {
                dispatch(
                  openCloseModal({ notesModal: true, editDayModal: false })
                );
                dispatch(saveModalData({ date: day.date, number: null }));
              }}
            />
          )}
        </div>
      </div>
      {modify && (
        <div className="buttons-group">
          <button
            className="modal-submit-button modal-button"
            onClick={() => addNewLessonArea()}
          >
            Добавить еще урок
          </button>

          <button
            className="modal-submit-button modal-button"
            onClick={() => {
              dispatch(
                updateDailyScheduleHoliday({
                  date: day.date,
                  holiday: !day.holiday,
                })
              );
            }}
          >
            {day.holiday ? "Отменить выходной" : "Не учимся!"}
          </button>

          <button
            className="modal-submit-button modal-button"
            onClick={() => {
              dispatch(
                updateDailyScheduleVacation({
                  date: day.date,
                  vacation: !day.vacation,
                })
              );
            }}
          >
            {day.vacation ? "Отменить каникулы" : "Каникулы!!!"}
          </button>
        </div>
      )}
    </div>
  );
};
export default TableDayDiary;
