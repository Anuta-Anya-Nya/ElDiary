import React from "react";
import Modal from "react-modal";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";

export const CustomModal = ({ isOpen, onClose, submitButton, children }) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        overlayClassName={"modal-overlay"}
        className="modal-content"
        ariaHideApp={false}
        closeTimeoutMS={300}
        onRequestClose={() => onClose()}
      >
        <button className="modal-close-button" onClick={() => onClose()}>
          <CloseIcon />
        </button>

        {children}
        {submitButton && (
          <button className="modal-submit-button" onClick={() => onClose()}>
            {submitButton}
          </button>
        )}
      </Modal>
    </div>
  );
};
