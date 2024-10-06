import MenuCardBox from "./cards/MenuCardBox";
import PageTitle from "./blocks/PageTitle";
import ScheduleTable from "./tables/ScheduleTable";
import { useSelector } from "react-redux";
import moment from "moment/min/moment-with-locales.min";

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

  return (
    <main>
      <PageTitle titleCardId={titleCardId} />
      <section className="schedule">
        <div className="container diary-container">
          <div className="schedule__header">
            <h2 className="diary__title">
              Учебный год {currentStudyYear} - {currentStudyYear + 1}
            </h2>
            <button className="modal-submit-button">Изменить расписание</button>
          </div>

          <div className="diary__area">
            {schedule.schedule.map((day, ind) => (
              <ScheduleTable daySchedule={day} index={ind} key={ind} />
            ))}
          </div>
        </div>
      </section>

      <MenuCardBox titleCardId={titleCardId} />
    </main>
  );
};

export default Schedule;
