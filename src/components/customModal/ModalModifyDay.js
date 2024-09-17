import React from "react";
import Modal from "react-modal";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { useSelector } from "react-redux";
import TableDayDiary from "../tables/TableDayDiary";

export const ModalModifyDay = ({ isOpen, onClose }) => {
  const { date } = useSelector((state) => state.content.openModal.modalData);
  const editDay = useSelector(
    (state) => state.dailySchedules.schedulesList[date]
  );

  // const toCloseAndRefreshData = () => {
  //   setRadioValue("");
  //   setError(false);
  //   onClose();
  // };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        overlayClassName={"modal-overlay"}
        className="modal-content"
        ariaHideApp={false}
        closeTimeoutMS={100}
        onRequestClose={() => onClose()}
      >
        <button className="modal-close-button" onClick={() => onClose()}>
          <CloseIcon />
        </button>

        <h3>Внести изменения:</h3>
        <TableDayDiary day={editDay} />

        <div>{editDay?.date}</div>
        <button onClick={() => console.log(editDay)}>
          показать день для изменения
        </button>
        <button
          className="modal-submit-button"
          onClick={() => {
            onClose();
          }}
        >
          Сохранить изменения
        </button>
      </Modal>
    </div>
  );
};
