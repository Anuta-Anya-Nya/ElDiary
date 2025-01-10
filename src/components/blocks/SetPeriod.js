const SetPeriod = ({ period, changePeriod, currentStudyYear, className }) => {
  return (
    <div className={className}>
      <label htmlFor="periodSchedule">Учебный год: </label>
      <select
        value={period}
        onChange={(ev) => {
          changePeriod(ev);
        }}
        name="selectPeriod"
        id="periodSchedule"
      >
        <option value={currentStudyYear - 1}>{currentStudyYear - 1}</option>
        <option value={currentStudyYear}>{currentStudyYear}</option>
        <option value={currentStudyYear + 1}>{currentStudyYear + 1}</option>
      </select>
      <span>- {period + 1}</span>
    </div>
  );
};
export default SetPeriod;
