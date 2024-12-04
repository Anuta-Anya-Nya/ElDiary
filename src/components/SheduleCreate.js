import MenuCardBox from "./cards/MenuCardBox";
import PageTitle from "./blocks/PageTitle";
import ScheduleActions from "./blocks/ScheduleActions";

import moment from "moment/min/moment-with-locales.min";
import { findCurrentStudyYear } from "../utils/services";

import { useEffect, useState } from "react";

import { isCreateWeeklySheduleDB } from "../db/weeklyScheduleDb";
import { useDispatch, useSelector } from "react-redux";
import { getWeeklySchedule } from "../store/slices/weeklyScheduleSlice";

const ScheduleCreate = () => {
  const titleCardId = 7;
  const editSchedule = true;
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const currentDate = moment();
  const currentStudyYear = findCurrentStudyYear(currentDate);

  const [period, setPeriod] = useState(currentStudyYear);
  const handleChange = (e) => {
    setPeriod(Number(e.target.value));
  };
  // const checkAvail = isCreateWeeklySheduleDB(userId, period);
  const [checkAvail, setCheckAvail] = useState(null);

  useEffect(() => {
    isCreateWeeklySheduleDB(userId, period).then((data) => setCheckAvail(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);
  useEffect(() => {
    return () => {
      // Для поддержания актуального недельного расписания в сторе
      dispatch(
        getWeeklySchedule({
          userId,
          currentYear: currentStudyYear,
        })
      );
    };
  }, []);

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
              editSchedule={editSchedule}
              setCheckAvail={setCheckAvail}
            />
          )}
        </div>
      </section>

      <MenuCardBox titleCardId={titleCardId} />
    </main>
  );
};

export default ScheduleCreate;
