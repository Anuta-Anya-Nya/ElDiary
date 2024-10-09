import ScheduleTable from "../tables/ScheduleTable";

const ScheduleView = ({ schedule }) => {
  return (
    <div className="diary__area">
      {schedule.map((day, ind) => (
        <ScheduleTable daySchedule={day} index={ind} key={ind} />
      ))}
    </div>
  );
};
export default ScheduleView;
