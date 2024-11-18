import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLessonsThunk } from "../store/slices/lessonsSlice";
import { useAuth } from "../utils/AuthContext";
import { getTeachersThunk } from "../store/slices/teachersSlice";
import moment from "moment/min/moment-with-locales.min";
import { findCurrentStudyYear } from "../utils/services";
import { getWeeklySchedule } from "../store/slices/weeklyScheduleSlice";

const LoadData = () => {
  const { loading } = useAuth();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.id);
  const currentYear = findCurrentStudyYear(moment());

  useEffect(() => {
    if (!loading) {
      dispatch(getLessonsThunk(userId));
      dispatch(getTeachersThunk(userId));
      dispatch(getWeeklySchedule({ userId, currentYear }));
    }
  }, [loading]);
};

export default LoadData;
