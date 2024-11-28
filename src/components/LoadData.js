import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLessonsThunk } from "../store/slices/lessonsSlice";
import { useAuth } from "../utils/AuthContext";
import { getTeachersThunk } from "../store/slices/teachersSlice";
import moment from "moment/min/moment-with-locales.min";
import { findCurrentStudyYear } from "../utils/services";
import { getWeeklySchedule } from "../store/slices/weeklyScheduleSlice";
import { getDailySchedules } from "../store/slices/dailySchedulesSlice";
import { getHomeworksThunk } from "../store/slices/homeworksSlice";
import { getSettingsThunk } from "../store/slices/settingSlice";

const LoadData = () => {
  const { loading } = useAuth();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.id);
  const currentYear = findCurrentStudyYear(moment());

  useEffect(() => {
    if (!loading) {
      dispatch(getLessonsThunk(userId));
      dispatch(getTeachersThunk(userId));
      dispatch(getSettingsThunk(userId));
      dispatch(getWeeklySchedule({ userId, currentYear }));
      dispatch(getDailySchedules({ userId, currentYear }));
      dispatch(getHomeworksThunk({ userId, currentYear }));
    }
  }, [loading]);
};

export default LoadData;
