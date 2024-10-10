import ScheduleTable from "../tables/ScheduleTable";

const ScheduleView = ({ schedule }) => {
  return schedule ? (
    <div className="diary__area">
      {schedule.schedule.map((day, ind) => (
        <ScheduleTable daySchedule={day} index={ind} key={ind} />
      ))}
    </div>
  ) : (
    <div>Не создано</div>
  );
};
export default ScheduleView;
