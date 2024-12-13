import { useState } from "react";

const QuartersInput = ({ setQuarter, number }) => {
  const [quarterStart, setQuarterStart] = useState("");
  const [quarterEnd, setQuarterEnd] = useState("");
  return (
    <div className="modal-content__dateBox">
      <label>{number} четверть</label>
      <input
        className="modal-content-input"
        type="date"
        min="2024-09-01"
        max="2025-06-01"
        value={quarterStart}
        onChange={(ev) => {
          setQuarterStart(ev.target.value);
          setQuarter({ start: ev.target.value, end: quarterEnd });
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
          setQuarter({ start: quarterStart, end: ev.target.value });
        }}
      />
    </div>
  );
};
export default QuartersInput;
