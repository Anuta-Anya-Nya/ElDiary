const SetPeriod = ({ period, changePeriod, currentStudyYear }) => {
  return (
    <div className="schedule__setting">
      <label htmlFor="periodSchedule">Период: </label>
      <select
        value={period}
        onChange={(ev) => {
          changePeriod(ev);
        }}
        name="selectPeriod"
        id="periodSchedule"
      >
        <option
          value={currentStudyYear - 1}
          selected={period === currentStudyYear - 1}
        >
          {currentStudyYear - 1}
        </option>
        <option value={currentStudyYear} selected={period === currentStudyYear}>
          {currentStudyYear}
        </option>
        <option
          value={currentStudyYear + 1}
          selected={period === currentStudyYear + 1}
        >
          {currentStudyYear + 1}
        </option>
      </select>
      <span>- {period + 1}</span>
    </div>
  );
};
export default SetPeriod;
