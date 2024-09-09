import React, { useState } from "react";
import Modal from "react-modal";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { useDispatch } from "react-redux";
import { updateDailyScheduleGrade } from "../../store/slices/dailySchedulesSlice";

export const ModalAddGrade = ({ isOpen, onClose, addLessonData }) => {
  const [radioValue, setRadioValue] = useState("");
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const toCloseAndRefreshData = () => {
    setRadioValue("");
    setError(false);
    onClose();
  };

  const saveGrade = () => {
    if (!radioValue) {
      setError(true);
    } else {
      dispatch(
        updateDailyScheduleGrade({
          date: addLessonData.date,
          number: addLessonData.number,
          grade: Number(radioValue),
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
        <h4>Добавить оценку:</h4>

        <div>
          <input
            type="radio"
            name="grade"
            value="5"
            id="gradeChoice1"
            checked={radioValue === "5"}
            onChange={(el) => {
              setRadioValue(el.target.value);
              setError(false);
            }}
          />
          <label htmlFor="gradeChoice1">5</label>

          <input
            type="radio"
            name="grade"
            value="4"
            id="gradeChoice2"
            checked={radioValue === "4"}
            onChange={(el) => {
              setRadioValue(el.target.value);
              setError(false);
            }}
          />
          <label htmlFor="gradeChoice2">4</label>
          <input
            type="radio"
            name="grade"
            value="3"
            id="gradeChoice3"
            checked={radioValue === "3"}
            onChange={(el) => {
              setRadioValue(el.target.value);
              setError(false);
            }}
          />
          <label htmlFor="gradeChoice3">3</label>
          <input
            type="radio"
            name="grade"
            value="2"
            id="gradeChoice4"
            checked={radioValue === "2"}
            onChange={(el) => {
              setRadioValue(el.target.value);
              setError(false);
            }}
          />
          <label htmlFor="gradeChoice4">2</label>
        </div>

        {error && <div>Оценка не выбрана!</div>}

        <button
          className="modal-submit-button"
          onClick={() => {
            saveGrade();
          }}
        >
          Сохранить оценку
        </button>
      </Modal>
    </div>
  );
};
