import React, { useEffect, useState } from "react";
import {
  openCloseModal,
  saveModalData,
  setModify,
} from "../../store/slices/contentSlice";
import { useSelector, useDispatch } from "react-redux";
import { addTeacher } from "../../store/slices/teachersSlice";
import { addTeacherDb } from "../../db/teachersDb";

export const ModalTeacher = () => {
  const lessons = useSelector((state) => state.lessons.lessons);
  const modify = useSelector((state) => state.content.openModal.modify);
  const modalData = useSelector((state) => state.content.openModal.modalData);
  const userId = useSelector((state) => state.user.id);

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
    dispatch(saveModalData({}));
    dispatch(setModify(false));
    dispatch(openCloseModal({ teacherModal: false }));
  };

  const addTeacherToList = () => {
    if (!teacherName || !lessonsIdList.length) {
      setError(true);
      return;
    } else {
      if (modify) {
        // изменить учителя
        dispatch(
          addTeacher({
            id: modalData.teacher.id,
            name: teacherName,
            tel: tel,
            birthdate: birthdate,
            teachingLessons: lessonsIdList,
          })
        );
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
        addTeacherDb({
          userId,
          teacher: {
            name: teacherName,
            tel: tel,
            birthdate: birthdate,
            teachingLessons: lessonsIdList,
          },
        });
        console.log(userId);
      }

      toCloseAndRefreshData();
    }
  };

  useEffect(() => {
    if (modify) {
      setTeacherName(modalData.teacher.name);
      setTel(modalData.teacher.tel);
      setBirthdate(modalData.teacher.birthdate);
      setLessonsIdList(modalData.teacher.teachingLessons);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modal-content">
      <div className="modal-content-box modal-content-box-center">
        <h3>{modify ? "Изменить" : "Добавить"} учителя:</h3>
        <input
          className="modal-content-input"
          type="text"
          placeholder="Введите ФИО учителя"
          value={teacherName || ""}
          onChange={(ev) => {
            setTeacherName(ev.target.value);
            setError(false);
          }}
        />
        <input
          className="modal-content-input"
          type="date"
          placeholder="Введите день рождения"
          value={birthdate || ""}
          onChange={(ev) => {
            setBirthdate(ev.target.value);
          }}
        />
        <input
          className="modal-content-input"
          type="tel"
          placeholder="Введите телефон"
          value={tel || ""}
          onChange={(ev) => {
            setTel(ev.target.value);
          }}
        />
        <h4>Выберите уроки, которые ведет учитель:</h4>
        <div className="modal-content-choice">
          {Object.values(lessons).map((lesson) => (
            <div key={lesson.lessonId}>
              <input
                className="modal-content-radio"
                type="checkbox"
                name="selectLesson"
                value={lesson.lessonId}
                id={`lesson${lesson.lessonId}`}
                checked={lessonsIdList.includes(lesson.lessonId)}
                onChange={(ev) => {
                  setLessonsIdList(
                    lessonsIdList.includes(ev.target.value)
                      ? lessonsIdList.filter((el) => el !== ev.target.value)
                      : [...lessonsIdList, ev.target.value]
                  );
                  setError(false);
                }}
              />
              <label htmlFor={`lesson${lesson.lessonId}`}>{lesson.title}</label>
            </div>
          ))}
        </div>
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
