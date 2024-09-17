import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { useDispatch, useSelector } from "react-redux";
import { ModalAddLesson } from "./ModalAddLesson";
import { ModalAddHomework } from "./ModalAddHomework";
import { ModalAddGrade } from "./ModalAddGrade";
import { openCloseModal } from "../../store/slices/contentSlice";
import { ModalAddNotes } from "./ModalAddNotes";
import { ModalModifyDay } from "./ModalModifyDay";

export const CustomModal = () => {
  const modalList = useSelector((state) => state.content.openModal.modalList);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const toFindContent = () => {
    const entries = Object.entries(modalList);
    let comp;
    if (entries.filter((el) => el[1] === true).length === 1) {
      comp = entries.filter((el) => el[1] === true)[0][0];
    }
    switch (comp) {
      case "lessonModal":
        return <ModalAddLesson />;
      case "homeWorkModal":
        return <ModalAddHomework />;
      case "gradeModal":
        return <ModalAddGrade />;
      case "notesModal":
        return <ModalAddNotes />;
      case "editDayModal":
        return <ModalModifyDay />;
      default:
        return null;
    }
  };
  const payload = () => {
    const entries = Object.entries(modalList);
    let comp;
    if (entries.filter((el) => el[1] === true).length === 1) {
      comp = entries.filter((el) => el[1] === true)[0][0];
    }
    const payload = {};
    payload[comp] = false;
    return payload;
  };

  const isOpen = () => {
    const entries = Object.entries(modalList);
    if (entries.filter((el) => el[1] === true).length === 1) {
      console.log("найдено 1 открытое модальное окно");
      setOpen(true);
    } else if (!entries.filter((el) => el[1] === true).length) {
      console.log("открытых модалок нет");
      setOpen(false);
    } else {
      console.log("ошибка! открытых модалок больше 1");
    }
  };

  useEffect(() => {
    isOpen();
  }, [modalList]);

  return (
    <div>
      <Modal
        isOpen={open}
        overlayClassName={"modal-overlay"}
        className="modal-content"
        ariaHideApp={false}
        closeTimeoutMS={100}
        onRequestClose={() => dispatch(openCloseModal(payload()))}
      >
        <button
          className="modal-close-button"
          onClick={() => dispatch(openCloseModal(payload()))}
        >
          <CloseIcon />
        </button>

        {toFindContent()}
      </Modal>
    </div>
  );
};
