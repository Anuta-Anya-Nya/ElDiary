import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import moment from "moment/min/moment-with-locales.min";
import MenuCardBox from "./cards/MenuCardBox";
import PageTitle from "./blocks/PageTitle";
import TablesDiary from "./tables/TablesDiary";
import {
  checkWeeklySchedule,
  findCurrentStudyYear,
  getWeekDaysInStore,
} from "../utils/services";
import { useDispatch } from "react-redux";
import { addSchedule } from "../store/slices/dailySchedulesSlice";
import arrowLeft from "../assets/icons/arrow-left.svg";
import arrowRight from "../assets/icons/arrow-right.svg";
import { toChangeDate } from "../utils/services";
import { CustomModal } from "./customModal/CustomModal";

const Diary = () => {
  moment.locale("ru");
  const titleCardId = 1;

  const [currentDate, setCurrentDate] = useState(moment());
  const [diaryWeek, setDiaryWeek] = useState({});

  const currentStudyYear = findCurrentStudyYear(currentDate);
  const weeklySchedule = useSelector(
    (state) => state.weeklySchedule.scheduleForWeek[currentStudyYear]
  );

  const schedules = useSelector((state) => state.dailySchedules.schedulesList);
  const dispatch = useDispatch();

  const findDiaryWeek = (currentDate, schedules) => {
    const selectedDates = getWeekDaysInStore(currentDate, schedules);
    const filteredSchedules = Object.keys(schedules)
      .filter((key) => selectedDates.includes(key))
      .reduce((obj, key) => {
        obj[key] = schedules[key];
        return obj;
      }, {});
    setDiaryWeek(filteredSchedules);
  };

  const renderDiaryTitle = (currentDate) => {
    return `Неделя с ${currentDate
      .clone()
      .startOf("week")
      .format("DD MMMM")} по ${currentDate
      .clone()
      .endOf("week")
      .format("DD MMMM YYYY")} года`;
  };

  useEffect(() => {
    checkWeeklySchedule(
      currentDate,
      schedules,
      weeklySchedule,
      dispatch,
      addSchedule
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  useEffect(() => {
    findDiaryWeek(currentDate, schedules);
  }, [schedules, currentDate]);

  return (
    <main>
      <PageTitle titleCardId={titleCardId} />
      <section className="diary">
        <div className="container diary-container">
          <div className="diary__header">
            <div className="homework__icons">
              <img
                className="icons"
                src={arrowLeft}
                alt="left"
                onClick={() => {
                  toChangeDate(-1, setCurrentDate, 7, currentDate);
                }}
              />
            </div>
            <h2 className="diary__title">{renderDiaryTitle(currentDate)}</h2>
            <div className="homework__icons">
              <img
                className="icons"
                src={arrowRight}
                alt="right"
                onClick={() => {
                  toChangeDate(1, setCurrentDate, 7, currentDate);
                }}
              />
            </div>
          </div>
          {Object.keys(diaryWeek).length > 0 && (
            <TablesDiary week={diaryWeek} currentDate={currentDate} />
          )}
        </div>
        <CustomModal />
      </section>
      <MenuCardBox titleCardId={titleCardId} />
    </main>
  );
};

export default Diary;
