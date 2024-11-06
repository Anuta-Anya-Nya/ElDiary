import React, { useEffect, useState } from "react";
import {
  openCloseModal,
  saveModalData,
  setModify,
} from "../../store/slices/contentSlice";
import { useSelector, useDispatch } from "react-redux";
import { addLesson, addLessonThunk } from "../../store/slices/lessonsSlice";
import del from "../../assets/icons/delete.svg";
import shortid from "shortid";

export const ModalLesson = () => {
  const modify = useSelector((state) => state.content.openModal.modify);
  const modalData = useSelector((state) => state.content.openModal.modalData);
  const userId = useSelector((state) => state.user.id);
  const [title, setTitle] = useState(null);
  const [cabinet, setCabinet] = useState(null);
  const [cabinets, setCabinets] = useState([]);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const addCabinetinList = () => {
    if (cabinet) {
      setCabinets([...cabinets, cabinet]);
      setCabinet(null);
    }
  };

  const delCabinets = () => {
    setCabinets([]);
  };

  const toCloseAndRefreshData = () => {
    setError(false);
    setTitle(null);
    setCabinets([]);
    setCabinet(null);
    dispatch(saveModalData({}));
    dispatch(setModify(false));
    dispatch(openCloseModal({ lessonListModal: false }));
  };

  const addLessonToList = () => {
    if (!title) {
      setError(true);
      return;
    } else {
      const id = modify ? modalData.lesson.lessonId : shortid.generate();
      const cabinetList = cabinet ? [...cabinets, cabinet] : [...cabinets];
      const lesson = {
        lessonId: id,
        title,
        cabinets: cabinetList,
      };
      dispatch(addLessonThunk({ userId, lesson }));
      toCloseAndRefreshData();
    }
  };

  useEffect(() => {
    if (modify) {
      setTitle(modalData.lesson.title);
      setCabinets(modalData.lesson.cabinets);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modal-content">
      <h3>{modify ? "Изменить" : "Добавить"} урок:</h3>

      <div className="lessons__modal">
        <input
          className="modal-content-input"
          type="text"
          placeholder="Введите название урока"
          value={title || ""}
          onChange={(ev) => {
            setTitle(ev.target.value);
            setError(false);
          }}
        />
        {!!cabinets.length && (
          <div className="lessons__modal-box">
            <div>Выбранные кабинеты: {cabinets.join(", ")}</div>
            <img
              className="diary__icons"
              src={del}
              alt="удалить"
              onClick={() => {
                delCabinets();
              }}
            />
          </div>
        )}
        <input
          className="modal-content-input"
          type="number"
          placeholder="Введите кабинеты"
          value={cabinet || ""}
          onChange={(ev) => {
            setCabinet(Number(ev.target.value));
          }}
        />
        <button
          className="modal-submit-button modal-button"
          disabled={!cabinet}
          onClick={() => {
            addCabinetinList();
          }}
        >
          Добавить еще кабинет
        </button>
      </div>

      {error && (
        <div className="modal-content-error">
          Название урока обязательно к заполнению!
        </div>
      )}

      <button
        className="modal-submit-button"
        onClick={() => {
          addLessonToList();
        }}
      >
        {modify ? "Сохранить изменения" : "Добавить урок"}
      </button>
    </div>
  );
};
