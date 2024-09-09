import React, { useState } from "react";
import Modal from "react-modal";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { useSelector, useDispatch } from "react-redux";
import { updateDailyScheduleLesson } from "../../store/slices/dailySchedulesSlice";

export const ModalAddLesson = ({ isOpen, onClose, addLessonData }) => {
  const lessons = useSelector((state) => state.lessons.lessons);
  const teachers = useSelector((state) => state.teachers.teachersList);
  const [selectLessonId, setSelectLessonId] = useState("");
  const [selectTeacher, setSelectTeacher] = useState("");
  const [selectClass, setSelectClass] = useState("");
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const toCloseAndRefreshData = () => {
    setError(false);
    setSelectLessonId("");
    onClose();
  };

  const addLessonToShedule = () => {
    if (!selectLessonId) {
      setError(true);
      return;
    } else {
      dispatch(
        updateDailyScheduleLesson({
          date: addLessonData.date,
          number: addLessonData.number,
          lesson: {
            lessonId: Number(selectLessonId),
            homeworkId: null,
            grade: null,
            teacherId: Number(selectTeacher) || null,
            class: Number(selectClass) || null,
          },
        })
      );
      toCloseAndRefreshData();
    }
  };

  const findTeacherForSelectLesson = () => {
    const teachersThisLesson = lessons[selectLessonId].teachers;
    console.log(teachersThisLesson);
    if (!teachersThisLesson) {
      console.log(
        Object.values(teachers).filter((teacher) =>
          teacher.teachingLessons.includes(selectLessonId)
        )
      );

      return Object.values(teachers).filter((teacher) =>
        teacher.teachingLessons.includes(selectLessonId)
      );
    } else {
      return teachersThisLesson;
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        overlayClassName={"modal-overlay"}
        className="modal-content"
        ariaHideApp={false}
        closeTimeoutMS={300}
        onRequestClose={() => toCloseAndRefreshData()}
      >
        <button
          className="modal-close-button"
          onClick={() => toCloseAndRefreshData()}
        >
          <CloseIcon />
        </button>
        <h4>Добавить урок:</h4>

        <select
          name="selectLesson"
          size="3"
          onChange={(e) => {
            setSelectLessonId(e.target.value);
            if (e.target.value) {
              setError(false);
            }
            setSelectTeacher("");
          }}
        >
          {Object.values(lessons).map((lesson) => (
            <option value={lesson.lessonId} key={lesson.lessonId}>
              {lesson.title}
            </option>
          ))}
          <option value="addLes">Добавить новый урок...</option>
        </select>
        {selectLessonId && (
          <>
            <div>
              <h4>Учитель:</h4>
              <select
                name="selectTeacher"
                size="2"
                onChange={(e) => {
                  setSelectTeacher(e.target.value);
                }}
              >
                {findTeacherForSelectLesson().map((teacherId) => (
                  <option value={teacherId} key={teacherId}>
                    {teachers[teacherId].name}
                  </option>
                ))}
                <option>Добавить нового учителя...</option>
              </select>
            </div>
            <div>
              <h4>Кабинет:</h4>
              <select
                name="selectClass"
                size="2"
                onChange={(e) => {
                  setSelectClass(e.target.value);
                }}
              >
                {lessons[selectLessonId].class.map((classItem, ind) => (
                  <option value={classItem} key={ind}>
                    {classItem}
                  </option>
                ))}

                <option>Добавить новый кабинет...</option>
              </select>
            </div>
          </>
        )}

        {error && <div>Урок не выбран!</div>}
        <button
          className="modal-submit-button"
          onClick={() => {
            addLessonToShedule();
          }}
        >
          Добавить урок
        </button>
      </Modal>
    </div>
  );
};
