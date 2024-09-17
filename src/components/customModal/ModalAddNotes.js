import React, { useState } from "react";
import Modal from "react-modal";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { useDispatch, useSelector } from "react-redux";
import { updateDailyScheduleNote } from "../../store/slices/dailySchedulesSlice";

export const ModalAddNotes = ({ isOpen, onClose }) => {
  const [note, setNote] = useState("");
  const [error, setError] = useState(false);
  const modalData = useSelector((state) => state.content.openModal.modalData);

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
          date: modalData.date,
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
      </Modal>
    </div>
  );
};
