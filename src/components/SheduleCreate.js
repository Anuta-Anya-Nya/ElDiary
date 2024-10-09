import MenuCardBox from "./cards/MenuCardBox";
import PageTitle from "./blocks/PageTitle";

import moment from "moment/min/moment-with-locales.min";

import { useState } from "react";

import { useSelector } from "react-redux";

import ScheduleActions from "./blocks/ScheduleActions";

const ScheduleCreate = () => {
  const titleCardId = 7;
  const editSchedule = true;

  const currentDate = moment();
  const currentStudyYear = currentDate.isBefore(
    moment(`${currentDate.format("YYYY")}-09-01`)
  )
    ? Number(currentDate.format("YYYY")) - 1
    : Number(currentDate.format("YYYY"));

  const [period, setPeriod] = useState(currentStudyYear);
  const handleChange = (e) => {
    setPeriod(Number(e.target.value));
  };
  const checkAvail = useSelector(
    (state) => state.weeklySchedule.scheduleForWeek[period]
  );

  return (
    <main>
      <PageTitle titleCardId={titleCardId} />
      <section className="schedule">
        <div className="container diary-container">
          <div className="schedule__header">
            <h2 className="diary__title">Создать новое учебное расписание</h2>
            <div className="schedule__setting">
              <label htmlFor="periodSchedule">Период: </label>
              <select
                value={period}
                onChange={(ev) => {
                  handleChange(ev);
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
                <option
                  value={currentStudyYear}
                  selected={period === currentStudyYear}
                >
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
            {checkAvail && (
              <div className="schedule__attent">
                Расписание для выбранного периода создано!
              </div>
            )}
          </div>

          {!checkAvail && (
            <ScheduleActions
              period={period}
              checkAvail={checkAvail}
              editSchedule={editSchedule}
            />
          )}
        </div>
      </section>

      <MenuCardBox titleCardId={titleCardId} />
    </main>
  );
};

export default ScheduleCreate;
