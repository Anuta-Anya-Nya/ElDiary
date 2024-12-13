import React, { useEffect, useState } from "react";
import {
  openCloseModal,
  saveModalData,
  setModify,
} from "../../store/slices/contentSlice";
import { useSelector, useDispatch } from "react-redux";
import { CONTENT } from "../../utils/constants";
import QuartersInput from "../blocks/QuartersInput";
import { addQuartersThunk } from "../../store/slices/quartersSlice";
import { findCurrentStudyYear } from "../../utils/services";
import moment from "moment/min/moment-with-locales.min";
import SetPeriod from "../blocks/SetPeriod";
import { isCreateQuarterDB } from "../../db/quartersDb";

export const ModalQuarter = () => {
  const modify = useSelector((state) => state.content.openModal.modify);
  const modalData = useSelector((state) => state.content.openModal.modalData);
  const userId = useSelector((state) => state.user.id);
  const currentYear = findCurrentStudyYear(moment());
  const [period, setPeriod] = useState(currentYear);
  const [quarter1, setQuarter1] = useState({});
  const [quarter2, setQuarter2] = useState({});
  const [quarter3, setQuarter3] = useState({});
  const [quarter4, setQuarter4] = useState({});
  const arrQuarters = [setQuarter1, setQuarter2, setQuarter3, setQuarter4];
  const [checkAvail, setCheckAvail] = useState(null);
  const [error, setError] = useState(null);

  const errorName = CONTENT.ADD_TEACHER_ER_NAME;
  const errorLesson = CONTENT.ADD_TEACHER_ER_LESSON;
  const errorAvail = CONTENT.ADD_TEACHER_ER_AVAIL;

  const dispatch = useDispatch();
  const changePeriod = (e) => {
    setPeriod(Number(e.target.value));
  };
  const toClose = () => {
    dispatch(openCloseModal({ quarterModal: false }));
  };
  const toRefreshData = () => {
    setError(null);
    arrQuarters.map((setQuarter) => setQuarter(null));
    dispatch(saveModalData({}));
    dispatch(setModify(false));
  };
  useEffect(() => {
    isCreateQuarterDB(userId, period).then((data) => setCheckAvail(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);
  // const checkValues = () => {
  //   if (!teacherName) {
  //     setError(errorName);
  //     return false;
  //   } else if (!lessonsIdList.length) {
  //     setError(errorLesson);
  //     return false;
  //   } else {
  //     const avaiTeacherName = Object.values(teachers).filter(
  //       (teacher) => teacher.name.toLowerCase() === teacherName.toLowerCase()
  //     );
  //     if (!avaiTeacherName.length) {
  //       return true;
  //     } else {
  //       if (modify && tempName.toLowerCase() === teacherName.toLowerCase()) {
  //         return true;
  //       } else {
  //         setError(errorAvail);
  //         return false;
  //       }
  //     }
  //   }
  // };
  const addQuarter = () => {
    const data = {
      1: quarter1,
      2: quarter2,
      3: quarter3,
      4: quarter4,
    };
    dispatch(addQuartersThunk({ userId, currentYear, data }));
    toClose();
    toRefreshData();
  };

  return (
    <div className="modal-content">
      <div className="modal-content-box modal-content-box-center">
        <h3>{modify ? "Изменить" : "Добавить"} четверти </h3>
        <SetPeriod
          period={period}
          changePeriod={changePeriod}
          currentStudyYear={currentYear}
          className={"modal-content__period"}
        />
        {checkAvail ? (
          <div className="quarters__attent">
            Четверти для выбранного периода уже созданы!
          </div>
        ) : (
          arrQuarters.map((setQuarter, ind) => {
            return (
              <QuartersInput
                setQuarter={setQuarter}
                number={ind + 1}
                key={ind}
              />
            );
          })
        )}

        {/* 
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
                  setError(null);
                }}
              />
              <label htmlFor={`lesson${lesson.lessonId}`}>{lesson.title}</label>
            </div>
          ))}
        </div> */}
      </div>

      {/* <div className="modal-content-error">{error}</div> */}

      {!checkAvail && (
        <button
          className="modal-submit-button"
          onClick={() => {
            addQuarter();
          }}
        >
          {modify ? "Сохранить изменения" : "Сохранить"}
        </button>
      )}
    </div>
  );
};
