import React, { useEffect, useState } from "react";
import { openCloseModal, editModalData } from "../../store/slices/contentSlice";
import { useSelector, useDispatch } from "react-redux";
import { addTeacher } from "../../store/slices/teachersSlice";

export const ModalTeacher = () => {
  const lessons = useSelector((state) => state.lessons.lessons);
  const modify = useSelector((state) => state.content.openModal.modify);

  const [teacherName, setTeacherName] = useState(null);
  const [lessonsIdList, setLessonsIdList] = useState([]);
  const [tel, setTel] = useState(null);
  const [birthdate, setBirthdate] = useState(null);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const toCloseAndRefreshData = () => {
    setError(false);
    setLessonsIdList(null);
    setTeacherName(null);
    setTel(null);
    setBirthdate(null);

    dispatch(openCloseModal({ teacherModal: false }));
  };

  const addTeacherToList = () => {
    if (!teacherName && !lessonsIdList.length) {
      setError(true);
      return;
    } else {
      dispatch(
        addTeacher({
          id: Date.now(),
          name: teacherName,
          tel: tel,
          birthdate: birthdate,
          teachingLessons: lessonsIdList,
        })
      );
      toCloseAndRefreshData();
    }
  };

  //   const contentItemCount = (itemsArr) => {
  //     if (itemsArr.length <= 1) {
  //       return "modal-content-choice-single";
  //     }
  //     return "";
  //   };
  //   useEffect(() => {
  //     if (modify || editMode) {
  //       setSelectLessonId(modalData.lessonId);
  //       setSelectTeacher(modalData.teacherId);
  //       setSelectClass(modalData.class);
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  return (
    <div className="modal-content">
      <h3>{modify ? "Изменить" : "Добавить"} учителя:</h3>
      <div>
        <input
          className="modal-content-choice"
          type="text"
          placeholder="Введите ФИО учителя"
          required
          onChange={(ev) => {
            setTeacherName(ev.target.value);
            setError(false);
          }}
        />
      </div>
      <div>
        <input
          className="modal-content-choice"
          type="date"
          placeholder="Введите день рождения"
          onChange={(ev) => {
            setBirthdate(ev.target.value);
          }}
        />
      </div>
      <div>
        <input
          className="modal-content-choice"
          type="tel"
          placeholder="Введите телефон"
          onChange={(ev) => {
            setTel(ev.target.value);
          }}
        />
      </div>
      <h4>Выберите уроки, которые ведет учитель:</h4>
      <div className="modal-content-choice">
        {Object.values(lessons).map((lesson) => (
          <div
            key={lesson.lessonId}
            // className={contentItemCount(Object.values(lessons))}
          >
            <input
              className="modal-content-radio"
              type="checkbox"
              name="selectLesson"
              value={lesson.lessonId}
              id={`lesson${lesson.lessonId}`}
              checked={lessonsIdList.includes(lesson.lessonId)}
              onChange={(ev) => {
                setLessonsIdList(
                  lessonsIdList.includes(Number(ev.target.value))
                    ? lessonsIdList.filter(
                        (el) => el !== Number(Number(ev.target.value))
                      )
                    : [...lessonsIdList, Number(ev.target.value)]
                );
                setError(false);
              }}
            />
            <label htmlFor={`lesson${lesson.lessonId}`}>{lesson.title}</label>
          </div>
        ))}
      </div>

      {error && (
        <div className="modal-content-error">
          Имя учителя и его уроки обязательны к заполнению!
        </div>
      )}

      <button
        className="modal-submit-button"
        onClick={() => {
          addTeacherToList();
        }}
      >
        {modify ? "Сохранить изменения" : "Добавить учителя"}
      </button>
    </div>
  );
};
