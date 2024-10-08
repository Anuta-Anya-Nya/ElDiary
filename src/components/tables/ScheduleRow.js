import add from "../../assets/icons/circle-plus.svg";
import {
  openCloseModal,
  saveModalData,
  setCreate,
} from "../../store/slices/contentSlice";
import { useSelector, useDispatch } from "react-redux";

const ScheduleRow = ({ lessonInfo, index, create, weekDay }) => {
  const { lessonId, cabinet, teacherId } = lessonInfo;
  const lesson = useSelector((state) => state.lessons.lessons[lessonId]);
  const teacher = useSelector(
    (state) => state.teachers.teachersList[teacherId]
  );
  const dispatch = useDispatch();

  return (
    <>
      <div className="diary__cell">{index + 1}.</div>
      <div className="diary__cell">
        {lesson ? (
          lesson.title
        ) : create ? (
          <img
            className="diary__icons"
            src={add}
            alt="добавить"
            onClick={() => {
              dispatch(openCloseModal({ lessonModal: true }));
              dispatch(saveModalData({ day: weekDay, number: index }));
              dispatch(setCreate(true));
            }}
          />
        ) : (
          ""
        )}
      </div>
      <div className="diary__cell">{cabinet}</div>
      <div className="diary__cell">{teacher && teacher.name}</div>
    </>
  );
};

export default ScheduleRow;
