import React, { useEffect, useState } from "react";
import { openCloseModal } from "../../store/slices/contentSlice";
import { useSelector, useDispatch } from "react-redux";
import { updateDailyScheduleLesson } from "../../store/slices/dailySchedulesSlice";

export const ModalAddLesson = () => {
  const lessons = useSelector((state) => state.lessons.lessons);
  const teachers = useSelector((state) => state.teachers.teachersList);
  const modalData = useSelector((state) => state.content.openModal.modalData);
  const modify = useSelector((state) => state.content.openModal.modify);

  const [selectLessonId, setSelectLessonId] = useState(null);
  const [selectTeacher, setSelectTeacher] = useState(null);
  const [selectClass, setSelectClass] = useState(null);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const toCloseAndRefreshData = () => {
    setError(false);
    setSelectLessonId(null);
    setSelectTeacher(null);
    setSelectClass(null);
    if (modify) {
      dispatch(openCloseModal({ lessonModal: false, editDayModal: true }));
    } else {
      dispatch(openCloseModal({ lessonModal: false }));
    }
  };

  const addLessonToShedule = () => {
    if (!selectLessonId) {
      setError(true);
      return;
    } else {
      dispatch(
        updateDailyScheduleLesson({
          date: modalData.date,
          number: modalData.number,
          lesson: {
            lessonId: selectLessonId,
            homeworkId: null,
            grade: null,
            teacherId: selectTeacher || null,
            class: selectClass || null,
          },
        })
      );
      toCloseAndRefreshData();
    }
  };

  const findTeacherForSelectLesson = () => {
    const teachersThisLesson = lessons[selectLessonId].teachers;
    if (!teachersThisLesson.length) {
      return Object.values(teachers)
        .filter((teacher) => teacher.teachingLessons.includes(selectLessonId))
        .reduce((arr, teacher) => [...arr, teacher.id], []);
    } else {
      return teachersThisLesson;
    }
  };
  const contentItemCount = (itemsArr) => {
    if (itemsArr.length <= 1) {
      return "modal-content-choice-single";
    }
    return "";
  };
  useEffect(() => {
    if (modify) {
      setSelectLessonId(modalData.lessonId);
      setSelectTeacher(modalData.teacherId);
      setSelectClass(modalData.class);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3>{modify ? "Изменить" : "Добавить"} урок:</h3>
      <div className="modal-content-choice">
        {Object.values(lessons).map((lesson) => (
          <div
            key={lesson.lessonId}
            className={contentItemCount(Object.values(lessons))}
          >
            <input
              className="modal-content-radio"
              type="radio"
              name="selectLesson"
              value={lesson.lessonId}
              id={`lesson${lesson.lessonId}`}
              checked={selectLessonId === lesson.lessonId}
              onChange={(el) => {
                setSelectLessonId(Number(el.target.value));
                setError(false);
              }}
            />
            <label htmlFor={`lesson${lesson.lessonId}`}>{lesson.title}</label>
          </div>
        ))}
      </div>

      {selectLessonId && (
        <>
          <h3>Учитель:</h3>
          <div className="modal-content-choice">
            {findTeacherForSelectLesson().length ? (
              findTeacherForSelectLesson().map((teacherId) => (
                <div
                  key={teacherId}
                  className={contentItemCount(findTeacherForSelectLesson())}
                >
                  <input
                    className="modal-content-radio"
                    type="radio"
                    name="selectTeacher"
                    value={teacherId}
                    id={`teacher${teacherId}`}
                    checked={selectTeacher === teacherId}
                    onChange={(el) => {
                      setSelectTeacher(Number(el.target.value));
                    }}
                  />
                  <label htmlFor={`teacher${teacherId}`}>
                    {teachers[teacherId].name}
                  </label>
                </div>
              ))
            ) : (
              <div className={contentItemCount(findTeacherForSelectLesson())}>
                Учителей для этого урока не найдено
              </div>
            )}
          </div>

          <h3>Кабинет:</h3>
          <div className="modal-content-choice">
            {lessons[selectLessonId].class.length ? (
              lessons[selectLessonId].class.map((classItem, ind) => (
                <div
                  key={ind}
                  className={contentItemCount(lessons[selectLessonId].class)}
                >
                  <input
                    className="modal-content-radio"
                    type="radio"
                    name="selectClass"
                    value={classItem}
                    id={`class${classItem}`}
                    checked={selectClass === classItem}
                    onChange={(el) => {
                      setSelectClass(Number(el.target.value));
                    }}
                  />
                  <label htmlFor={`class${classItem}`}>{classItem}</label>
                </div>
              ))
            ) : (
              <div className={contentItemCount(lessons[selectLessonId].class)}>
                Кабинетов для этого урока не найдено
              </div>
            )}
          </div>
        </>
      )}
      {error && <div className="modal-content-error">Урок не выбран!</div>}

      <button
        className="modal-submit-button"
        onClick={() => {
          addLessonToShedule();
        }}
      >
        {modify ? "Сохранить изменения" : "Добавить урок"}
      </button>
    </div>
  );
};
