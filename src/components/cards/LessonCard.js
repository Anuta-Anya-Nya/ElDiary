import { useDispatch, useSelector } from "react-redux";
import {
  saveModalData,
  setModify,
  openCloseModal,
} from "../../store/slices/contentSlice";

const LessonCard = ({ lesson }) => {
  console.log(lesson);
  const teachers = useSelector((state) => state.teachers.teachersList);
  const { title, cabinets } = lesson;
  const dispatch = useDispatch();

  const findTeacherIdForSelectLesson = () => {
    const teachersThisLesson = lesson.teachers;
    if (!teachersThisLesson.length) {
      return Object.values(teachers)
        .filter((teacher) => teacher.teachingLessons.includes(lesson.id))
        .reduce((arr, teacher) => [...arr, teacher.id], []);
    } else {
      return teachersThisLesson;
    }
  };

  const teachersForLesson = findTeacherIdForSelectLesson();

  return (
    <div className="card teachers__card">
      <div className="card__block">
        <h3 className="card__title">{title}</h3>
      </div>

      <div className="lessons__block">
        <h3 className="card__title lessons__title">Учителя:</h3>
        <ul>
          {teachersForLesson.length
            ? teachersForLesson.map((teacherId) => (
                <li key={teacherId}>{teachers[teacherId].name}</li>
              ))
            : "Учителей для этого урока не найдено"}
        </ul>
      </div>

      <div className="lessons__block">
        <h3 className="card__title lessons__title">Кабинет:</h3>
        <ul>
          {cabinets.length
            ? cabinets.join(", ")
            : "Кабинетов для этого урока не найдено"}
        </ul>
      </div>

      <button
        className="modal-submit-button"
        onClick={() => {
          // dispatch(saveModalData({ teacher }));
          // dispatch(setModify(true));
          // dispatch(openCloseModal({ teacherModal: true }));
          console.log(findTeacherIdForSelectLesson());
        }}
      >
        Изменить урок
      </button>
    </div>
  );
};

export default LessonCard;
