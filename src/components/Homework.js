import { useEffect, useState } from "react";
import moment from "moment/min/moment-with-locales.min";

import TableHomework from "./tables/TableHomework";
import arrowLeft from "../assets/icons/arrow-left.svg";
import arrowRight from "../assets/icons/arrow-right.svg";
import { useSelector } from "react-redux";
import MenuCardBox from "./cards/MenuCardBox";
import PageTitle from "./blocks/PageTitle";
import { findCurrentStudyYear, toChangeDate } from "../utils/services";
import { checkWeeklySchedule } from "../utils/services";
import { useDispatch } from "react-redux";
import { addSchedule } from "../store/slices/dailySchedulesSlice";
// import { useAuth } from "../utils/useAuth";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Homework() {
  moment.locale("ru");
  const currentDate = moment();
  const selectDisplay = useSelector((state) => state.settings.displayHomeWork);
  const [displayDate, setDisplayDate] = useState(
    currentDate.clone().add(selectDisplay, "days")
  );
  const titleCardId = 6;

  const currentStudyYear = findCurrentStudyYear(currentDate);
  const weeklySchedule = useSelector(
    (state) => state.weeklySchedule.scheduleForWeek[currentStudyYear]
  );

  // из базы нужно будет запрашивать записи за 24 учебный год
  const schedules = useSelector((state) => state.dailySchedules.schedulesList);
  const dispatch = useDispatch();

  const displaySchedule = useSelector(
    (state) =>
      state.dailySchedules.schedulesList[displayDate.format("YYYY-MM-DD")]
  );
  // const isAuth = useAuth().isAuth;
  // const isAuth = onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     console.log(user);
  //     return true;
  //   } else {
  //     return false;
  //   }
  // });
  const [isAuth, setIsAuth] = useState(true);
  console.log(isAuth);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.email);
        setIsAuth(true);
      } else {
        console.log("пользователь отсутствует");
        setIsAuth(false);
      }
    });
  }, []);
  useEffect(() => {
    checkWeeklySchedule(
      displayDate,
      schedules,
      weeklySchedule,
      dispatch,
      addSchedule
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayDate]);

  return isAuth ? (
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
  ) : (
    <Navigate to="/" />
  );
}

export default Homework;
