import ScheduleTable from "../tables/ScheduleTable";
import ScheduleNotFound from "./ScheduleNotFound";

const ScheduleView = ({ schedule }) => {
  return schedule ? (
    <div className="diary__area">
      {schedule.schedule.map((day, ind) => (
        <ScheduleTable daySchedule={day} index={ind} key={ind} />
      ))}
    </div>
  ) : (
    <ScheduleNotFound />
  );
};
export default ScheduleView;
