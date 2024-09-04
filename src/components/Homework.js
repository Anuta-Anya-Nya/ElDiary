import { useEffect, useState } from "react";
import moment from "moment/min/moment-with-locales.min";

import TableHomework from "./tables/TableHomework";
import arrowLeft from "../assets/icons/arrow-left.svg";
import arrowRight from "../assets/icons/arrow-right.svg";
import { useSelector } from "react-redux";
import MenuCardBox from "./cards/MenuCardBox";

function Homework() {
  moment.locale("ru");
  const currentDate = moment("2024-09-02");
  const [displayDate, setDisplayData] = useState(
    currentDate.clone().add(1, "days")
  );
  const titleCardId = 6;
  const titleCard = useSelector((state) =>
    state.content.menuButtons.find((el) => el.id === titleCardId)
  );

  const displaySchedule = useSelector(
    (state) =>
      state.dailySchedules.schedulesList[displayDate.format("YYYY-MM-DD")]
  );

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
    <main>
      <section className="title">
        <div className="container title-container">
          <div className="card card-title">
            <div className="card__pic">
              <img
                className="card__img"
                src={titleCard.icon.path}
                alt={titleCard.icon.alt}
              />
            </div>
            <div className="card__title cart-title__title">
              {titleCard.title}
            </div>
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
      <MenuCardBox titleCardId={titleCardId} />
    </main>
  );
}

export default Homework;
