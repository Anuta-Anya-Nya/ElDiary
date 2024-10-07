import React, { useEffect, useState } from "react";
import { openCloseModal } from "../../store/slices/contentSlice";
import { useSelector, useDispatch } from "react-redux";
import { updateDailyScheduleLesson } from "../../store/slices/dailySchedulesSlice";

export const ModalScheduleAddLesson = () => {
  return <div>Табличка для добавления уроков</div>;
};
