import { buildTask } from "../../utils/services";
import { useSelector, useDispatch } from "react-redux";
import add from "../../assets/icons/circle-plus.svg";
import edit from "../../assets/icons/edit-pen.svg";
import del from "../../assets/icons/delete.svg";
import { openCloseModal, saveModalData } from "../../store/slices/contentSlice";
import { updateDailyScheduleLesson } from "../../store/slices/dailySchedulesSlice";
import {
  updateDailyScheduleHomework,
  updateDailyScheduleGrade,
} from "../../store/slices/dailySchedulesSlice";

const TableDayRowEdit = ({ currentNumber, lessonItem, sheduleDate }) => {
  const { lessons } = useSelector((state) => state.lessons);
  const homework = useSelector(
    (state) => state.homeworks.homeworksList[lessonItem.homeworkId]
  );

  const dispatch = useDispatch();

  const delLesson = () => {
    dispatch(
      updateDailyScheduleLesson({
        date: sheduleDate,
        number: currentNumber,
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

  const delHomeWork = (homeWorkId) => {
    dispatch(
      updateDailyScheduleHomework({
        date: sheduleDate,
        number: currentNumber,
        homeworkId: null,
      })
    );
  };

  const delGrade = () => {
    dispatch(
      updateDailyScheduleGrade({
        date: sheduleDate,
        number: currentNumber,
        grade: null,
      })
    );
  };

  return (
    <>
      <div className="diary__cell">{currentNumber + 1}.</div>
      <div className="diary__cell">
        {!lessonItem.lessonId ? (
          <img
            className="diary__icons"
            src={add}
            alt="добавить"
            onClick={() => {
              dispatch(
                openCloseModal({ lessonModal: true, editDayModal: false })
              );
              dispatch(
                saveModalData({ date: sheduleDate, number: currentNumber })
              );
            }}
          />
        ) : (
          <div>
            {lessons[lessonItem.lessonId]?.title}
            <img
              className="diary__icons"
              src={edit}
              alt="изменить"
              onClick={() => {
                dispatch(
                  openCloseModal({ lessonModal: true, editDayModal: false })
                );

                dispatch(
                  saveModalData({
                    date: sheduleDate,
                    number: currentNumber,
                    ...lessonItem,
                  })
                );
              }}
            />
            <img
              className="diary__icons"
              src={del}
              alt="удалить"
              onClick={() => {
                delLesson();
              }}
            />
          </div>
        )}
      </div>
      <div className="diary__cell table__cell-task">
        {!lessonItem.lessonId ? (
          ""
        ) : !lessonItem.homeworkId ? (
          <img
            className="diary__icons"
            src={add}
            alt="добавить"
            onClick={() => {
              dispatch(
                openCloseModal({ homeWorkModal: true, editDayModal: false })
              );
              dispatch(
                saveModalData({
                  date: sheduleDate,
                  number: currentNumber,
                  homework: [],
                })
              );
            }}
          />
        ) : (
          <>
            {buildTask(homework.homework)}
            <img
              className="diary__icons"
              src={edit}
              alt="изменить"
              onClick={() => {
                dispatch(
                  openCloseModal({ homeWorkModal: true, editDayModal: false })
                );

                dispatch(
                  saveModalData({
                    date: sheduleDate,
                    number: currentNumber,
                    homework: homework.homework,
                  })
                );
              }}
            />
            <img
              className="diary__icons"
              src={del}
              alt="удалить"
              onClick={() => {
                delHomeWork(homework.id);
              }}
            />
          </>
        )}
      </div>
      <div className="diary__cell">
        {!lessonItem.lessonId ? (
          ""
        ) : !lessonItem.grade ? (
          <img
            className="diary__icons"
            src={add}
            alt="добавить"
            onClick={() => {
              dispatch(
                openCloseModal({ gradeModal: true, editDayModal: false })
              );
              dispatch(
                saveModalData({
                  date: sheduleDate,
                  number: currentNumber,
                })
              );
            }}
          />
        ) : (
          <div>
            <div>{lessonItem.grade}</div>
            <img
              className="diary__icons"
              src={edit}
              alt="изменить"
              onClick={() => {
                dispatch(
                  openCloseModal({ gradeModal: true, editDayModal: false })
                );
                dispatch(
                  saveModalData({
                    date: sheduleDate,
                    number: currentNumber,
                    grade: lessonItem.grade,
                  })
                );
              }}
            />
            <img
              className="diary__icons"
              src={del}
              alt="удалить"
              onClick={() => {
                delGrade();
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default TableDayRowEdit;
