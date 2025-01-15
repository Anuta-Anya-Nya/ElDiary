import { useEffect, useState } from "react";
import moment from "moment/min/moment-with-locales.min";
import { useDispatch, useSelector } from "react-redux";
import MenuCardBox from "./cards/MenuCardBox";
import PageTitle from "./blocks/PageTitle";
import Loading from "./blocks/Loading";
import { findCurrentStudyYear, mergeObjects } from "../utils/services";
import { MENU_CARDS } from "../utils/constants";
import GradesTable from "./tables/GradesTable";
import useEffectAfterMount from "../utils/useEffectAfterMount";
import { openCloseModal } from "../store/slices/contentSlice";
import { CustomModal } from "./customModal/CustomModal";

function Grades() {
  moment.locale("ru");
  const titleCardId = MENU_CARDS.GRADES_ID;

  const currentDate = moment("2025-05-25");
  const currentYear = findCurrentStudyYear(currentDate);
  const quartersNotExist = 999;

  const loadingDailySchedules = useSelector(
    (state) => state.dailySchedules.loading
  );
  const loadingQuarters = useSelector((state) => state.quarters.loading);
  const schedules = useSelector((state) => state.dailySchedules.schedulesList);
  const quarters = useSelector((state) => state.quarters.quartersList);
  const dispatch = useDispatch();

  const [currentQuarter, setCurrentQuarter] = useState();
  const [currentSchedules, setCurrentSchedules] = useState({});
  const [gradesQuarter, setGradesQuarter] = useState({});

  const findCurrentQuarter = (currentDate) => {
    const quartersNumbers = Object.keys(quarters);
    if (quartersNumbers.length) {
      for (let i = 0; i < quartersNumbers.length - 1; i++) {
        if (
          currentDate.isBetween(
            moment(quarters[quartersNumbers[i]].start),
            moment(quarters[quartersNumbers[i + 1]].start)
          )
        ) {
          return +quartersNumbers[i];
        }
      }
      return +quartersNumbers[quartersNumbers.length - 1];
    } else {
      return quartersNotExist;
    }
  };

  const gradesOfDay = (day) => {
    return Object.values(day.lessonsList).reduce((lessonsList, lesson) => {
      if (lesson.grade) {
        if (lessonsList[lesson.lessonId]) {
          lessonsList[lesson.lessonId].push(lesson.grade);
        } else {
          lessonsList[lesson.lessonId] = [lesson.grade];
        }
      }
      return lessonsList;
    }, {});
  };

  useEffect(() => {
    if (!loadingQuarters) {
      setCurrentQuarter(findCurrentQuarter(currentDate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingQuarters]);

  useEffectAfterMount(() => {
    if (!loadingQuarters && !loadingDailySchedules && currentQuarter) {
      if (currentQuarter === quartersNotExist) {
        setCurrentSchedules(schedules);
      } else {
        const currentSchedules = Object.keys(schedules)
          .filter((el) =>
            moment(el).isBetween(
              moment(quarters[currentQuarter].start).subtract(1, "days"),
              moment(quarters[currentQuarter].end).add(1, "d")
            )
          )
          .reduce((obj, date) => {
            obj[date] = schedules[date];
            return obj;
          }, {});
        setCurrentSchedules(currentSchedules);
      }
    }
  }, [currentQuarter, loadingQuarters, loadingDailySchedules]);

  useEffectAfterMount(() => {
    const grades = Object.values(currentSchedules).reduce(
      (lessonsList, day) => {
        return mergeObjects(lessonsList, gradesOfDay(day));
      },
      {}
    );
    setGradesQuarter(grades);
  }, [currentSchedules]);

  return (
    <main>
      <PageTitle titleCardId={titleCardId} />
      <section className="homework">
        <div className="container homework-container">
          {loadingDailySchedules && loadingQuarters ? (
            <Loading />
          ) : (
            <>
              <h3 className="homework__title">
                Оценки за {currentYear} - {currentYear + 1} учебный год
              </h3>

              <div>
                <div>
                  {Object.keys(quarters)
                    .sort()
                    .map((el, ind) => (
                      <button
                        key={ind}
                        className={
                          ind + 1 === currentQuarter
                            ? "modal-submit-button modal-submit-button-active"
                            : "modal-submit-button"
                        }
                        onClick={() => {
                          setCurrentQuarter(ind + 1);
                        }}
                      >
                        {ind + 1} четверть <br />c{" "}
                        {moment(quarters[el].start).format("D MMMM")} по{" "}
                        {moment(quarters[el].end).format("D MMMM")}
                      </button>
                    ))}
                </div>

                {currentQuarter === quartersNotExist && (
                  <div>
                    <p>
                      Если хотите видеть оценки на текущую четверть, введите
                      даты начала и окончания четвертей
                    </p>
                    <button
                      className="modal-submit-button"
                      onClick={() => {
                        dispatch(openCloseModal({ quarterModal: true }));
                      }}
                    >
                      Добавить
                    </button>
                  </div>
                )}

                <GradesTable grades={gradesQuarter} />
              </div>
            </>
          )}
        </div>
        <CustomModal />
      </section>
      <MenuCardBox titleCardId={titleCardId} classMenu={"buttons"} />
    </main>
  );
}

export default Grades;
