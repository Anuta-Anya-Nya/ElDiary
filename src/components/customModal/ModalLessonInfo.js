import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDailyScheduleLessonThunk } from "../../store/slices/dailySchedulesSlice";
import { openCloseModal } from "../../store/slices/contentSlice";
import { findCurrentStudyYear } from "../../utils/services";
import moment from "moment/min/moment-with-locales.min";

export const ModalLessonInfo = () => {
  const modalData = useSelector((state) => state.content.openModal.modalData);
  const teacher = useSelector(
    (state) => state.teachers.teachersList[modalData.lesson.teacherId]
  );
  console.log(teacher);
  console.log(modalData);
  const dispatch = useDispatch();

  const toClose = () => {
    dispatch(openCloseModal({ lessonInfoModal: false }));
  };

  // useEffect(() => {
  //   if (modify) {
  //     setRadioValue(String(modalData.grade));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <div className="modal-content">
      <div className="modal-content-choice modal-content-choice-grade">
        <div className="modal-content-choice-item">Урок: {modalData.title}</div>
        <div className="modal-content-choice-item">
          Кабинет: {modalData.lesson.cabinet || "Не записан"}
        </div>
        <div className="modal-content-choice-item">
          Учитель: {teacher ? teacher.name : "Не записан"}
        </div>
      </div>

      <button
        className="modal-submit-button"
        onClick={() => {
          toClose();
        }}
      >
        Ок
      </button>
    </div>
  );
};
