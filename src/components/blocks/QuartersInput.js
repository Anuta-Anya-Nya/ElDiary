import { useState } from "react";
import moment from "moment/min/moment-with-locales.min";

const QuartersInput = ({ setQuarter, number, period, setError }) => {
  const [quarterStart, setQuarterStart] = useState("");
  const [quarterEnd, setQuarterEnd] = useState("");
  const [errorPeriod, setErrorPeriod] = useState(null);
  const studyYearDateStart = moment(`${period}-08-31`);
  const studyYearDateEnd = moment(`${period + 1}-06-01`);

  const setQuarterUp = (dates) => {
    console.log("dates:", dates);
    const dateMomentSt = moment(dates.start);
    const dateMomentE = moment(dates.end);
    if (dateMomentE.isBefore(dateMomentSt)) {
      setErrorPeriod("Начальная дата больше, чем конечная дата четверти!");
      setError("Дата введена неверно!");
    } else if (
      dateMomentSt.isBetween(studyYearDateStart, studyYearDateEnd) &&
      dateMomentE.isBetween(studyYearDateStart, studyYearDateEnd)
    ) {
      setError(null);
      setErrorPeriod(null);
      setQuarter(dates);
    } else {
      if (!dateMomentSt.isBetween(studyYearDateStart, studyYearDateEnd)) {
        setErrorPeriod("Начальная дата введена неверно!");
        setError("Дата введена неверно!");
      } else {
        setErrorPeriod("Конечная дата введена неверно!");
        setError("Дата введена неверно!");
      }
    }
  };

  return (
    <div className="modal-content__dateBox">
      <label>{number} четверть</label>
      <input
        className="modal-content-input"
        type="date"
        min={`${period}-09-01`}
        max={`${period + 1}-06-01`}
        value={quarterStart}
        onChange={(ev) => {
          setQuarterStart(ev.target.value);
          setQuarterUp({ start: ev.target.value, end: quarterEnd });
        }}
      />

      <input
        className="modal-content-input"
        type="date"
        min="2024-09-01"
        max="2025-06-01"
        value={quarterEnd}
        onChange={(ev) => {
          setQuarterEnd(ev.target.value);
          setQuarterUp({ start: quarterStart, end: ev.target.value });
        }}
      />
      {errorPeriod && (
        <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
          {errorPeriod}
        </div>
      )}
    </div>
  );
};
export default QuartersInput;
