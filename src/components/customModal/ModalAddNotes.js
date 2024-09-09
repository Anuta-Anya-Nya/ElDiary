import React, { useState } from "react";
import Modal from "react-modal";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { useDispatch } from "react-redux";
import { updateDailyScheduleNote } from "../../store/slices/dailySchedulesSlice";

export const ModalAddNotes = ({ isOpen, onClose, addLessonData }) => {
  const [note, setNote] = useState("");
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const toCloseAndRefreshData = () => {
    setNote("");
    setError(false);
    onClose();
  };

  const saveNote = () => {
    if (!note) {
      setError(true);
    } else {
      dispatch(
        updateDailyScheduleNote({
          date: addLessonData.date,
          notes: note,
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
        <h4>Добавить заметку:</h4>

        <div>
          <input
            type="text"
            value={note}
            onChange={(el) => {
              setNote(el.target.value);
              setError(false);
            }}
          />
        </div>

        {error && <div>Заметка пустая!</div>}

        <button
          className="modal-submit-button"
          onClick={() => {
            saveNote();
          }}
        >
          Сохранить запись
        </button>
      </Modal>
    </div>
  );
};
