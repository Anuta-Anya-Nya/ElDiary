import MenuCardBox from "./cards/MenuCardBox";
import PageTitle from "./blocks/PageTitle";
import ScheduleView from "./blocks/ScheduleView";
import ScheduleActions from "./blocks/ScheduleActions";
import arrowLeft from "../assets/icons/arrow-left.svg";
import arrowRight from "../assets/icons/arrow-right.svg";
import { useSelector } from "react-redux";
import moment from "moment/min/moment-with-locales.min";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Schedule = () => {
  const titleCardId = 7;
  const location = useLocation();
  const currentDate = moment();
  const [currentStudyYear, setCurrentYear] = useState(
    currentDate.isBefore(moment(`${currentDate.format("YYYY")}-09-01`))
      ? Number(currentDate.format("YYYY")) - 1
      : Number(currentDate.format("YYYY"))
  );

  const schedule = useSelector(
    (state) => state.weeklySchedule.scheduleForWeek[currentStudyYear]
  );

  const [editSchedule, setEditSchedule] = useState(false);

  useEffect(() => {
    if (location.state === "/settings") {
      setEditSchedule(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main>
      <PageTitle titleCardId={titleCardId} />
      <section className="schedule">
        <div className="container diary-container">
          <div className="schedule__header">
            <div className="diary__header">
              {!editSchedule && (
                <div className="homework__icons">
                  <img
                    className="icons"
                    src={arrowLeft}
                    alt="left"
                    onClick={() => {
                      setCurrentYear(currentStudyYear - 1);
                    }}
                  />
                </div>
              )}
              <h2 className="diary__title">
                Учебный год {currentStudyYear} - {currentStudyYear + 1}
              </h2>
              {!editSchedule && (
                <div className="homework__icons">
                  <img
                    className="icons"
                    src={arrowRight}
                    alt="right"
                    onClick={() => {
                      setCurrentYear(currentStudyYear + 1);
                    }}
                  />
                </div>
              )}
            </div>

            {!editSchedule && schedule && (
              <button
                className="modal-submit-button"
                onClick={() => {
                  setEditSchedule(true);
                }}
              >
                Изменить расписание
              </button>
            )}
          </div>

          {editSchedule ? (
            <ScheduleActions
              scheduleForEdit={schedule.schedule}
              period={currentStudyYear}
              setEditSchedule={setEditSchedule}
              editSchedule={editSchedule}
            />
          ) : (
            <ScheduleView schedule={schedule} />
          )}
        </div>
      </section>

      <MenuCardBox titleCardId={titleCardId} />
    </main>
  );
};

export default Schedule;
