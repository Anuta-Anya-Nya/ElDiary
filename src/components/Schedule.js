import MenuCardBox from "./cards/MenuCardBox";
import PageTitle from "./blocks/PageTitle";
import ScheduleView from "./blocks/ScheduleView";
import ScheduleActions from "./blocks/ScheduleActions";
import { useSelector } from "react-redux";
import moment from "moment/min/moment-with-locales.min";
import { useState } from "react";

const Schedule = () => {
  const titleCardId = 7;

  const currentDate = moment();
  const currentStudyYear = currentDate.isBefore(
    moment(`${currentDate.format("YYYY")}-09-01`)
  )
    ? Number(currentDate.format("YYYY")) - 1
    : Number(currentDate.format("YYYY"));

  const schedule = useSelector(
    (state) => state.weeklySchedule.scheduleForWeek[currentStudyYear]
  );

  const [editSchedule, setEditSchedule] = useState(false);

  return (
    <main>
      <PageTitle titleCardId={titleCardId} />
      <section className="schedule">
        <div className="container diary-container">
          <div className="schedule__header">
            <h2 className="diary__title">
              Учебный год {currentStudyYear} - {currentStudyYear + 1}
            </h2>
            {!editSchedule && (
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
            <ScheduleView schedule={schedule.schedule} />
          )}
        </div>
      </section>

      <MenuCardBox titleCardId={titleCardId} />
    </main>
  );
};

export default Schedule;
