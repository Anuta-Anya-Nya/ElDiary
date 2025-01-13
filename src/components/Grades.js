import { useEffect, useState } from "react";
import moment from "moment/min/moment-with-locales.min";
import { useSelector } from "react-redux";
import MenuCardBox from "./cards/MenuCardBox";
import PageTitle from "./blocks/PageTitle";
import Loading from "./blocks/Loading";
import { findCurrentStudyYear, mergeObjects } from "../utils/services";
import { MENU_CARDS } from "../utils/constants";
import GradesTable from "./tables/GradesTable";
import useEffectAfterMount from "../utils/useEffectAfterMount";

function Grades() {
  moment.locale("ru");
  const titleCardId = MENU_CARDS.GRADES_ID;

  const currentDate = moment();
  const currentYear = findCurrentStudyYear(currentDate);

  const loadingDailySchedules = useSelector(
    (state) => state.dailySchedules.loading
  );
  const loadingQuarters = useSelector((state) => state.quarters.loading);
  const schedules = useSelector((state) => state.dailySchedules.schedulesList);
  const quarters = useSelector((state) => state.quarters.quartersList);

  const findCurrentQuarter = (currentDate) => {
    return +Object.keys(quarters).filter((quarterNumber) =>
      currentDate.isBetween(
        moment(quarters[quarterNumber].start).subtract(1, "days"),
        moment(quarters[quarterNumber].end).add(1, "d")
      )
    )[0];
  };

  const [currentQuarter, setCurrentQuarter] = useState();
  const [currentSchedules, setCurrentSchedules] = useState({});
  const [gradesQuarter, setGradesQuarter] = useState({});

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
    setCurrentQuarter(findCurrentQuarter(currentDate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loadingQuarters && !loadingDailySchedules && currentQuarter) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingQuarters, currentQuarter]);

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

                <GradesTable grades={gradesQuarter} />
              </div>
            </>
          )}
        </div>
      </section>
      <MenuCardBox titleCardId={titleCardId} classMenu={"buttons"} />
    </main>
  );
}

export default Grades;
