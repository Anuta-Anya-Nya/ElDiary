import React, { useState } from "react";
import Modal from "react-modal";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { useSelector, useDispatch } from "react-redux";
import { updateDailyScheduleLesson } from "../../store/slices/dailySchedulesSlice";

export const ModalAddLesson = ({ isOpen, onClose, addLessonData }) => {
  const lessons = useSelector((state) => state.lessons.lessons);
  const [selectValue, setSelectValue] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const toCloseAndRefreshData = () => {
    setError(false);
    setSelectValue("");
    onClose();
  };
  const addLessonToShedule = () => {
    if (!selectValue) {
      setError(true);
      return;
    } else {
      dispatch(
        updateDailyScheduleLesson({
          date: addLessonData.date,
          number: addLessonData.number,
          lessonId: Number(selectValue),
        })
      );
      toCloseAndRefreshData();
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
          multiple
          onChange={(e) => {
            setSelectValue(e.target.value);
            if (e.target.value) {
              setError(false);
            }
          }}
        >
          {Object.values(lessons).map((lesson) => (
            <option value={lesson.lessonId} key={lesson.lessonId}>
              {lesson.title}
            </option>
          ))}
          <option value="addLes">Добавить новый урок...</option>
        </select>
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
