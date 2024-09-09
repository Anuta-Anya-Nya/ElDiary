import React, { useState } from "react";
import Modal from "react-modal";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { useDispatch } from "react-redux";
import { addHomework } from "../../store/slices/homeworksSlice";
import { updateDailyScheduleHomework } from "../../store/slices/dailySchedulesSlice";

export const ModalAddHomework = ({ isOpen, onClose, addLessonData }) => {
  // const lessons = useSelector((state) => state.lessons.lessons);
  // const [selectValue, setSelectValue] = useState("");
  const [error, setError] = useState(false);
  const [task, setTask] = useState("");
  const [page, setPage] = useState("");
  const [note, setNote] = useState("");
  const [homeworkData, setHomeworkData] = useState([]);
  const dispatch = useDispatch();

  const addAnotherHW = () => {
    setHomeworkData([...homeworkData, { task: task, page: page, notes: note }]);
    setTask("");
    setPage("");
    setNote("");
  };

  const toCloseAndRefreshData = () => {
    setHomeworkData([]);
    setError(false);
    setTask("");
    setPage("");
    setNote("");
    onClose();
  };

  const saveHomework = () => {
    if (!task && !page && !note && !homeworkData.length) {
      setError(true);
    } else {
      let hw;
      const homeworkId = Date.now();
      if (task || page || note) {
        hw = [...homeworkData, { task: task, page: page, notes: note }];
      } else {
        hw = homeworkData;
      }
      dispatch(addHomework({ id: homeworkId, homework: hw, isDone: false }));
      dispatch(
        updateDailyScheduleHomework({
          date: addLessonData.date,
          number: addLessonData.number,
          homeworkId: homeworkId,
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
        <h4>Добавить домашнее задание:</h4>
        {homeworkData.map((hw, ind) => (
          <div key={ind}>
            {hw.task ? "упр. " : ""}
            {hw.task || ""}
            {hw.page ? " стр. " : ""}
            {hw.page || ""} {hw.notes || ""}
          </div>
        ))}
        <div>
          <label>
            Упражнение:{" "}
            <input
              type="text"
              value={task}
              onChange={(el) => {
                setTask(el.target.value);
                setError(false);
              }}
            />
          </label>
          <label>
            Страницы:{" "}
            <input
              type="text"
              value={page}
              onChange={(el) => {
                setPage(el.target.value);
                setError(false);
              }}
            />
          </label>
          <label>
            Заметки:{" "}
            <input
              type="text"
              value={note}
              onChange={(el) => {
                setNote(el.target.value);
                setError(false);
              }}
            />
          </label>
          <button
            onClick={() => {
              addAnotherHW();
            }}
          >
            Добавить еще задание
          </button>
        </div>

        {error && <div>Домашнее задание не введено!</div>}

        <button className="modal-submit-button" onClick={() => saveHomework()}>
          Сохранить домашнее задание
        </button>
      </Modal>
    </div>
  );
};
