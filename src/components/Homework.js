import { useEffect, useState } from "react";
import moment from "moment/min/moment-with-locales.min";

import TableHomework from "./tables/TableHomework";
import arrowLeft from "../assets/icons/arrow-left.svg";
import arrowRight from "../assets/icons/arrow-right.svg";
import homeworkIcon from "../assets/icons/ic-homework.svg";
import { useSelector } from "react-redux";

function Homework() {
  moment.locale("ru");
  const currentDate = moment("2024-09-02");
  const [displayDate, setDisplayData] = useState(
    currentDate.clone().add(1, "days")
  );
  // const [displaySchedule, setDisplayShedule] = useState({
  //   id: null,
  //   date: "",
  //   lessonsList: [],
  //   notes: null,
  //   vacation: false,
  //   holiday: false,
  // });

  const displaySchedule = useSelector(
    (state) =>
      state.dailySchedules.schedulesList[displayDate.format("YYYY-MM-DD")]
  );
  console.log(displaySchedule);

  useEffect(() => {
    //если они пустые, нужно добавить записи в расписание на текущую неделю в зависимости от заданного расписания уроков
    // загрузить с БД все дневные расписания
    // setDiaryWeek(findDiaryWeek(currentDate));
  }, []);

  const toChangeDisplayDate = (count) => {
    const step = 1;
    if (count > 0) {
      setDisplayData(displayDate.clone().add(step, "days"));
      console.log("add");
    } else {
      setDisplayData(displayDate.clone().subtract(step, "days"));
      console.log("subtract");
    }
  };

  return (
    <>
      <section className="title">
        <div className="container title-container">
          <div className="card card-title">
            <div className="card__pic">
              <img
                className="card__img"
                src={homeworkIcon}
                alt="домашняя работа"
              />
            </div>
            <div className="card__title cart-title__title">Домашняя работа</div>
          </div>
          <h2>
            Сегодня {currentDate.format("dddd")},
            <br />
            {currentDate.format("DD MMMM YYYY")}
          </h2>
        </div>
      </section>
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
                  toChangeDisplayDate(-1);
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
                  toChangeDisplayDate(1);
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Homework;
