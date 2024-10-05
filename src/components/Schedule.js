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

      <section className="diary__area">
        {schedule.schedule.map((day, ind) => (
          <ScheduleTable daySchedule={day} index={ind} key={ind} />
        ))}
      </section>

      <MenuCardBox titleCardId={titleCardId} />
    </main>
  );
};

export default Schedule;
