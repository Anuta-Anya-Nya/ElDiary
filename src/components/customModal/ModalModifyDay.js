import React from "react";
import { useSelector } from "react-redux";
import TableDayDiary from "../tables/TableDayDiary";
import { openCloseModal } from "../../store/slices/contentSlice";
import { useDispatch } from "react-redux";

export const ModalModifyDay = () => {
  const { date } = useSelector((state) => state.content.openModal.modalData);
  const editDay = useSelector(
    (state) => state.dailySchedules.schedulesList[date]
  );
  const dispatch = useDispatch();

  // const toCloseAndRefreshData = () => {
  //   setRadioValue("");
  //   setError(false);
  //   onClose();
  // };

  return (
    <div>
      <h3>Внести изменения:</h3>
      <TableDayDiary day={editDay} />

      <div>{editDay?.date}</div>
      <button onClick={() => console.log(editDay)}>
        показать день для изменения
      </button>
      <button
        className="modal-submit-button"
        onClick={() => {
          dispatch(openCloseModal({ editDayModal: false }));
        }}
      >
        Сохранить изменения
      </button>
    </div>
  );
};
