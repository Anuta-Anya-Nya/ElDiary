import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDailyScheduleNote } from "../../store/slices/dailySchedulesSlice";
import { openCloseModal } from "../../store/slices/contentSlice";

export const ModalAddNotes = ({ isOpen, onClose }) => {
  const [note, setNote] = useState("");
  const [error, setError] = useState(false);
  const modalData = useSelector((state) => state.content.openModal.modify);

  const dispatch = useDispatch();

  const toCloseAndRefreshData = () => {
    setNote("");
    setError(false);
    dispatch(openCloseModal({ notesModal: false }));
  };

  const saveNote = () => {
    if (!note) {
      setError(true);
    } else {
      dispatch(
        updateDailyScheduleNote({
          date: modalData.date,
          notes: note,
        })
      );
      toCloseAndRefreshData();
    }
  };

  return (
    <div>
      <h3>Добавить заметку:</h3>

      <div className="modal-content__inputBox">
        <input
          className="modal-content-input"
          type="text"
          value={note}
          placeholder="Введите запись"
          onChange={(el) => {
            setNote(el.target.value);
            setError(false);
          }}
        />
      </div>

      {error && <div className="modal-content-error">Заметка пустая!</div>}

      <button
        className="modal-submit-button"
        onClick={() => {
          saveNote();
        }}
      >
        Сохранить запись
      </button>
    </div>
  );
};
