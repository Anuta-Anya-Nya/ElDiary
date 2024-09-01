import { useEffect, useState } from "react";
import moment from "moment/min/moment-with-locales.min";

import TableHomework from "./tables/TableHomework";
import arrowLeft from "../assets/icons/arrow-left.svg";
import arrowRight from "../assets/icons/arrow-right.svg";
import homeworkIcon from "../assets/icons/ic-homework.svg";
import { useDispatch, useSelector } from "react-redux";
import { updateShedule } from "../store/slices/sheduleSlice";

function Homework() {
  moment.locale("ru");
  const currentDate = moment("2024-09-02");
  const [displayDate, setDisplayData] = useState(
    currentDate.clone().add(1, "days")
  );
  const shedules = useSelector((state) => state.shedule.sheduleList);
  const dispatch = useDispatch();

  const [displayDayForHomework, setDisplayDayForHomework] = useState(null);

  useEffect(
    () => {
      //если они пустые, нужно добавить записи в расписание на текущую неделю в зависимости от заданного расписания уроков
      setDisplayDayForHomework(
        shedules.find((el) => el.date.isSame(displayDate))
      );
      // setDiaryWeek(findDiaryWeek(currentDate));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const editIsDone = (ind) => {
    const newLessonItem = { ...displayDayForHomework.lessonsList[ind] };
    newLessonItem.isDone = !newLessonItem.isDone;
    const newlessonsList = [...displayDayForHomework.lessonsList];
    newlessonsList[ind] = newLessonItem;

    // если как ниже копировать массив обьектов и в нем изменять свойство, то вылетает ошибка Cannot assign to read only property 'isDone' of object
    // из-за того, что выполняется неглубокое копирование, ссылки на обьект остаются одинаковыми и внесения в обьект напрямую внести нельзя.
    // const newlessonsList = [...displayDayForHomework.lessonsList];
    // newlessonsList[ind].isDone = !newlessonsList[ind].isDone;
    setDisplayDayForHomework({
      ...displayDayForHomework,
      lessonsList: newlessonsList,
    });
    dispatch(
      updateShedule({
        ...displayDayForHomework,
        lessonsList: newlessonsList,
      })
    );
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
              <img className="icons" src={arrowLeft} alt="left" />
            </div>
            <TableHomework
              displayDayForHomework={displayDayForHomework}
              editIsDone={editIsDone}
            />
            <div className="homework__icons">
              <img className="icons" src={arrowRight} alt="right" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Homework;
