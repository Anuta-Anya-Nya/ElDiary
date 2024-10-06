import { useEffect, useState } from "react";
import moment from "moment/min/moment-with-locales.min";

import TableHomework from "./tables/TableHomework";
import arrowLeft from "../assets/icons/arrow-left.svg";
import arrowRight from "../assets/icons/arrow-right.svg";
import { useSelector } from "react-redux";
import MenuCardBox from "./cards/MenuCardBox";
import PageTitle from "./blocks/PageTitle";
import { toChangeDate } from "../utils/services";
import { checkWeeklySchedule } from "../utils/services";
import { useDispatch } from "react-redux";
import { addSchedule } from "../store/slices/dailySchedulesSlice";

function Homework() {
  moment.locale("ru");
  const currentDate = moment("2024-09-02");
  const [displayDate, setDisplayDate] = useState(
    currentDate.clone().add(1, "days")
  );
  const titleCardId = 6;

  const schedules = useSelector((state) => state.dailySchedules.schedulesList);
  const dispatch = useDispatch();

  const displaySchedule = useSelector(
    (state) =>
      state.dailySchedules.schedulesList[displayDate.format("YYYY-MM-DD")]
  );

  useEffect(() => {
    //если они пустые, нужно добавить записи в расписание на текущую неделю в зависимости от заданного расписания уроков
    // загрузить с БД все дневные расписания
  }, []);
  useEffect(() => {
    checkWeeklySchedule(displayDate, schedules, dispatch, addSchedule);
  }, [displayDate]);

  return (
    <main>
      <PageTitle titleCardId={titleCardId} />
      <section className="homework">
        <div className="container homework-container">
          <h3 className="homework__title">
            Домашнее задание на {displayDate.format("dddd")}
          </h3>
          <div className="homework__area">
            <div className="homework__icons">
              <img
                className="icons"
                src={arrowLeft}
                alt="left"
                onClick={() => {
                  toChangeDate(-1, setDisplayDate, 1, displayDate);
                }}
              />
            </div>
            <TableHomework displaySchedule={displaySchedule} />
            <div className="homework__icons">
              <img
                className="icons"
                src={arrowRight}
                alt="right"
                onClick={() => {
                  toChangeDate(1, setDisplayDate, 1, displayDate);
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <MenuCardBox titleCardId={titleCardId} />
    </main>
  );
}

export default Homework;
